"use client";
import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import Select from "react-select";
import Image from "next/image";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { signOut } from "next-auth/react";

import FacebookIcon from "../assets/Facebook.jpg";
import { facebookGetDetailsAsync } from "../redux/reducers/facebookGetCredentials";
import { facebookAsync } from "../redux/reducers/facebookCredentials";
import { setSelectedFacebookUser } from "../redux/reducers/storeFacebookInfo";
import { DOMAIN_URL } from "../services";

export default function DataSource() {
  const [optionList, setOptionList] = useState<any>([]);
  const [selectedRadioChecked, setSelectedRadioChecked] = useState(false);
  const [selectedRadio, setSelectedRadio] = useState<any>("");
  const { data: session } = useSession();

  const dispatch = useDispatch();
  const router = useRouter();

  const userData: any = localStorage.getItem("auth");

  const { selectedDataSource, isView, isEdit } = useSelector(
    (state: any) => state?.storeFacebookInfoReducer?.selectedKeys
  );

  const facebookUserList =
    useSelector(
      (state: any) => state.facebookGetUserListReducer.facebookList
    ) || [];

  useEffect(() => {
    if (selectedDataSource === "Facebook") {
      fetchFacebookList();
    }
  }, []);

  const selectedFacebookUser = useSelector(
    (state: any) =>
      state?.storeFacebookInfoReducer?.selectedKeys?.selectedFacebookUser
  );

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
      setSelectedRadioChecked(true);
      setSelectedRadio("existing");
    } else {
      setSelectedRadioChecked(false);
      setSelectedRadio("direct");
    }
  }, [facebookUserList]);

  // let facebookWindow: any;
  const handleSelectedOption = async () => {
    try {
      const response = await fetch(`http://localhost:3000/api/auth/signin`);
      // window.open("http://localhost:3000/api/auth/signin", '', 'width=600,height=400');
      // facebookWindow = window.open(
      //   `http://localhost:3000/api/auth/signin`,
      //   "facebook-window",
      //   "width=600,height=400,scrollbar=yes,noopener"
      // );

      var newAnchor = document.createElement('a');
      newAnchor.href = 'http://localhost:3000/api/auth/signin';
      document.body.appendChild(newAnchor);
      newAnchor.click();
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleRadioButton = (event: any) => {
    if (event.target.value === "direct") {
      setSelectedRadioChecked(false);
    } else {
      setSelectedRadioChecked(true);
    }
    setSelectedRadio(event.target.value);
  };

  const handleSetDataAndMoveToNext = () => {
    router.push("/create-data-stream/attributes");
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
      // localStorage.setItem("auth", JSON.stringify(res?.payload?.data));
      fetchFacebookList();
      signOut();
    });
  };

  const handleUseExistingAuth = (selected: any) => {
    dispatch(setSelectedFacebookUser(selected));
  };

  return (
    <div className="flex gap-8 flex-col">
      <div className="flex justify-between items-center">
        <h1 className="font-bold text-2xl">Select Account</h1>
        <button
          onClick={
            selectedRadio === "" || selectedRadio === "direct"
              ? () => {}
              : handleSetDataAndMoveToNext
          }
          className={`bg-transparent  hover:bg-secondary text-secondary font-semibold hover:text-white py-2 px-4 border border-secondary hover:border-transparent rounded ${
            selectedRadio === "" || selectedRadio === "direct"
              ? " opacity-50 cursor-not-allowed"
              : ""
          }`}
        >
          Next
        </button>
      </div>

      <div className="flex gap-4 items-center w-[700px]">
        <input
          type="radio"
          id={selectedRadio}
          name={selectedRadio}
          value={"existing"}
          checked={selectedRadioChecked}
          disabled={isView || isEdit ? true : optionList.length === 0}
          onChange={handleRadioButton}
        />
        <label>Use Existing Auth</label>

        <div className="w-[300px]">
          <Select
            value={selectedFacebookUser || optionList[0]}
            defaultValue={optionList[0]}
            onChange={handleUseExistingAuth}
            options={optionList}
            isDisabled={isView || isEdit ? true : selectedRadio !== "existing"}
          />
        </div>
      </div>

      <div className="flex gap-4 items-center">
        <input
          type="radio"
          id={selectedRadio}
          name={selectedRadio}
          value={"direct"}
          checked={!selectedRadioChecked}
          onChange={handleRadioButton}
          disabled={isView || isEdit ? true : false}
        />
        <label>Use Direct login</label>
        {selectedRadio === "direct" &&
        selectedDataSource === "Facebook" &&
        !isView &&
        !isEdit ? (
          <div className="cursor-pointer" onClick={handleSelectedOption}>
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
    </div>
  );
}
