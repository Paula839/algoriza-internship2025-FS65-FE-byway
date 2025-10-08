import type { Course, PaginatedResponse } from '../types';
import type { CourseDto, FilterDto } from '../types/Dtos';
import type { InstructorCategory } from '../types/enums/InstructorCategory';
import api from "./api";

export const getCourses = async (pageNumber:number = 1, pageSize:number = 10): Promise<PaginatedResponse<Course> | null> => {
  try {
  const response = await api.get<PaginatedResponse<Course>>(
      `/courses?pageNumber=${pageNumber}&pageSize=${pageSize}`
    );
    return response.data;
  } catch (error) {
    console.error("Failed to fetch courses:", error);
    return null;
  }
};

export const getCourseById = async (id: number): Promise<Course | null> => {
  try {
  const response = await api.get<Course>(
      `/courses/${id}`
    );
    return response.data;
  } catch (error) {
    console.error("Failed to fetch courses:", error);
    return null;
  }
};

export const getCart = async (cartIds: number[]): Promise<Course[]> => {
  try {
    if (!cartIds || cartIds.length === 0) return [];
    console.log("cartIds = ", cartIds)
  const response = await api.post<Course[]>(
      `/courses/cart`,
      cartIds
    );
    return response.data;
  } catch (error) {
    console.error("Failed to fetch courses:", error);
    return [];
  }
};


export const getTopCourses = async (top: number = 5): Promise<Course[]> => {
  try {
    const response = await api.get<Course[]>(
      `/courses/top-courses?top=${top}`
    ); 

    return response.data ?? [];
  } catch (error) {
    console.error(error);
    return [];
  }
};

export const getTopCategories = async (top: number = 10): Promise<Course[]> => {
  try {
    const response = await api.get<Course[]>(
      `/courses/top-categories?top=${top}`
    ); 
    return response.data ?? [];
  } catch (error) {
    console.error(error);
    return [];
  }
};

export const getTopCoursesByCategory = async (category: InstructorCategory, top: number = 4): Promise<Course[]> => {
  try {
    const response = await api.get<Course[]>(
      `/courses/top-courses/${category}?top=${top}`
    ); 
    return response.data ?? [];
  } catch (error) {
    console.error(error);
    return [];
  }
};

export const addCourse = async (course: Course): Promise<CourseDto | null> => {
  try {
    const courseDto: CourseDto = {
          name: course.name,
          pictureUrl: course.image,
          category: course.category,
          description : course.description,
          certification : course.certifications,
          level: course.level,
          contents: course.contents,
          rate: course.rate,
          price: course.price,
          instructorId: course.instructorId ?? 0
    };


    const { data } = await api.post<CourseDto>("/courses", courseDto);
    return data;
  } catch (error) {
    console.error("Failed to add course:", error);
    return null;
  }
};

export const updateCourse = async (courseId: number, course: Course): Promise<CourseDto | null> => {
  try {
    const courseDto: CourseDto = {
          name: course.name,
          pictureUrl: course.image,
          category: course.category,
          description : course.description,
          certification : course.certifications,
          level: course.level,
          contents: course.contents,
          rate: course.rate,
          price: course.price,
          instructorId: course.instructorId ?? 0
    };
    const { data } = await api.put<CourseDto>(`/courses/${courseId}`, courseDto);
    return data;
  } catch (error) {
    console.error("Failed to add instructor:", error);
    return null;
  }
};

export const deleteCourse = async (courseId: number): Promise<CourseDto | null> => {
  try {
    const { data } = await api.delete<CourseDto>(`/courses/${courseId}`);
    return data;
  } catch (error) {
    console.error("Failed to add instructor:", error);
    return null;
  }
};


export const search = async (query: string, top: number = 7): Promise<CourseDto[]> => {
  query = query.trim()
  if (!query) return []
  try {
     const { data } = await api.get<CourseDto[]>(`/courses/search`, {
      params: { query, top }
    });
    return data;
  } catch (error) {
    console.error("Failed to search for courses:", error);
    return [];
  }
};

export const searchPagination = async (query: string, pageNumber: number = 1, pageSize: number = 9): Promise<PaginatedResponse<Course> | null> => {
  query = query.trim()
  if (!query) return null
  try {
     const { data } = await api.get<PaginatedResponse<Course>>(`/courses/search-pagination`, {
      params: { query, pageNumber, pageSize }
    });
    return data;
  } catch (error) {
    console.error("Failed to search for courses:", error);
    return null;
  }
};

export const filter = async (filterDto: FilterDto): Promise<PaginatedResponse<Course> | null> => {

  try {
     const { data } = await api.post<PaginatedResponse<Course> | null>(`/courses/filter`, filterDto );
    return data;
  } catch (error) {
    console.error("Failed to add instructor:", error);
    return null;
  }
};