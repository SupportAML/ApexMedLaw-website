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
    slug: 'orthopedic-surgery',
    name: 'Orthopedic Surgery',
    tagline: 'Orthopedic surgery expertise for musculoskeletal injury, joint replacement, and surgical complication litigation',
    description: 'Our orthopedic surgery division features fellowship-trained, board-certified orthopedic surgeons with deep expertise in musculoskeletal trauma, joint reconstruction, sports medicine, and post-surgical complications. Our experts provide authoritative testimony on standard-of-care issues across the full spectrum of orthopedic practice.',
    practiceAreas: [
      {
        title: 'Fracture Management',
        description: 'Open and closed reduction, fixation technique, malunion and nonunion, and post-fracture complication analysis.'
      },
      {
        title: 'Joint Replacement',
        description: 'Total hip, knee, and shoulder arthroplasty — surgical indications, technique, infection, and revision surgery.'
      },
      {
        title: 'Sports Medicine & Soft Tissue Injury',
        description: 'Ligament, tendon, and meniscal injuries, arthroscopic procedures, and return-to-activity standards.'
      },
      {
        title: 'Post-Surgical Complications',
        description: 'Surgical site infection, nerve and vascular injury, compartment syndrome, and DVT prophylaxis adequacy.'
      },
      {
        title: 'Orthopedic Trauma',
        description: 'Polytrauma management, damage-control orthopedics, and timing of definitive fixation in complex cases.'
      },
      {
        title: 'Workers\' Compensation & IME',
        description: 'Work-related musculoskeletal injury causation, impairment ratings, and return-to-work evaluations.'
      }
    ],
  },
  {
    slug: 'spine-surgery',
    name: 'Spine Surgery',
    tagline: 'Spine surgery expertise across orthopedic and neurosurgical approaches to cervical, thoracic, and lumbar pathology',
    description: 'Our spine surgery division features fellowship-trained orthopedic spine surgeons and neurosurgeons with combined expertise across the cervical, thoracic, and lumbar spine. Our experts provide testimony on surgical indications, technique, complication management, and standard of care for both elective and trauma spine procedures.',
    practiceAreas: [
      {
        title: 'Cervical Spine Surgery',
        description: 'Anterior cervical discectomy and fusion (ACDF), cervical disc arthroplasty, posterior decompression, and cervical myelopathy management.'
      },
      {
        title: 'Lumbar Fusion & Decompression',
        description: 'TLIF, PLIF, XLIF, ALIF, laminectomy, and microdiscectomy — surgical indications, technique, and outcome analysis.'
      },
      {
        title: 'Spinal Trauma',
        description: 'Acute spinal column and spinal cord injury, surgical timing, instrumentation choice, and post-operative care.'
      },
      {
        title: 'Disc Herniation & Nerve Compression',
        description: 'Conservative versus surgical management decisions, indications for intervention, and recurrent disc herniation.'
      },
      {
        title: 'Spinal Deformity',
        description: 'Adult and adolescent scoliosis, kyphosis, and complex deformity correction surgery.'
      },
      {
        title: 'Post-Operative Complications',
        description: 'Hardware failure, adjacent segment disease, dural tear, infection, and nerve injury after spine surgery.'
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
    slug: 'emergency-medicine',
    name: 'Emergency Medicine',
    tagline: 'ED standard of care expertise for trauma, resuscitation, airway, and emergency department litigation',
    description: 'Our emergency medicine division features board-certified emergency physicians with extensive experience across trauma centers, academic institutions, community emergency departments, freestanding EDs, and rural hospitals. Our experts provide testimony on triage decisions, missed diagnoses, resuscitation, airway management, and ED standard of care.',
    practiceAreas: [
      {
        title: 'Missed & Delayed Diagnosis',
        description: 'Failure to diagnose stroke, MI, sepsis, aortic dissection, pulmonary embolism, and other time-sensitive ED presentations.'
      },
      {
        title: 'Triage & Disposition',
        description: 'Triage decisions, EMTALA compliance, admission vs. discharge decisions, and appropriate level-of-care determinations.'
      },
      {
        title: 'Trauma Resuscitation',
        description: 'Trauma activation criteria, ATLS protocols, hemorrhage control, and resuscitation standard of care in the ED.'
      },
      {
        title: 'Airway Management',
        description: 'Rapid sequence intubation, difficult airway management, failed airway algorithms, and procedural complications.'
      },
      {
        title: 'Wilderness & Environmental Emergencies',
        description: 'Hypothermia, drowning, frostbite, heat stroke, altitude illness, decompression sickness, and venomous animal bites.'
      },
      {
        title: 'Procedural Complications',
        description: 'Central line placement, chest tube insertion, lumbar puncture, and other ED procedure-related adverse events.'
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
    slug: 'epilepsy',
    name: 'Epilepsy',
    tagline: 'Epileptology and clinical neurophysiology expertise for seizure disorder, EEG, and status epilepticus litigation',
    description: 'Our epilepsy division features fellowship-trained, board-certified epileptologists and clinical neurophysiologists with active experience in epilepsy monitoring units, EEG interpretation, and complex seizure management. Our experts provide testimony on diagnostic accuracy, antiseizure medication selection, status epilepticus, and standard of care across the full spectrum of epilepsy practice.',
    practiceAreas: [
      {
        title: 'Seizure Diagnosis & Classification',
        description: 'Differentiating epileptic from non-epileptic events, seizure semiology, and ILAE classification standards.'
      },
      {
        title: 'EEG Interpretation',
        description: 'Routine and continuous EEG, long-term monitoring, and identification of epileptiform abnormalities.'
      },
      {
        title: 'Antiseizure Medication Management',
        description: 'AED selection, dosing, drug-drug interactions, monitoring, and pregnancy-related considerations.'
      },
      {
        title: 'Status Epilepticus',
        description: 'Recognition and treatment of convulsive and nonconvulsive status epilepticus, escalation pathways, and refractory care.'
      },
      {
        title: 'Post-Traumatic Epilepsy',
        description: 'Evaluation of post-TBI seizures, prophylaxis decisions, and causation analysis in injury-related epilepsy.'
      },
      {
        title: 'Surgical & Device Evaluation',
        description: 'Pre-surgical workup, candidacy for resection or neurostimulation, and management of drug-resistant epilepsy.'
      }
    ]
  },
  {
    slug: 'stroke-vascular-neurology',
    name: 'Stroke and Vascular Neurology',
    tagline: 'Vascular neurology expertise for acute stroke, thrombolytics, and cerebrovascular disease litigation',
    description: 'Our stroke and vascular neurology division features board-certified vascular neurologists with active stroke center practice. Our experts provide testimony on acute ischemic and hemorrhagic stroke management, thrombolytic and thrombectomy decisions, telestroke standards, and the full spectrum of cerebrovascular disease.',
    practiceAreas: [
      {
        title: 'Acute Ischemic Stroke',
        description: 'Stroke recognition, last known well determination, imaging triage, and time-sensitive treatment decisions.'
      },
      {
        title: 'Thrombolytics & Thrombectomy',
        description: 'IV alteplase/tenecteplase eligibility, mechanical thrombectomy referral, and contraindication analysis.'
      },
      {
        title: 'Intracerebral & Subarachnoid Hemorrhage',
        description: 'Hemorrhagic stroke diagnosis, blood pressure management, anticoagulation reversal, and neurosurgical coordination.'
      },
      {
        title: 'Posterior Circulation Stroke',
        description: 'Vertebrobasilar stroke recognition, atypical presentations, and delayed diagnosis cases.'
      },
      {
        title: 'Telestroke & Transfer Standards',
        description: 'Telestroke decision-making, hub-and-spoke standards, and inter-facility transfer for advanced intervention.'
      },
      {
        title: 'Secondary Stroke Prevention',
        description: 'Antiplatelet and anticoagulation selection, atrial fibrillation management, and risk-factor modification.'
      }
    ]
  },
  {
    slug: 'neurocritical-care',
    name: 'Neurocritical Care',
    tagline: 'Neurocritical care expertise for ICU-level neurologic injury, ICP, and acute brain injury litigation',
    description: 'Our neurocritical care division features fellowship-trained neurointensivists with active practice managing acute neurologic emergencies in the ICU. Our experts provide testimony on intracranial pressure management, severe TBI, status epilepticus, neuromonitoring, and the standard of care across complex neurocritical conditions.',
    practiceAreas: [
      {
        title: 'Severe TBI Management',
        description: 'ICP monitoring, osmotic therapy, decompressive interventions, and tiered escalation of neurocritical care.'
      },
      {
        title: 'Hemorrhagic & Ischemic Stroke ICU Care',
        description: 'Neurocritical management of large hemispheric stroke, ICH, and SAH, including rebleeding and vasospasm risk.'
      },
      {
        title: 'Status Epilepticus',
        description: 'Refractory and super-refractory status epilepticus management, continuous EEG, and anesthetic infusion strategies.'
      },
      {
        title: 'Neuromonitoring',
        description: 'ICP, brain tissue oxygenation, multimodal monitoring, and cerebral perfusion pressure goals.'
      },
      {
        title: 'Brain Death & Prognostication',
        description: 'Brain death determination protocols, neuroprognostication after cardiac arrest, and end-of-life decision-making.'
      },
      {
        title: 'Spinal Cord Injury ICU Care',
        description: 'Acute SCI hemodynamic management, autonomic dysfunction, and pulmonary support in cervical injuries.'
      }
    ]
  },
  {
    slug: 'neuroimmunology',
    name: 'Neuroimmunology',
    tagline: 'Neuroimmunology and MS expertise for demyelinating disease, autoimmune neurologic, and disease-modifying therapy litigation',
    description: 'Our neuroimmunology division features fellowship-trained neuroimmunologists with deep expertise in multiple sclerosis, neuromyelitis optica, autoimmune encephalitis, and other immune-mediated neurologic conditions. Our experts provide testimony on diagnostic accuracy, disease-modifying therapy selection, and standard of care for complex autoimmune neurologic disease.',
    practiceAreas: [
      {
        title: 'Multiple Sclerosis',
        description: 'MS diagnosis under McDonald criteria, MRI interpretation, and disease-modifying therapy selection and escalation.'
      },
      {
        title: 'Neuromyelitis Optica & MOGAD',
        description: 'NMOSD and MOG-antibody disease diagnosis, antibody testing, and immunotherapy decisions.'
      },
      {
        title: 'Autoimmune Encephalitis',
        description: 'Recognition and treatment of autoimmune and paraneoplastic encephalitis, including NMDA-receptor and LGI1 syndromes.'
      },
      {
        title: 'Disease-Modifying Therapy',
        description: 'DMT risk-benefit analysis, monitoring requirements, PML risk, and adverse event recognition.'
      },
      {
        title: 'Demyelinating Disease Differential',
        description: 'Distinguishing MS from mimics including ADEM, vasculitis, and infectious or metabolic demyelination.'
      },
      {
        title: 'Neuroinflammation in Trauma',
        description: 'Post-traumatic and post-infectious neuroinflammatory syndromes and overlap with primary autoimmune disease.'
      }
    ]
  },
  {
    slug: 'wilderness-medicine',
    name: 'Wilderness Medicine',
    tagline: 'Wilderness and environmental medicine expertise for austere, dive, and remote-care emergency litigation',
    description: 'Our wilderness medicine division features fellowship-trained, FAWM-credentialed emergency physicians with expertise in environmental emergencies, austere and remote care, dive medicine, and search-and-rescue medical direction. Our experts provide testimony on standard of care for hypothermia, drowning, altitude illness, envenomation, and other wilderness presentations.',
    practiceAreas: [
      {
        title: 'Hypothermia & Cold Injury',
        description: 'Accidental hypothermia rewarming strategies, frostbite management, and cold-water immersion care.'
      },
      {
        title: 'Drowning & Submersion',
        description: 'Resuscitation in submersion injury, post-immersion pulmonary care, and prognostication.'
      },
      {
        title: 'Heat Illness',
        description: 'Heat exhaustion and heat stroke recognition, cooling strategies, and exertional heat injury management.'
      },
      {
        title: 'Altitude Illness',
        description: 'Acute mountain sickness, HACE, and HAPE recognition, prevention, and descent decisions.'
      },
      {
        title: 'Envenomation & Animal Bites',
        description: 'Snake, marine, and arthropod envenomation management and antivenom decisions.'
      },
      {
        title: 'Dive & Marine Medicine',
        description: 'Decompression sickness, arterial gas embolism, hyperbaric referral, and marine envenomation care.'
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
