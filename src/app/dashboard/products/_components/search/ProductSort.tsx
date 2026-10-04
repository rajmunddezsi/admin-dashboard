"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";

export default function ProductSort() {
  const router = useRouter();
  const params = useSearchParams();
  const pathname = usePathname();
  const sort = params.get("sort") ?? "";

  const handleSelect = (selectedValue: string) => {
    const nextParams = new URLSearchParams(params);

    if (selectedValue) {
      nextParams.set("sort", selectedValue);
    } else {
      nextParams.delete("sort");
    }

    const queryString = nextParams.toString();

    router.replace(queryString ? `${pathname}?${queryString}` : pathname);
  };

  return (
    <select defaultValue={sort} onChange={(e) => handleSelect(e.target.value)}>
      <option value="">Default</option>
      <option value="price-asc">Price: Low to High</option>
      <option value="price-desc">Price: High to Low</option>
    </select>
  );
}
