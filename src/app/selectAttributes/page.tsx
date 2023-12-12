import Image from "next/image";

import NavBar from "../navbar/navbar";
import Sidebar from "../components/Sidebar";
import TabsComponent from "../components/Tabs";
import SelectAttribute from '../components/selectAttribute';

export default function SelectAttributePage() {
  return (
    <div>
      {/* <NavBar /> */}
      <Sidebar />
      <TabsComponent />
      <SelectAttribute />
    </div>
  );
}
