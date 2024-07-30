import CourseCard from "../../components/global/Course/card.course.dialog";
import { useCourseStore } from "../../stores/course";

export default function CoursesPage() {
  const userCourses = useCourseStore((state) => state.userCourses);

  return (
    <div className="w-full flex-1 min-h-screen flex items-center justify-center p-6 h-full">
      <div className="w-full min-h-40 bg-white flex-1 h-full flex flex-col items-center justify-start gap-6">
        <div className="w-full flex items-center justify-between">
          <h1 className="text-gray-950 font-semibold text-2xl">Meus cursos</h1>
        </div>
        <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-6">
          {userCourses.length > 0 ? (
            userCourses.map((course, index: number) => (
              <CourseCard course={course} key={index} />
            ))
          ) : (
            <p className="w-full col-span-2">
              Por favor adicione um curso para ver sua lista
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
