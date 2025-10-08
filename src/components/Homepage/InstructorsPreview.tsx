import  { useEffect } from 'react';
import { useAtom } from 'jotai';
import { topInstructorsAtom } from '../../store/homeAtoms.ts';
import { getTopInstructors } from '../../services/instructorsService.ts';
import type { Instructor } from '../../types/index.ts';

const InstructorsPreview = () => {
  const [instructors, setInstructors] = useAtom(topInstructorsAtom);

  useEffect(() => {
    const fetchData = async () => {
      const data: Instructor[] = await getTopInstructors();
      setInstructors(data);
    };
    fetchData();
  }, []);

  return (
    <section className="py-12 px-6 bg-gray-50">
      <h2 className="text-2xl font-bold mb-6 text-center">Top Instructors</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {instructors.map((ins: Instructor) => (
          <div key={ins.id} className="bg-white shadow rounded p-4 text-center">
            <img
              src={ins.pictureUrl}
              alt={ins.name}
              className="h-32 w-32 mx-auto rounded-full mb-4 object-cover"
            />
            <h3 className="font-semibold">{ins.name}</h3>
            <p className="text-gray-600">{ins.title}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default InstructorsPreview;
