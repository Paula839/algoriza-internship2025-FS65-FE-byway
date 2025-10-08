

import type { InstructorCategory } from "./enums/InstructorCategory";
import type { Level } from "./enums/Level";

export interface Content {
  id?: number;
  name: string;
  numOfLectures: number;
  duration: number; 
}

export interface Course {
  id?: number;
  name: string;
  description?: string;
  certifications?: string;
  category: InstructorCategory;
  image: string;
  price: number;
  rate: number;
  totalHours: number;
  level: Level; 
  instructorId?: number;
  instructorName: string;
  studentsCount?: number;
  createdAt?: string;
  updatedAt?: string;
  contents: Content[];
}



export interface Instructor {
  id?: number;
  name: string;
  title: InstructorCategory;             
  description?: string;       
  pictureUrl?: string;        
  rate?: number;              
  numberOfStudents?: number;  
  numberOfCourses?: number;   
  createdAt?: string;
  updatedAt?: string;
}



export interface User {
  id: number;
  name: string;
  email: string;
  isAdmin: boolean 
  image?: string;
  createdAt?: string;
  updatedAt?: string;
  enrolledCourses?: Course[];
}

export interface Stats {
  courses: number;
  categories: number;
  instructors: number;
  students?: number;
}

export interface PaginatedResponse<T> {
  totalCount: number;
  pageNumber: number;
  pageSize: number;
  items: T[];
}


export interface Category {
  category: string;        
  averageRating: number;   
  courseCount: number;
}

