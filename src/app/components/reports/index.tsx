"use client";
import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import Select from "react-select";
import Image from "next/image";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function DataSource() {
  return (
    <div className="flex pb-8 gap-8 flex-col">
            <div className="flex justify-between items-center">
        <h1 className="font-bold text-2xl">Data Stream Configuration</h1>
        <button
          className={`bg-secondary   text-white font-semibold inline-flex  py-2 px-4 border border-secondary hover:border-secondary hover:bg-white rounded hover:text-secondary`}
        >
          Create Data Stream
        </button>
      </div>
    </div>
  );
}
