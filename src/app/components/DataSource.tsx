"use client";
import axios from "axios";
import React, { useState } from "react";
import Select from "react-select";

export default function DataSource() {
  const [selectedOption, setSelectedOption] = useState<any>(null);

  const options = [
    { value: "facebook", label: "Facebook" },
    { value: "youtube", label: "Youtube" },
  ];

  const handleSelectedOption = async (selected: any) => {
    setSelectedOption(selected);
    
    const response: any = await fetch(
      `https://www.facebook.com/v18.0/dialog/oauth?client_id=2584462238376302&redirect_uri=https://wakanda-forever.azurewebsites.net&scope=ads_read&response_type=code`,
    );

    console.log('response', response)
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
