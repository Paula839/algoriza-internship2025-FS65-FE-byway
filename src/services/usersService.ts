import type { User } from '../types';
import type {ReceiptDto} from "../types/Dtos"
import api from "./api";

export const getUserByUsername = async (username: string): Promise<User | null> => {
  try {
    const response = await api.get<User>(`/users/username/${encodeURIComponent(username)}`);
    return response.data;
  } catch (error) {
    console.error("Failed to fetch user:", error);
    return null;
  }
};

export const getUserByEmail = async (email: string): Promise<User | null> => {
  try {
    if(!email.includes('@') || !email.includes('.')) throw new Error("Invalid email");
    const response = await api.get<User>(`/users/email/${encodeURIComponent(email)}`);
    return response.data;
  } catch (error) {
    console.error("Failed to fetch user:", error);
    return null;
  }
};

export const purchase = async (cart: number[]): Promise<{ message: string; receipt: ReceiptDto } | null> => {
  try {
  const response = await api.post<{ message: string; receipt: ReceiptDto } | null>(`/users/purchase`, cart);
    return response.data;
  } catch (error) {
    console.error("Failed to purchase courses for user:", error);
    return null;
  }
};

export const myCourses = async (): Promise<number[] | null> => {
  try {
  const response = await api.get<number[] | null>(`/users/myCourses`);
    return response.data;
  } catch (error) {
    console.error("Failed to fetch courses for user:", error);
    return null;
  }
};
