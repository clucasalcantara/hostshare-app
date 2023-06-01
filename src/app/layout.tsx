import { Inter } from "next/font/google";
import { Header } from "@/components";
import Providers from "@/utils/provider";

import "./globals.css";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Hostshare - Incredible Homes",
  description: "Your next home away from home.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Header />
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
