// C:\codingVibes\myPortfolio\bangzaky\src\api\purchases\purchases.types.ts
import type { Template } from '../templates/templates.types';

export interface Purchase {
  id: number;             // id auto_increment = number
  userId: number;         // gunakan number sesuai DB
  templateId: number;     // gunakan number sesuai DB
  purchaseDate: string;   // timestamp dari DB
  template?: Template; 
}
