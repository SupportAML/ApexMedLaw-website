export interface Physician {
  id: string;
  slug: string;
  name: string;
  credentials: string;
  specialty: string;
  subspecialties: string[];
  boardCertifications: string[];
  yearsExperience: number;
  caseCount: number;
  availability: 'available' | 'limited' | 'unavailable';
  location: { city: string; state: string };
  statesLicensed: string[];
  bio: string;
  caseTypes: string[];
  featured?: boolean;
}

export const SPECIALTIES = [
  'Neurology',
  'Neurosurgery',
  'Critical Care Medicine',
  'Gastroenterology',
  'Anesthesiology & Pain Medicine',
  'Radiology & Neuroradiology',
  'Physical Medicine & Rehabilitation',
  'Internal Medicine',
] as const;

export const CASE_TYPE_OPTIONS = [
  'Medical Malpractice',
  'Personal Injury',
  'IME (Independent Medical Examination)',
  'Workers\' Compensation',
  'Product Liability',
  'Criminal',
] as const;

export const US_STATES = [
  'AL','AK','AZ','AR','CA','CO','CT','DE','FL','GA',
  'HI','ID','IL','IN','IA','KS','KY','LA','ME','MD',
  'MA','MI','MN','MS','MO','MT','NE','NV','NH','NJ',
  'NM','NY','NC','ND','OH','OK','OR','PA','RI','SC',
  'SD','TN','TX','UT','VT','VA','WA','WV','WI','WY','DC',
] as const;

export const physicians: Physician[] = [
  {
    id: '1',
    slug: 'abhi-kapuria',
    name: 'Abhi Kapuria, MD',
    credentials: 'MD, Board-Certified Neurologist',
    specialty: 'Neurology',
    subspecialties: ['Clinical Neurophysiology', 'Headache Medicine', 'Neuromuscular Medicine'],
    boardCertifications: ['American Board of Psychiatry and Neurology — Neurology'],
    yearsExperience: 8,
    caseCount: 50,
    availability: 'available',
    location: { city: 'Raleigh', state: 'NC' },
    statesLicensed: ['NC', 'TX', 'GA', 'FL', 'NY', 'CA'],
    bio: 'Dr. Kapuria is a board-certified neurologist and the founder of ApexMedLaw and Neurology Legal Consulting. He maintains an active telemedicine neurology practice while providing expert witness services in TBI, stroke, seizure disorders, and neuromuscular disease litigation. His dual clinical-legal expertise enables him to translate complex neurological findings into clear, defensible testimony.',
    caseTypes: ['Medical Malpractice', 'Personal Injury', 'IME (Independent Medical Examination)', 'Workers\' Compensation'],
    featured: true,
  },
  {
    id: '2',
    slug: 'ovais-inamullah',
    name: 'Ovais Inamullah, MD',
    credentials: 'MD, Board-Certified in Critical Care & Internal Medicine',
    specialty: 'Critical Care Medicine',
    subspecialties: ['Pulmonary Medicine', 'Internal Medicine'],
    boardCertifications: ['American Board of Internal Medicine — Critical Care Medicine', 'American Board of Internal Medicine — Internal Medicine'],
    yearsExperience: 10,
    caseCount: 35,
    availability: 'available',
    location: { city: 'Dallas', state: 'TX' },
    statesLicensed: ['TX', 'NY', 'CA', 'FL', 'IL'],
    bio: 'Dr. Inamullah is a board-certified critical care and internal medicine physician serving as CMO of ApexMedLaw. With extensive ICU experience, he specializes in cases involving ventilator management, sepsis protocols, ICU standard of care, and wrongful death claims related to critical care. His systematic approach to case review ensures thorough, evidence-based expert opinions.',
    caseTypes: ['Medical Malpractice', 'Personal Injury', 'Workers\' Compensation'],
    featured: true,
  },
];
