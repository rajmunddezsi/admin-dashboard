"use client";

import { useSearchParams, useRouter, usePathname } from "next/navigation";
import { useRef } from "react";

const DEBOUNCE_DELAY_MS = 500;

export default function ProductSearch() {
  const router = useRouter();
  const pathname = usePathname();
  const params = useSearchParams();
  const query = params.get("query") ?? "";
  const timeoutId = useRef<ReturnType<typeof setTimeout> | null>(null);

  const handleChange = (searchText: string) => {
    if (timeoutId.current !== null) clearTimeout(timeoutId.current);

    timeoutId.current = setTimeout(
      () => handleSearch(searchText),
      DEBOUNCE_DELAY_MS,
    );
  };

  const handleSearch = (searchText: string) => {
    const nextParams = new URLSearchParams(params);

    if (searchText) {
      nextParams.set("query", searchText);
    } else {
      nextParams.delete("query");
    }

    const queryString = nextParams.toString();

    router.replace(queryString ? `${pathname}?${queryString}` : pathname);
  };

  return (
    <div>
      <label htmlFor="product">Search for products</label>
      <input
        id="product"
        type="text"
        name="product"
        defaultValue={query}
        onChange={(e) => handleChange(e.target.value)}
      />
    </div>
  );
}
