import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { toast } from "sonner";

import { Button } from "../../components/ui/button.js";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../../components/ui/form.js";
import { Input } from "../../components/ui/input.js";
import { Switch } from "../../components/ui/switch.js";
import api from "../../services/api.js";
import { useUser } from "@clerk/clerk-react";
import { useNavigate } from "react-router-dom";
import { User, useUserStore } from "../../stores/user.js";

const profileFormSchema = z.object({
  email: z.string(),
  nome: z
    .string()
    .min(3, { message: "O nome deve ter pelo menos 3 caracteres" }),
  telefone: z
    .string()
    .min(3, { message: "O telefone deve ter pelo menos 3 caracteres" }),
  endereco: z
    .string()
    .min(3, { message: "O endereço deve ter pelo menos 3 caracteres" }),
  cidade: z
    .string()
    .min(3, { message: "A cidade deve ter pelo menos 3 caracteres" }),
  estado: z
    .string()
    .min(2, { message: "O estado deve ter pelo menos 2 caracteres" }),
  pais: z
    .string()
    .min(3, { message: "O país deve ter pelo menos 3 caracteres" }),
  foto: z.string().optional().nullable(),
  isAdmin: z.boolean(),
  isInstructor: z.boolean(),
  isPremium: z.boolean(),
  cursos: z.array(z.string()),
});

type ProfileFormValues = z.infer<typeof profileFormSchema>;

export function OnboardingForm() {
  const allUsers = useUserStore((state) => state.allUsers) || [];
  const setAllUsers = useUserStore((state) => state.setAllUsers);

  const navigate = useNavigate();
  const { user } = useUser();

  const userEmail = user?.emailAddresses[0].emailAddress;

  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileFormSchema),
    mode: "onChange",
    defaultValues: {
      cidade: undefined,
      endereco: undefined,
      estado: undefined,
      foto: undefined,
      nome: undefined,
      pais: undefined,
      telefone: undefined,
      isInstructor: false,
      email: userEmail || undefined,
      isAdmin: false,
      isPremium: false,
      cursos: [],
    },
  });

  async function onSubmit(body: ProfileFormValues) {
    try {
      const { data } = await api.post("/usuarios", {
        ...body,
      });

      const newAllUsers = [...allUsers, data as User];

      setAllUsers(newAllUsers);

      navigate("/home");

      toast.success("Perfil criado com sucesso!");
    } catch (err) {
      console.error(err);
      toast.error("Falha ao criar perfil");
    }
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-8 flex-1 w-full"
      >
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email de usuário</FormLabel>
              <FormDescription className="!mt-0 !mb-2">
                Este é o seu email de exibição público como usuário.
              </FormDescription>
              <FormControl>
                <Input placeholder="email" {...field} disabled />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="nome"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nome de usuário</FormLabel>
              <FormDescription className="!mt-0 !mb-2">
                Este é o seu nome de exibição público como usuário.
              </FormDescription>
              <FormControl>
                <Input placeholder="Nome" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="telefone"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Número de telefone</FormLabel>
              <FormDescription className="!mt-0 !mb-2">
                Esse é o número de telefone atribuído a sua conta na plataforma.
              </FormDescription>
              <FormControl>
                <Input placeholder="Número" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="endereco"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Endereço</FormLabel>
              <FormDescription className="!mt-0 !mb-2">
                Esse é o endereço atribuído a sua conta na plataforma.
              </FormDescription>
              <FormControl>
                <Input placeholder="Endereço" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="cidade"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Cidade</FormLabel>
              <FormDescription className="!mt-0 !mb-2">
                Essa é a cidade atribuída a sua conta na plataforma.
              </FormDescription>
              <FormControl>
                <Input placeholder="Cidade" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="estado"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Estado</FormLabel>
              <FormDescription className="!mt-0 !mb-2">
                Esse é o estado atribuído a sua conta na plataforma.
              </FormDescription>
              <FormControl>
                <Input placeholder="Estado" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="pais"
          render={({ field }) => (
            <FormItem>
              <FormLabel>País</FormLabel>
              <FormDescription className="!mt-0 !mb-2">
                Esse é o país atribuído a sua conta na plataforma.
              </FormDescription>
              <FormControl>
                <Input placeholder="País" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="isAdmin"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Admin</FormLabel>
              <FormDescription className="!mt-0 !mb-2">
                Indica se o usuário é um administrador.
              </FormDescription>
              <FormControl>
                <Switch
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="isInstructor"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Instrutor</FormLabel>
              <FormDescription className="!mt-0 !mb-2">
                Indica se o usuário é um instrutor.
              </FormDescription>
              <FormControl>
                <Switch
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="isPremium"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Premium</FormLabel>
              <FormDescription className="!mt-0 !mb-2">
                Indica se o usuário possui conta premium.
              </FormDescription>
              <FormControl>
                <Switch
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit">Criar perfil</Button>
      </form>
    </Form>
  );
}
