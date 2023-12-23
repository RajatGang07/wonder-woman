"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";

const TabsComponent = () => {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("dataSource");

  const handleNavigate = (route) => () => {
    setActiveTab(route);
    router.push(route);
  };

  return (
    <div className="flex  items-center pb-8">
      <div className="flex flex-col gap-y-2 w-70">
        <div className="hidden lg:flex lg:gap-x-12">
          <div
            className="relative"
            onClick={handleNavigate("/data-stream/source")}
            onKeyDown={handleNavigate("/data-stream/source")}
          >
            <div
              className="flex items-center gap-x-1 text-sm font-semibold leading-6  cursor-pointer text-black hover:text-secondary hover:border-gray-300 "
              aria-expanded="false"
            >
              Select Data Source
            </div>
          </div>

          <div
            onClick={handleNavigate("/data-stream/authorize")}
            onKeyDown={handleNavigate("/data-stream/authorize")}
            className="flex items-center gap-x-1 text-sm font-semibold leading-6  cursor-pointer text-black hover:text-secondary hover:border-gray-300 "
          >
            Authorize
          </div>
          <div
            onClick={handleNavigate("/data-stream/attributes")}
            onKeyDown={handleNavigate("/data-stream/attributes")}
            className="flex items-center gap-x-1 text-sm font-semibold leading-6  cursor-pointer text-black hover:text-secondary hover:border-gray-300 "
          >
            Select Attributes
          </div>
          <div
            onClick={handleNavigate("/data-stream/configListing")}
            onKeyDown={handleNavigate("/data-stream/configListing")}
            className="flex items-center gap-x-1 text-sm font-semibold leading-6  cursor-pointer text-black hover:text-secondary hover:border-gray-300 "
          >
            Config Listing
          </div>
          <div
            onClick={handleNavigate("/data-stream/schedule")}
            onKeyDown={handleNavigate("/data-stream/schedule")}
            className="flex items-center gap-x-1 text-sm font-semibold leading-6  cursor-pointer text-black hover:text-secondary hover:border-gray-300 "
            >
            Schedule
          </div>
        </div>
      </div>
    </div>
  );
};

export default TabsComponent;
