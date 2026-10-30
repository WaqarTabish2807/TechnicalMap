import { BASE_URL, LINKS, SITE } from "./config";

// Schema.org JSON-LD shared across pages. Stable @ids let Google and AI
// assistants connect the person, the site and the service as one entity.
export const PERSON_ID = `${BASE_URL}/#person`;
export const WEBSITE_ID = `${BASE_URL}/#website`;
export const SERVICE_ID = `${BASE_URL}/work#service`;

export const personSchema = {
  "@type": "Person",
  "@id": PERSON_ID,
  name: SITE.author,
  url: `${BASE_URL}/work`,
  jobTitle: "Content partner for AI & DevTool startups",
  description:
    "Writes technical deep-dives for developer tools and makes short-form UGC videos for tech, SaaS and AI products.",
  knowsAbout: [
    "Technical writing",
    "Developer marketing",
    "User-generated content (UGC)",
    "AI tools",
    "Developer tools",
    "SaaS marketing",
  ],
  sameAs: [LINKS.instagram, LINKS.linkedin, LINKS.x, LINKS.github],
};

export const siteSchema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebSite",
      "@id": WEBSITE_ID,
      url: BASE_URL,
      name: SITE.name,
      description: SITE.description,
      publisher: { "@id": PERSON_ID },
      inLanguage: "en",
    },
    personSchema,
  ],
};

export function jsonLd(data: unknown) {
  return { __html: JSON.stringify(data).replace(/</g, "\\u003c") };
}
