import Header from "../components/UI/Header";
import { Outlet } from "react-router-dom";
import { fetchCategories, queryClient } from "../http/http";
import type { HttpError } from "../types/http";

export default function RootLayout() {
  return (
    <>
      <Header />
      <Outlet />
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
