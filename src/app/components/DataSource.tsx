"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import Image from "next/image";

import { facebookAsync } from "../redux/reducers/facebookCredentials";
import FacebookIcon from "../assets/Facebook.jpg";
import DriveIcon from "../assets/Harddisk.jpg";
import InstagramIcon from "../assets/Instagram.jpg";
import MailIcon from "../assets/Email.jpg";
import YoutubeIcon from "../assets/Youtube.jpg";
import adwords from "../assets/Adwords.jpg";
import { setSelectedDataSource } from "../redux/reducers/storeFacebookInfo";

export default function DataSource(props: any) {
  const dispatch = useDispatch();
  const router = useRouter();

  const handleSetDataAndMoveToNext = () => {
    router.push("/authorize");
  };

  return (
    <div className="ml-[300px] pb-8 gap-12 ">
      <div className="flex pb-8 gap-12 flex-row radio-container">
        <div
          className="flex gap-4"
          onClick={() => dispatch(setSelectedDataSource("Facebook"))}
        >
          <input type="radio" id="radio1" name="image" />
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
          <input type="radio" id="radio2" name="image" />
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
          <input type="radio" id="radio3" name="image" />
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
          <input type="radio" id="radio3" name="image" />
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
          <input type="radio" id="radio3" name="image" />
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
          <input type="radio" id="radio3" name="image" />
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

      <div className="inline-flex justify-end">
        <button
          onClick={handleSetDataAndMoveToNext}
          className="bg-gray-300 hover:bg-gray-400  font-bold py-2 px-4 rounded-r"
        >
          Next
        </button>
      </div>
    </div>
  );
}
