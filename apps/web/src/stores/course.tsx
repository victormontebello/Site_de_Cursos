import { create } from "zustand";
import api from "../services/api.js";
import { useQuery } from "react-query";
import { useEffect } from "react";
import { useUserStore } from "./user.js";

export type Course = {
  _id: string;
  nome: string;
  descricao: string;
  cargaHoraria: number;
  numeroDeAulas: 7;
  possuiCertificado: boolean;
  valor: number;
  isPremium: boolean;
  autorId: string;
};

type CourseStore = {
  courses: Course[];
  userCourses: Course[];
  isLoadingCourses: boolean;

  setIsLoadingCourses: (isLoadingCourses: boolean) => void;
  setCourses: (courses: Course[]) => void;
  createCourse: (course: Course) => void;
  updateCourse: (course: Course) => void;
  deleteCourse: (id: string) => void;

  setUserCourses: (courses: Course[]) => void;
  createUserCourse: (course: Course) => void;
  deleteUserCourse: (id: string) => void;
};

export const useCourseStore = create<CourseStore>((set, get) => ({
  courses: [],
  userCourses: [],
  isLoadingCourses: true,

  setIsLoadingCourses: (isLoadingCourses) => {
    set((oldState: CourseStore) => ({
      ...oldState,
      isLoadingCourses,
    }));
  },

  setCourses: (newCourses) => {
    set((oldState: CourseStore) => ({
      ...oldState,
      courses: newCourses,
    }));
  },

  createCourse: (course) => {
    set((oldState: CourseStore) => ({
      ...oldState,
      courses: [...(oldState.courses || []), course],
    }));
  },

  updateCourse: (course) => {
    set((oldState: CourseStore) => ({
      ...oldState,
      courses: oldState.courses
        ? oldState.courses.map((c) => {
            if (c._id === course._id) {
              return course;
            }

            return c;
          })
        : [],
    }));
  },

  deleteCourse: (id) => {
    set((oldState: CourseStore) => ({
      ...oldState,
      courses: oldState.courses?.filter((course) => course._id !== id),
    }));
  },

  setUserCourses: (courses) => {
    set((oldState: CourseStore) => ({
      ...oldState,
      userCourses: courses,
    }));
  },

  createUserCourse: (course) => {
    set((oldState: CourseStore) => ({
      ...oldState,
      userCourses: [...(oldState.userCourses || []), course],
    }));
  },

  deleteUserCourse: (id) => {
    set((oldState: CourseStore) => ({
      ...oldState,
      userCourses: oldState.userCourses?.filter((course) => course._id !== id),
    }));
  },
}));

export const useCourseSubscription = () => {
  const user = useUserStore((state) => state.user);

  const setCourses = useCourseStore((state) => state.setCourses);
  const setUserCourses = useCourseStore((state) => state.setUserCourses);
  const setIsLoadingCourses = useCourseStore(
    (state) => state.setIsLoadingCourses
  );

  const { data: cursosData } = useQuery(
    ["courses"],
    async () => {
      const { data } = await api.get("/cursos", {
        params: { showDisabled: false },
      });

      return data;
    },
    {
      refetchOnWindowFocus: false,
      refetchOnMount: false,
    }
  );

  const { data: userCursosData } = useQuery(
    ["user_courses"],
    async () => {
      if (!user?._id) return;

      const { data } = await api.get(`/cursos?usuarioId=${user._id}`, {
        params: { showDisabled: false },
      });

      return data;
    },
    {
      enabled: !!user,
      refetchOnWindowFocus: false,
      refetchOnMount: false,
    }
  );

  useEffect(() => {
    if (!cursosData || !userCursosData) return;

    setIsLoadingCourses(false);
    setCourses(cursosData);
    setUserCourses(userCursosData);
  }, [
    cursosData,
    setCourses,
    setIsLoadingCourses,
    setUserCourses,
    userCursosData,
  ]);
};
