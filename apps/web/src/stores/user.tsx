import { create } from "zustand";
import api from "../services/api";
import { useQuery } from "react-query";
import { useEffect } from "react";

type User = {
  email: string;
  telefone: string;
  endereco: string;
  cidade: string;
  estado: string;
  pais: string;
  foto: string;
  isAdmin: boolean;
  isInstructor: boolean;
  isPremium: boolean;
};

type UserStore = {
  user: User | undefined;

  setUser: (user: User) => void;
};

export const useUserStore = create<UserStore>((set, get) => ({
  user: undefined,

  setUser: (newUser) => {
    set((oldState: UserStore) => {
      return {
        ...oldState,
        user: newUser,
      };
    });
  },
}));

export const useUserSubscription = () => {
  const setUser = useUserStore((state) => state.setUser);

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

    console.log(JSON.parse(data));
  }, [data]);
};
