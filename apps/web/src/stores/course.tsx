import { create } from "zustand";
import api from "../services/api.js";
import { useQuery } from "react-query";
import { useEffect } from "react";

export type Course = {
  _id: string;
  nome: string;
  descricao: string;
  cargaHoraria: number;
  numeroDeAulas: 7;
  possuiCertificado: boolean;
  valor: number;
  isPremium: boolean;
};

type CourseStore = {
  courses: Course[] | undefined;
  isLoadingCourses: boolean;

  setIsLoadingCourses: (isLoadingCourses: boolean) => void;
  setCourses: (courses: Course[]) => void;
  createCourse: (course: Course) => void;
  updateCourse: (course: Course) => void;
  deleteCourse: (id: string) => void;
};

export const useCourseStore = create<CourseStore>((set, get) => ({
  courses: undefined,
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

  createCourse: async (course) => {
    set((oldState: CourseStore) => ({
      ...oldState,
      courses: [...(oldState.courses || []), course],
    }));
  },

  updateCourse: async (course) => {
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

  deleteCourse: async (id) => {
    set((oldState: CourseStore) => ({
      ...oldState,
      courses: oldState.courses?.filter((course) => course._id !== id),
    }));
  },
}));

export const useCourseSubscription = () => {
  const setCourses = useCourseStore((state) => state.setCourses);
  const setIsLoadingCourses = useCourseStore(
    (state) => state.setIsLoadingCourses
  );

  const { data } = useQuery(
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

  useEffect(() => {
    if (!data) return;

    setIsLoadingCourses(false);
    setCourses(data);
  }, [data, setCourses, setIsLoadingCourses]);
};
