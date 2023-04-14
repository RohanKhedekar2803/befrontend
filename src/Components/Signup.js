import React from "react";
import logo from "../assets/logo.svg";
import hero from "../assets/hero.png";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Link } from "react-router-dom";
import { RegisterUser } from "../Services/Auth";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Signup = () => {
  const notify = (msg) => toast(msg);
  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
    },
    validationSchema: Yup.object().shape({
      name: Yup.string().min(2, "Too Short!").required("Required"),
      password: Yup.string().min(6, "Too Short!").required("Required"),
      email: Yup.string().email("Invalid email").required("Required"),
    }),

    onSubmit: async (values) => {
      const res = await RegisterUser(values);
      console.log(res);
      if (res.err) {
        notify(res.err);
      } else {
        notify("Signup Successfull !! Please login to continue");
      }
    },
  });

  return (
    <div className="max-h-screen py-10 overflow-hidden font-DMsans mx-auto w-full grid grid-cols-1 md:grid-cols-2   bg-white ">
      <div className="w-full flex justify-center items-center flex-col">
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

        <div className="div flex mx-1  w-8/12">
          <span className="w-3 h-3 rounded-full mr-2.5 bg-red-500"></span>
          <span className="w-3 h-3 rounded-full mr-2.5 bg-yellow-500"></span>
          <span className="w-3 h-3 rounded-full mr-2.5 bg-green-500"></span>
        </div>
        <div className="w-8/12 ">
          <img src={logo} className="w-42 my-5" alt="" />
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
                htmlFor="name"
              >
                <i className="bx pr-2.5 bxs-user-circle"></i> Enter Your Name
              </label>
              <input
                type="name"
                name="name"
                className="px-5 w-full py-2.5 bg-[#EDEEF3]/50 rounded-md"
                onChange={formik.handleChange}
                value={formik.values.name}
              />

              {formik.touched.name && formik.errors.name && (
                <span className="text-red-400">{formik.errors.name}</span>
              )}
            </div>

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
              Create My Account
            </button>
            <h1>
              {" "}
              Don't have an account yet ?{" "}
              <Link to={"/"}>
                {" "}
                <span className="text-[#5F6DF8] font-medium"> login</span>
              </Link>{" "}
            </h1>
          </form>
        </div>
      </div>
      <div className="hidden w-full md:flex justify-center items-center max-h-screen  overflow-hidden">
        <img
          src={hero}
          className="max-h-[100vh] w-full object-cover object-top "
          alt=""
        />
      </div>
    </div>
  );
};

export default Signup;
