"use client";
import axios from "axios";
import React, { useEffect, useState } from "react";
import Select from "react-select";
import { redirect } from 'next/navigation'

import { useSession } from 'next-auth/react'

export default function DataSource() {
  const [selectedOption, setSelectedOption] = useState<any>(null);

  const options = [
    { value: "facebook", label: "Facebook" },
    { value: "youtube", label: "Youtube" },
  ];

  const { data: session } = useSession();


console.log('session', session)

  const handleSelectedOption = async (selected: any) => {
    setSelectedOption(selected);

    try {
      const response = await fetch(
        "https://wakanda-forever.azurewebsites.net/api/auth/signin"
      );
      window.open('https://wakanda-forever.azurewebsites.net/api/auth/signin')
      const jsonData = (await response.json()).data;
    } catch (error) {
      console.error("Error fetching data:", error);
    }
    // const response = await axios(
    //   {
    //     method: "GET",
    //     mode: "cors",
    //     headers: {
    //         'Access-Control-Allow-Origin': '*',
    //         'Content-Type': 'application/json',
    //     },
    //     //   body: JSON.stringify(data),
    //   }
    // );
    // console.log(response.json());

    // return axios(`https://www.facebook.com/v18.0/dialog/oauth?client_id=2584462238376302&redirect_uri=https://wakanda-forever.azurewebsites.net&scope=ads_read&response_type=code`, {
    //     method: 'GET',
    //     mode: 'cors',
    //     headers: {
    //       'Access-Control-Allow-Origin': '*',
    //       'Content-Type': 'application/json',
    //     },
    //     withCredentials: true,
    //     credentials: 'same-origin',
    //   }).then(response => {
    //   })
  
  
    // console.log("response", response);
  };

  const responseFacebook = (response: any) => {
    console.log(response);
}

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
