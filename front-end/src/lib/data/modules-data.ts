// Module and Lessons Data

export type Category = 'biologie' | 'medecine' | 'chirurgie';

export interface Lesson {
  id: number;
  title: string;
  qcmCount: number;
  totalQcm: number;
  commentsCount: number;
  likesCount: number;
  layer: number;
  progress: {
    correct: number;
    incorrect: number;
    notAnswered: number;
  };
}

export interface Module {
  id: number;
  name: string;
  category: Category;
  lessonsCount: number;
  lessons: string[];
  image?: string;
  progress: {
    qcm: number;
    theorique: number;
  };
  stats: {
    totalAnswered: number;
    correctRate: number; // percentage 0-100
  };
}

export const moduleImages: Record<string, string> = {
  'Anatomie-pathologique': '/images/modules/anapath.png',
  'Biochimie': '/images/modules/biochimie.png',
  'Embryologie': '/images/modules/embryologie.png',
  'Genetique': '/images/modules/genetique.png',
  'Hemobiologie': '/images/modules/hemobiologie.png',
  'Histologie': '/images/modules/histologie.png',
  'Immunologie': '/images/modules/immunologie.png',
  'Microbiologie': '/images/modules/microbiologie.png',
  'Parasitologie': '/images/modules/parasitologie.png',
  'Physiologie': '/images/modules/physiologie.png',
  'Cardiologie': '/images/modules/cardiologie.png',
  'Dermatologie': '/images/modules/dermatologie.png',
  'Endocrinologie': '/images/modules/endocrinologie.png',
  'Epidemiologie': '/images/modules/epidemiologie.png',
  'Gériatrie': '/images/modules/geriatrie.png',
  'Hematologie': '/images/modules/hematologie.png',
  'Hepato-gastro-enterologie': '/images/modules/hepato.png',
  'Maladies-infectieuses': '/images/modules/infectieuses.png',
  'Medecine-de-travail': '/images/modules/travail.png',
  'Medecine-legale': '/images/modules/legale.png',
  'Nephrologie': '/images/modules/nephrologie.png',
  'Neurologie': '/images/modules/neurologie.png',
  'Pediatrie': '/images/modules/pediatrie.png',
  'Pneumologie': '/images/modules/pneumologie.png',
  'Psychiatrie': '/images/modules/psychiatrie.png',
  'Radiologie': '/images/modules/radiologie.png',
  'Reanimation': '/images/modules/reanimation.png',
  'Rhumatologie': '/images/modules/rhumatologie.png',
  'Therapeutique': '/images/modules/therapeutique.png',
  'Chirurgie-generale': '/images/modules/chirurgie.png',
  'Chirurgie-infantile': '/images/modules/chirurgie-infantile.png',
  'Gynecologie': '/images/modules/gynecologie.png',
  'Neurochirurgie': '/images/modules/neurochirurgie.png',
  'Ophtalmologie': '/images/modules/ophtalmologie.png',
  'Orthopedie-Traumatologie': '/images/modules/orthopedie.png',
  'Oto-rhino-laryngologie': '/images/modules/orl.png',
  'Urologie': '/images/modules/urologie.png',
};

export const modules: Module[] = [
  {
    id: 1,
    name: "Anatomie-pathologique",
    category: "biologie",
    lessonsCount: 16,
    lessons: [
      "Amylose",
      "Athérosclérose",
      "Cellule cancéreuse",
      "Classification anatomo-pathologique des tumeurs",
      "Exploration EN ANAPATH",
      "Generalites sur les cancers",
      "Géneralité sur les pathologies en anapath",
      "Inflammation aigue",
      "Inflammation spécifique",
      "Inflammations virales, parasitaires et mycosique",
      "Ischémie tissulaire",
      "Melbouci anapath",
      "Métastase",
      "Oncogenèse",
      "Stroma tumoral",
      "Œdème et congestion"
    ],
    progress: { qcm: 45, theorique: 30 },
    stats: { totalAnswered: 30, correctRate: 0 }
  },
  {
    id: 2,
    name: "Biochimie",
    category: "biologie",
    lessonsCount: 24,
    lessons: [
      "Equilibre acido-basique",
      "Fer : métabolisme, exploration",
      "Glucides - Cycle de krebs",
      "Glucides - Digestion des glucides alimentaires",
      "Glucides - La néoglucogenèse",
      "Glucides - Métabolisme du glycogène",
      "Glucides - Transformation métabolique des monosaccharides",
      "Glucides - Voie des pentoses phosphates",
      "Glycémie, régulation, exploration, intérêt",
      "La bioénergétique",
      "La glycolyse",
      "Les enzymes",
      "Lipides - Métabolisme des acides gras",
      "Lipides - Métabolisme des corps cétoniques",
      "Lipides - Métabolisme des lipoprotéines",
      "Lipides - Métabolisme des phospholipides",
      "Lipides - Métabolisme des triglycérides",
      "Lipides - Métabolisme du cholestérol",
      "Métabolisme des acides nucléiques",
      "Métabolisme phosphocalcique",
      "Protéine - Métabolisme des acides aminés",
      "Protéine - Protéines",
      "Protéines - Les peptides",
      "Vitamines et coenzymes"
    ],
    progress: { qcm: 60, theorique: 55 },
    stats: { totalAnswered: 120, correctRate: 85 }
  },
  {
    id: 3,
    name: "Embryologie",
    category: "biologie",
    lessonsCount: 8,
    lessons: [
      "Annexes embryonnaires",
      "Développement embryonnaire et devenir des feuillets embryonnaires: endoblaste, épiblaste et chordomésoblaste",
      "Formation des cavités séreuses",
      "Gamétogenèse",
      "Gastrulation",
      "Neurulation",
      "Organogénèse",
      "Période embryonnaire"
    ],
    progress: { qcm: 35, theorique: 40 },
    stats: { totalAnswered: 80, correctRate: 65 }
  },
  {
    id: 4,
    name: "Genetique",
    category: "biologie",
    lessonsCount: 6,
    lessons: [
      "Anomalies de l'expression des gènes",
      "Caractères liés au sexe",
      "Expression des gènes",
      "Génétique Mendélienne : transmission monofactorielle des caractères",
      "Le gène : organisation",
      "Méthodes d'exploration"
    ],
    progress: { qcm: 70, theorique: 65 },
    stats: { totalAnswered: 150, correctRate: 35 }
  },
  {
    id: 5,
    name: "Hemobiologie",
    category: "biologie",
    lessonsCount: 4,
    lessons: [
      "Anémie : définition, classification, diagnostic biologique",
      "Groupes érythrocytaires ABO, rhésus",
      "Hémostase: physiologie, explorations et interprétation clinique",
      "Leucocytes: hématopoïèse, numération formule sanguine et anomalies quantitatives"
    ],
    progress: { qcm: 50, theorique: 45 },
    stats: { totalAnswered: 0, correctRate: 0 }
  },
  {
    id: 6,
    name: "Histologie",
    category: "biologie",
    lessonsCount: 6,
    lessons: [
      "Ante et posthypophyse: aspects histologiques et physiologiques",
      "Appareil génital male et femelle: aspects anatomiques et histologiques",
      "L'audition : aspects anatomiques et histologiques",
      "La vision : aspects anatomiques et histologiques",
      "Système cardio circulatoire: aspects anatomiques et histologiques",
      "Transmission synaptique : aspects histologiques et physiologiques"
    ],
    progress: { qcm: 25, theorique: 20 },
    stats: { totalAnswered: 0, correctRate: 0 }
  },
  {
    id: 7,
    name: "Immunologie",
    category: "biologie",
    lessonsCount: 6,
    lessons: [
      "Auto-immunité et maladies auto-immunes: bases cellulaires et moléculaires",
      "Déficits immunitaires primitifs: classification, physiopathologie, diagnostic",
      "Etats d'hypersensibilité: bases cellulaires et moléculaires du choc anaphylactique, exploration, bases cellulaires et moléculaires de l'allergie de type III et IV, exploration",
      "Réponse immunitaire non spécifique: bases cellulaires et moléculaires, mécanismes physiopathologiques, variations physiopathologiques de la réaction inflammatoire sérique",
      "Spécificité et diversité de la réponse immunitaire : bases moléculaires et génétiques",
      "Système majeur d'histocompatibilité, complexe HLA: bases structurales de classe I et de classe II, propriétés fonctionnelles, applications cliniques"
    ],
    progress: { qcm: 80, theorique: 75 },
    stats: { totalAnswered: 0, correctRate: 0 }
  },
  {
    id: 8,
    name: "Microbiologie",
    category: "biologie",
    lessonsCount: 2,
    lessons: [
      "Micro-organismes : caractéristiques principales des bactéries, virus, parasites et champignons",
      "Prélèvements et diagnostic en microbiologie"
    ],
    progress: { qcm: 90, theorique: 85 },
    stats: { totalAnswered: 0, correctRate: 0 }
  },
  {
    id: 9,
    name: "Parasitologie",
    category: "biologie",
    lessonsCount: 2,
    lessons: [
      "Micro-organismes : caractéristiques principales des bactéries, virus, parasites et champignons",
      "Prélèvements et diagnostic en microbiologie"
    ],
    progress: { qcm: 55, theorique: 50 },
    stats: { totalAnswered: 0, correctRate: 0 }
  },
  {
    id: 10,
    name: "Physiologie",
    category: "biologie",
    lessonsCount: 16,
    lessons: [
      "Electrophysiologie de la cellule myocardique",
      "Equilibre acido-basique",
      "Hémodynamique cardiaque",
      "Hormones : mécanismes d'action, caractéristiques générales, récepteur, relation hormone récepteur, localisation de l'action hormonale",
      "Membranes biologiques : structure générale, propriétés, rôle dans la transmission de l'information",
      "Physiologie de la filtration glomérulaire",
      "Physiologie de la pression artérielle",
      "Physiologie de la réabsorption tubulaire",
      "Physiologie de la sécrétion biliaire",
      "Physiologie de la sécrétion gastrique",
      "Physiologie de la sécrétion pancréatique",
      "Physiologie générale de la cellule excitable",
      "Physiologie des réflexes",
      "Physiologie de l'absorption intestinale",
      "Système rénine-angiotensine-aldostérone : physiologie",
      "Ventilation pulmonaire : aspects anatomiques et physiologiques"
    ],
    progress: { qcm: 40, theorique: 35 },
    stats: { totalAnswered: 0, correctRate: 0 }
  },
  {
    id: 11,
    name: "Cardiologie",
    category: "medecine",
    lessonsCount: 13,
    lessons: [
      "Rétrécissement Aortique",
      "Rétrécissement Mitral",
      "Angine de poitrine",
      "Endocardites infectieuses",
      "Facteurs de risque cardiovasculaire",
      "Hypertension artérielle",
      "Infarctus du myocarde",
      "Insuffisance cardiaque",
      "Maladie thromboembolique",
      "Péricardites aigues",
      "Rhumatisme articulaire aigu",
      "Valvulopathies acquises",
      "Œdème aigu du poumon"
    ],
    progress: { qcm: 65, theorique: 60 },
    stats: { totalAnswered: 0, correctRate: 0 }
  },
  {
    id: 12,
    name: "Dermatologie",
    category: "medecine",
    lessonsCount: 6,
    lessons: [
      "Acné",
      "Eczéma",
      "Mycoses cutanées",
      "Psoriasis",
      "Tumeurs cutanées",
      "Urticaire"
    ],
    progress: { qcm: 30, theorique: 25 },
    stats: { totalAnswered: 0, correctRate: 0 }
  },
  {
    id: 13,
    name: "Endocrinologie",
    category: "medecine",
    lessonsCount: 8,
    lessons: [
      "Complications aigues du diabète sucré",
      "Diabète sucré : complications dégénératives du diabète",
      "Diabète sucré : insuline et insulinothérapie",
      "Diabète sucré : physiopathologie, diagnostic",
      "Diabète sucré : traitement du diabète type 2 (ADO)",
      "Dyslipidémies : classification et traitement",
      "Syndrome de Cushing : signes, diagnostic, traitement",
      "Tumeurs hypophysaires : signes, diagnostic et traitement"
    ],
    progress: { qcm: 75, theorique: 70 },
    stats: { totalAnswered: 0, correctRate: 0 }
  },
  {
    id: 14,
    name: "Epidemiologie",
    category: "medecine",
    lessonsCount: 6,
    lessons: [
      "Calendrier vaccinal",
      "Epidémiologie des maladies non transmissibles : chaines de propagation et méthodes de lutte",
      "Epidémiologie des maladies transmissibles : chaines de propagation et méthodes de lutte",
      "Infections nosocomiales : définition, critères de diagnostic et moyens de lutte",
      "Mesure de l'état de santé de la population : Indicateurs de santé, mesures d'impact",
      "Programme national de lutte contre la tuberculose"
    ],
    progress: { qcm: 45, theorique: 40 },
    stats: { totalAnswered: 0, correctRate: 0 }
  },
  {
    id: 15,
    name: "Gériatrie",
    category: "medecine",
    lessonsCount: 1,
    lessons: [
      "Gériatrie"
    ],
    progress: { qcm: 100, theorique: 100 },
    stats: { totalAnswered: 0, correctRate: 0 }
  },
  {
    id: 16,
    name: "Hematologie",
    category: "medecine",
    lessonsCount: 4,
    lessons: [
      "Anémies : conduite diagnostique",
      "Leucémies aigues",
      "Lymphomes",
      "Syndrome hémorragique"
    ],
    progress: { qcm: 55, theorique: 50 },
    stats: { totalAnswered: 0, correctRate: 0 }
  },
  {
    id: 17,
    name: "Hepato-gastro-enterologie",
    category: "medecine",
    lessonsCount: 9,
    lessons: [
      "Cirrhose",
      "Constipation",
      "Diarrhées chroniques : conduite diagnostique",
      "Hépatites virales : diagnostic, traitement",
      "Hémorragies digestives : diagnostic et conduite thérapeutique",
      "Ictère : conduite diagnostique",
      "Pancréatite chronique : diagnostic, traitement",
      "Reflux gastro-oesophagien : diagnostic, traitement",
      "Ulcère gastro-duodénal : signes, diagnostic, traitement"
    ],
    progress: { qcm: 60, theorique: 55 },
    stats: { totalAnswered: 0, correctRate: 0 }
  },
  {
    id: 18,
    name: "Maladies-infectieuses",
    category: "medecine",
    lessonsCount: 7,
    lessons: [
      "Diarrhées infectieuses : diagnostic, traitement",
      "Fièvres typhoïde et paratyphoïde : signes, diagnostic, traitement",
      "Infection à VIH : immuno-pathologie, diagnostic, évolution, complication, prévention, traitement",
      "Méningites à liquide clair : diagnostic, pronostic, traitement",
      "Méningites purulentes : diagnostic, pronostic, traitement",
      "Paludisme : parasitologie, étiologie, diagnostic, prévention, traitement",
      "Etats septicémiques : diagnostic, pronostic, traitement"
    ],
    progress: { qcm: 35, theorique: 30 },
    stats: { totalAnswered: 0, correctRate: 0 }
  },
  {
    id: 19,
    name: "Medecine-de-travail",
    category: "medecine",
    lessonsCount: 2,
    lessons: [
      "Accidents de travail : définition, déclaration, prévention",
      "Maladies professionnelles : définition, déclaration, prévention"
    ],
    progress: { qcm: 85, theorique: 80 },
    stats: { totalAnswered: 0, correctRate: 0 }
  },
  {
    id: 20,
    name: "Medecine-legale",
    category: "medecine",
    lessonsCount: 2,
    lessons: [
      "Agressions sexuelles : diagnostic et conduite à tenir",
      "La mort : définition, diagnostic, rédaction du certificat de décès"
    ],
    progress: { qcm: 70, theorique: 65 },
    stats: { totalAnswered: 0, correctRate: 0 }
  },
  {
    id: 21,
    name: "Nephrologie",
    category: "medecine",
    lessonsCount: 3,
    lessons: [
      "Insuffisance rénale aigue",
      "Insuffisance rénale chronique",
      "Syndrome néphrotique"
    ],
    progress: { qcm: 50, theorique: 45 },
    stats: { totalAnswered: 0, correctRate: 0 }
  },
  {
    id: 22,
    name: "Neurologie",
    category: "medecine",
    lessonsCount: 7,
    lessons: [
      "Accidents vasculaires cérébraux ischémiques : diagnostic, traitement",
      "Epilepsie : diagnostic, traitement",
      "Méningo-encéphalites : diagnostic, traitement",
      "Polyradiculonévrites : diagnostic, traitement",
      "Sclérose en plaques : diagnostic, traitement",
      "Syndrome cérébelleux : sémiologie, étiologies",
      "Syndrome pyramidal : sémiologie, étiologies"
    ],
    progress: { qcm: 40, theorique: 35 },
    stats: { totalAnswered: 0, correctRate: 0 }
  },
  {
    id: 23,
    name: "Pediatrie",
    category: "medecine",
    lessonsCount: 8,
    lessons: [
      "Bronchiolite : diagnostic, traitement",
      "Convulsions fébriles : conduite à tenir",
      "Déshydratation aigue : diagnostic, traitement",
      "Diarrhée aigue : diagnostic, traitement",
      "Fièvre chez l'enfant : conduite à tenir",
      "Méningite de l'enfant : diagnostic, traitement",
      "Pneumonie de l'enfant : diagnostic, traitement",
      "Rachitisme : diagnostic, traitement"
    ],
    progress: { qcm: 65, theorique: 60 },
    stats: { totalAnswered: 0, correctRate: 0 }
  },
  {
    id: 24,
    name: "Pneumologie",
    category: "medecine",
    lessonsCount: 16,
    lessons: [
      "Asthme : diagnostic, traitement",
      "BPCO : diagnostic, traitement",
      "Bronchectasies",
      "Cancer bronchopulmonaire : diagnostic, traitement",
      "Embolie pulmonaire : diagnostic, traitement",
      "Fibrose pulmonaire",
      "Hémoptysie : conduite diagnostique et thérapeutique",
      "HTAP : diagnostic, traitement",
      "Insuffisance respiratoire aigue : diagnostic, traitement",
      "Insuffisance respiratoire chronique : diagnostic, traitement",
      "Pleurésies : diagnostic, traitement",
      "Pneumonies : diagnostic, traitement",
      "Pneumothorax : diagnostic, traitement",
      "Sarcoïdose",
      "Syndrome d'apnées du sommeil",
      "Tuberculose : diagnostic, traitement"
    ],
    progress: { qcm: 25, theorique: 20 },
    stats: { totalAnswered: 0, correctRate: 0 }
  },
  {
    id: 25,
    name: "Psychiatrie",
    category: "medecine",
    lessonsCount: 4,
    lessons: [
      "Dépression",
      "Schizophrénie",
      "Troubles anxieux",
      "Troubles bipolaires"
    ],
    progress: { qcm: 80, theorique: 75 },
    stats: { totalAnswered: 0, correctRate: 0 }
  },
  {
    id: 26,
    name: "Radiologie",
    category: "medecine",
    lessonsCount: 2,
    lessons: [
      "Abdomen sans préparation : sémiologie, indications",
      "Radiographie pulmonaire : sémiologie, indications"
    ],
    progress: { qcm: 95, theorique: 90 },
    stats: { totalAnswered: 0, correctRate: 0 }
  },
  {
    id: 27,
    name: "Reanimation",
    category: "medecine",
    lessonsCount: 5,
    lessons: [
      "Acidose et alcalose : diagnostic, traitement",
      "Choc : physiopathologie, diagnostic, traitement",
      "Coma : conduite à tenir",
      "Détresse respiratoire aigue : prise en charge",
      "Troubles hydro-électrolytiques : diagnostic, traitement"
    ],
    progress: { qcm: 45, theorique: 40 },
    stats: { totalAnswered: 0, correctRate: 0 }
  },
  {
    id: 28,
    name: "Rhumatologie",
    category: "medecine",
    lessonsCount: 5,
    lessons: [
      "Arthrose : diagnostic, traitement",
      "Goutte : diagnostic, traitement",
      "Lombalgies : conduite diagnostique et thérapeutique",
      "Polyarthrite rhumatoïde : diagnostic, traitement",
      "Spondylarthrite ankylosante : diagnostic, traitement"
    ],
    progress: { qcm: 60, theorique: 55 },
    stats: { totalAnswered: 0, correctRate: 0 }
  },
  {
    id: 29,
    name: "Therapeutique",
    category: "medecine",
    lessonsCount: 3,
    lessons: [
      "Anti-inflammatoires : indications, effets indésirables",
      "Antibiothérapie : principes, bon usage",
      "Anticoagulants : indications, surveillance, complications"
    ],
    progress: { qcm: 70, theorique: 65 },
    stats: { totalAnswered: 0, correctRate: 0 }
  },
  {
    id: 30,
    name: "Chirurgie-generale",
    category: "chirurgie",
    lessonsCount: 17,
    lessons: [
      "Appendicites aiguës",
      "Cancer de l'œsophage",
      "Cancer de la Vésicule Biliaire",
      "Cancer de la tête du pancréas",
      "Cancer des voies biliaires",
      "Cancer du côlon",
      "Cancer du rectum",
      "Cancer gastrique",
      "Cholécystite aiguë lithiasique",
      "Hernies pariétales",
      "Hémorragies digestives",
      "Kyste hydatique du foie.",
      "Les occlusions intestinales aigues",
      "Les péritonites aiguës",
      "Lithiase de la voie biliaire principale",
      "Lithiase vésiculaire",
      "Pancréatite aiguë"
    ],
    progress: { qcm: 35, theorique: 30 },
    stats: { totalAnswered: 0, correctRate: 0 }
  },
  {
    id: 31,
    name: "Chirurgie-infantile",
    category: "chirurgie",
    lessonsCount: 2,
    lessons: [
      "Occlusion du nouveau-né",
      "Invagination aiguë de l'enfant"
    ],
    progress: { qcm: 90, theorique: 85 },
    stats: { totalAnswered: 0, correctRate: 0 }
  },
  {
    id: 32,
    name: "Gynecologie",
    category: "chirurgie",
    lessonsCount: 3,
    lessons: [
      "Hémorragie génitale",
      "Kyste de l'ovaire",
      "Torsion d'annexe"
    ],
    progress: { qcm: 55, theorique: 50 },
    stats: { totalAnswered: 0, correctRate: 0 }
  },
  {
    id: 33,
    name: "Neurochirurgie",
    category: "chirurgie",
    lessonsCount: 5,
    lessons: [
      "AVC hémorragique",
      "Hématome intracrânien",
      "Plaies du scalp",
      "Traumatisme crânien",
      "Traumatismes du rachis"
    ],
    progress: { qcm: 45, theorique: 40 },
    stats: { totalAnswered: 0, correctRate: 0 }
  },
  {
    id: 34,
    name: "Ophtalmologie",
    category: "chirurgie",
    lessonsCount: 3,
    lessons: [
      "Cataracte",
      "Glaucome",
      "Traumatismes oculaires"
    ],
    progress: { qcm: 75, theorique: 70 },
    stats: { totalAnswered: 0, correctRate: 0 }
  },
  {
    id: 35,
    name: "Orthopedie-Traumatologie",
    category: "chirurgie",
    lessonsCount: 6,
    lessons: [
      "Arthrite septique",
      "Fractures",
      "Infection des parties molles",
      "Luxations",
      "Ostéomyélite",
      "Traumatismes des membres"
    ],
    progress: { qcm: 30, theorique: 25 },
    stats: { totalAnswered: 0, correctRate: 0 }
  },
  {
    id: 36,
    name: "Oto-rhino-laryngologie",
    category: "chirurgie",
    lessonsCount: 3,
    lessons: [
      "Angine",
      "Epistaxis",
      "Otite moyenne aiguë"
    ],
    progress: { qcm: 85, theorique: 80 },
    stats: { totalAnswered: 0, correctRate: 0 }
  },
  {
    id: 37,
    name: "Urologie",
    category: "chirurgie",
    lessonsCount: 8,
    lessons: [
      "Adénome de la prostate",
      "Cancer de la vessie",
      "Cancer de la prostate",
      "Cancer du rein",
      "Cancer du testicule",
      "Hématurie",
      "Lithiase urinaire",
      "Pathologies des bourses."
    ],
    progress: { qcm: 50, theorique: 45 },
    stats: { totalAnswered: 0, correctRate: 0 }
  }
];

export const getModulesByCategory = (category: Category): Module[] => {
  return modules.filter(m => m.category === category);
};

export const getModuleById = (id: number): Module | undefined => {
  return modules.find(m => m.id === id);
};

export const getModuleByName = (name: string): Module | undefined => {
  return modules.find(m => m.name.toLowerCase() === name.toLowerCase());
};

export const getCategoryLabel = (category: Category): string => {
  const labels: Record<Category, string> = {
    biologie: 'Biologie',
    medecine: 'Medecine',
    chirurgie: 'Chirurgie'
  };
  return labels[category];
};

export const categories: Category[] = ['biologie', 'medecine', 'chirurgie'];
