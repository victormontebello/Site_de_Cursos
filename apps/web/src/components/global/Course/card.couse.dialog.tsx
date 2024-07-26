import { Course } from "../../../stores/course";
import { Button } from "../../ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../../ui/dialog";

type CourseCardProps = {
  course: Course;
};

export default function CourseCard({ course }: CourseCardProps) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <div className="p-4 border rounded-md flex min-h-[200px] flex-col items-start justify-between gap-4">
          <h1 className="font-semibold">{course.nome}</h1>
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
            <span className="text-sm">{course.cargaHoraria} horas</span>
          </div>
        </div>
        <DialogFooter>
          <DialogClose>
            <Button>Fechar</Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
