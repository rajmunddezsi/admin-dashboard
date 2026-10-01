"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";

export default function ProductCategoryFilter() {
  const params = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();

  const category = params.get("category") ?? "";

  const handleSelect = (selectedCategory: string) => {
    const nextParams = new URLSearchParams(params);

    if (selectedCategory) {
      nextParams.set("category", selectedCategory);
    } else {
      nextParams.delete("category");
    }

    const queryString = nextParams.toString();

    router.replace(queryString ? `${pathname}?${queryString}` : pathname);
  };

  return (
    <div>
      <label htmlFor="category">Category</label>
      <select
        defaultValue={category}
        name="category"
        id="category"
        onChange={(e) => handleSelect(e.target.value)}
      >
        <option value="">All category</option>
        <option value="smartphones">Smartphones</option>
        <option value="laptops">Laptops</option>
        <option value="fragrances">Fragrances</option>
        <option value="mobile-accessories">Mobile</option>
      </select>
    </div>
  );
}
