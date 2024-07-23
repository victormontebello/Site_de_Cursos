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

const profileFormSchema = z.object({
  email: z
    .string({
      required_error: "Please select an email to display.",
    })
    .email(),
  telefone: z.string(),
  endereco: z.string(),
  cidade: z.string(),
  estado: z.string(),
  pais: z.string(),
  foto: z.string(),
  isAdmin: z.boolean(),
  isInstructor: z.boolean(),
  isPremium: z.boolean(),
});

type ProfileFormValues = z.infer<typeof profileFormSchema>;

// This can come from your database or API.
const defaultValues: Partial<ProfileFormValues> = {
  email: "guilhermeiagothomaz@hotmail.com",
  telefone: "(62) 99869-8465",
  pais: "Brasil",
  endereco:
    "Av. Esperança, s/n - Chácaras de Recreio Samambaia, Goiânia - GO, 74690-900",
  cidade: "Goiânia",
  estado: "Goiás",
  foto: "https://lh3.googleusercontent.com/p/AF1QipNC-hnlPrlnkfKQNVNCsjyNCeEUdisgJ-XBQCLm=s1360-w1360-h1020",
  isAdmin: true,
  isInstructor: true,
  isPremium: true,
};

export function AccountForm() {
  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileFormSchema),
    defaultValues,
    mode: "onChange",
  });

  function onSubmit(data: ProfileFormValues) {
    // TODO: Implementar
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 flex-1">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nome de usuário</FormLabel>
              <FormDescription className="!mt-0 !mb-2">
                Este é o seu nome de exibição público como usuário.
              </FormDescription>
              <FormControl>
                <Input placeholder="email" {...field} />
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
                Esse é o número de telefone atribuido a sua conta na plataforma.
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
                Esse é o endereço atribuido a sua conta na plataforma.
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
          name="foto"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Foto</FormLabel>
              <FormDescription className="!mt-0 !mb-2">
                Essa é a URL da foto atribuída a sua conta na plataforma.
              </FormDescription>
              <FormControl>
                <Input placeholder="Foto" {...field} />
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
                <Switch {...field} />
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
                <Switch {...field} />
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
                <Switch {...field} />
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
