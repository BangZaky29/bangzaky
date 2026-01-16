export interface Template {
  id: number;
  title: string;
  description: string;
  price: string;       // karena API return string
  category: string;
  type: string;
  style: string;
  tech_stack: string[]; // harus sama nama field API
  image_url: string;    // harus sama nama field API
  features: string[];
}
