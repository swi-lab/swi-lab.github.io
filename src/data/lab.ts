export const lab = {
  name: 'SWI Lab',
  brand: 'SWI Lab @ Georgia Tech',
  expansion: 'Science, World models and Intelligence',
  university: 'Georgia Tech',
  universityUrl: 'https://www.gatech.edu/',
  logo: '/logo.png',
  description: 'SWI Lab at Georgia Tech works on generative world models and their use in scientific and medical inference problems.',
  email: 'pjwang@gatech.edu',
};

// Three research topics: a methodological core and two application domains.
// Related work under each topic is pulled from `publications` by topic id.

export interface ResearchTopic {
  id: string;
  title: string;
  description: string;  // short paragraph on the Research page
  tags: string[];       // keywords shown under the paragraph
}
export const research: ResearchTopic[] = [
  {
    id: 'generative-models',
    title: 'Generative and world models',
    description: 'We study diffusion, flow, video, and 3D models as world models: models of how systems look, move, and evolve. Much of this work is about conditioning generation on measurements, geometry, and physical constraints rather than text, and about making inference with these models efficient and well calibrated.',
    tags: ['Diffusion & flow models', 'Video & 3D generation', 'Controllable generation', 'Operator learning', 'Inverse problems', 'Uncertainty quantification'],
  },
  {
    id: 'science',
    title: 'Science: the physical world',
    description: 'We use learned operators and generative priors to connect measurements with the physical systems behind them. This includes computational imaging (CT, MRI, ultrasound), learned surrogates for PDEs and multiphysics, and inverse design and active sensing.',
    tags: ['Computational imaging', 'PDE surrogates', 'Learned simulators', 'Inverse design', 'Active sensing'],
  },
  {
    id: 'health',
    title: 'Health: the living world',
    description: 'We build multimodal models over medical images, clinical text, and physiological signals for diagnosis, prognosis, and procedural video understanding. Training and evaluation are aligned to how clinicians use a model: ranking, calibrated risk, and deferral when uncertain.',
    tags: ['Medical imaging', 'Multimodal clinical models', 'Diagnosis & prognosis', 'Surgical video', 'Calibration & deferral'],
  },
];

export interface NewsItem {
  date: string;   // e.g. '2026-09'
  text: string;
  url?: string;
}
// Newest first. The home page shows the first few entries.
export const news: NewsItem[] = [];

export interface Member {
  name: string;
  role: string;
  email: string;
  bio?: string;
  interests?: string;
  // Portrait path under public/, e.g. '/people/jiayun-wang.jpg'.
  image?: string;
  url?: string;
}
export const members: Member[] = [
  {
    name: 'Jiayun Wang',
    role: 'Principal Investigator',
    email: 'pjwang@gatech.edu',
    image: '',
    bio: '',
    interests: '',
  },
  {
    name: 'Xinsong Feng',
    role: 'PhD Students',
    email: 'xsfeng@gatech.edu',
    image: '',
    bio: '',
    interests: '',
  },
  {
    name: 'Wentao Zhou',
    role: 'PhD Students',
    email: 'wentao@gatech.edu',
    image: '',
    bio: '',
    interests: '',
  },
  {
    name: 'Tian Xia',
    role: 'Master’s Students',
    email: 'tianxia@g.harvard.edu',
    image: '',
    bio: '',
    interests: '',
  },
];

export interface Publication {
  title: string;
  authors: string;
  venue: string;
  year: number;
  url: string;
  code?: string;
  image?: string;
  topics?: string[];   // research topic ids; the paper is listed under each on the Research page
  selected?: boolean;  // show on the home page
}
// The Publications page groups entries by year automatically.
export const publications: Publication[] = [];
