"use client";
import React, { useState } from "react";
import Select from "react-select";

export default function DataSource() {
  const [selectedOption, setSelectedOption] = useState<any>(null);

  const options = [
    { value: "facebook", label: "Facebook" },
    { value: "youtube", label: "Youtube" },
  ];
  return (
    <div className="flex  items-center ml-[300px] pb-8 gap-4">
      <label>Select a Data Source</label>

      <Select
        defaultValue={selectedOption}
        onChange={setSelectedOption}
        options={options}
      />
    </div>
  );
}
