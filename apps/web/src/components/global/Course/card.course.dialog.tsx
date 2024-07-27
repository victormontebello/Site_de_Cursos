import { IconStarFilled } from "@tabler/icons-react";
import { Course } from "../../../stores/course.js";
import { Button } from "../../ui/button.js";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../../ui/dialog.js";
import { toast } from "sonner";
import { useUserStore } from "../../../stores/user.js";
import api from "../../../services/api.js";

type CourseCardProps = {
  course: Course;
};

export default function CourseCard({ course }: CourseCardProps) {
  const user = useUserStore((state) => state.user);

  const handleAddCourse = async () => {
    if (!user?._id || !course._id) {
      return toast.error("Por favor recarregue a página");
    }

    try {
      await api.put(`/usuarios/${user._id}/comprar/${course._id}`);

      toast.success("Curso adicionado com sucesso!");
    } catch (err) {
      console.error(err);
      toast.error("Falha ao adicionar curso!");
    }
  };

  const isCourseDisabledToAdd = course.isPremium && !user?.isPremium;

  return (
    <Dialog>
      <DialogTrigger asChild>
        <div className="p-4 border rounded-md flex min-h-[200px] flex-col items-start justify-between gap-4">
          <div className="flex items-center justify-center gap-2">
            {course.isPremium && <IconStarFilled size={16} />}

            <h1 className="font-semibold">{course.nome}</h1>
          </div>
          <p>{course.descricao}</p>
          <Button>Ver mais</Button>
        </div>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{course.nome}</DialogTitle>
          <DialogDescription>Detalhes do curso</DialogDescription>
        </DialogHeader>
        <div className="flex items-start justify-start flex-col gap-4 py-4">
          <div className="flex items-start justify-start flex-col">
            <span className="font-semibold text-base">Id</span>
            <span className="text-sm">{course._id}</span>
          </div>
          <div className="flex items-start justify-start flex-col">
            <span className="font-semibold text-base">Nome</span>
            <span className="text-sm">{course.nome}</span>
          </div>
          <div className="flex items-start justify-start flex-col">
            <span className="font-semibold text-base">Descrição</span>
            <span className="text-sm">{course.descricao}</span>
          </div>
          <div className="flex items-start justify-start flex-col">
            <span className="font-semibold text-base">Carga Horária</span>
            <span className="text-sm">{course.descricao} horas</span>
          </div>
          <div className="flex items-start justify-start flex-col">
            <span className="font-semibold text-base">Carga Horária</span>
            <span className="text-sm">{course.cargaHoraria} horas</span>
          </div>
          <div className="flex items-start justify-start flex-col">
            <span className="font-semibold text-base">Valor</span>
            <span className="text-sm">R${course.valor}</span>
          </div>
          <div className="flex items-start justify-start flex-col">
            <span className="font-semibold text-base">Possui certificado</span>
            <span className="text-sm">
              {course.possuiCertificado ? "Sim" : "Não"}
            </span>
          </div>
          <div className="flex items-start justify-start flex-col">
            <span className="font-semibold text-base">Número de aulas</span>
            <span className="text-sm">{course.numeroDeAulas}</span>
          </div>
        </div>
        <DialogFooter>
          <DialogClose>
            <Button>Fechar</Button>
          </DialogClose>
          <Button disabled={isCourseDisabledToAdd} onClick={handleAddCourse}>
            Adicionar
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
