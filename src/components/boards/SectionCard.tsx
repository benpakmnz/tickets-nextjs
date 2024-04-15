"use client";

import { Card } from "../ui/card";

const SectionCard = ({ children }: { children: React.ReactNode }) => {
  return (
    <Card className="w-full p-3 rounded-xl border shadow mr-6">{children}</Card>
  );
};

export default SectionCard;
