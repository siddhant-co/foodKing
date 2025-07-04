import type { Metadata } from "next";
import { Inter, Roboto_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "./components/navbar/Navbar";
import ReduxProviderWrapper from "./components/ReduxProviderWrapper";
import { Toaster } from "react-hot-toast";
import Footer from "./components/footer/Footer";

const geistSans = Inter({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Roboto_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <ReduxProviderWrapper>
        <Toaster position="top-right" />
          <Navbar />
          <main className="pt-18">
            {children}
          </main>
          <Footer/>
        </ReduxProviderWrapper>
      </body>
    </html>
  );
}
