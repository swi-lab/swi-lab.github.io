export const lab = {
  name: 'SWI Lab',
  brand: 'SWI Lab @ Georgia Tech',
  expansion: 'Science, World models and Intelligence',
  university: 'Georgia Tech',
  universityUrl: 'https://www.gatech.edu/',
  tagline: 'Generative world models for science and health',
  description: 'We build generative, predictive models of how things look, move, and evolve—and use them to solve inference problems in the physical and living world.',
  email: 'jwang3799@gatech.edu',
};

export const research = [
  {
    id: 'generative-models', number: '01', category: 'THE MODELING CORE',
    title: 'Generative & world models',
    short: 'Learning how the world looks, moves, and evolves.',
    description: 'We study diffusion, flow, video, and 3D models that can predict and generate complex systems. We design conditioning interfaces that go beyond text: measurements, geometry, physics, and clinical variables.',
    topics: ['Diffusion & flow models', 'Video & 3D generation', 'Controllable generation'],
  },
  {
    id: 'science', number: '02', category: 'THE PHYSICAL WORLD',
    title: 'Models for science',
    short: 'Connecting observations to the physics behind them.',
    description: 'We develop learned operators and simulators for physical systems, and solve inverse problems using generative priors. Our interests include computational imaging, PDE surrogates, inverse design, and active sensing.',
    topics: ['Operator learning', 'Inverse problems', 'Computational imaging'],
  },
  {
    id: 'health', number: '03', category: 'THE LIVING WORLD',
    title: 'Models for health',
    short: 'Understanding physiology from incomplete observations.',
    description: 'We build multimodal models across medical images, clinical text, and physiological signals. We study temporal imaging, diagnosis and prognosis, procedural video, and decision support with calibrated uncertainty.',
    topics: ['Multimodal learning', 'Medical imaging', 'Reliable clinical AI'],
  },
];

export const directions = [
  { title: 'One model, many sensors', text: 'Resolution- and sampling-agnostic reconstruction across imaging modalities and acquisition settings.' },
  { title: 'Temporal & 3D models for medicine', text: 'Dynamic ultrasound, 4D imaging, and physiological dynamics as predictive models, beyond static snapshots.' },
  { title: 'Conditioning beyond text', text: 'Specifying generation through measurements, geometry, physical constraints, and clinical variables.' },
  { title: 'Deployment-aligned optimization', text: 'Learning and evaluation centered on ranking, calibration, and cost under class imbalance.' },
  { title: 'Learned simulators for inverse design', text: 'Fast, differentiable forward models that make difficult inverse problems tractable.' },
  { title: 'Reliable AI assistants', text: 'Tool-using, multimodal systems for science and clinical workflows, with uncertainty-aware escalation.' },
];

export interface Member {
  name: string;
  role: string;
  email: string;
  interests?: string;
  image?: string;
  url?: string;
}
export const members: Member[] = [
  { name: 'Jiayun Wang', role: 'Principal Investigator', email: 'jwang3799@gatech.edu' },
  { name: 'Xinsong Feng', role: 'PhD Students', email: 'xsfeng@gatech.edu' },
  { name: 'Wentao Zhou', role: 'PhD Students', email: 'wentao@gatech.edu' },
  { name: 'Tian Xia', role: 'Master’s Students', email: 'tianxia@g.harvard.edu' },
];

export interface Publication {
  title: string;
  authors: string;
  venue: string;
  year: number;
  url: string;
  code?: string;
  image?: string;
}
// Add verified papers here; the page groups entries by year automatically.
export const publications: Publication[] = [];
