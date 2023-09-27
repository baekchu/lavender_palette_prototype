import { Metadata } from "next";

export const revalidate = 0;

export const metadata: Metadata = {
  title: "LavenderPalette",
  description: "This is the dashboard layout for products",
};

export default function MyPageLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      {children}
    </div>
  );
}