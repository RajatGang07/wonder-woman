"use client";
import { useRouter } from "next/navigation";

const TabsComponent = () => {

  const router = useRouter();

  const handleNavigate = (route) => () => {
    router.push(route);
  };
  return (
    <div className="flex  items-center ml-[300px] pb-8">
      <div className="flex flex-col gap-y-2 w-70">
        <div className="hidden lg:flex lg:gap-x-12">
          <div
            className="relative"
            onClick={handleNavigate("/dataSource")}
            onKeyDown={handleNavigate("/dataSource")}
          >
            <div
              className="flex items-center gap-x-1 text-sm font-semibold leading-6 text-gray-900 cursor-pointer"
              aria-expanded="false"
            >
              Select Data Source
            </div>
          </div>

          <div
            onClick={handleNavigate("/authorize")}
            onKeyDown={handleNavigate("/authorize")}
            className="text-sm font-semibold leading-6 text-gray-900 cursor-pointer"
          >
            Authorize
          </div>
          <div
            onClick={handleNavigate("/selectAttributes")}
            onKeyDown={handleNavigate("/selectAttributes")}
            className="text-sm font-semibold leading-6 text-gray-900 cursor-pointer"
          >
            Select Attributes
          </div>
          <div
            onClick={handleNavigate("/schedule")}
            onKeyDown={handleNavigate("/schedule")}
            className="text-sm font-semibold leading-6 text-gray-900 cursor-pointer"
          >
            Schedule
          </div>
        </div>
      </div>
    </div>
  );
};

export default TabsComponent;
