import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import "./mediaqueries.css";
import ReduxProvider from "../redux/ReduxProvider"; // Import Redux Provider
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import LoadingWrapper from "@/components/Loader";
import UserDataStore from "@/helper/UserDataStore";
import logo from "../../public/images/logo.png"

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "HQ PERFUME - Luxury Perfumes",
  description: "Explore premium and long-lasting perfumes at HQ Perfume.",
  openGraph: {
    title: "HQ PERFUME",
    description: "Luxury perfumes curated for your senses.",
    url: `${process.env.NEXT_FRONTEND_URL}`,
    siteName: "HQ PERFUME",
    images: [
      {
        url: '../../public/images/logo.png',
        width: 1200,
        height: 630,
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "HQ PERFUME",
    description: "Explore premium and long-lasting perfumes.",
    images: ["../../public/images/logo.png"],
  },
};


export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <ReduxProvider> {/* Wrap app in Redux Provider */}
          <UserDataStore>
            <LoadingWrapper>
              <Header />
              {children}
              <Footer />
            </LoadingWrapper>
          </UserDataStore>
        </ReduxProvider>
      </body>
    </html>
  );
}
