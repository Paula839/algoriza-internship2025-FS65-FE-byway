import { useEffect, useRef, useState } from "react";

const StatItem = ({ value, label }: { value: number; label: string }) => {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );

    if (ref.current) observer.observe(ref.current);

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!isVisible) return;

    const duration = 1000; 
    const startTime = performance.now();

    const animate = (time: number) => {
      const progress = Math.min((time - startTime) / duration, 1);
      const current = Math.floor(progress * value);
      setCount(current);

      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };

    requestAnimationFrame(animate);
  }, [isVisible, value]);

  return (
    <div ref={ref} className="text-center flex-1">
      <h3 className="text-4xl font-bold text-gray-900">{count}+</h3>
      <p className="text-sm text-gray-600">{label}</p>
    </div>
  );
};

const StatsSection = () => {
  return (
    <section className="w-full bg-gray-50 flex items-center justify-between gap-8 py-10">
      <StatItem value={250} label="Courses by our best mentors" />
      <div className="border-l border-gray-300 h-16 self-stretch" />
      <StatItem value={1000} label="Happy Students" />
      <div className="border-l border-gray-300 h-16 self-stretch" />
      <StatItem value={15} label="Years of Experience" />
      <div className="border-l border-gray-300 h-16 self-stretch" />
      <StatItem value={2400} label="Successful Graduates" />
    </section>
  );
};

export default StatsSection;
