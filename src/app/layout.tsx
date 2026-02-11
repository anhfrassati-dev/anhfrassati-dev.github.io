import type { Metadata, Viewport } from "next";
import { Playfair_Display, EB_Garamond, Noto_Serif } from "next/font/google";
import "./globals.css";

const playfair = Playfair_Display({
  subsets: ["latin", "vietnamese"],
  weight: ["400", "600", "700"],
  style: ["normal", "italic"],
  variable: "--font-playfair",
  display: "swap",
});

const ebGaramond = EB_Garamond({
  subsets: ["latin", "vietnamese"],
  weight: ["400", "600"],
  style: ["normal", "italic"],
  variable: "--font-eb-garamond",
  display: "swap",
});

const notoSerif = Noto_Serif({
  subsets: ["latin", "vietnamese"],
  weight: ["400", "700"],
  style: ["normal"],
  variable: "--font-noto-serif",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Hái Lộc Lời Chúa Đầu Xuân 2026",
  description: "Hái Lộc Lời Chúa Đầu Xuân - Rút Lộc Thánh Online",
  metadataBase: new URL("https://anhfrassati-dev.github.io/"),
  openGraph: {
    title: "Hái Lộc Lời Chúa Đầu Xuân 2026",
    description: "Nhận Lộc Thánh đầu năm - Lời Chúa gửi đến bạn!",
    url: "https://anhfrassati-dev.github.io/",
    siteName: "Hái Lộc Lời Chúa",
    locale: "vi_VN",
    type: "website",
    images: ["/opengraph-image.png"],
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1.0,
  maximumScale: 5.0,
  userScalable: true,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="vi">
      <body
        className={`${playfair.variable} ${ebGaramond.variable} ${notoSerif.variable}`}
      >
        {children}
      </body>
    </html>
  );
}
