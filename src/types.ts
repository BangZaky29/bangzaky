
// Legacy types file - migrated to src/api/*
// Keeping shared UI types if necessary

export interface NavItem {
  label: string;
  path: string;
}


export interface Template {
  id: number;           // tetap number sesuai backend
  title: string;
  description: string;
  price: string;        // sesuai API, jangan ubah ke number
  category: string;
  type: string;
  style: string;
  features: string[];
  techStack: string[];  // mapping dari tech_stack API
  imageUrl: string;     // mapping dari image_url API
}


export interface User {
  name: string;
  purchasedTemplateIds: string[];
}

export interface NavItem {
  label: string;
  path: string;
}

export interface PortfolioItem {
  id: string;
  title: string;
  description: string;
  url: string;
  tags: string[];
  imageUrl: string;
}