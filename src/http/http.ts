import { QueryClient } from "@tanstack/react-query";
import { HttpError } from "../types/http";

export const queryClient = new QueryClient();

export async function fetchCategories(): Promise<string[]> {
  // to delay the execution
  // const delay = await new Promise((resolve) => setTimeout(resolve, 1000));
  const res = await fetch("https://fakestoreapi.com/productsss/categories");
  if (!res.ok) {
    let info = null;
    const contentType = res.headers.get("content-type");
    if (contentType?.includes("application/json")) info = await res.json();
    else info = await res.text();
    const error = new HttpError(
      "An error occurred while fetching product categories",
      res.status,
      info
    );
    throw error;
  }

  const data = await res.json();
  return data;
}
