"use client";
import axios from "axios";
import React, { useEffect, useState } from "react";
import Select from "react-select";
import { redirect } from "next/navigation";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";

import { useSession } from "next-auth/react";
import { getServerSession } from "next-auth";
import { facebookAsync } from "../redux/reducers/facebookCredentials";

export default function DataSource(props: any) {
  const [selectedOption, setSelectedOption] = useState<any>(null);

  const dispatch = useDispatch();
  const router = useRouter();

  const options = [
    { value: "facebook", label: "Facebook" },
    { value: "youtube", label: "Youtube" },
  ];

  const { data: session } = useSession();

  console.log("session", session);

  useEffect(() => {
    if (session?.accessToken) {
      sendFacebookCred();
    }
  }, [session?.accessToken]);

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

  const handleSelectedOption = async (selected: any) => {
    setSelectedOption(selected);

    try {
      const response = await fetch("http://localhost:3000/api/auth/signin");
      window.open("http://localhost:3000/api/auth/signin");
      const jsonData = (await response.json()).data;
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  return (
    <div className="flex  items-center ml-[300px] pb-8 gap-4">
      <label>Select a Data Source</label>

      <Select
        defaultValue={selectedOption}
        onChange={handleSelectedOption}
        options={options}
      />
    </div>
  );
}
