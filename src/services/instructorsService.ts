import type { Instructor, PaginatedResponse } from "../types";
import type { InstructorDto } from "../types/Dtos";
import type { InstructorCategory } from "../types/enums/InstructorCategory";
import api from "./api";

export const getTopInstructors = async (top:number = 10): Promise<Instructor[]> => {
  const { data } = await api.get<Instructor[]>(`/instructors/top?top=${top}`);
  return data;
};



export const getInstructors = async (pageNumber:number = 1, pageSize:number = 10): Promise<PaginatedResponse<Instructor> | null> => {
  try {
  const response = await api.get<PaginatedResponse<Instructor>>(
      `/instructors?pageNumber=${pageNumber}&pageSize=${pageSize}`
    );
    return response.data;
  } catch (error) {
    console.error("Failed to fetch instructors:", error);
    return null;
  }
};

export const getInstructor = async (instructorName: string): Promise<Instructor | null> => {
  try {
  const response = await api.get<Instructor>(`/instructors/name`, {
    params: { instructorName }
  });
    return response.data;
  } catch (error) {
    console.error("Failed to fetch instructors:", error);
    return null;
  }
};

export const getInstructorById = async (instructorId: number): Promise<Instructor | null> => {
  try {
  const response = await api.get<Instructor>(`/instructors/`, {
    params: { instructorId }
  });
    return response.data;
  } catch (error) {
    console.error("Failed to fetch instructors:", error);
    return null;
  }
};

export const addInstructor = async (instructor: Instructor): Promise<Instructor | null> => {
  try {
    const instructorDto: InstructorDto = {
          name: instructor.name,
          pictureUrl: instructor?.pictureUrl,
          title: instructor.title as InstructorCategory,
          rate: instructor?.rate ?? 0,
          description : instructor?.description
    };


    const { data } = await api.post<InstructorDto>("/instructors", instructorDto);
    return data;
  } catch (error) {
    console.error("Failed to add instructor:", error);
    return null;
  }
};

export const updateInstructor = async (instructorId: number, instructor: Instructor): Promise<Instructor | null> => {
  try {
    const instructorDto: InstructorDto = {
          name: instructor.name,
          pictureUrl: instructor?.pictureUrl,
          title: instructor.title as InstructorCategory,
          rate: instructor?.rate ?? 0,
          description : instructor?.description
    };
    const { data } = await api.put<InstructorDto>(`/instructors/${instructorId}`, instructorDto);
    return data;
  } catch (error) {
    console.error("Failed to add instructor:", error);
    return null;
  }
};

export const deleteInstructor = async (instructorId: number): Promise<Instructor | null> => {
  try {
    const { data } = await api.delete<InstructorDto>(`/instructors/${instructorId}`);
    return data;
  } catch (error) {
    console.error("Failed to add instructor:", error);
    return null;
  }
};


export const searchPagination = async (query: string, pageNumber: number = 1, pageSize: number = 8): Promise<PaginatedResponse<Instructor> | null> => {
  query = query.trim()
  if (!query) return null
  try {
     const { data } = await api.get<PaginatedResponse<Instructor>>(`/instructors/search-pagination`, {
      params: { query, pageNumber, pageSize }
    });
    return data;
  } catch (error) {
    console.error("Failed to search for instructors:", error);
    return null;
  }
};