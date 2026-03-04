# Tutorial: Building Authentication Forms in React

This guide covers the core concepts used to build the Sign-in and Sign-up functionality in the Travel Planner application.

## 1. Form Handling with [Formik](https://formik.org/)

Formik is a popular library for managing form state, validation, and submission in React.

### Key Concepts:
- **`useFormik` Hook**: The primary hook to initialize form state and handlers.
- **`initialValues`**: An object representing the initial state of form fields.
- **`onSubmit`**: A function called when the form is submitted.
- **`handleChange`**: A helper that updates the form state based on input changes (requires `name` attribute on inputs).
- **`handleBlur`**: A helper that tracks whether a field has been visited ("touched").
- **`handleSubmit`**: A helper that triggers the `onSubmit` logic.

### Example:
```tsx
const formik = useFormik({
  initialValues: { email: "" },
  onSubmit: (values) => console.log(values),
});

<form onSubmit={formik.handleSubmit}>
  <input
    name="email"
    onChange={formik.handleChange}
    value={formik.values.email}
  />
  <button type="submit">Submit</button>
</form>
```

---

## 2. Schema Validation with [Yup](https://github.com/jquense/yup)

Yup is a schema builder for runtime value parsing and validation. It integrates seamlessly with Formik.

### Key Concepts:
- **`validationSchema`**: Passed to `useFormik` to define the validation rules.
- **Rules**: `string()`, `email()`, `min()`, `max()`, `required()`.
- **`formik.errors`**: An object containing validation error messages.
- **`formik.touched`**: An object tracking which fields have been interacting with (useful for showing errors only after interaction).

### Example:
```tsx
validationSchema: Yup.object({
  email: Yup.string().email("Invalid email").required("Required"),
  password: Yup.string().min(6, "Too short").required("Required"),
})
```

---

## 3. Navigation with [React Router](https://reactrouter.com/)

React Router handles client-side routing, allowing for single-page application (SPA) navigation.

### Key Concepts:
- **`<Router>` (BrowserRouter)**: Wraps the entire application to enable routing.
- **`<Routes>` and `<Route>`**: Defines the mapping between URL paths and components.
- **`<Link>`**: A component for navigating between pages without a full page reload.

### Example:
```tsx
<Link to="/auth/sign-up">Don't have an account? Sign Up</Link>
```

---

## 4. Icons with [Lucide React](https://lucide.dev/)

Lucide is a beautiful, consistent icon library for React.

### Usage:
Simply import the icon component and use it as a React component. You can pass props like `size`, `color`, and `strokeWidth`.

### Example:
```tsx
import { Mail, Lock } from "lucide-react";

<Mail size={20} color="#007C87" />
```

---

## 5. Component Reuse and Context-Aware Styling

Instead of hardcoding links in multiple places, we created a single `NavLinks` component.

### Key Concepts:
- **Props for Context**: Passing a `context` prop allows the component to change its layout and styling based on where it's used (e.g., `header`, `footer`).
- **Data-Driven UI**: Storing links in an array makes it easy to add or remove pages across the entire app at once.

### Example:
```tsx
const NavLinks = ({ context }) => {
  const styles = context === "header" ? "flex row" : "flex col";
  return (
    <nav className={styles}>
      {links.map(link => <Link to={link.path}>{link.name}</Link>)}
    </nav>
  );
};
```

---

---

## 6. API Integration and Asynchronous Fetching

Integrating external APIs like Amadeus involves creating services that handle network requests and authentication.

### Key Concepts:
- **Environment Variables**: Use `.env` files to store sensitive data like API keys. In Vite, prefix variables with `VITE_` (e.g., `VITE_AMADEUS_API_KEY`) to expose them to the client.
- **Service Pattern**: Separating API logic into standard service objects (e.g., `amadeusService`) keeps components clean.
- **OAuth2 Flow**: Amadeus uses OAuth2, requiring a POST request to get an access token before making other API calls.
- **Async/Await**: Used for handling asynchronous operations like `fetch`.

### Example Service with OAuth2:
```typescript
const getAccessToken = async () => {
  const response = await fetch(`${BASE_URL}/v1/security/oauth2/token`, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: `grant_type=client_credentials&client_id=${API_KEY}&client_secret=${API_SECRET}`,
  });
  const data = await response.json();
  return data.access_token;
};

export const amadeusService = {
  searchCity: async (keyword: string) => {
    const token = await getAccessToken();
    const response = await fetch(`${BASE_URL}/v1/reference-data/locations?subType=CITY&keyword=${keyword}`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    const data = await response.json();
    return data.data;
  }
};
```

### Usage in Component:
```tsx
useEffect(() => {
  const fetchData = async () => {
    setLoading(true);
    const results = await amadeusService.searchCity("Paris");
    setData(results);
    setLoading(false);
  };
  fetchData();
}, []);
```
