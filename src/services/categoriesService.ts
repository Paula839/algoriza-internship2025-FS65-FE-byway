import type { Category } from '../types';
import api from "./api";

export const getTopCategories = async (top: number = 8): Promise<Category[]> => {
  try {
    const response = await api.get<Category[]>(
      `/courses/top-categories?top=${top}`
    ); 
    return response.data ?? [];
  } catch (error) {
    console.error(error);
    return [];
  }
};

export const getCategories = async (): Promise<Category[]> => {
  try {
    const response = await api.get<Category[]>(
      `/courses/categories`
    ); 
    return response.data ?? [];
  } catch (error) {
    console.error(error);
    return [];
  }
};
