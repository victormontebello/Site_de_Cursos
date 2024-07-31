import { useCourseStore } from "../../stores/course";
import CourseCard from "../../components/global/Course/card.course.dialog";
import CreateCourseDialog from "../../components/global/Course/create.course.dialog";

export default function HomePage() {
  const courses = useCourseStore((state) => state.courses);
  const userCourses = useCourseStore((state) => state.userCourses);

  const coursesNotAddToMe = courses.filter(
    (c) => !userCourses.some((uC) => uC._id === c._id)
  );

  return (
    <div className="w-full flex-1 min-h-screen flex items-center justify-center p-6 h-full">
      <div className="w-full min-h-40 bg-white flex-1 h-full flex flex-col items-center justify-start gap-12">
        <div className="w-full flex items-center justify-between">
          <h1 className="text-gray-950 font-semibold text-2xl">
            Cursos disponíveis
          </h1>
          <CreateCourseDialog />
        </div>
        <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-6">
          {coursesNotAddToMe.length > 0 ? (
            coursesNotAddToMe.map((course, index) => {
              return <CourseCard course={course} key={index} />;
            })
          ) : (
            <p className="w-full col-span-2">Não há nenhum curso disponível</p>
          )}
        </div>
      </div>
    </div>
  );
}
