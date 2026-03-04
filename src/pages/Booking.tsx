import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ChevronLeft, Info, Calendar, Users, MapPin, CheckCircle2, CreditCard } from "lucide-react";
import { type Hotel } from "../services/amadeus";

const Booking = () => {
  const { id } = useParams<{ id: string }>();
  const [hotel, setHotel] = useState<Hotel | null>(null);
  const [loading, setLoading] = useState(true);
  const [confirmed, setConfirmed] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Note: Amadeus test API doesn't have a direct "get hotel by ID" that's reliable without a city search
    // but we can mock it here for the UI demonstration
    if (id) {
       // Mock data for the booking page
       setHotel({
         hotelId: id,
         name: "Premier Luxury Stay",
         iataCode: "PAR",
         geoCode: { latitude: 48.8584, longitude: 2.2945 },
         address: { countryCode: "FR" }
       });
       setLoading(false);
    }
  }, [id]);

  const handleConfirm = (e: React.FormEvent) => {
    e.preventDefault();
    setConfirmed(true);
    setTimeout(() => {
      navigate("/");
    }, 3000);
  };

  if (loading) return <div className="p-20 text-center">Loading booking details...</div>;

  if (confirmed) {
    return (
      <div className="container mx-auto p-8 max-w-2xl text-center py-32">
        <div className="bg-green-50 p-12 rounded-3xl border border-green-100 flex flex-col items-center">
            <CheckCircle2 size={80} className="text-green-500 mb-6" />
            <h1 className="text-4xl font-extrabold text-gray-900 mb-4">Booking Confirmed!</h1>
            <p className="text-lg text-gray-600 mb-8">
                Your stay at <span className="font-bold text-[#007C87]">{hotel?.name}</span> is all set. 
                Wait, you're being redirected home...
            </p>
            <div className="w-full bg-gray-200 h-1.5 rounded-full overflow-hidden">
                <div className="bg-green-500 h-full animate-[progress_3s_linear]" style={{ width: '100%' }}></div>
            </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4 md:p-12 max-w-6xl">
      <div className="mb-12">
        <button onClick={() => navigate(-1)} className="flex items-center text-[#007C87] font-bold hover:underline mb-4">
          <ChevronLeft size={20} className="mr-1" /> Back
        </button>
        <h1 className="text-4xl font-extrabold text-gray-900	">Confirm Your Stay</h1>
        <p className="text-gray-500">Review details and complete your reservation.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        <div className="lg:col-span-2 space-y-8">
          <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100">
            <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
                <Info size={24} className="text-[#007C87]" /> Travelers Information
            </h3>
            <form onSubmit={handleConfirm} className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                    <label className="text-sm font-bold text-gray-700 ml-1">First Name</label>
                    <input required type="text" className="w-full px-4 py-3 bg-gray-50 border-none rounded-2xl focus:ring-2 focus:ring-[#007C87] transition-all" />
                </div>
                <div className="space-y-2">
                    <label className="text-sm font-bold text-gray-700 ml-1">Last Name</label>
                    <input required type="text" className="w-full px-4 py-3 bg-gray-50 border-none rounded-2xl focus:ring-2 focus:ring-[#007C87] transition-all" />
                </div>
                <div className="space-y-2 md:col-span-2">
                    <label className="text-sm font-bold text-gray-700 ml-1">Email Address</label>
                    <input required type="email" className="w-full px-4 py-3 bg-gray-50 border-none rounded-2xl focus:ring-2 focus:ring-[#007C87] transition-all" />
                </div>
                <div className="md:col-span-2 pt-4">
                     <button type="submit" className="w-full py-4 bg-[#007C87] text-white rounded-2xl font-extrabold text-lg shadow-lg hover:bg-[#00666f] transition-all flex items-center justify-center gap-2">
                        <CreditCard size={24} /> Confirm & Pay
                    </button>
                </div>
            </form>
          </div>
        </div>

        <div className="lg:col-span-1">
          <div className="bg-white p-8 rounded-3xl shadow-lg border border-gray-50 sticky top-8">
            <div className="flex items-center gap-4 mb-6">
                <div className="w-16 h-16 bg-gray-100 rounded-2xl overflow-hidden shrink-0">
                    <img src="https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=100&q=80" className="w-full h-full object-cover" />
                </div>
                <div>
                    <h4 className="font-bold text-gray-900">{hotel?.name}</h4>
                    <p className="text-xs text-gray-400 flex items-center gap-1">
                        <MapPin size={10} /> {hotel?.address.countryCode} • {hotel?.iataCode}
                    </p>
                </div>
            </div>

            <div className="space-y-4 border-t border-gray-100 pt-6">
                <div className="flex justify-between items-center text-sm">
                    <span className="text-gray-500 flex items-center gap-2"><Calendar size={14} /> Dates</span>
                    <span className="font-bold">Next Week (3 Nights)</span>
                </div>
                <div className="flex justify-between items-center text-sm">
                    <span className="text-gray-500 flex items-center gap-2"><Users size={14} /> Guests</span>
                    <span className="font-bold">1 Adult</span>
                </div>
                <div className="border-t border-dashed border-gray-200 pt-4 flex justify-between items-end">
                    <span className="text-gray-500">Total Price</span>
                    <div className="text-right">
                        <span className="text-2xl font-extrabold text-[#007C87]">$450.00</span>
                        <p className="text-[10px] text-gray-400">Taxes included</p>
                    </div>
                </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Booking;
