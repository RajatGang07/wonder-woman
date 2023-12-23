"use client";
import React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Image from "next/image";

import {
  MdDashboard,
  MdSupervisedUserCircle,
  MdShoppingBag,
  MdAttachMoney,
  MdWork,
  MdAnalytics,
  MdPeople,
  MdOutlineSettings,
  MdHelpCenter,
  MdLogout,
} from "react-icons/md";


export default function Sidebar({ show, setter }: any) {
  const router: any = useRouter();

  const className =
    "transition-[margin-left] ease-in-out duration-500 left-0 z-40 h-[100%] pt-4";
  const appendClass = show ? " ml-0" : " ml-[-250px] md:ml-0";

  const MenuItem = ({ icon, name, route }: any) => {
    const colorClass =
      router.pathname === route
        ? "text-black"
        : "text-black hover:text-secondary";

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
    <aside className={`shadow-3xl ${className}${appendClass}  `}>
      {/* <div
        className={`text-[#000] hover:text-[#ff5325] flex gap-1 [&>*]:my-auto text-md pl-6 py-3 border-b-[1px] border-b-white/10 text-xl`}
      >
        Gather Data
      </div> */}
      <div className="flex flex-col">
      <MenuItem
          name="Monitor Pipeline"
          route="/monitorPipeline"
          icon={<MdDashboard />}
        />
        <MenuItem name="Connect Data Source" route="/data-stream/source" icon={<MdAnalytics />} />
        <MenuItem name="Authorize" route="authorize" icon={<MdSupervisedUserCircle />} />
      
      </div>
    </aside>
  );
}
