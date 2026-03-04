/**
 * Amadeus API Service
 * Handles data fetching for cities, points of interest, and travel insights.
 */

const API_KEY = import.meta.env.VITE_AMADEUS_API_KEY;
const API_SECRET = import.meta.env.VITE_AMADEUS_API_SECRET;
const BASE_URL = "https://test.api.amadeus.com"; // Switched to root for oauth and v1/v2 support

export interface City {
  id: string;
  name: string;
  iataCode: string;
  address: {
    countryCode: string;
    stateCode?: string;
  };
  geoCode: {
    latitude: number;
    longitude: number;
  };
}

export interface POI {
  id: string;
  name: string;
  category: string;
  rank: number;
  tags: string[];
}

export interface Hotel {
  hotelId: string;
  name: string;
  iataCode: string;
  geoCode: {
    latitude: number;
    longitude: number;
  };
  address: {
    countryCode: string;
  };
}

export interface HotelOffer {
  hotel: {
    hotelId: string;
    name: string;
  };
  offers: Array<{
    id: string;
    checkInDate: string;
    checkOutDate: string;
    rateFamilyEstimated?: {
      code: string;
      type: string;
    };
    room?: {
      type: string;
      typeEstimated?: {
        category: string;
        beds: number;
        bedType: string;
      };
      description: {
        text: string;
      };
    };
    guests: {
      adults: number;
    };
    price: {
      currency: string;
      base?: string;
      total: string;
    };
  }>;
  available: boolean;
}

let cachedToken: string | null = null;
let tokenExpiry: number = 0;

const getAccessToken = async (): Promise<string> => {
  if (cachedToken && Date.now() < tokenExpiry) {
    return cachedToken;
  }

  const response = await fetch(`${BASE_URL}/v1/security/oauth2/token`, {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: `grant_type=client_credentials&client_id=${API_KEY}&client_secret=${API_SECRET}`,
  });

  const data = await response.json();
  if (data.access_token) {
    cachedToken = data.access_token;
    tokenExpiry = Date.now() + data.expires_in * 1000 - 60000; // Buffer 1 minute
    return data.access_token as string;
  }
  throw new Error("Failed to obtain Amadeus access token");
};

export const amadeusService = {
  /**
   * Search for cities based on a keyword
   */
  searchCity: async (keyword: string): Promise<City[]> => {
    try {
      const token = await getAccessToken();
      const response = await fetch(
        `${BASE_URL}/v1/reference-data/locations?subType=CITY&keyword=${keyword}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      const data = await response.json();
      return data.data || [];
    } catch (error) {
      console.error("Amadeus searchCity error:", error);
      return [];
    }
  },

  /**
   * Get city details by IATA code (using the same location endpoint)
   */
  getCityDetails: async (cityCode: string): Promise<City | null> => {
    try {
      const token = await getAccessToken();
      const response = await fetch(
        `${BASE_URL}/v1/reference-data/locations?subType=CITY&keyword=${cityCode}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      const data = await response.json();
      // Filter the exact match if possible
      return data.data?.find((c: City) => c.iataCode === cityCode) || data.data?.[0] || null;
    } catch (error) {
      console.error("Amadeus getCityDetails error:", error);
      return null;
    }
  },

  /**
   * Get hotels in a city by its city code
   */
  getHotelsByCity: async (cityCode: string): Promise<Hotel[]> => {
    try {
      const token = await getAccessToken();
      const response = await fetch(
        `${BASE_URL}/v1/reference-data/locations/hotels/by-city?cityCode=${cityCode}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      const data = await response.json();
      return data.data || [];
    } catch (error) {
      console.error("Amadeus getHotelsByCity error:", error);
      return [];
    }
  },

  /**
   * Get hotel offers for a list of hotel IDs
   */
  getHotelOffers: async (
    hotelIds: string[],
    adults: number,
    checkInDate: string,
    checkOutDate: string
  ): Promise<HotelOffer[]> => {
    try {
      const token = await getAccessToken();
      const hotelIdsParam = hotelIds.join(",");
      const response = await fetch(
        `${BASE_URL}/v3/shopping/hotel-offers?hotelIds=${hotelIdsParam}&adults=${adults}&checkInDate=${checkInDate}&checkOutDate=${checkOutDate}&bestRateOnly=true`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      const data = await response.json();
      return data.data || [];
    } catch (error) {
      console.error("Amadeus getHotelOffers error:", error);
      return [];
    }
  },

  /**
   * Get points of interest for a city by its coordinates
   */
  getPointsOfInterest: async (latitude: number, longitude: number): Promise<POI[]> => {
    try {
      const token = await getAccessToken();
      const response = await fetch(
        `${BASE_URL}/v1/reference-data/locations/pois?latitude=${latitude}&longitude=${longitude}&radius=10&page[limit]=20`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      const data = await response.json();
      return data.data || [];
    } catch (error) {
      console.error("Amadeus getPointsOfInterest error:", error);
      return [];
    }
  },

  /**
   * Mock implementation for photos
   */
  getCityPhotos: async (_cityName: string): Promise<string[]> => {
    return [
      `https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=1200&q=80`,
      `https://images.unsplash.com/photo-1499856871958-5b9627545d1a?auto=format&fit=crop&w=1200&q=80`,
      `https://images.unsplash.com/photo-1549144464-f1e98f6d7448?auto=format&fit=crop&w=1200&q=80`,
    ];
  }
};
