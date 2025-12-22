import { useSearchParams } from "react-router-dom";

export default function CategoryPage() {
  const [searchParams] = useSearchParams();
  const categoryName = searchParams.get("name");
  return <div>CategoryPage. name: {categoryName}</div>;
}
