"use client";
import { useRouter, usePathname } from "next/navigation";

const TabsComponent = () => {
  const router = useRouter();

  const pathname = usePathname();

  const handleNavigate = (route) => () => {
    router.push(route);
  };

  return (
    <div className="flex  items-center pb-8">
      <div className="flex flex-col gap-y-2 w-70">
        <div className="hidden lg:flex lg:gap-x-12">
          <div className="relative">
            <div
              className={`flex items-center pb-4 gap-x-1 justify-center text-sm font-semibold leading-6  cursor-pointer text-black hover:text-secondary hover:border-gray-300 `}
              onClick={handleNavigate("/data-stream/source")}
            >
              Select Data Source
            </div>
            <div
              className={`${
                pathname === "/data-stream/source"
                  ? "w-[185px] border-2 border-secondary  underline"
                  : ""
              }`}
            ></div>
          </div>
          <div className="relative">
            <div
              onClick={handleNavigate("/data-stream/authorize")}
              className="flex items-center pb-4  gap-x-1 justify-center text-sm font-semibold leading-6  cursor-pointer text-black hover:text-secondary hover:border-gray-300 "
            >
              Authorize
            </div>
            <div
              className={`${
                pathname === "/data-stream/authorize"
                  ? "w-[140px] border-2 border-secondary  underline"
                  : ""
              }`}
            ></div>
          </div>
          <div className="relative">
            <div
              onClick={handleNavigate("/data-stream/attributes")}
              className="flex items-center pb-4  gap-x-1 justify-center text-sm font-semibold leading-6  cursor-pointer text-black hover:text-secondary hover:border-gray-300 "
            >
              Select Attributes
            </div>
            <div
              className={`${
                pathname === "/data-stream/attributes"
                  ? "w-[185px] border-2 border-secondary  underline"
                  : ""
              }`}
            ></div>
          </div>
          <div className="relative">
            <div
              onClick={handleNavigate("/data-stream/configListing")}
              className="flex items-center pb-4  gap-x-1 justify-center text-sm font-semibold leading-6  cursor-pointer text-black hover:text-secondary hover:border-gray-300 "
            >
              Config Listing
            </div>
            <div
              className={`${
                pathname === "/data-stream/configListing"
                  ? "w-[185px] border-2 border-secondary  underline"
                  : ""
              }`}
            ></div>
          </div>
          <div className="relative">
            <div
              onClick={handleNavigate("/data-stream/schedule")}
              className="flex items-center pb-4  gap-x-1  justify-center text-sm font-semibold leading-6  cursor-pointer text-black hover:text-secondary hover:border-gray-300 "
            >
              Schedule
            </div>
            <div
              className={`${
                pathname === "/data-stream/schedule"
                  ? "w-[185px] border-2 border-secondary  underline"
                  : ""
              }`}
            ></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TabsComponent;
