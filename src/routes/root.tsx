import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";

export default function Root() {
  return (
    <div className="h-screen w-full overflow-hidden flex">
      <Sidebar />
      <div className="flex flex-col">
        <Header />
        <Outlet />
      </div>
    </div>
  );
}
