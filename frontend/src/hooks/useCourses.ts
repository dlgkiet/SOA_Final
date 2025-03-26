// hooks/useCourses.ts
import { useState, useEffect } from 'react';
import { fetchCourses } from '../api/teacher';

export const useCourses = (teacherId: number) => {
  const [courses, setCourses] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadCourses = async () => {
      try {
        const data = await fetchCourses();
        const filteredCourses = data.filter((course: any) => course.teacherId === teacherId);
        setCourses(filteredCourses);
      } catch (error) {
        setError('Error fetching courses');
      } finally {
        setLoading(false);
      }
    };
    loadCourses();
  }, [teacherId]);

  return { courses, loading, error };
};
