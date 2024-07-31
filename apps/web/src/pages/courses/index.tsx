import { useQuery } from "react-query";
import CourseCard from "../../components/global/Course/card.course.dialog";
import { useCourseStore } from "../../stores/course";
import api from "../../services/api";
import { useUserStore } from "../../stores/user";

export default function CoursesPage() {
  const user = useUserStore((state) => state.user);

  const setUserCourses = useCourseStore((state) => state.setUserCourses);
  const userCourses = useCourseStore((state) => state.userCourses);

  const { data, isLoading } = useQuery(
    ["user_courses"],
    async () => {
      if (!user?._id) return;

      const { data } = await api.get(`/cursos?usuarioId=${user._id}`, {
        params: { showDisabled: false },
      });

      setUserCourses(data);

      return data;
    },
    {
      refetchOnWindowFocus: false,
      refetchOnMount: false,
    }
  );

  return (
    <div className="w-full flex-1 min-h-screen flex items-center justify-center p-6 h-full">
      <div className="w-full min-h-40 bg-white flex-1 h-full flex flex-col items-center justify-start gap-6">
        <div className="w-full flex items-center justify-between">
          <h1 className="text-gray-950 font-semibold text-2xl">Meus cursos</h1>
        </div>
        {isLoading ? (
          <div>
            <p>carregando...</p>
          </div>
        ) : (
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
        )}
      </div>
    </div>
  );
}
