import React from "react";
import logo from "../assets/logo.svg";

import hero from "../assets/rectangle1.jpg";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Link, useNavigate } from "react-router-dom";
import { LoginUser, RegisterUser } from "../Services/Auth";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useAuthUpdate } from "../context/AuthContext";

const Login = () => {
  const notify = (msg) => toast(msg);

  const updateUser = useAuthUpdate();
  const navigate = useNavigate();
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Yup.object().shape({
      password: Yup.string().min(6, "Too Short!").required("Required"),
      email: Yup.string().email("Invalid email").required("Required"),
    }),

    onSubmit: async (values) => {
      const res = await LoginUser(values);

      if (res.err) {
        notify(res.err);
      } else {
        console.log(res);
        const { token } = res.user;
        const user = res.user;
        updateUser({ user, token });
        localStorage.setItem("currentUser", JSON.stringify(user));
        localStorage.setItem("token", token.toString());
        notify("Login successfull !!");
        navigate("/home");
      }
    },
  });

  return (
    <div className="max-h-screen overflow-hidden font-DMsans mx-auto w-full grid grid-cols-1 md:grid-cols-2  bg-white ">
      <div className="w-full py-10 md:py-0 flex justify-center items-center flex-col">
        <ToastContainer
          position="bottom-center"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
        />
        
        <div className="w-8/12 ">
          <p className="text-6xl font-semibold text-blue-600/100 tailwind-regular">Book Finder</p>
          <h1 className="   font-bold mt-5 mb-1 text-left text-4xl">
            Create Your Account
          </h1>
          <p className="text-left px-1 text-gray-500">Let's get started</p>
        </div>

        <div className="w-8/12 mx-auto">
          <form onSubmit={formik.handleSubmit}>
            <div className="mt-5 flex justify-start items-start flex-col my-2.5 w-full px-1">
              <label
                className="flex py-2.5 justify-start items-center"
                htmlFor=""
              >
                <i className="bx pr-2.5 bxs-envelope"></i> Enter Your Email
              </label>
              <input
                type="email"
                className="px-5 w-full py-2.5 bg-[#EDEEF3]/50 rounded-md"
                onChange={formik.handleChange}
                value={formik.values.email}
                name="email"
              />

              {formik.touched.email && formik.errors.email && (
                <span className="text-red-400">{formik.errors.email}</span>
              )}
            </div>

            <div className="mt-5 flex justify-start items-start flex-col my-2.5 w-full px-1">
              <label
                className="flex py-2.5 justify-start items-center"
                htmlFor=""
              >
                <i className="bx bxs-lock pr-2.5"></i> Enter Your Password
              </label>
              <input
                type="password"
                name="password"
                className="px-5 w-full py-2.5 bg-[#EDEEF3]/50 rounded-md"
                onChange={formik.handleChange}
                value={formik.values.password}
              />
              {formik.touched.password && formik.errors.password && (
                <span className="text-red-400">{formik.errors.password}</span>
              )}
            </div>

            <button
              className="bg-[#5F6DF8] text-white w-full rounded-md mx-1 my-2.5 py-2.5 text-center"
              type="submit"
            >
              Sign In
            </button>
            <h1>
              {" "}
              Already have an account ?{" "}
              <Link to={"/signup"}>
                {" "}
                <span className="text-[#5F6DF8] font-medium"> Signup</span>
              </Link>{" "}
            </h1>
          </form>
        </div>
      </div>
      <div className="hidden  col w-full md:flex justify-center items-center max-h-screen  overflow-hidden">
        <img
          src={hero}
          className="max-h-[100vh] w-full object-cover object-top "
          alt=""
        />
      </div>
    </div>
  );
};

export default Login;
