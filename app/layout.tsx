import type { Metadata, Viewport } from "next";
import { Marcellus, Jost, Reem_Kufi, Tajawal } from "next/font/google";
import { LangProvider } from "@/lib/i18n";
import { SITE_URL } from "@/lib/config";
import ogImage from "@/assets/images/studio-front.webp";
import "./globals.css";

// Marcellus, not the light sibling's Cormorant: a high-stroke-contrast serif
// loses its hairlines against a near-black background. Marcellus holds an even
// weight on midnight.
//
// The Arabic faces matter more than usual on this SKU — "أركان" leads the hero
// copy, so Reem Kufi carries the display line whenever dir="rtl".
const marcellus = Marcellus({
  variable: "--font-marcellus",
  weight: ["400"],
  subsets: ["latin"],
});

const jost = Jost({
  variable: "--font-jost",
  weight: ["300", "400", "500", "600"],
  subsets: ["latin"],
});

const reemKufi = Reem_Kufi({
  variable: "--font-reem-kufi",
  weight: ["400", "500", "600", "700"],
  subsets: ["arabic"],
});

const tajawal = Tajawal({
  variable: "--font-tajawal",
  weight: ["300", "400", "500", "700"],
  subsets: ["arabic"],
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: "Vitasilk Blue Silk — Protéine Brésilienne à l'Argan 1L | بروتين برازيلي بالأركان",
  description:
    "Vitasilk Blue Silk 1L — soin professionnel à l'huile d'argan marocaine et à l'aloe vera, porté par la protéine brésilienne. Sans formol ni acide glyoxylique. Douceur soyeuse, brillance et hydratation. Livraison gratuite au Maroc, paiement à la livraison.",
  openGraph: {
    title: "Vitasilk Blue Silk — Protéine Brésilienne à l'Argan 1L",
    description:
      "L'argan marocain et l'aloe vera portés par la protéine brésilienne. Sans formol, sans acide glyoxylique. Des cheveux plus souples, plus doux et plus brillants. Livraison gratuite au Maroc — paiement à la livraison.",
    // dimensions come from the file, so they cannot drift out of sync with it
    images: [{ url: ogImage.src, width: ogImage.width, height: ogImage.height }],
    locale: "ar_MA",
    alternateLocale: "fr_MA",
    type: "website",
  },
};

export const viewport: Viewport = {
  themeColor: "#0a1020",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="ar"
      dir="rtl"
      suppressHydrationWarning
      className={`${marcellus.variable} ${jost.variable} ${reemKufi.variable} ${tajawal.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <LangProvider>{children}</LangProvider>
      </body>
    </html>
  );
}
