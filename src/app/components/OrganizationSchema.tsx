'use client'

export default function OrganizationSchema() {
  const orgSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "Lovosis Technology Private Limited",
    "url": "https://yourdomain.com",
    "logo": "https://yourdomain.com/logo1.png",
    "sameAs": [
      "https://twitter.com/RasheedAli8787",
      "https://www.linkedin.com/in/rasheed-ali-601798304"
    ],
    "contactPoint": {
      "@type": "ContactPoint",
      "telephone": "+91-YOUR-PHONE",
      "contactType": "customer service",
      "email": "contact@lovosis.in"
    }
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(orgSchema) }}
    />
  );
}