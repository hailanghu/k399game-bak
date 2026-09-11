import { Inter } from "next/font/google";
import Script from "next/script";
import "./globals.css";

export const runtime = "edge";

// TODO: 替换为你的 AdSense 发布商 ID（在 AdSense 后台「网站 → 获取代码」中查看，格式如 ca-pub-1234567890123456）
const ADSENSE_PUBLISHER_ID = "ca-pub-8785699959726909";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html>
      <body className={`${inter.className} bg-dark-950 text-dark-50 min-h-screen`}>
        {children}

        {/* Google AdSense 自动广告 */}
        <Script
          async
          src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${ADSENSE_PUBLISHER_ID}`}
          strategy="afterInteractive"
          crossOrigin="anonymous"
        />
        <Script
          id="adsense-auto-ads"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `(adsbygoogle = window.adsbygoogle || []).push({ google_ad_client: "${ADSENSE_PUBLISHER_ID}", enable_page_level_ads: true });`,
          }}
        />
      </body>
    </html>
  );
}
