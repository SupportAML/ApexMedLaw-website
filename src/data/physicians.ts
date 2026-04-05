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
  {
    id: '3',
    slug: 'michael-chen',
    name: 'Michael Chen, MD, PhD',
    credentials: 'MD, PhD, Board-Certified Neurosurgeon',
    specialty: 'Neurosurgery',
    subspecialties: ['Spine Surgery', 'Neuro-Oncology'],
    boardCertifications: ['American Board of Neurological Surgery'],
    yearsExperience: 18,
    caseCount: 120,
    availability: 'limited',
    location: { city: 'Houston', state: 'TX' },
    statesLicensed: ['TX', 'CA', 'FL', 'NY', 'IL', 'OH', 'PA'],
    bio: 'Dr. Chen is a board-certified neurosurgeon with subspecialty training in spine surgery and neuro-oncology. With over 18 years of surgical experience and 120+ legal cases, he provides expert testimony on surgical timing, operative technique, post-surgical complications, and standard of care in complex neurosurgical cases.',
    caseTypes: ['Medical Malpractice', 'Personal Injury', 'Product Liability'],
  },
  {
    id: '4',
    slug: 'sarah-rodriguez',
    name: 'Sarah Rodriguez, MD',
    credentials: 'MD, Board-Certified Gastroenterologist',
    specialty: 'Gastroenterology',
    subspecialties: ['Hepatology', 'Advanced Endoscopy'],
    boardCertifications: ['American Board of Internal Medicine — Gastroenterology', 'American Board of Internal Medicine — Internal Medicine'],
    yearsExperience: 14,
    caseCount: 45,
    availability: 'available',
    location: { city: 'Atlanta', state: 'GA' },
    statesLicensed: ['GA', 'FL', 'NC', 'SC', 'TN', 'AL'],
    bio: 'Dr. Rodriguez is a board-certified gastroenterologist specializing in hepatology and advanced endoscopy. She provides expert analysis in cases involving missed diagnoses of GI malignancies, endoscopic complications, liver disease management, and inflammatory bowel disease treatment standards.',
    caseTypes: ['Medical Malpractice', 'Personal Injury'],
  },
  {
    id: '5',
    slug: 'james-park',
    name: 'James Park, MD',
    credentials: 'MD, Board-Certified in Pain Medicine & Anesthesiology',
    specialty: 'Anesthesiology & Pain Medicine',
    subspecialties: ['Interventional Pain Management', 'Neuromodulation'],
    boardCertifications: ['American Board of Anesthesiology', 'American Board of Anesthesiology — Pain Medicine'],
    yearsExperience: 12,
    caseCount: 60,
    availability: 'available',
    location: { city: 'Los Angeles', state: 'CA' },
    statesLicensed: ['CA', 'NV', 'AZ', 'OR', 'WA'],
    bio: 'Dr. Park is board-certified in both anesthesiology and pain medicine with subspecialty expertise in interventional pain management. He provides expert testimony in cases involving anesthesia complications, epidural injection injuries, chronic pain management standards, and opioid prescribing practices.',
    caseTypes: ['Medical Malpractice', 'Personal Injury', 'Workers\' Compensation', 'Product Liability'],
  },
  {
    id: '6',
    slug: 'linda-thompson',
    name: 'Linda Thompson, MD',
    credentials: 'MD, Board-Certified Neuroradiologist',
    specialty: 'Radiology & Neuroradiology',
    subspecialties: ['Neuroradiology', 'Diagnostic Radiology'],
    boardCertifications: ['American Board of Radiology — Diagnostic Radiology', 'American Board of Radiology — Neuroradiology (CAQ)'],
    yearsExperience: 20,
    caseCount: 200,
    availability: 'available',
    location: { city: 'Chicago', state: 'IL' },
    statesLicensed: ['IL', 'IN', 'WI', 'MI', 'OH', 'MN', 'NY'],
    bio: 'Dr. Thompson is a board-certified neuroradiologist with 20 years of experience interpreting brain and spine imaging. She has reviewed over 200 legal cases focusing on missed findings on CT, MRI, and angiography, delayed stroke diagnosis, and imaging standard of care in trauma and tumor cases.',
    caseTypes: ['Medical Malpractice', 'Personal Injury'],
  },
  {
    id: '7',
    slug: 'david-williams',
    name: 'David Williams, DO',
    credentials: 'DO, Board-Certified in PM&R',
    specialty: 'Physical Medicine & Rehabilitation',
    subspecialties: ['Brain Injury Medicine', 'Spinal Cord Injury Medicine'],
    boardCertifications: ['American Board of Physical Medicine & Rehabilitation', 'ABPM&R — Brain Injury Medicine (CAQ)'],
    yearsExperience: 15,
    caseCount: 80,
    availability: 'limited',
    location: { city: 'Philadelphia', state: 'PA' },
    statesLicensed: ['PA', 'NJ', 'DE', 'NY', 'MD', 'CT'],
    bio: 'Dr. Williams is a board-certified physiatrist with added qualifications in brain injury medicine. He specializes in functional outcomes assessment, life care planning, disability evaluation, and rehabilitation standard of care in TBI and spinal cord injury cases.',
    caseTypes: ['Medical Malpractice', 'Personal Injury', 'Workers\' Compensation', 'IME (Independent Medical Examination)'],
  },
  {
    id: '8',
    slug: 'priya-patel',
    name: 'Priya Patel, MD',
    credentials: 'MD, Board-Certified Internist & Hospitalist',
    specialty: 'Internal Medicine',
    subspecialties: ['Hospital Medicine', 'Geriatric Medicine'],
    boardCertifications: ['American Board of Internal Medicine'],
    yearsExperience: 11,
    caseCount: 40,
    availability: 'available',
    location: { city: 'Miami', state: 'FL' },
    statesLicensed: ['FL', 'GA', 'NY', 'NJ', 'TX'],
    bio: 'Dr. Patel is a board-certified internist and hospitalist with extensive experience in inpatient medicine, diagnostic workup, and management of complex medical conditions. She provides expert opinions on diagnostic delay, medication errors, hospital-acquired infections, and falls prevention.',
    caseTypes: ['Medical Malpractice', 'Personal Injury', 'Workers\' Compensation'],
  },
];
