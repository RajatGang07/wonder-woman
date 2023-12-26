"use client";
import { useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import { signOut } from "next-auth/react";
import Image from "next/image";

import Logo from "../../assets/foresee_logo.png";
import { logout } from "../../redux/reducers/authSlice";
import styles from "./navbar.module.css";

const NavBar = () => {
  const dispatch = useDispatch();
  const router = useRouter();

  const handleLogout = async () => {
    dispatch(logout);
    await signOut({ redirect: false }).then(() => {
      localStorage.removeItem("auth");
      localStorage.clear();
      router.push("/login");
      localStorage.removeItem("nextauth.message");
    });
  };
  return (
    <header className="bg-white shadow-3xl position: sticky">
      <nav
        className="mx-auto flex items-center justify-between pt-4 pb-4"
        aria-label="Global"
      >
        <div className={styles.hamburgerwrapper}>
          <button
            className={styles.hamburger}
            type="button"
            aria-label="Navigation Button"
          >
            <span className={styles.line}></span>
            <span className={styles.line}></span>
            <span className={styles.line}></span>
          </button>
          <Image
              src={Logo}
              alt="Picture of the author"
              width={150}
              height={150}
            />
          {/* <a href="#" className="-m-1.5 p-1.5">
            <img
              className="h-8 w-auto"
              src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
              alt=""
            />
          </a> */}
        </div>

        <div
          className="hidden lg:flex lg:flex-1 lg:justify-end cursor-pointer pr-10"
          onClick={handleLogout}
        >
          <a className="text-sm font-semibold leading-6 text-gray-900">
            Log out <span aria-hidden="true">&rarr;</span>
          </a>
        </div>
      </nav>
    </header>
  );
};
export default NavBar;
