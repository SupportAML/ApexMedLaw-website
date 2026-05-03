export interface Division {
  slug: string;
  name: string;
  tagline: string;
  description: string;
  practiceAreas: { title: string; description: string }[];
  externalUrl?: string;
  comingSoon?: boolean;
}

export const divisions: Division[] = [
  {
    slug: 'neurology',
    name: 'Neurology',
    tagline: 'Expert witness testimony for traumatic brain injury, stroke, seizures, and neurological conditions',
    description: 'Our neurology division provides board-certified neurologists with specialized expertise in TBI litigation, stroke cases, spinal cord injuries, seizure disorders, and neuromuscular disease. We maintain active clinical practices while delivering authoritative expert testimony and case reviews.',
    practiceAreas: [
      {
        title: 'TBI & Concussion',
        description: 'Traumatic brain injury assessment, chronic traumatic encephalopathy (CTE) evaluation, and post-concussive syndrome standard of care analysis.'
      },
      {
        title: 'Stroke & Cerebrovascular',
        description: 'Acute stroke management, thrombolytic therapy decisions, posterior circulation stroke diagnosis, and delayed presentation claims.'
      },
      {
        title: 'Spinal Cord Injury',
        description: 'Acute and chronic spinal cord injury management, surgical timing decisions, and rehabilitation standard of care.'
      },
      {
        title: 'Seizure Disorders',
        description: 'Epilepsy diagnosis and management, seizure classification, antiepileptic drug selection, and status epilepticus standard of care.'
      },
      {
        title: 'Neuromuscular Disease',
        description: 'Diagnosis of myasthenia gravis, muscular dystrophy, ALS, and other neuromuscular conditions with focus on diagnostic delay.'
      },
      {
        title: 'Chronic Pain & Neuropathy',
        description: 'Peripheral neuropathy diagnosis, chronic pain management standards, and medication management in complex cases.'
      }
    ],
    externalUrl: 'https://www.neurolegalconsulting.com'
  },
  {
    slug: 'neurosurgery',
    name: 'Neurosurgery',
    tagline: 'Surgical expertise for cranial, spinal, and neurosurgical malpractice litigation',
    description: 'Our neurosurgery division features board-certified neurosurgeons with deep experience in cranial and spinal surgery. Our experts provide expert testimony on traumatic brain injury, spine procedures, surgical complications, and standard of care issues across the full spectrum of neurosurgical practice.',
    practiceAreas: [
      {
        title: 'Traumatic Brain Injury',
        description: 'Neurosurgical management of acute TBI, decompressive craniectomy decisions, and ICP monitoring standard of care.'
      },
      {
        title: 'Spine Surgery',
        description: 'Cervical (ACDF), lumbar fusion (TLIF, XLIF), and thoracic procedures — surgical indications, technique, and complication analysis.'
      },
      {
        title: 'Spinal Cord Injury',
        description: 'Acute spinal cord injury surgical management, timing decisions, and post-operative care standards.'
      },
      {
        title: 'Craniotomy & Tumor Resection',
        description: 'Cranial procedures for tumor, aneurysm, and intracranial hemorrhage with focus on surgical decision-making.'
      },
      {
        title: 'Disc Herniation & Nerve Compression',
        description: 'Conservative vs. surgical management decisions, indications for intervention, and outcomes analysis.'
      },
      {
        title: 'Spinal Trauma & Abscess',
        description: 'Emergency surgical management of spinal trauma, infection, and post-operative complications.'
      }
    ],
  },
  {
    slug: 'pediatric-neurology',
    name: 'Pediatric Neurology',
    tagline: 'Child neurology expertise for pediatric brain injury, epilepsy, and developmental cases',
    description: 'Our pediatric neurology division features ABPN-certified child neurologists with specialized fellowship training in neurocritical care and epilepsy. Our experts provide testimony on neonatal neurologic injury, pediatric epilepsy, developmental delay, and child neurological emergencies.',
    practiceAreas: [
      {
        title: 'Neonatal Brain Injury',
        description: 'Hypoxic-ischemic encephalopathy (HIE), neonatal stroke, and birth-related neurologic injury standard of care.'
      },
      {
        title: 'Pediatric Epilepsy',
        description: 'Childhood seizure disorders, epileptic encephalopathies, antiseizure medication management, and surgical evaluation.'
      },
      {
        title: 'Pediatric Stroke',
        description: 'Arterial ischemic stroke, sinus venous thrombosis, and pediatric cerebrovascular disease management.'
      },
      {
        title: 'Developmental Delay',
        description: 'Diagnostic work-up for developmental delay, autism spectrum, and neurodevelopmental disorders.'
      },
      {
        title: 'Pediatric Neurocritical Care',
        description: 'PICU neurologic management, status epilepticus, intracranial pressure, and acute encephalopathy.'
      },
      {
        title: 'Concussion in Children',
        description: 'Pediatric mild TBI assessment, return-to-play decisions, and post-concussive management standards.'
      }
    ],
  },
  {
    slug: 'internal-medicine',
    name: 'Internal Medicine',
    tagline: 'Hospitalist and IM expertise for inpatient care, diagnostic delay, and standard of care litigation',
    description: 'Our internal medicine division features board-certified internists and hospitalists with extensive inpatient and outpatient experience. Our experts provide testimony on diagnostic delay, hospital-based negligence, medication errors, and complex medical decision-making across multi-system disease.',
    practiceAreas: [
      {
        title: 'Diagnostic Delay',
        description: 'Failure to diagnose and timely workup of common and complex internal medicine conditions.'
      },
      {
        title: 'Inpatient Standard of Care',
        description: 'Hospital protocols, admission decisions, escalation of care, and hospitalist standard of care.'
      },
      {
        title: 'Medication Errors',
        description: 'Drug administration errors, polypharmacy management, and adverse drug interaction analysis.'
      },
      {
        title: 'Wrongful Death',
        description: 'Cause of death analysis, preventability assessments, and clinical decision-making review.'
      },
      {
        title: 'Hospital-Based Negligence',
        description: 'Failure to monitor, communication failures between care teams, and discharge planning issues.'
      },
      {
        title: 'Complex Medical Disease',
        description: 'Management of multi-organ disease, chronic illness exacerbations, and complex care coordination.'
      }
    ],
  },
  {
    slug: 'gastroenterology',
    name: 'Gastroenterology',
    tagline: 'GI expertise in endoscopy complications, missed cancer, and digestive system malpractice',
    description: 'Our gastroenterology division provides board-certified gastroenterologists expert testimony on endoscopic procedures, diagnostic accuracy, cancer screening standards, and management of GI bleeding and inflammatory bowel disease.',
    practiceAreas: [
      {
        title: 'Endoscopy Complications',
        description: 'Perforation during EGD or colonoscopy, post-ERCP pancreatitis, bleeding complications, and preventability analysis.'
      },
      {
        title: 'Missed GI Cancer',
        description: 'Missed or delayed cancer diagnosis, inadequate surveillance, colonoscopy screening failures, and polyp management.'
      },
      {
        title: 'GI Bleeding Management',
        description: 'Acute upper and lower GI bleeding management, endoscopic intervention decisions, transfusion strategies, and shock management.'
      },
      {
        title: 'Inflammatory Bowel Disease',
        description: 'Crohn\'s disease and ulcerative colitis management, surgical timing, medication selection, and complication recognition.'
      },
      {
        title: 'Liver Disease',
        description: 'Cirrhosis diagnosis and management, hepatic encephalopathy, varices treatment, and liver failure management.'
      },
      {
        title: 'Medication-Related GI Injury',
        description: 'NSAID-related GI injury, aspirin and anticoagulant complications, and prophylaxis adequacy assessment.'
      }
    ]
  },
  {
    slug: 'critical-care',
    name: 'Critical Care',
    tagline: 'ICU standard of care expertise for sepsis, ventilator management, and intensive care litigation',
    description: 'Our critical care division features intensivists and neurocritical care specialists with extensive ICU experience providing expert testimony on acute respiratory distress syndrome, sepsis management, organ failure, and end-of-life care decisions. We combine active ICU practice with litigation expertise.',
    practiceAreas: [
      {
        title: 'ICU Standard of Care',
        description: 'General critical care management, ICU admission decisions, and appropriate level of care determinations.'
      },
      {
        title: 'Sepsis Management',
        description: 'Sepsis recognition, early goal-directed therapy, antibiotic selection, and source control timing.'
      },
      {
        title: 'Ventilator Management',
        description: 'Mechanical ventilation modes, weaning protocols, ventilator-associated pneumonia prevention, and barotrauma risk.'
      },
      {
        title: 'Wrongful Death in ICU',
        description: 'Cause of death analysis, preventability assessments, and damages causation in critical care mortality cases.'
      },
      {
        title: 'Medication Errors',
        description: 'Drug administration errors, dosing mistakes, adverse drug interactions, and monitoring failures in ICU.'
      },
      {
        title: 'Post-Surgical Complications',
        description: 'Postoperative infection, anastomotic failure, complication recognition, and rescue management.'
      }
    ]
  },
  {
    slug: 'anesthesiology',
    name: 'Anesthesiology',
    tagline: 'Anesthesiology and pain medicine expertise for perioperative, interventional, and chronic pain litigation',
    description: 'Our anesthesiology division features board-certified anesthesiologists and pain medicine physicians providing expert testimony on perioperative care, interventional procedures, opioid prescribing, and chronic pain management in complex cases.',
    practiceAreas: [
      {
        title: 'Perioperative Anesthesia',
        description: 'General and regional anesthesia administration, intraoperative monitoring, and perioperative complication analysis.'
      },
      {
        title: 'Interventional Procedure Complications',
        description: 'Epidural steroid injection complications, facet joint injection adverse events, spinal cord stimulator infections, and nerve injury.'
      },
      {
        title: 'Opioid Management',
        description: 'Opioid prescribing decisions, addiction risk assessment, dose escalation decisions, and overdose causation.'
      },
      {
        title: 'Chronic Pain Assessment',
        description: 'Chronic pain syndrome diagnosis, functional capacity evaluation appropriateness, and pain severity assessment.'
      },
      {
        title: 'Workers\' Compensation Cases',
        description: 'Work-related injury causation, impairment rating standards, permanent total disability determinations, and return-to-work capability.'
      },
      {
        title: 'Spinal Injections',
        description: 'Epidural steroid injection technique, frequency and safety protocols, image guidance requirements, and complication rates.'
      }
    ]
  },
  {
    slug: 'radiology',
    name: 'Radiology',
    tagline: 'Diagnostic radiology and neuroradiology expertise for imaging interpretation litigation',
    description: 'Our radiology division features double board-certified diagnostic radiologists and neuroradiologists with expertise across CT, MRI, and advanced imaging modalities. Our experts provide testimony on missed findings, imaging interpretation accuracy, and radiologic standard of care.',
    practiceAreas: [
      {
        title: 'Missed Diagnosis on Imaging',
        description: 'Failure to identify findings on CT, MRI, X-ray, and ultrasound — including stroke, hemorrhage, fracture, and tumor.'
      },
      {
        title: 'Stroke & Hemorrhage Imaging',
        description: 'Acute stroke imaging, intracranial hemorrhage detection, and time-sensitive neuroimaging interpretation.'
      },
      {
        title: 'Spine Imaging',
        description: 'Cervical, thoracic, and lumbar spine imaging interpretation including degenerative disease and trauma.'
      },
      {
        title: 'Cancer Detection',
        description: 'Failure to detect malignancy on screening and diagnostic imaging across body systems.'
      },
      {
        title: 'CSF Leaks',
        description: 'Diagnosis and characterization of cerebrospinal fluid leaks and intracranial hypotension.'
      },
      {
        title: 'Trauma Imaging',
        description: 'Acute trauma imaging interpretation including TBI, spine, and polytrauma evaluation.'
      }
    ]
  },
  {
    slug: 'physical-medicine-rehabilitation',
    name: 'Physical Medicine and Rehabilitation',
    tagline: 'PM&R expertise for spinal cord injury, brain injury, and rehabilitation outcomes',
    description: 'Our PM&R division features triple board-certified physiatrists with expertise in spinal cord injury medicine and brain injury medicine. Our experts provide testimony on rehabilitation standards of care, life-care planning, and long-term outcomes after catastrophic injury.',
    practiceAreas: [
      {
        title: 'Spinal Cord Injury',
        description: 'Acute and chronic SCI management, complications of injury, and long-term functional outcomes.'
      },
      {
        title: 'Brain Injury Rehabilitation',
        description: 'TBI rehabilitation standards, post-acute care, and recovery trajectory evaluation.'
      },
      {
        title: 'Stroke Rehabilitation',
        description: 'Post-stroke functional recovery, rehabilitation intensity, and discharge planning standards.'
      },
      {
        title: 'Life-Care Planning',
        description: 'Anticipated quality of life, future care needs, and rehabilitation cost projections after catastrophic injury.'
      },
      {
        title: 'Functional Capacity Evaluation',
        description: 'Disability evaluation, return-to-work assessment, and impairment ratings using AMA Guides.'
      },
      {
        title: 'Complications of Immobility',
        description: 'Pressure injury, contractures, autonomic dysreflexia, and other secondary complications of disability.'
      }
    ]
  },
  {
    slug: 'pharmacy',
    name: 'Pharmacy',
    tagline: 'Pharmacotherapy and critical care pharmacy expertise for medication error and pharmacy malpractice litigation',
    description: 'Our pharmacy division features board-certified pharmacotherapy and critical care pharmacy specialists providing expert testimony on medication errors, drug overdoses, adverse drug reactions, improper dosing, and breaches in pharmacy standard of care.',
    practiceAreas: [
      {
        title: 'Medication Errors',
        description: 'Drug administration errors, dosing mistakes, dispensing errors, and order-entry failures across inpatient and outpatient settings.'
      },
      {
        title: 'Drug Overdose & Adverse Reactions',
        description: 'Insulin overdose, anticoagulant errors, opioid-related events, and adverse drug reaction recognition and management.'
      },
      {
        title: 'Opioid Prescribing & Dispensing',
        description: 'Pharmacist responsibilities in opioid dispensing, corresponding-responsibility analysis, and red-flag identification.'
      },
      {
        title: 'Anticoagulation Management',
        description: 'Warfarin and DOAC dosing, monitoring, drug-drug interactions, and bleeding-risk assessment.'
      },
      {
        title: 'Pharmacy Standard of Care',
        description: 'Compounding, sterile preparation, drug-information consultation, and counseling standards.'
      },
      {
        title: 'ICU & Emergency Pharmacotherapy',
        description: 'Critical care medication selection, rapid-sequence intubation drug protocols, and emergency-department pharmacy practice.'
      }
    ]
  }
];

export function getDivisionBySlug(slug: string): Division | undefined {
  return divisions.find(d => d.slug === slug);
}
