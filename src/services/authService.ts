import type { User } from "../types";
import type { LoginDto, RegistrationDto, TokenResponseDto } from "../types/Dtos";
import api from "./api";

export const registration = async (registration: RegistrationDto): Promise<User | null> => {
  try {
    const response = await api.post<User>(
      `/auth/register`,
      registration
    ); 
    return response.data;
  } catch (error) {
    console.error(error);
    return null;
  }
};

export const login = async (login: LoginDto): Promise<TokenResponseDto | null> => {
  try {
    const response = await api.post<TokenResponseDto>(
      `/auth/login`,
      login
    ); 
    const token = response.data?.accessToken;
    if (token) localStorage.setItem("authToken", token);
    return response.data;
  } catch (error) {
    console.error(error);
    return null;
  }
};



