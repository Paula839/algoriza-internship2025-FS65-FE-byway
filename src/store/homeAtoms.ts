import { atom } from 'jotai';
import type { Course, Instructor, Stats } from '../types';

export const topCoursesAtom = atom<Course[]>([]);
export const topInstructorsAtom = atom<Instructor[]>([]);
export const statsAtom = atom<Stats>({
  courses: 0,
  categories: 0,
  instructors: 0,
});
