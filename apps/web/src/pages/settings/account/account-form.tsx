import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "../../../components/ui/button.js";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../../../components/ui/form.js";
import { Input } from "../../../components/ui/input.js";
import { Switch } from "../../../components/ui/switch.js";
import { useUserStore } from "../../../stores/user.js";
import { toast } from "sonner";
import api from "../../../services/api.js";
import { useEffect } from "react";

const profileFormSchema = z.object({
  email: z
    .string({
      required_error: "Por favor, selecione um email para exibição.",
    })
    .email(),
  telefone: z.string(),
  endereco: z.string(),
  cidade: z.string(),
  estado: z.string(),
  pais: z.string(),
  isAdmin: z.boolean(),
  isInstructor: z.boolean(),
  isPremium: z.boolean(),
});

type ProfileFormValues = z.infer<typeof profileFormSchema>;

export function AccountForm() {
  const user = useUserStore((state) => state.user);
  const updateUser = useUserStore((state) => state.updateUser);

  const values: Partial<ProfileFormValues> = {
    email: user?.email,
    telefone: user?.telefone,
    pais: user?.pais,
    endereco: user?.endereco,
    cidade: user?.cidade,
    estado: user?.estado,
    isAdmin: user?.isAdmin,
    isInstructor: user?.isInstructor,
    isPremium: user?.isPremium,
  };

  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileFormSchema),
    defaultValues: values,
    mode: "onChange",
  });

  async function onSubmit(data: ProfileFormValues) {
    if (!user) return;

    try {
      const updatedUser = { ...user, ...data };

      const body = Object.assign({}, updatedUser);
      delete body._id;

      await api.put(`/usuarios/${user._id}`, body);

      updateUser(updatedUser);

      toast.success("Perfil atualizado com sucesso");
    } catch (err) {
      console.error(err);
      toast.error("Falha ao atualizar perfil");
    }
  }

  useEffect(() => {
    if (!user) return;

    form.setValue("email", user.email);
    form.setValue("nome", user.nome);
  }, [form, user]);

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 flex-1">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormDescription className="!mt-0 !mb-2">
                Este é o seu email de exibição público como usuário.
              </FormDescription>
              <FormControl>
                <Input placeholder="Email" {...field} disabled />
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

        <Button type="submit">Atualizar perfil</Button>
      </form>
    </Form>
  );
}
