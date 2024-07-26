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

const createCourseSchema = z.object({
  nome: z.string().min(1, "Nome é obrigatório"),
  descricao: z.string().min(1, "Descrição é obrigatória"),
  cargaHoraria: z
    .number()
    .min(1, "Carga horária deve ser maior que zero")
    .positive("Carga horária deve ser um número positivo"),
});

type CreateCourseFormValues = z.infer<typeof createCourseSchema>;

export default function CreateCourseDialog() {
  const form = useForm<CreateCourseFormValues>({
    resolver: zodResolver(createCourseSchema),
    defaultValues: {
      nome: "",
      descricao: "",
      cargaHoraria: 0,
    },
    mode: "onChange",
  });

  const onSubmit = (data: CreateCourseFormValues) => {
    console.log("Curso criado:", data);
    form.reset();
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>
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
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
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
              name="cargaHoraria"
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
