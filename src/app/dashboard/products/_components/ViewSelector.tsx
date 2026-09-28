"use client";

import { useState, type ChangeEvent } from "react";

type ViewType = "Cards" | "Table";

interface ViewSelectorProps {
  views: ViewType[];
}

export default function ViewSelector({ views }: ViewSelectorProps) {
  const [selectedView, setSelectedView] = useState<ViewType>("Table");

  const handleSelect = (e: ChangeEvent<HTMLSelectElement>) =>
    setSelectedView(e.target.value as ViewType);

  return (
    <div>
      <div>Current view: {selectedView}</div>
      <select value={selectedView} onChange={handleSelect}>
        {views.map((view) => (
          <option key={view} value={view}>
            {view}
          </option>
        ))}
      </select>
    </div>
  );
}
