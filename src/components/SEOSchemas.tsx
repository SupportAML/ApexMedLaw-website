import { Helmet } from 'react-helmet-async';

const BASE_URL = 'https://www.apexmedlaw.com';

/** JSON-LD for a division page (MedicalSpecialty + Service). */
export function DivisionSchema({
  name,
  description,
  slug,
}: {
  name: string;
  description: string;
  slug: string;
}) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: `${name} Expert Witness Services`,
    description,
    url: `${BASE_URL}/divisions/${slug}`,
    serviceType: `${name} Medical-Legal Expert Witness Consulting`,
    areaServed: 'US',
    provider: {
      '@type': 'ProfessionalService',
      name: 'ApexMedLaw',
      url: BASE_URL,
    },
  };

  return (
    <Helmet>
      <script type="application/ld+json">{JSON.stringify(schema)}</script>
    </Helmet>
  );
}

/** JSON-LD for a physician profile page (Physician). */
export function PhysicianSchema({
  name,
  role,
  bio,
  location,
  credentials,
  slug,
}: {
  name: string;
  role: string;
  bio: string;
  location: string;
  credentials: string[];
  slug: string;
}) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Physician',
    name,
    jobTitle: role,
    description: bio.split(/(?<=[.!?])\s+/)[0]?.trim() ?? bio.slice(0, 200),
    url: `${BASE_URL}/experts/${slug}`,
    areaServed: location,
    hasCredential: credentials,
    affiliation: {
      '@type': 'Organization',
      name: 'ApexMedLaw',
      url: BASE_URL,
    },
  };

  return (
    <Helmet>
      <script type="application/ld+json">{JSON.stringify(schema)}</script>
    </Helmet>
  );
}
