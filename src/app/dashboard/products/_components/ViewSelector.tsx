"use client";

import { useState, type ChangeEvent } from "react";

const views = ["Table", "Cards"] as const;
type ViewType = (typeof views)[number];

export default function ViewSelector() {
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
