"use client"
import Link from "next/link";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import Image from "next/image";

import Logo from "../assets/foresee_logo.png";
import { signupAsync } from "../redux/reducers/signUpSlice";
interface FormData {
  email: string;
  password: string;
  confirmPassword: string;
  companyName: string;
  name: string,
  mobileNumber: Number
}

const SignUpForm = () => {
  const { handleSubmit, register } = useForm<FormData>();
  const dispatch = useDispatch();
  const router = useRouter();

  const signUp = (values: FormData) => {
    const data = {
      email: values.email,
      password: values.password,
      confirmPassword: values.confirmPassword,
      companyName:  values.companyName,
      name: values.name,
      mobileNumber: values.mobileNumber,
      readTermsAndConditions: true
    };
    dispatch(signupAsync(data)).then((res: any) => {
      if (res?.payload?.data?.status) {
        router.push("/login");
      }
    });
  };

  return (
    <section className=" ">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
        <div className="flex justify-center mt-8">
            <Image
              src={Logo}
              alt="Picture of the author"
              width={200}
              height={200}
            />
          </div>
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight md:text-2xl ">
              Create and account
            </h1>
            <form
              className="space-y-4 md:space-y-6"
              action="/login"
              onSubmit={handleSubmit(signUp)}
            >
              <div>
                <label className="block mb-2 text-sm font-medium ">
                  Company Name
                </label>
                <input
                  type="text"
                  {...register("companyName")}
                  id="companyName"
                  className=" border sm:text-sm rounded-lg  block w-full p-2.5 "
                  placeholder="Beige Banana"
                  required={true}
                />
              </div>
              <div>
                <label className="block mb-2 text-sm font-medium ">
                   Name
                </label>
                <input
                  type="text"
                  {...register("name")}
                  id="name"
                  className=" border sm:text-sm rounded-lg  block w-full p-2.5 "
                  placeholder="Rajkumar Irani"
                  required={true}
                />
              </div>
              <div>
                <label className="block mb-2 text-sm font-medium ">
                   Mobile Number
                </label>
                <input
                  type="text"
                  {...register("mobileNumber")}
                  id="mobileNumber"
                  className=" border sm:text-sm rounded-lg  block w-full p-2.5 "
                  placeholder="9876543210"
                  required={true}
                />
              </div>
             
              <div>
                <label className="block mb-2 text-sm font-medium ">
                  Your email
                </label>
                <input
                  type="email"
                  {...register("email")}
                  id="email"
                  className=" border sm:text-sm rounded-lg  block w-full p-2.5 "
                  placeholder="name@company.com"
                  required={true}
                />
              </div>
              <div>
                <label className="block mb-2 text-sm font-medium ">
                  Password
                </label>
                <input
                  type="password"
                  {...register("password")}
                  id="password"
                  placeholder="••••••••"
                  className=" border sm:text-sm rounded-lg  block w-full p-2.5 "
                  required={true}
                />
              </div>
              <div>
                <label className="block mb-2 text-sm font-medium ">
                  Confirm password
                </label>
                <input
                  type="confirmPassword"
                  {...register("confirmPassword")}
                  placeholder="••••••••"
                  className=" border sm:text-sm rounded-lg  block w-full p-2.5 "
                  required={true}
                />
              </div>
              <div className="flex items-start">
                <div className="flex items-center h-5">
                  <input
                    id="terms"
                    aria-describedby="terms"
                    type="checkbox"
                    className="w-4 h-4 border rounded  focus:ring-3 focus:ring-primary-300  dark:dark:ring-offset-gray-800"
                    required={true}
                  />
                </div>
                <div className="ml-3 text-sm">
                  <label className="font-light  dark:text-gray-300">
                    I accept the{" "}
                    <a
                      className="font-medium text-primary-600 hover:underline dark:text-primary-500"
                      href="https://beigebananas.com/privacy-policy-2/"
                    >
                      Terms and Conditions
                    </a>
                  </label>
                </div>
              </div>
              <button
                type="submit"
                className={`w-full text-center px-5 py-2.5 bg-secondary   text-white font-semibold border border-secondary hover:border-secondary hover:bg-white rounded hover:text-secondary`}
              >
                Create an account
              </button>
              <p className="text-sm font-light  dark:text-gray-400">
                Already have an account?{" "}
                <Link
                  href="/login"
                  className="font-medium text-primary-600 hover:underline dark:text-primary-500"
                >
                  Login here
                </Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};
export default SignUpForm;