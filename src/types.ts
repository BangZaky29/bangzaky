
// Legacy types file - migrated to src/api/*
// Keeping shared UI types if necessary

export interface NavItem {
  label: string;
  path: string;
}


export interface Template {
  id: number;
  title: string;
  description: string;
  price: number;
  category: string;
  type: string;
  style: string;
  techStack: string[];
  imageUrl: string;
  features: string[];
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