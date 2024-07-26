import { create } from "zustand";
import api from "../services/api.js";
import { useQuery } from "react-query";
import { useEffect } from "react";

export type Course = {
  _id: string;
  nome: string;
  descricao: string;
  cargaHoraria: number;
};

type CourseStore = {
  courses: Course[] | undefined;
  isLoadingCourses: boolean;

  setIsLoadingCourses: (isLoadingCourses: boolean) => void;
  setCourses: (courses: Course[]) => void;
  createCourse: (course: Omit<Course, "_id">) => Promise<void>;
  updateCourse: (course: Course) => Promise<void>;
  deleteCourse: (id: string) => Promise<void>;
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
    const { data } = await api.post("/cursos", course);
    set((oldState: CourseStore) => ({
      ...oldState,
      courses: [...(oldState.courses || []), data],
    }));
  },

  updateCourse: async (course) => {
    const { data } = await api.put(`/cursos/${course._id}`, course);
    set((oldState: CourseStore) => ({
      ...oldState,
      courses: oldState.courses?.map((c) => (c._id === course._id ? data : c)),
    }));
  },

  deleteCourse: async (id) => {
    await api.delete(`/cursos/${id}`);
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
