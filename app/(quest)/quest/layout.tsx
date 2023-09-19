import { Metadata } from "next";
import WorksInterest from "@/components/WorksInterest";
import ToolBar from "@/components/ToolBar";

export const revalidate = 0;

export const metadata: Metadata = {
  title: "LavenderPalette",
  description: "This is the dashboard layout for products",
};

export default function QuestLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <WorksInterest/>
      <ToolBar/>
      <div>
        {children}
      </div>
    </div>
  );
}