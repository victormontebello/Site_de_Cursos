import { User } from "../../../stores/user";
import { Button } from "../../ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../../ui/dialog";
import { Input } from "../../ui/input";
import { Label } from "../../ui/label";

type UserCardProps = {
  user: User;
};

export function UserCard({ user }: UserCardProps) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <div className="p-4 border rounded-md flex min-w-[200px]  min-h-[200px] flex-col items-start justify-between gap-4 text-wrap">
          <h1 className="font-semibold">{user.nome}</h1>
          <p>{user.email}</p>
          <Button>Ver mais</Button>
        </div>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <div className="flex items-start justify-start flex-col gap-4 py-4">
          <div className="flex items-start justify-start flex-col">
            <span className="font-semibold text-base">Id</span>
            <span className="text-sm">{user._id}</span>
          </div>
          <div className="flex items-start justify-start flex-col">
            <span className="font-semibold text-base">email</span>
            <span className="text-sm">{user.email}</span>
          </div>
          <div className="flex items-start justify-start flex-col">
            <span className="font-semibold text-base">nome</span>
            <span className="text-sm">{user.nome}</span>
          </div>
          <div className="flex items-start justify-start flex-col">
            <span className="font-semibold text-base">pais</span>
            <span className="text-sm">{user.pais}</span>
          </div>
          <div className="flex items-start justify-start flex-col">
            <span className="font-semibold text-base">estado</span>
            <span className="text-sm">{user.estado}</span>
          </div>
          <div className="flex items-start justify-start flex-col">
            <span className="font-semibold text-base">cidade</span>
            <span className="text-sm">{user.cidade}</span>
          </div>
          <div className="flex items-start justify-start flex-col">
            <span className="font-semibold text-base">endereco</span>
            <span className="text-sm">{user.endereco}</span>
          </div>
          <div className="flex items-start justify-start flex-col">
            <span className="font-semibold text-base">isAdmin</span>
            <span className="text-sm">{user.isAdmin ? "Sim" : "Não"}</span>
          </div>
          <div className="flex items-start justify-start flex-col">
            <span className="font-semibold text-base">isPremium</span>
            <span className="text-sm">{user.isPremium ? "Sim" : "Não"}</span>
          </div>
          <div className="flex items-start justify-start flex-col">
            <span className="font-semibold text-base">isInstructor</span>
            <span className="text-sm">{user.isInstructor ? "Sim" : "Não"}</span>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
