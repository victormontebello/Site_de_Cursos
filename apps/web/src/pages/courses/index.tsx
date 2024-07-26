import { IconPlus } from "@tabler/icons-react";
import { Button } from "../../components/ui/button";

export default function CoursesPage() {
  return (
    <div className="w-full flex-1 min-h-screen flex items-center justify-center p-6 h-full">
      <div className="w-full min-h-40 bg-white flex-1 h-full flex flex-col items-center justify-start gap-6">
        <div className="w-full flex items-center justify-between">
          <h1 className="text-gray-950 font-semibold text-2xl">Meus cursos</h1>
          <Button>
            <p>Criar novo curso</p>
            <IconPlus />
          </Button>
        </div>
        <div className="grid grid-cols-6 flex-wrap gap-6">
          {Array.from({ length: 12 }).map((course) => (
            <div className="p-4 border rounded-md flex h-[200px] flex-col items-start justify-start gap-4">
              <h1 className="font-semibold">Introdução a programação</h1>
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Perspiciatis amet officia.
              </p>
              <Button>Ver mais</Button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
