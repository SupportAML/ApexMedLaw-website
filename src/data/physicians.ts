export interface Physician {
  id: string;
  slug: string;
  name: string;
  role: string;
  title: string;
  photo: string;
  bio: string;
  credentials: string[];
  location: string;
  categories: string[];
  featured?: boolean;
}

export const SPECIALTIES = [
  { slug: 'neurology', name: 'Neurology' },
  { slug: 'neurosurgery', name: 'Neurosurgery' },
  { slug: 'pediatric-neurology', name: 'Pediatric Neurology' },
  { slug: 'internal-medicine', name: 'Internal Medicine' },
  { slug: 'gastroenterology', name: 'Gastroenterology' },
  { slug: 'critical-care', name: 'Critical Care' },
  { slug: 'anesthesiology', name: 'Anesthesiology' },
  { slug: 'radiology', name: 'Radiology' },
  { slug: 'physical-medicine-rehabilitation', name: 'Physical Medicine and Rehabilitation' },
  { slug: 'pharmacy', name: 'Pharmacy' },
] as const;

export type SpecialtySlug = (typeof SPECIALTIES)[number]['slug'];

export const US_STATES = [
  'AL','AK','AZ','AR','CA','CO','CT','DE','FL','GA',
  'HI','ID','IL','IN','IA','KS','KY','LA','ME','MD',
  'MA','MI','MN','MS','MO','MT','NE','NV','NH','NJ',
  'NM','NY','NC','ND','OH','OK','OR','PA','RI','SC',
  'SD','TN','TX','UT','VT','VA','WA','WV','WI','WY','DC',
] as const;

export const CASE_TYPE_OPTIONS = [
  'Medical Malpractice',
  'Personal Injury',
  'IME (Independent Medical Examination)',
  'Workers\' Compensation',
  'Product Liability',
  'Criminal',
] as const;

export const physicians: Physician[] = [
  {
    id: '1',
    slug: 'abhi-kapuria',
    name: 'Abhi Kapuria, MD',
    role: 'Neurologist',
    title: 'CEO',
    photo: '/team_kapuria.png',
    bio: `Dr. Kapuria is a double board-certified neurologist in general neurology and clinical neurophysiology/epilepsy. He completed his residency and fellowship training at Duke University after completing medical school at Emory. His bachelor's degree is in Cognitive Neuroscience from Washington University in St. Louis.

He is uniquely qualified to provide expert witness testimony and consultations on a wide range of neurological disorders with research on topics related to epilepsy and neurophysiology in peer-reviewed journals. He is also currently a director for graduate medical education and physician development.

His expertise ranges from emergency medicine to ICU-level care including advanced techniques used for diagnosis, treatment, and prognostication.`,
    credentials: ['Duke University Fellowship', 'Emory Medical School', 'Double Board Certified'],
    location: 'North Carolina',
    categories: ['neurology'],
    featured: true,
  },
  {
    id: '2',
    slug: 'ovais-inamullah',
    name: 'Ovais Inamullah, MD',
    role: 'Neurologist',
    title: 'CMO',
    photo: '/team_inamullah.png',
    bio: `Dr. Inamullah is a double board-certified vascular neuro-hospitalist with legal expertise and numerous grant, research, and writing awards. He completed his post-graduate training at Duke University.

He has extensive experience in managing patients with acute neurological emergencies, including stroke, hemorrhage, seizures, head injury, migraine, neuroinflammation, and spinal cord issues.

His legal expertise allows him to better understand patients' rights and ensure that they are fully informed about their treatment options. His research and writing awards demonstrate his commitment to advancing the field of neurology.`,
    credentials: ['Duke University Training', 'Double Board Certified', 'Vascular Neurology'],
    location: 'North Carolina',
    categories: ['neurology'],
    featured: true,
  },
  {
    id: '3',
    slug: 'jordan-newmark',
    name: 'Jordan Newmark, MD QME',
    role: 'Anesthesiologist',
    title: 'Ancillary Physician Partner for IME',
    photo: '/team_newmark.png',
    bio: `Dr. Newmark is an ABA, double board certified Anesthesiologist and Pain Medicine Physician with 10 years of medicolegal experience. He is President & CEO of E&S Newmark Consulting and remains an Adjunct Clinical Associate Professor at Stanford University. He has authored multiple journal articles and book chapters with numerous awards from the American Academy of Pain Medicine, Stanford University, and Alameda Health System.

Dr. Newmark received his MD from Temple University (Katz) School of Medicine, completed an internal medicine internship at Drexel, anesthesiology residency at Harvard Medical School/Massachusetts General Hospital, and pain medicine fellowship at Stanford University where he served as Chief Fellow. He performs qualified medical evaluations (QME) and independent medical evaluations (IME) within California, utilizing the AMA Guides 5th edition.`,
    credentials: ['QME Certified', 'Stanford Fellowship', 'Harvard/MGH Residency'],
    location: 'California',
    categories: ['anesthesiology'],
  },
  {
    id: '4',
    slug: 'laura-caligiuri',
    name: 'Laura Caligiuri, MD',
    role: 'Pediatric Neurologist',
    title: 'Ancillary Physician Partner',
    photo: '/team_caligiuri.png',
    bio: `Dr. Laura Caligiuri completed her Neurocritical Care Fellowship at Lurie Children's Hospital in Chicago, following a Child Neurology Residency at Duke University. She earned her M.D. from Lewis Katz SOM at Temple University and a B.S. in Neuroscience with magna cum laude honors from The College of William and Mary. She is ABPN Board Certified in Child Neurology and licensed across multiple states, with numerous awards, scholarly contributions, and leadership roles in pediatric neurology.`,
    credentials: ['Duke Residency', 'Lurie Fellowship', 'ABPN Certified'],
    location: 'Multiple States',
    categories: ['pediatric-neurology'],
  },
  {
    id: '5',
    slug: 'gene-weinstein',
    name: 'Gene Weinstein, MD',
    role: 'Neuroradiologist',
    title: 'Ancillary Physician Partner',
    photo: '/team_weinstein.png',
    bio: `Dr. Weinstein is a double-board certified radiologist in diagnostic radiology and neuroradiology. He obtained a bachelor's degree with honors in neurobiology and behavior from Cornell University and his medical degree from Tufts University. He completed his diagnostic radiology training at Tufts Medical Center, where he served as chief resident, and his neuroradiology fellowship at Massachusetts General Hospital/Harvard Medical School. He is currently a neuroradiologist at Mass General Brigham in Boston, with expertise in stroke, hemorrhage, traumatic injury, cancer, and degenerative spine conditions.`,
    credentials: ['MGH/Harvard Fellowship', 'Double Board Certified', 'Tufts Chief Resident'],
    location: 'Massachusetts',
    categories: ['radiology'],
  },
  {
    id: '6',
    slug: 'justin-shafa',
    name: 'Justin Shafa, MD',
    role: 'Radiology and Neuroradiology',
    title: 'Ancillary Physician Partner',
    photo: '/team_shafa.png',
    bio: `Dr. Shafa graduated from The George Washington University's 7-year accelerated B.A./M.D. program in 2016. He completed a surgical internship at UCLA, a 4-year radiology residency at Jacobi Medical Center/Albert Einstein College of Medicine in New York, and a neuroradiology fellowship at Cedars Sinai in Los Angeles, with advanced expertise in diagnosing and treating CSF leaks. He has contributed through on-site and teleradiology roles across Los Angeles, San Diego, and New York.`,
    credentials: ['Cedars Sinai Fellowship', 'Einstein Residency', 'GWU Medical School'],
    location: 'California / New York',
    categories: ['radiology'],
  },
  {
    id: '7',
    slug: 'arjun-ramesh',
    name: 'Arjun Ramesh, MD',
    role: 'Anesthesiology and Pain Medicine',
    title: 'Ancillary Physician Partner',
    photo: '/team_ramesh.png',
    bio: `Dr. Ramesh is a board-certified physician specializing in anesthesiology and pain medicine. He trained at Rush University Medical Center in Chicago for anesthesiology and completed his pain medicine fellowship at the Cleveland Clinic in Ohio. His education began at the University of Virginia for both medical school and undergraduate studies. He offers expert witness testimony and consultation in anesthesiology and pain medicine and has authored several papers in peer-reviewed journals and book chapters.`,
    credentials: ['Cleveland Clinic Fellowship', 'Rush University Residency', 'UVA Medical School'],
    location: 'Illinois',
    categories: ['anesthesiology'],
  },
  {
    id: '8',
    slug: 'ahmad-elakil',
    name: 'Ahmad Elakil, MD, MBA, FRCSC',
    role: 'Neurosurgeon',
    title: 'Ancillary Physician Partner',
    photo: '/team_elakil.png',
    bio: `Dr. Ahmad Elakil is the chief of the division of neurosurgery at Insight Hospital and Medical Center in Chicago, IL. He is a board-certified neurosurgeon who completed his neurosurgical residency at the University of Calgary and postgraduate training at the University of Miami. During his residency, he completed his MBA at Cornell University. He is expert in traumatic brain injury, spinal injury, spine surgery, cervical surgery, lumbar fusion, craniotomy, and spinal cord injury. Dr. Elakil has been cited in prestigious national and international neurosurgical journals and has received more than twenty awards at national and international neurosurgical meetings.`,
    credentials: ['Cornell MBA', 'University of Calgary Residency', 'Board Certified Neurosurgeon'],
    location: 'Illinois',
    categories: ['neurosurgery'],
  },
  {
    id: '9',
    slug: 'jung-hyun-ko',
    name: 'Jung Hyun Ko, MD, MPH',
    role: 'Neurologist',
    title: 'Ancillary Physician Partner',
    photo: '/team_ko.png',
    bio: `Dr. Jung Hyun Ko is a board-certified neurologist currently practicing at ECU Health in Greenville, North Carolina. He holds both an MD and an MPH from the University of North Carolina at Chapel Hill and completed his residency and fellowship training in neurology and clinical neurophysiology at Duke University. Specializing in epilepsy, Dr. Ko is deeply committed to utilizing machine learning and advanced technology to improve epilepsy care. He is fluent in both English and Korean and has contributed to clinical trials and research in neurology.`,
    credentials: ['Duke Fellowship', 'UNC Chapel Hill', 'MPH'],
    location: 'North Carolina',
    categories: ['neurology'],
  },
  {
    id: '10',
    slug: 'jorge-torres',
    name: 'Jorge Torres, MD',
    role: 'Neurologist Physician Scientist',
    title: 'Ancillary Physician Partner',
    photo: '/team_torres.png',
    bio: `Dr. Torres is a Harvard-trained, board-certified neurologist and leader in clinical neurology and advanced therapeutic development. He has dual fellowship training in the Harvard Multiple Sclerosis and Neuroimmunology Fellowship at MGH and Brigham and Women's Hospital. He was awarded the Sylvia Lawry Fellowship from the National MS Society and the AAN Minority Scholar of the Year Award. He earned his medical degree from UCLA and completed his neurology residency in the combined MGH/BWH/Harvard Medical School program. He has served as an investigator for numerous NIH and industry-sponsored clinical trials and actively practices across multiple states.`,
    credentials: ['Harvard Trained', 'MGH Fellowship', 'MS Specialist'],
    location: 'Massachusetts',
    categories: ['neurology'],
  },
  {
    id: '11',
    slug: 'cecilia-fernandes',
    name: 'Cecilia Fernandes, MD',
    role: 'Pediatric Neurologist',
    title: 'Ancillary Physician Partner',
    photo: '/team_fernandes.png',
    bio: `Dr. Cecilia Fernandes is a Pediatric Neurologist with extensive experience in clinical care, medical education, and leadership. She is currently an Attending Pediatric Neurologist at Atrium Health/Levine Children's Hospital in Charlotte, NC, and an Assistant Professor of Pediatrics at Wake Forest University. She previously served as Medical Director of the Epilepsy Monitoring Unit at Prisma Health Children's Hospital and completed her Child Neurology residency and fellowship at Duke University Hospital.`,
    credentials: ['Duke Residency & Fellowship', 'Wake Forest Faculty', 'Epilepsy Monitoring'],
    location: 'North Carolina',
    categories: ['pediatric-neurology'],
  },
  {
    id: '12',
    slug: 'ellia-ciammaichella',
    name: 'Ellia Ciammaichella, DO, JD, FCLM',
    role: 'Physical Medicine and Rehabilitation',
    title: 'Ancillary Physician Partner',
    photo: '/team_ciammaichella.png',
    bio: `Dr. Ciammaichella is triple board certified in physical medicine and rehabilitation, spinal cord injury medicine, and brain injury medicine. Her combination of legal and medical expertise provides a unique perspective on complications of injuries and anticipated quality of life after SCI, brain injury, and stroke. She completed her PM&R residency at the University of Texas at Houston with significant time at TIRR, and a spinal cord injury fellowship at the University of Utah Craig H. Neilsen Rehabilitation Hospital. She is a clinical assistant professor at the University of Nevada, Reno, School of Medicine.`,
    credentials: ['Triple Board Certified', 'TIRR Training', 'SCI Fellowship Utah'],
    location: 'Nevada',
    categories: ['physical-medicine-rehabilitation'],
  },
  {
    id: '13',
    slug: 'sima-patel',
    name: 'Sima Patel, MD',
    role: 'Neurologist',
    title: 'Ancillary Physician Partner',
    photo: '/team_patel.png',
    bio: `Dr. Sima Patel is double board-certified in Neurology and Epilepsy by the American Board of Psychiatry and Neurology. She earned her medical degree from Rush Medical College, completed her neurology residency at the Medical College of Wisconsin, and pursued fellowship training in Clinical Neurophysiology and Epilepsy at the Cleveland Clinic. With over fifteen years of experience in epilepsy care, she developed the ROAR Seizure Behavioral Testing Protocol. She serves on the Board of Directors for the Epilepsy Foundation of Minnesota and is a Fellow of the American Epilepsy Society and the American Neurological Association.`,
    credentials: ['Cleveland Clinic', 'Double Board Certified', 'FAES, FANA'],
    location: 'Minnesota',
    categories: ['neurology'],
  },
  {
    id: '14',
    slug: 'ravi-shah',
    name: 'Ravi Shah, MD',
    role: 'Internal Medicine and Gastroenterologist',
    title: 'Ancillary Physician Partner',
    photo: '/team_ravi_shah.png',
    bio: `Dr. Ravi Shah is a board-certified internal medicine physician and fellowship-trained gastroenterologist, currently Assistant Professor of Gastroenterology at Atrium Wake Forest Baptist Hospital in North Carolina. He provides expert witness services in medical malpractice cases involving gastrointestinal diseases, procedural complications, delayed diagnosis, and improper management of complex GI conditions. He has specialized expertise in IBD, Crohn's disease, ulcerative colitis, GI bleeding, and colon cancer. Dr. Shah completed his residency and fellowship at the Cleveland Clinic and has authored over 25 peer-reviewed publications.`,
    credentials: ['Cleveland Clinic Fellowship', 'Board Certified GI', 'Wake Forest Faculty'],
    location: 'North Carolina',
    categories: ['gastroenterology', 'internal-medicine'],
  },
  {
    id: '15',
    slug: 'jhanvi-shah',
    name: 'Jhanvi Shah, Pharm.D, BCPS, BCCCP',
    role: 'Pharmacotherapy Specialist',
    title: 'Ancillary Physician Partner',
    photo: '/team_jhanvi_shah.png',
    bio: `Dr. Jhanvi Shah is a board-certified pharmacotherapy specialist and board-certified critical care pharmacist with over eight years of clinical experience in hospital, ICU, and emergency medicine settings. She currently serves as a Critical Care Pharmacist at Northwestern Palos Hospital. Her expertise spans pharmacy malpractice, medication error, drug overdose, adverse drug reactions, improper dosing, and delayed administration of critical medications. She regularly provides expert reviews for cases involving opioid prescribing, anticoagulant errors, insulin overdoses, and breaches in pharmacy standard of care. She is licensed in Illinois and maintains ACLS and PALS certifications.`,
    credentials: ['BCPS', 'BCCCP', 'Critical Care Pharmacy'],
    location: 'Illinois',
    categories: ['pharmacy'],
  },
  {
    id: '16',
    slug: 'colleen-marie-stack',
    name: 'Colleen Marie Stack, MD',
    role: 'Neurologist',
    title: 'Ancillary Physician Partner',
    photo: '/team_stack.png',
    bio: `Dr. Colleen Marie Stack is a board-certified neurologist and clinical neurophysiologist. She serves as a Neurohospitalist at Cone Health System in Greensboro, NC, managing inpatient neurologic emergencies, neurocritical care, and telestroke services. She earned her MD from Duke University School of Medicine, followed by internship, residency in neurology, and fellowship in clinical neurophysiology (epilepsy and EEG) at Duke University Medical Center. She also holds an MBA in Health Sector Management from Duke's Fuqua School of Business. She has presented at national and international conferences and serves as a consultant and expert witness in neurology-related cases.`,
    credentials: ['Duke Medical School', 'Clinical Neurophysiology', 'ACN, AES'],
    location: 'North Carolina',
    categories: ['neurology'],
  },
  {
    id: '17',
    slug: 'maarij-baig',
    name: 'Maarij Baig, DO, MS',
    role: 'Critical Care Medicine / Internal Medicine',
    title: 'Ancillary Physician Partner',
    photo: '/team_baig.png',
    bio: `Dr. Maarij Baig is double board-certified in Critical Care Medicine and Internal Medicine by the American Board of Internal Medicine. He currently serves as an Intensivist and ICU Assistant Medical Director at MedStar Southern Maryland Hospital Center. He earned his DO and MS in Biomedical Sciences from the Philadelphia College of Osteopathic Medicine and completed his residency in Internal Medicine at Inspira Medical Center in New Jersey, where he served as Chief Medicine Resident, followed by fellowship in Critical Care Medicine at Rutgers New Jersey Medical School. He has authored publications in CHEST and Critical Care Medicine.`,
    credentials: ['Double Board Certified', 'Rutgers Critical Care Fellowship', 'Chief Resident'],
    location: 'Maryland',
    categories: ['critical-care', 'internal-medicine'],
  },
  {
    id: '18',
    slug: 'jay-yasen',
    name: 'Jay Yasen, MD',
    role: 'Neurologist',
    title: 'Ancillary Physician Partner',
    photo: '/team_yasen.png',
    bio: `Dr. Jay Yasen is a board-certified vascular neurologist and neurocritical care specialist with more than 25 years of experience. He currently serves as Assistant Attending in Neurology and Director of Neurology Education at New York-Presbyterian Queens, and is an Assistant Professor of Clinical Neurology at Weill Cornell Medical College. He completed his neurology residency at Albert Einstein College of Medicine and a fellowship in Stroke and Neurocritical Care at Beth Israel Medical Center in New York City. He is board certified in Neurology, Vascular Neurology, and Neurocritical Care. He has been named a New York Magazine "Top Doctor" and has contributed to numerous NIH- and industry-funded multicenter stroke trials.`,
    credentials: ['Vascular Neurology', 'Neurocritical Care', 'Weill Cornell Faculty'],
    location: 'New York',
    categories: ['neurology'],
  },
  {
    id: '19',
    slug: 'santoshi-billakota',
    name: 'Santoshi Billakota, MD',
    role: 'Neurologist',
    title: 'Ancillary Physician Partner',
    photo: '/team_billakota.png',
    bio: `Dr. Santoshi Billakota is a board-certified neurologist with expertise in epilepsy, traumatic brain injury, post-traumatic epilepsy, stroke, and complex neurological disorders. She is experienced in EEG interpretation and the evaluation of neurological injury and disease. She currently serves as an attending neurologist and epileptologist at Wyckoff Hospital Center and Queens Hospital Center in New York, and as a neurohospitalist and tele-neurologist with Vituity Healthcare in California. She has held appointments at NYU Langone's Comprehensive Epilepsy Center, Columbia University, and Bellevue Medical Center. She conducts IMEs and disability reviews and is board certified in Neurology, Clinical Neurophysiology, and Epilepsy.`,
    credentials: ['Epilepsy Certified', 'NYU Langone', 'Multiple State Licenses'],
    location: 'New York / California',
    categories: ['neurology'],
  },
  {
    id: '20',
    slug: 'franklyn-rocha-cabrero',
    name: 'Franklyn Rocha-Cabrero, MD',
    role: 'Neurologist',
    title: 'Ancillary Physician Partner',
    photo: '/team_rocha_cabrero.png',
    bio: `Dr. Franklyn Rocha-Cabrero is a board-certified neurologist with subspecialty training in clinical neurophysiology. He completed his Adult Neurology residency at the University of Miami/Jackson Memorial Hospital and a Clinical Neurophysiology fellowship at the University of California, Irvine. He is board certified by the American Board of Psychiatry and Neurology in both Neurology and Clinical Neurophysiology. He has extensive experience in epilepsy, seizure disorders, EEG interpretation, and neurodiagnostic testing. He has authored peer-reviewed publications and medical reference texts and provides objective, evidence-based medical record review and expert opinions for neurologic litigation.`,
    credentials: ['UC Irvine Fellowship', 'Double Board Certified', 'Clinical Neurophysiology'],
    location: 'California',
    categories: ['neurology'],
  },
];

export function getPhysicianBySlug(slug: string): Physician | undefined {
  return physicians.find((p) => p.slug === slug);
}

export function getPhysiciansBySpecialty(specialtySlug: string): Physician[] {
  return physicians.filter((p) => p.categories.includes(specialtySlug));
}

export function getSpecialtyName(slug: string): string | undefined {
  return SPECIALTIES.find((s) => s.slug === slug)?.name;
}
