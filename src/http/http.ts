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

// to delay the execution for testing loading states:
// const delay = await new Promise((resolve) => setTimeout(resolve, 3000));

export async function fetchCategories(): Promise<string[]> {
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

export async function fetchProducts(): Promise<Product[]> {
  const res = await fetch("https://fakestoreapi.com/products");
  if (!res.ok) {
    const error = getError(
      res,
      `An error occured while trying to fetch products`
    );
    throw error;
  }

  const data = await res.json();
  return data;
}

export async function fetchProduct(id: number): Promise<Product> {
  const res = await fetch(`https://fakestoreapi.com/products/${id}`);
  if (!res.ok) {
    const error = getError(
      res,
      `An error occured while trying to fetch the product n.${id}`
    );
    throw error;
  }

  const data = await res.json();
  return data;
}
