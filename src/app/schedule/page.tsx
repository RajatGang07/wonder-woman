import Image from "next/image";

import NavBar from "../navbar/navbar";
import Sidebar from "../components/Sidebar";
import TabsComponent from "../components/Tabs";
import Scheduler from '../components/scheduler';

export default function SchedulePage() {
  return (
    <div>
       {/* <NavBar /> */}
      <Sidebar />
      <TabsComponent />
      <Scheduler />
    </div>
  );
}
