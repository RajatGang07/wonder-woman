"use client";
import React from "react";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import Image from "next/image";

import FacebookIcon from "../assets/Facebook.jpg";
import DriveIcon from "../assets/Harddisk.jpg";
import InstagramIcon from "../assets/Instagram.jpg";
import MailIcon from "../assets/Email.jpg";
import YoutubeIcon from "../assets/Youtube.jpg";
import adwords from "../assets/Adwords.jpg";
import { setSelectedDataSource } from "../redux/reducers/storeFacebookInfo";

export default function Source(props: any) {
  const dispatch = useDispatch();
  const router = useRouter();

  const state = useSelector((state: any) => state);
  const {selectedDataSource, isView, isEdit} = useSelector(
    (state: any) =>
      state?.storeFacebookInfoReducer?.selectedKeys
  );

  const handleSetDataAndMoveToNext = () => {
    router.push("/create-data-stream/authorize");
  };

  return (
    <div className="pb-8 h-[78%] position: relative">
      <div className="flex justify-between items-center mb-10">
        <h1 className="font-bold text-2xl">Select Data Source</h1>
        <button
          onClick={
            selectedDataSource !== "" ? handleSetDataAndMoveToNext : () => {}
          }
          className={`bg-transparent mr-10  hover:bg-secondary text-secondary font-semibold hover:text-white py-2 px-4 border border-secondary hover:border-transparent rounded ${
            selectedDataSource === "" ? " opacity-50 cursor-not-allowed" : ""
          }`}
        >
          Next
        </button>
      </div>
      <div className="flex pb-8 gap-12 flex-row radio-container">
        <div
          className="flex gap-4"
          onClick={() => dispatch(setSelectedDataSource("Facebook"))}
        >
          <input
            type="radio"
            id="radio1"
            name="image"
            value={selectedDataSource}
            checked={selectedDataSource}
            disabled={isView || isEdit ? true : false}
          />
          <label>
            <Image
              src={FacebookIcon}
              alt="Picture of the author"
              width={50}
              height={50}
            />
          </label>
        </div>

        <div className="flex gap-4">
          <input type="radio" id="radio2" name="image" disabled />
          <label>
            <Image
              src={adwords}
              alt="Picture of the author"
              width={50}
              height={50}
            />
          </label>
        </div>

        <div className="flex gap-4">
          <input type="radio" id="radio3" name="image" disabled />
          <label>
            {" "}
            <Image
              src={InstagramIcon}
              alt="Picture of the author"
              width={50}
              height={50}
            />
          </label>
        </div>
        <div className="flex gap-4">
          <input type="radio" id="radio3" name="image" disabled />
          <label>
            {" "}
            <Image
              src={YoutubeIcon}
              alt="Picture of the author"
              width={50}
              height={50}
            />
          </label>
        </div>
        <div className="flex gap-4">
          <input type="radio" id="radio3" name="image" disabled />
          <label>
            {" "}
            <Image
              src={MailIcon}
              alt="Picture of the author"
              width={50}
              height={50}
            />
          </label>
        </div>
        <div className="flex gap-4">
          <input type="radio" id="radio3" name="image" disabled />
          <label>
            <Image
              src={DriveIcon}
              alt="Picture of the author"
              width={50}
              height={50}
            />
          </label>
        </div>
      </div>

      {/* <div className="inline-flex justify-end">
        <button
          onClick={handleSetDataAndMoveToNext}
          className="bg-gray-300 hover:bg-gray-400  font-bold py-2 px-4 rounded-r"
        >
          Next
        </button>
      </div> */}
    </div>
  );
}
