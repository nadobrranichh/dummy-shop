import { QueryClient } from "@tanstack/react-query";
import { HttpError } from "../types/http";
import type { Product } from "../types";

export const queryClient = new QueryClient();

const getError = async function (
  res: Response,
  message: string
): Promise<HttpError> {
  let info = null;
  const contentType = res.headers.get("content-type");
  if (contentType?.includes("application/json")) info = await res.json();
  else info = await res.text();
  const error = new HttpError(message, res.status, info);
  return error;
};

export async function fetchCategories(): Promise<string[]> {
  // to delay the execution
  // const delay = await new Promise((resolve) => setTimeout(resolve, 3000));
  const res = await fetch("https://fakestoreapi.com/products/categories");
  if (!res.ok) {
    const error = getError(
      res,
      "An error occured while trying to fetch categories"
    );
    throw error;
  }

  const data = await res.json();
  return data;
}

export async function fetchProducts(category?: string): Promise<Product[]> {
  // const delay = await new Promise((resolve) => setTimeout(resolve, 3000));
  let url = "https://fakestoreapi.com/products";
  if (category) url += `/categories/${category}`;

  const res = await fetch(url);
  if (!res.ok) {
    const error = getError(
      res,
      `An error occured while trying to fetch products${
        category ? `/categories/${category}` : ""
      }`
    );
    throw error;
  }

  const data = await res.json();
  return data;
}
