import type { Content } from ".";
import type { InstructorCategory } from "./enums/InstructorCategory";
import type { Level } from "./enums/Level";
import type { SortBy } from "./enums/SortBy";
import type { NumOfLectures } from "./enums/NumOfLectures";

export interface InstructorDto {
  name: string,
  pictureUrl?: string,
  title: InstructorCategory,
  rate: number,
  description? : string
}

export interface CourseDto {
  id?: number
  name: string,
  pictureUrl?: string,
  category: InstructorCategory,
  description? : string,
  certification?: string,
  level: Level,
  contents: Content[],
  rate: number,
  price: number,
  instructorId: number,
  totalHours?: number
  instructorName?: string
}

interface CourseReceiptItemDto {
  id? : number,
  course: string,
  price: number 
}

export interface ReceiptDto {
  id?: number,
  courses: CourseReceiptItemDto[],
  totalPrice: number 
}

export interface RegistrationDto
{
   firstName: string,
   lastName: string,
   username: string,
   email: string,
   password: string
}

export interface LoginDto
{
   username: string,
   password: string
}


export interface TokenResponseDto
 {
     accessToken: string,
     expiration: Date
 }

 export interface FilterDto {
    sortBy?: SortBy,
    categories? : InstructorCategory[],
    numOfLecturesOption? : NumOfLectures,
    rate?: number,
    minimumPrice?: number,
    maximumPrice?: number,
    pageNumber?: number,
    pageSize?: number
 }