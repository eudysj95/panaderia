import { useState } from "react";
import { BottomNav } from "./BottomNav";
import { SectionHeader } from "./SectionHeader";
import { AddActionSheet } from "./AddActionSheet";

export const AppLayout = ({ children }) => {
  const [showAddSheet, setShowAddSheet] = useState(false);

  return (
    <div className="min-h-screen bg-[var(--color-bg)]">
      <SectionHeader />
      <main className="pb-20 px-4 sm:px-10 max-w-5xl mx-auto">
        {children}
      </main>
      <BottomNav onAddClick={() => setShowAddSheet(true)} />
      {showAddSheet && (
        <AddActionSheet onClose={() => setShowAddSheet(false)} />
      )}
    </div>
  );
};
