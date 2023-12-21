import Image from "next/image";

import NavBar from "../navbar/navbar";
import Sidebar from "../components/Sidebar";
import TabsComponent from "../components/Tabs";
import ConfigListing from '../components/configListing';

export default function ConfigListingPage() {
  return (
    <div>
      {/* <NavBar /> */}
      <Sidebar />
      <TabsComponent />
      <ConfigListing />
    </div>
  );
}
