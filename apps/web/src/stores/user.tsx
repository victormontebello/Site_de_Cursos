import { create } from "zustand";
import api from "../services/api";
import { useQuery } from "react-query";
import { useEffect } from "react";

export type User = {
  _id: string;
  nome: string;
  email: string;
  senha: string;
  telefone: string;
  endereco: string;
  cidade: string;
  estado: string;
  pais: string;
  numeroDeCursos: number;
  horasAssistidas: number;
  horasCertificadas: number;
  isAdmin: boolean;
  isInstructor: boolean;
  isPremium: boolean;
  cursos: string[];
};

type UserStore = {
  allUsers: User[] | undefined;
  user: User | undefined;

  isLoadingUsers: boolean;

  setUser: (user: User) => void;
  setAllUsers: (users: User[]) => void;
  setIsLoadingUsers: (isLoadingUsers: boolean) => void;
  updateUser: (updatedUser: User) => void;
};

export const useUserStore = create<UserStore>((set, get) => ({
  allUsers: undefined,
  user: undefined,

  isLoadingUsers: true,

  setUser: (user) => {
    set((oldState: UserStore) => {
      return {
        ...oldState,
        user,
      };
    });
  },

  setAllUsers: (allUsers) => {
    set((oldState: UserStore) => {
      return {
        ...oldState,
        allUsers,
      };
    });
  },

  setIsLoadingUsers: (isLoadingUsers) => {
    set((oldState: UserStore) => {
      return {
        ...oldState,
        isLoadingUsers,
      };
    });
  },

  updateUser: (updatedUser: User) => {
    set((oldState: UserStore) => {
      const allUsers = oldState.allUsers?.map((user) =>
        user._id === updatedUser._id ? updatedUser : user
      );
      return {
        ...oldState,
        user: updatedUser,
        allUsers,
      };
    });
  },
}));

export const useUserSubscription = () => {
  const setAllUsers = useUserStore((state) => state.setAllUsers);
  const setIsLoadingUsers = useUserStore((state) => state.setIsLoadingUsers);

  const { data } = useQuery(
    ["user"],
    async () => {
      const { data } = await api.get("/usuarios", {
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

    setIsLoadingUsers(false);
    setAllUsers(data);
  }, [data, setAllUsers, setIsLoadingUsers]);
};
