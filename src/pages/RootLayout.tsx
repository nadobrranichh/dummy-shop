import Header from "../components/UI/Header";
import { Outlet } from "react-router-dom";
import { fetchCategories, queryClient } from "../http/http";
import type { HttpError } from "../types/http";
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

export function loader(): { categories: Promise<string[] | HttpError> } {
  return {
    categories: queryClient.fetchQuery({
      queryFn: fetchCategories,
      queryKey: ["categories"],
    }),
  };
}
