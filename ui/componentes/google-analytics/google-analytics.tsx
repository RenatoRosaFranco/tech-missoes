import Script from "next/script";
import { googleAnalyticsId } from "@/lib/site-env";

export function GoogleAnalytics() {
  const gaId = googleAnalyticsId();
  if (!gaId) return null;

  return (
    <>
      <Script src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`} strategy="lazyOnload" />
      <Script id="google-analytics" strategy="lazyOnload">
        {`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','${gaId}',{send_page_view:true});`}
      </Script>
    </>
  );
}
