"use client";
import { useRouter, usePathname } from "next/navigation";
import { useSelector } from "react-redux";

const TabsComponent = () => {
  const router = useRouter();

  const pathname = usePathname();

  const handleNavigate = (route) => () => {
    router.push(route);
  };

  const {selectedDataSource, isView, isEdit} = useSelector(
    (state) =>
      state?.storeFacebookInfoReducer?.selectedKeys
  );
  return (
    <div>
      <h1 className="font-bold text-2xl mb-8">Create Data Stream</h1>
      <div className="flex  items-center pb-8">
        <div className="flex flex-col gap-y-2 w-70">
          <div className="hidden lg:flex lg:gap-x-12">
            <div className="relative">
              <div
                className={`flex items-center pb-4 gap-x-1 justify-center text-sm font-semibold leading-6  cursor-pointer text-black hover:text-secondary hover:border-gray-300 `}
                onClick={handleNavigate("/create-data-stream/source")}
              >
                Data Source
              </div>
              <div
                className={`${
                  pathname === "/create-data-stream/source"
                    ? "w-[185px] border-2 border-secondary  underline"
                    : ""
                }`}
              ></div>
            </div>
            <div className="relative">
              <div
                // onClick={selectedDataSource !== '' ?handleNavigate("/create-data-stream/authorize") : () => {}}
                className="flex items-center pb-4  gap-x-1 justify-center text-sm font-semibold leading-6  cursor-pointer text-black hover:text-secondary hover:border-gray-300 "
              >
                Authorize
              </div>
              <div
                className={`${
                  pathname === "/create-data-stream/authorize"
                    ? "w-[140px] border-2 border-secondary  underline"
                    : ""
                }`}
              ></div>
            </div>
            <div className="relative">
              <div
                // onClick={selectedDataSource !== '' ?handleNavigate("/create-data-stream/attributes") : () => {}}
                className="flex items-center pb-4  gap-x-1 justify-center text-sm font-semibold leading-6  cursor-pointer text-black hover:text-secondary hover:border-gray-300 "
              >
                Attributes
              </div>
              <div
                className={`${
                  pathname === "/create-data-stream/attributes"
                    ? "w-[185px] border-2 border-secondary  underline"
                    : ""
                }`}
              ></div>
            </div>
            <div className="relative">
              <div
                // onClick={handleNavigate("/create-data-stream/schedule")}
                className="flex items-center pb-4  gap-x-1  justify-center text-sm font-semibold leading-6  text-black hover:text-secondary hover:border-gray-300 "
              >
                Preview
              </div>
              <div
                className={`${
                  pathname === "/create-data-stream/showPreview"
                    ? "w-[185px] border-2 border-secondary  underline"
                    : ""
                }`}
              ></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TabsComponent;
