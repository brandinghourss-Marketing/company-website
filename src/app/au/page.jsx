import CountryLanding from "@/Components/Country/CountryLanding";
import { getCountry, countryMetadata, countrySchemas } from "@/lib/seo";

const CODE = "au";

export const metadata = countryMetadata(CODE);

export default function AUPage() {
  const data = getCountry(CODE);
  const schemas = countrySchemas(CODE);
  return (
    <>
      {schemas.map((schema, i) => (
        <script
          key={i}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      ))}
      <CountryLanding data={data} />
    </>
  );
}
