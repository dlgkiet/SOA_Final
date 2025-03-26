import { useCourses } from '../../hooks/useCourses';

const Courselist = () => {

  const teacherId = 2;
  const { courses, loading, error } = useCourses(teacherId);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div>
      <h2>Lớp đang dạy</h2>
      <ul>
        {courses.map((course) => (
          <li key={course.id}>
            <h3>{course.name}</h3>
            <p>{course.description}</p>
            <p>Lịch học: {course.schedule}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Courselist;
