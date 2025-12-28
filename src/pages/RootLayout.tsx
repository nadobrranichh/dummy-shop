import Header from "../components/UI/Header";
import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import { useAppSelector } from "../store/custom-hooks";
import SidebarBackdrop from "../components/SidebarBackdrop";

export default function RootLayout() {
  const isSidebarOpen = useAppSelector((state) => state.ui.isSidebarOpen);
  return (
    <>
      <Header />
      <Outlet />
      {isSidebarOpen && <SidebarBackdrop />}
      <Sidebar />
    </>
  );
}
