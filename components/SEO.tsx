import Head from "next/head"
import { useRegion } from "@/lib/regionContext"
import type React from "react" // Added import for React

interface SEOProps {
  title: string
  description: string
  canonicalUrl?: string
  ogType?: string
  ogImage?: string
  structuredData?: object
}

export const SEO: React.FC<SEOProps> = ({
  title,
  description,
  canonicalUrl,
  ogType = "website",
  ogImage,
  structuredData,
}) => {
  const { region, currency } = useRegion()

  return (
    <Head>
      <title>{title}</title>
      <meta name="description" content={description} />
      {canonicalUrl && <link rel="canonical" href={canonicalUrl} />}

      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content={ogType} />
      {canonicalUrl && <meta property="og:url" content={canonicalUrl} />}
      {ogImage && <meta property="og:image" content={ogImage} />}

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      {ogImage && <meta name="twitter:image" content={ogImage} />}

      <meta name="geo.region" content={region === "nepal" ? "NP" : region === "india" ? "IN" : "US"} />
      <meta
        name="geo.placename"
        content={region === "nepal" ? "Nepal" : region === "india" ? "India" : "United States"}
      />
      <meta
        name="geo.position"
        content={
          region === "nepal" ? "28.394857;84.124008" : region === "india" ? "20.593684;78.96288" : "37.09024;-95.712891"
        }
      />

      <meta name="currency" content={currency} />

      {structuredData && (
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />
      )}
    </Head>
  )
}

