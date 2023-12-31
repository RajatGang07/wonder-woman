"use client";
import Link from "next/link";
import React from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import Image from "next/image";

import { loginAsync } from "../redux/reducers/authSlice";
import Logo from "../assets/foresee_logo.png";

interface FormData {
  email: string;
  password: string;
}

const LoginForm = () => {
  const dispatch = useDispatch();
  const router = useRouter();

  const { handleSubmit, register, setError } = useForm<FormData>({
    defaultValues: { email: "", password: "" },
  });
  const login = (values: FormData) => {
    const data = { email: values.email, password: values.password };
    dispatch(loginAsync(data)).then((res: any) => {
      if (res?.payload?.data?.data?.token) {
        router.push("/dataStreamConfigs");
        localStorage.setItem("auth", JSON.stringify(res?.payload?.data?.data));
      }
    });
  };

  return (
    <section className=" ">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0">
          <div className="flex justify-center mt-8">
            <Image
              src={Logo}
              alt="Picture of the author"
              width={200}
              height={200}
            />
          </div>
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold text-black leading-tight tracking-tight  md:text-2x">
              Sign in to your account
            </h1>
            <form
              className="space-y-4 md:space-y-6"
              action="/"
              onSubmit={handleSubmit(login)}
            >
              <div>
                <label
                  htmlFor="email"
                  className="block mb-2 text-sm font-medium"
                >
                  Your email*
                </label>
                <input
                  type="email"
                  {...register("email")}
                  className=" border border-gray-300  sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5  dark:placeholder-gray-40 dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="name@company.com"
                  required={true}
                />
              </div>
              <div>
                <label
                  htmlFor="password"
                  className="block mb-2 text-sm font-medium"
                >
                  Password*
                </label>
                <input
                  type="password"
                  {...register("password")}
                  placeholder="••••••••"
                  className=" border border-gray-300  sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5  dark:placeholder-gray-40 dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  required={true}
                />
              </div>
              {/* <div className="flex items-center justify-between">
                <div className="flex items-start">
                  <div className="flex items-center h-5">
                    <input
                      id="remember"
                      aria-describedby="remember"
                      type="checkbox"
                      className="w-4 h-4 border border-gray-300 rounded  focus:ring-3 focus:ring-primary-300  dark:focus:ring-primary-600 dark:ring-offset-gray-800"
                      // required={true}
                    />
                  </div>
                  <div className="ml-3 text-sm">
                    <label className=" dark:text-gray-300">
                      Remember me
                    </label>
                  </div>
                </div>
                <a
                  href="#"
                  className="text-sm font-medium text-primary-600 hover:underline dark:text-primary-500"
                >
                  Forgot password?
                </a>
              </div> */}
              <button
                type="submit"
                className={`w-full text-center px-5 py-2.5 bg-secondary   text-white font-semibold border border-secondary hover:border-secondary hover:bg-white rounded hover:text-secondary`}
              >
                Sign in
              </button>
              <p className="text-sm font-light  dark:text-gray-400">
                Don’t have an account yet?{" "}
                <Link
                  href="/signup"
                  className="font-medium text-primary-600 hover:underline dark:text-primary-500"
                >
                  Sign up
                </Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LoginForm;
