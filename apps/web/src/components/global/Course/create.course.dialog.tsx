import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "../../../components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../../../components/ui/dialog";
import { Input } from "../../../components/ui/input";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../../../components/ui/form";
import { IconPlus } from "@tabler/icons-react";
import { toast } from "sonner";
import { Course, useCourseStore } from "../../../stores/course";
import { Switch } from "../../ui/switch";
import { useState } from "react";
import { useUserStore } from "../../../stores/user";
import api from "../../../services/api";

const createCourseSchema = z.object({
  nome: z.string().min(1, "Nome é obrigatório"),
  descricao: z.string().min(1, "Descrição é obrigatória"),
  horas: z
    .number()
    .min(1, "Carga horária deve ser maior que zero")
    .positive("Carga horária deve ser um número positivo"),
  valor: z
    .number()
    .min(1, "Valor deve ser maior que zero")
    .positive("Valor deve ser um número positivo"),
  numeroDeAulas: z
    .number()
    .min(1, "Numero de aulas deve ser maior que zero")
    .positive("Numero de aulas deve ser um número positivo"),
  possuiCertificado: z.boolean(),
  autorId: z.string(),
});

type CreateCourseFormValues = z.infer<typeof createCourseSchema>;

export default function CreateCourseDialog() {
  const [open, setOpen] = useState(false);

  const createCourse = useCourseStore((state) => state.createCourse);
  const user = useUserStore((state) => state.user);

  const form = useForm<CreateCourseFormValues>({
    resolver: zodResolver(createCourseSchema),
    defaultValues: {
      nome: "",
      descricao: "",
      horas: 1,
      numeroDeAulas: 1,
      possuiCertificado: true,
      valor: 1,
      autorId: user?._id || "",
    },
    mode: "onChange",
  });

  const onSubmit = async (data: CreateCourseFormValues) => {
    try {
      await api.post("/cursos", data);

      createCourse(data as unknown as Course);
      toast.success("Curso criado com sucesso!");

      setOpen(false);
    } catch (err) {
      toast.error("Falha ao criar novo curso!");
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button disabled={!user?.isInstructor}>
          <p>Criar novo curso</p>
          <IconPlus />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Criar Novo Curso</DialogTitle>
          <DialogDescription>
            Preencha as informações do curso
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="nome"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nome</FormLabel>
                  <FormDescription className="!mt-0 !mb-2">
                    Nome do curso
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
              name="descricao"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Descrição</FormLabel>
                  <FormDescription className="!mt-0 !mb-2">
                    Descrição do curso
                  </FormDescription>
                  <FormControl>
                    <textarea
                      placeholder="Descrição"
                      {...field}
                      className="w-full border p-2 rounded-md"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="horas"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Carga Horária</FormLabel>
                  <FormDescription className="!mt-0 !mb-2">
                    Carga horária do curso em horas
                  </FormDescription>
                  <FormControl>
                    <Input
                      type="number"
                      placeholder="Carga Horária"
                      {...field}
                      onChange={(e) => field.onChange(Number(e.target.value))}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="valor"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Valor</FormLabel>
                  <FormDescription className="!mt-0 !mb-2">
                    Valor do curso
                  </FormDescription>
                  <FormControl>
                    <Input
                      type="valor"
                      placeholder="Valor"
                      {...field}
                      onChange={(e) => field.onChange(Number(e.target.value))}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="possuiCertificado"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Possui Certificado</FormLabel>
                  <FormDescription className="!mt-0 !mb-2">
                    Este curso oferece certificado?
                  </FormDescription>
                  <FormControl>
                    <label className="flex items-center">
                      <Switch
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </label>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <DialogFooter>
              <DialogClose asChild>
                <Button type="button">Cancelar</Button>
              </DialogClose>
              <Button type="submit">Salvar</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
