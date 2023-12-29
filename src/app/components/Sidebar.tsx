"use client";
import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { MdDashboard, MdPeople, MdOutlineSettings, MdOutlineReceipt } from "react-icons/md";

export default function Sidebar({ show }: any) {
  const pathname = usePathname();

  const className =
    "transition-[margin-left] ease-in-out duration-500 left-0 z-40 h-[100%] pt-4";
  const appendClass = show ? " ml-0" : " ml-[-250px] md:ml-0";

  const MenuItem = ({ icon, name, route }: any) => {
    const colorClass =
      pathname === route || (route === '/dataStreamConfigs' && pathname.includes('create-data-stream'))
        ? "text-white bg-secondary"
        : "text-black hover:text-secondary";

    return (
      <Link
        href={route}
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
        className={`text-[#000]  flex gap-1 [&>*]:my-auto text-md pl-6 py-3 border-b-[1px] border-b-white/10 text-xl mt-5`}
      >
        Gather Data
      </div>
      <div className="flex flex-col">
        <MenuItem
          name="Data Stream Configs"
          route="/dataStreamConfigs"
          icon={<MdOutlineSettings />}
        />
        <MenuItem
          name="Monitor Data Stream"
          route="/dataStream"
          icon={<MdDashboard />}
        />
        <MenuItem name="Connections" route="/connections" icon={<MdPeople />} />

        <div
        className={`text-[#000]  flex gap-1 [&>*]:my-auto text-md pl-6 py-3 border-b-[1px] border-b-white/10 text-xl`}
      >
        Performance Reports 
      </div>
        <MenuItem name="Reports" route="/reports" icon={<MdOutlineReceipt />} />

      </div>
    </aside>
  );
}
