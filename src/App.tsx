import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import RootLayout, { loader as categoriesLoader } from "./pages/RootLayout";
import HomePage from "./pages/HomePage";
import CategoryPage from "./pages/CategoryPage";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./http/http";
import ProductPage from "./pages/ProductPage";

const router = createBrowserRouter([
  {
    id: "root",
    path: "/",
    element: <RootLayout />,
    loader: categoriesLoader,
    children: [
      { index: true, element: <HomePage /> },
      { path: "category", element: <CategoryPage /> },
      { path: "product", element: <ProductPage /> },
    ],
  },
]);

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  );
}

export default App;
