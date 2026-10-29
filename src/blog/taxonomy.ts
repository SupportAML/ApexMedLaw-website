/**
 * Infers which divisions a blog post relates to, so every post gets internal
 * links (post → specialties/experts, division page → related reading) even when
 * the content engine appends a post without updating the explicit mapping in
 * posts.ts. Explicit entries in posts.ts always win; this is the fallback.
 *
 * Rules match against the post's slug, title and keywords. Order does not
 * matter; matches are de-duplicated and capped at four divisions.
 */
export interface TaxonomyInput {
  slug: string;
  title: string;
  keywords: string[];
}

const RULES: Array<[RegExp, string[]]> = [
  // Pain / spine
  [/spinal cord stimulator|intrathecal|radiofrequency ablation|facet joint|medial branch|vertebroplasty|kyphoplasty|epidural steroid/, ['interventional-spine', 'anesthesiology', 'physical-medicine-rehabilitation']],
  [/opioid/, ['interventional-spine', 'pharmacy', 'family-medicine']],
  // Neurology family
  [/\bstroke|\btia\b|transient ischemic|cerebral venous|vascular neurolog/, ['stroke-vascular-neurology', 'neurology', 'emergency-medicine']],
  [/subdural|epidural hematoma|lucid interval|\btbi\b|traumatic brain/, ['neurosurgery', 'neurology', 'neurocritical-care']],
  [/seizure|epilep|status epilepticus/, ['epilepsy', 'neurology']],
  [/multiple sclerosis|demyelinat|neuroimmun/, ['neuroimmunology', 'neurology']],
  [/guillain|myasthen|neuromuscular|neuropathy/, ['neuromuscular-medicine', 'neurology', 'critical-care']],
  [/\bhie\b|birth injury|neonat|pediatric neuro/, ['pediatric-neurology', 'neurology']],
  [/brain abscess|meningitis|encephalitis|wernicke|encephalopathy/, ['neurology', 'emergency-medicine', 'internal-medicine']],
  [/neuroprognost|cardiac arrest|hypoxic.ischemic/, ['neurocritical-care', 'neurology', 'critical-care']],
  [/cauda equina|spinal epidural abscess|spinal cord injur/, ['spine-surgery', 'neurosurgery', 'spinal-cord-injury', 'emergency-medicine']],
  [/nerve block|anesthesia|intubation|airway/, ['anesthesiology', 'critical-care', 'emergency-medicine']],
  // GI
  [/\bgi\b|gastro|mesenteric|colitis|cholangitis|biliary|bile duct|cholecyst|pancreatitis|esophageal|boerhaave|diverticulitis|appendic|endoscop|colon/, ['gastroenterology', 'emergency-medicine']],
  [/mesenteric ischemia|limb ischemia|aortic|vascular surgery/, ['vascular-surgery', 'emergency-medicine']],
  // Critical care
  [/\bicu\b|critical care|ecmo|central line|clabsi|failure.to.rescue|transfusion|hemorrhagic shock|pressure injury|\baki\b|dialysis|sepsis|vte|pulmonary embolism/, ['critical-care', 'internal-medicine']],
  [/diabetic ketoacidosis|\bdka\b/, ['internal-medicine', 'emergency-medicine', 'critical-care']],
  [/myocardial infarction|stemi/, ['emergency-medicine', 'internal-medicine', 'family-medicine']],
  // Surgery / other
  [/necrotizing fasciitis|compartment syndrome/, ['orthopedic-surgery', 'emergency-medicine', 'critical-care']],
  [/testicular torsion|\burolog/, ['urology', 'emergency-medicine']],
  [/telemedicine/, ['family-medicine', 'internal-medicine', 'emergency-medicine']],
  [/\bime\b|independent medical exam|life care plan/, ['physical-medicine-rehabilitation', 'neurology', 'orthopedic-surgery']],
];

/**
 * Practice / procedure posts (Daubert, depositions, statutes, privileges) are
 * not specialty-specific; link them to the four founding divisions.
 */
const CORE_DIVISIONS = ['neurology', 'critical-care', 'gastroenterology', 'interventional-spine'];

export function inferPostDivisions(post: TaxonomyInput): string[] {
  const haystack = `${post.slug.replace(/-/g, ' ')} ${post.title} ${post.keywords.join(' ')}`.toLowerCase();
  const out: string[] = [];
  for (const [pattern, slugs] of RULES) {
    if (!pattern.test(haystack)) continue;
    for (const s of slugs) if (!out.includes(s)) out.push(s);
  }
  return out.length > 0 ? out.slice(0, 4) : CORE_DIVISIONS;
}
