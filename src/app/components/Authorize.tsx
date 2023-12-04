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
        <input type="radio" id="age1" name="age" value="30" />
        <label>Use Existing Auth</label>

        <Select
          defaultValue={selectedOption}
          onChange={setSelectedOption}
          options={options}
        />
        <br />
        <input type="radio" id="age1" name="age" value="30" />
        <label>Use Direct login or Generate Email</label>
    </div>
  );
}
