"use client";
import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

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
  const pathname = usePathname()

  const className =
    "transition-[margin-left] ease-in-out duration-500 left-0 z-40 h-[100%] pt-4";
  const appendClass = show ? " ml-0" : " ml-[-250px] md:ml-0";

  const MenuItem = ({ icon, name, route }: any) => {
    const colorClass =
    pathname === route
        ? "text-white bg-secondary"
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
      <div
        className={`text-[#000] hover:text-secondary flex gap-1 [&>*]:my-auto text-md pl-6 py-3 border-b-[1px] border-b-white/10 text-xl mt-5`}
      >
        Gather Data
      </div>
      <div className="flex flex-col">
      <MenuItem
          name="Monitor Pipeline"
          route="/monitorPipeline"
          icon={<MdDashboard />}
        />
        <MenuItem name="Connect Data Source" route="/data-stream/source" icon={<MdAnalytics />} />
        <MenuItem name="Authorize" route="/data-stream/authorize" icon={<MdSupervisedUserCircle />} />
      
      </div>
    </aside>
  );
}
