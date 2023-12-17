"use client"
import React from 'react';

const Table = ({ data }: any) => {
  if (!data || data.length === 0) {
    return <p>No data available</p>;
  }

  const columns = Object.keys(data[0]);

  return (
    <table className=" border-collapse border border-slate-400 mt-8">
      <thead>
        <tr className="border border-slate-300">
          {columns.map((column, index) => (
            <th className='min-w-[300px] text-start pl-8' key={index}>{column}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.map((row: any, rowIndex: any) => (
          <tr className="border border-slate-300" key={rowIndex}>
            {columns.map((column: any, colIndex: any) => (
              <td  className='min-w-[300px] pl-8' key={colIndex}>{row[column]}</td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default Table;
