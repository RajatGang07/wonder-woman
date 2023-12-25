"use client";
import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import Select from "react-select";
import Image from "next/image";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

import FacebookIcon from "../assets/Facebook.jpg";
import { facebookGetDetailsAsync } from "../redux/reducers/facebookGetCredentials";
import { facebookAsync } from "../redux/reducers/facebookCredentials";
import { setSelectedFacebookUser } from "../redux/reducers/storeFacebookInfo";

export default function DataSource() {
  const [selectedOption, setSelectedOption] = useState<any>(null);
  const [optionList, setOptionList] = useState<any>([]);
  const [selectedRadio, setSelectedRadio] = useState<any>("");
  const { data: session, update } = useSession();

  const dispatch = useDispatch();
  const router = useRouter();

  const userData: any = localStorage.getItem("auth");

  const selectedDataSource =
    useSelector(
      (state: any) => state.storeFacebookInfoReducer.selectedDataSource
    ) || "";
  const facebookUserList =
    useSelector(
      (state: any) => state.facebookGetUserListReducer.facebookList
    ) || [];

  useEffect(() => {
    if (selectedDataSource === "Facebook") {
      fetchFacebookList();
    }
  }, []);

  const fetchFacebookList = async () => {
    dispatch(
      facebookGetDetailsAsync({
        userId: JSON?.parse(userData)?.userId,
      })
    );
  };

  useEffect(() => {
    if (facebookUserList.length > 0) {
      const data = facebookUserList.map((facebookUser: any) => {
        return {
          label: facebookUser.name,
          value: facebookUser.id,
          ...facebookUser,
        };
      });
      setOptionList(data);
    }
  }, [facebookUserList]);

  const handleSelectedOption = async () => {
    debugger
    try {
      const response = await fetch("http://localhost:3000/api/auth/signin");
      // window.open("http://localhost:3000/api/auth/signin", '', 'width=600,height=400');
      window.open(
        'http://localhost:3000/api/auth/signin',
        'facebook-window',
        'width=600,height=400,scrollbar=yes,noopener'
      );

      // const jsonData = (await response.json()).data;
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleRadioButton = (event: any) => {
    setSelectedRadio(event.target.value);
  };

  const handleSetDataAndMoveToNext = () => {
    router.push("/data-stream/attributes");
  };

  console.log("session", session);
  useEffect(() => {
    if (session?.accessToken) {
      sendFacebookCred();
    }
  }, [JSON.stringify(session?.accessToken)]);

  const sendFacebookCred = async () => {
    const userData: any = localStorage.getItem("auth");
    const params = {
      name: session?.user?.name,
      email: JSON?.parse(userData)?.email,
      userId: JSON?.parse(userData)?.userId,
      accessToken: session?.accessToken,
      image: session?.user?.image,
    };
    dispatch(facebookAsync(params)).then((res: any) => {
      if (res?.payload?.data?.token) {
        router.push("/");
        localStorage.setItem("auth", JSON.stringify(res?.payload?.data));
      }
    });
  };

  const handleUseExistingAuth = (selected: any) => {
    dispatch(setSelectedFacebookUser(selected));
  };

  return (
    <div className="flex pb-8 gap-8 flex-col" onChange={handleRadioButton}>
      <div className="flex gap-4 items-center w-[700px]">
        <input
          type="radio"
          id={selectedRadio}
          name={selectedRadio}
          value={"existing"}
          disabled={optionList.length === 0}
        />
        <label>Use Existing Auth</label>

        <div className="w-[300px]">
          <Select
            defaultValue={selectedOption}
            onChange={handleUseExistingAuth}
            options={optionList}
            isDisabled={selectedRadio !== "existing"}
          />
        </div>
      </div>

      <div className="flex gap-4 items-center">
        <input
          type="radio"
          id={selectedRadio}
          name={selectedRadio}
          value={"direct"}
        />
        <label>Use Direct login</label>
        {selectedRadio === "direct" && selectedDataSource === "Facebook" ? (
          <div onClick={handleSelectedOption}>
            <Image
              src={FacebookIcon}
              alt="Picture of the author"
              width={50}
              height={50}
            />
          </div>
        ) : (
          ""
        )}
      </div>
      {/* <div className="inline-flex justify-end">
        <button
          onClick={() => router.push("/dataSource")}
          className="bg-gray-300 hover:bg-gray-400  font-bold py-2 px-4 rounded-l"
        >
          Prev
        </button>
        <button
          onClick={() => router.push("selectAttributes")}
          className="bg-gray-300 hover:bg-gray-400  font-bold py-2 px-4 rounded-r"
        >
          Next
        </button>
      </div> */}
      <div className="flex justify-center">
        <button
          onClick={selectedRadio === "" ? () => {} : handleSetDataAndMoveToNext}
          className={`bg-transparent  hover:bg-secondary text-secondary font-semibold hover:text-white py-2 px-4 border border-secondary hover:border-transparent rounded ${
            selectedRadio === "" ? " opacity-50 cursor-not-allowed" : ""
          }`}
        >
          Save & Next
        </button>
      </div>
    </div>
  );
}
