import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ReduxProvider from "@/components/reduxProvider";
import { ClerkProvider } from "@clerk/nextjs";
import Head from "next/head";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});

const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Nike. Just Do It. Nike CA",
  description: "Shop Authentic Nike Shoes, Apparel & Accessories – [Nike] Discover the latest Nike sneakers, running shoes, sportswear, and accessories at [Your Store Name]. We offer a premium selection of Nike Air Max, Jordans, Dunks, running gear, and workout apparel, designed for athletes, sneakerheads, and fitness enthusiasts. Shop authentic Nike products at competitive prices with fast shipping and excellent customer service. Whether you're looking for performance footwear, stylish streetwear, or exclusive releases, we have everything you need to elevate your game. Browse our collection today and experience the perfect blend of innovation, comfort, and style with Nike!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
    <html lang="en">
      <Head>
      <link rel="icon" href="/nike-logo.jpg" />
      </Head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ReduxProvider>
        <Header />
        {children}
        <Footer />
        </ReduxProvider>
      </body>
    </html>
    </ClerkProvider>
  );
}
