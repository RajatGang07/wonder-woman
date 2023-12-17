"use client";
import React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Image from "next/image";

import { SlHome } from "react-icons/sl";
import { FaTshirt, FaRedhat } from "react-icons/fa";
import Logo from "../assets/Logo1.png";

// import logo from "../logo.svg";

export default function Sidebar({ show, setter }: any) {
  const router: any = useRouter();

  const className =
    " w-[250px] transition-[margin-left] ease-in-out duration-500 fixed top-0 bottom-0 left-0 z-40";
  const appendClass = show ? " ml-0" : " ml-[-250px] md:ml-0";

  const MenuItem = ({ icon, name, route }: any) => {
    const colorClass =
      router.pathname === route
        ? "text-white"
        : "text-white/50 hover:text-white";

    return (
      <Link
        href={route}
        onClick={() => {
        //   setter((oldVal: any) => !oldVal);
        }}
        className={`flex gap-1 [&>*]:my-auto text-md pl-6 py-3 border-b-[1px] border-b-white/10 ${colorClass}`}
      >
        <div className="text-xl flex [&>*]:mx-auto w-[30px]">{icon}</div>
        <div>{name}</div>
      </Link>
    );
  };

  return (
    <>
      <div className={`${className}${appendClass} bg-orange-300`}>
        <div className="p-2 flex">
          <Link href="/">
            {/*eslint-disable-next-line*/}
            <Image
              src={Logo}
              alt="Picture of the author"
              width={250}
              height={150}
            />
            {/* <img src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"  alt="Company Logo" width={100} height={100} /> */}
          </Link>
        </div>
        <div
          className={`text-white/50 hover:text-white flex gap-1 [&>*]:my-auto text-md pl-6 py-3 border-b-[1px] border-b-white/10 text-xl`}
        >
          Gather Data
        </div>
        <div className="flex flex-col">
          <MenuItem name="Connect Data Source" route="/" icon={<SlHome />} />
          <MenuItem name="Authorize" route="authorize" icon={<FaTshirt />} />
          <MenuItem
            name="Monitor Pipeline"
            route="monitorPipeline"
            icon={<FaRedhat />}
          />
        </div>
      </div>
    </>
  );
}
