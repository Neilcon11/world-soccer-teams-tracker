import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "World Soccer Teams Tracker",
  description: "Search and compare national soccer teams.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
