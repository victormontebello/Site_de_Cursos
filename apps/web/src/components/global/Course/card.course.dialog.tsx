import { IconStarFilled } from "@tabler/icons-react";
import { Course, useCourseStore } from "../../../stores/course.js";
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
import { useState } from "react";

type CourseCardProps = {
  course: Course;
};

export default function CourseCard({ course }: CourseCardProps) {
  const [open, setOpen] = useState(false);

  const user = useUserStore((state) => state.user);
  const userCourses = useCourseStore((state) => state.userCourses);

  const createUserCourse = useCourseStore((state) => state.createUserCourse);

  const deleteUserCourse = useCourseStore((state) => state.deleteUserCourse);
  const deleteCourse = useCourseStore((state) => state.deleteCourse);

  const handleAddCourse = async () => {
    if (!user?._id || !course._id) {
      return toast.error("Por favor recarregue a página");
    }

    try {
      await api.put(`/usuarios/${user._id}/comprar/${course._id}`);

      createUserCourse(course);

      toast.success("Curso adicionado com sucesso!");

      setOpen(false);
    } catch (err) {
      console.error(err);
      toast.error("Falha ao adicionar curso!");
    }
  };

  const handleRemoveCourse = async () => {
    if (!user?._id || !course._id) {
      return toast.error("Por favor recarregue a página");
    }

    try {
      await api.put(`/usuarios/${user._id}/cancelar/${course._id}`);

      deleteUserCourse(course._id);

      toast.success("Curso removido com sucesso!");

      setOpen(false);
    } catch (err) {
      console.error(err);
      toast.error("Falha ao remover curso!");
    }
  };

  const handleDeleteCourse = async () => {
    try {
      await api.delete(`/cursos/${course._id}`);

      deleteCourse(course._id);
      deleteUserCourse(course._id);

      toast.success("Curso deletado com sucesso!");
    } catch (err) {
      console.error(err);
      toast.success("Falha ao deletar curso!");
    }
  };

  const isCourseDisabledToAdd = course.isPremium && !user?.isPremium;
  const isCourseAlredyOnUserCourses = userCourses.some(
    (uC) => uC._id === course._id
  );
  const isTheCreatorOfTheCourse = course.autorId === user?._id;

  return (
    <Dialog open={open} onOpenChange={setOpen}>
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
        <DialogFooter className="w-full">
          {isTheCreatorOfTheCourse ? (
            <div className="w-full">
              <Button onClick={handleDeleteCourse}>Excluir</Button>
            </div>
          ) : null}
          <DialogClose>
            <Button>Fechar</Button>
          </DialogClose>
          {isCourseAlredyOnUserCourses ? (
            <Button
              disabled={isCourseDisabledToAdd}
              onClick={handleRemoveCourse}
            >
              Remover
            </Button>
          ) : (
            <Button disabled={isCourseDisabledToAdd} onClick={handleAddCourse}>
              Adicionar
            </Button>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
