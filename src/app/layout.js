import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Librisys",
  description: "Streamline your bookstore operations with our intuitive management system.",
  keywords : ["bookstore operations", "management system", "inventory", "sales", "customer data", "independent bookstores"]
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="w-screen h-screen overflow-x-hidden bg-white">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased w-full h-full`}
      >
        {children}
      </body>
    </html>
  );
}
