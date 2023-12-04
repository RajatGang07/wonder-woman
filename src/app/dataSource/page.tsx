import Image from "next/image";

import NavBar from "../navbar/navbar";
import Sidebar from "../components/Sidebar";
import TabsComponent from "../components/Tabs";
import DataSource from '../components/DataSource';

export default function DataSourcePage() {
  return (
    <div>
      <NavBar />
      <Sidebar />
      <TabsComponent />
      <DataSource />
    </div>
  );
}
