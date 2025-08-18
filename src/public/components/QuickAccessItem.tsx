import type { ReactNode } from "react";

interface QuickAccessItemProps {
  icon: ReactNode;
  label: string;
}

export default function QuickAccessItem({ icon, label }: QuickAccessItemProps) {
  return (
    <div className="flex flex-col items-center justify-center bg-green-600 text-white rounded p-4 hover:bg-green-700 transition cursor-pointer">
      <div className="text-3xl mb-2">{icon}</div>
      <span className="text-sm font-medium text-center">{label}</span>
    </div>
  );
}
