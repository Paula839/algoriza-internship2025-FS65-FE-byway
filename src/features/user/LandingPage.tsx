import React, { useEffect } from 'react';
import HeroSection from '../../components/Homepage/Header';
import StatsSection from '../../components/Homepage/StatsSection';
import CoursesPreview from '../../components/Homepage/CoursesPreview';
import InstructorsPreview from '../../components/Homepage/InstructorsPreview';

import { useAtom } from 'jotai';
import { statsAtom, topCoursesAtom, topInstructorsAtom } from '../../store/homeAtoms';

import { getStats } from '../../services/statsService';
import { getTopCourses } from '../../services/coursesService';
import { getTopInstructors } from '../../services/instructorsService';

const LandingPage: React.FC = () => {
  const [, setStats] = useAtom(statsAtom);
  const [, setTopCourses] = useAtom(topCoursesAtom);
  const [, setTopInstructors] = useAtom(topInstructorsAtom);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [statsData, coursesData, instructorsData] = await Promise.all([
          getStats(),
          getTopCourses(),
          getTopInstructors(),
        ]);

        setStats(statsData);
        setTopCourses(coursesData);
        setTopInstructors(instructorsData);
      } catch (error) {
        console.error('Error fetching landing page data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="landing-page">
      <HeroSection />
      <StatsSection />
      <CoursesPreview />
      <InstructorsPreview />
    </div>
  );
};

export default LandingPage;
