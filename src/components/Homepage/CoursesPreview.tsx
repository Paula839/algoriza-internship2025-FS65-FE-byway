import { useEffect } from 'react';
import { useAtom } from 'jotai';
import { topCoursesAtom } from '../../store/homeAtoms';
import { getTopCourses } from '../../services/coursesService';
import type { Course } from '../../types';

const CoursesPreview = () => {
  const [topCourses, setTopCourses] = useAtom(topCoursesAtom);

  useEffect(() => {
    const fetchData = async () => {
      const data: Course[] = await getTopCourses();
      setTopCourses(data);
    };
    fetchData();
  }, []);

  return (
    <section className="py-12 px-6">
      <h2 className="text-2xl font-bold mb-6">Top Courses</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {topCourses.map((course: Course) => (
          <div key={course.id} className="bg-white shadow rounded p-4">
            <img
              src={course.image}
              alt={course.name}
              className="h-40 w-full object-cover rounded mb-4"
            />
            <h3 className="font-semibold">{course.name}</h3>
            <p className="text-gray-600">{course.category}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default CoursesPreview;
