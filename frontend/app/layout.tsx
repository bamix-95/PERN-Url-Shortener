import type { Metadata } from "next";
import { Young_Serif } from "next/font/google";
import "./globals.css";

const youngSerif = Young_Serif({
  variable: "--font-young-serif",
  subsets: ["latin"],
  weight: "400",
});

export const metadata: Metadata = {
  title: "Sniplink",
  description: "Shorten. Share. Track.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${youngSerif.variable} h-full antialiased`}>
      <body className={`${youngSerif.className} min-h-full flex flex-col`}>
        {children}
      </body>
    </html>
  );
}
