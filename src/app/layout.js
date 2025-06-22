import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata = {
  metadataBase: new URL("https://stepupbhubaneswar.com"),
  title:
    "Step Up Bhubaneswar - Dance Workshops with Top Choreographers | Hip Hop, Bollywood, Contemporary",
  description:
    "Join Odisha's first curated dance workshop platform. Learn from India's top choreographers in weekend sessions. Hip Hop, Bollywood, Contemporary & Latin dance classes for all levels in Bhubaneswar. No age limit, no experience required.",
  keywords:
    "dance workshops Bhubaneswar, Step Up Bhubaneswar, choreography workshops Odisha, hip hop workshops Bhubaneswar, Bollywood dance classes, weekend dance classes, professional dance training, contemporary dance workshops, beginner dance classes, dance academy Bhubaneswar, celebrity choreographer workshops, Mumbai choreographers, dance for all ages, cultural dance hub Odisha, premium dance workshops, dance community Bhubaneswar, intensive dance training, Latin dance workshops, salsa bachata classes, dance fitness classes, creative expression dance, working professionals dance, dance masterclass, national level instructors",

  // Open Graph for social sharing
  openGraph: {
    title:
      "Step Up Bhubaneswar - Premium Dance Workshops with Celebrity Choreographers",
    description:
      "Weekend dance workshops with top choreographers from Mumbai, Delhi & across India. All dance styles, all levels welcome. Join Odisha's dance revolution!",
    type: "website",
    locale: "en_IN",
    url: "https://stepupbhubaneswar.com",
    siteName: "Step Up Bhubaneswar",
    images: [
      {
        url: "/images/step-up-og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Step Up Bhubaneswar Dance Workshops",
      },
    ],
  },

  // Twitter Card
  twitter: {
    card: "summary_large_image",
    title: "Step Up Bhubaneswar - Dance Workshops with Top Choreographers",
    description:
      "Learn from India's best choreographers in weekend dance workshops. Hip Hop, Bollywood, Contemporary & more!",
    images: ["/images/step-up-twitter-card.jpg"],
  },

  // Additional SEO
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },

  // Local SEO
  other: {
    "geo.region": "IN-OR",
    "geo.placename": "Bhubaneswar, Odisha, India",
    "geo.position": "20.2961;85.8245",
    ICBM: "20.2961, 85.8245",
    "DC.title": "Step Up Bhubaneswar - Dance Workshop Platform",
    "DC.creator": "Step Up Bhubaneswar Team",
    "DC.subject": "Dance Education, Choreography Training, Weekend Workshops",
    "DC.description":
      "Professional dance workshop platform bringing top choreographers to Bhubaneswar",
    classification: "Education, Arts, Dance, Entertainment",
    category: "Dance Academy, Workshop Platform, Arts Education",
    coverage: "Bhubaneswar, Odisha, Eastern India",
    distribution: "Global",
    rating: "General",
  },

  // Verification tags (add your actual codes)
  verification: {
    google: "your-google-verification-code",
    yandex: "your-yandex-verification-code",
    bing: "your-bing-verification-code",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={inter.variable}>
      <head>
        {/* Preload critical fonts */}
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap"
          rel="preload"
          as="style"
          onLoad="this.onload=null;this.rel='stylesheet'"
        />
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon-16x16.png"
        />
        <link rel="manifest" href="/site.webmanifest" />
        <noscript>
          <link
            href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap"
            rel="stylesheet"
          />
        </noscript>

        {/* Additional SEO tags */}
        <meta name="author" content="Step Up Bhubaneswar" />
        <meta name="publisher" content="Step Up Bhubaneswar" />
        <meta name="copyright" content="Step Up Bhubaneswar 2025" />
        <meta name="language" content="English" />
        <meta name="revisit-after" content="7 days" />
        <meta name="distribution" content="web" />
        <meta name="rating" content="general" />

        {/* Local Business Schema */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "DanceSchool",
              name: "Step Up Bhubaneswar",
              description:
                "Odisha's first curated dance workshop platform with top choreographers from across India",
              url: "https://stepupbhubaneswar.com",
              logo: "https://stepupbhubaneswar.com/logov1.png",
              image: "https://stepupbhubaneswar.com/images/logov2.png",
              address: {
                "@type": "PostalAddress",
                addressLocality: "Bhubaneswar",
                addressRegion: "Odisha",
                addressCountry: "India",
              },
              geo: {
                "@type": "GeoCoordinates",
                latitude: "20.2961",
                longitude: "85.8245",
              },
              telephone: "+91-7749019313",
              email: "info.stepupbhubaneswar@gmail.com",
              sameAs: [
                "https://instagram.com/stepup_bhubaneswar",
                "https://wa.me/917749019313",
              ],
              priceRange: "₹599-₹2000",
              paymentAccepted: "UPI, Cash",
              currenciesAccepted: "INR",
              openingHours: "Sa-Su 09:00-19:00",
              areaServed: {
                "@type": "City",
                name: "Bhubaneswar",
              },
              serviceType: "Dance Education",
              provider: {
                "@type": "Organization",
                name: "Step Up Bhubaneswar",
              },
            }),
          }}
        />

        {/* Favicon and App Icons */}
        <link rel="icon" href="/favicon.ico" />
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon-16x16.png"
        />
        <link rel="manifest" href="/site.webmanifest" />

        {/* Mobile optimization */}
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, viewport-fit=cover"
        />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="theme-color" content="#FF6B35" />
      </head>
      <body className={`${inter.className} antialiased`}>{children}</body>
    </html>
  );
}
