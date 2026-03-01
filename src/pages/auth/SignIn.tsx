import { useFormik } from "formik";
import * as Yup from "yup";
import Input from "../../components/common/Input";
import { Lock, MailIcon } from "lucide-react";
import { Link } from "react-router-dom";

const SignIn = () => {
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      email: Yup.string().email("Invalid email address").required("Required"),
      password: Yup.string()
        .min(6, "Password must be at least 6 characters")
        .required("Required"),
    }),
    onSubmit: (values) => {
      console.log("Form Submitted", values);
      alert("Sign in successful! (Check console for data)");
    },
  });

  return (
    <div className="mx-auto max-w-md h-screen justify-center items-center flex flex-col gap-6">
      <div className="w-full max-w-sm">
        <h1 className="text-3xl font-bold text-[#007C87] text-center mb-8">Welcome Back</h1>
        <form
          onSubmit={formik.handleSubmit}
          className="shadow-2xl p-10 rounded-2xl space-y-6 bg-white border border-gray-100"
        >
          <div className="space-y-1">
            <Input
              name="email"
              type="email"
              placeholder="Enter your email"
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              icon={<MailIcon color="#007C87" size={20} />}
            />
            {formik.touched.email && formik.errors.email ? (
              <p className="text-xs text-red-500 pl-2">{formik.errors.email}</p>
            ) : null}
          </div>

          <div className="space-y-1">
            <Input
              name="password"
              type="password"
              placeholder="Enter your password"
              value={formik.values.password}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              icon={<Lock color="#007C87" size={20} />}
            />
            {formik.touched.password && formik.errors.password ? (
              <p className="text-xs text-red-500 pl-2">{formik.errors.password}</p>
            ) : null}
          </div>

          <button
            type="submit"
            className="w-full bg-gradient-to-r from-[#10d3e5] to-[#007C87] text-white py-3 rounded-xl font-semibold shadow-md hover:shadow-lg transition-all active:scale-[0.98] cursor-pointer"
          >
            Sign In
          </button>

          <div className="text-center mt-4 text-sm text-gray-600">
            Don't have an account?{" "}
            <Link to="/auth/sign-up" className="text-[#007C87] font-semibold hover:underline">
              Sign Up
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignIn;
