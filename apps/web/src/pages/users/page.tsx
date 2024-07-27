import { useUserStore } from "../../stores/user";
import { UserCard } from "../../components/global/User/card.user.dialog";

export default function UsersPage() {
  const user = useUserStore((state) => state.user);
  const allUsers = useUserStore((state) => state.allUsers);

  return (
    <div className="w-full flex-1 min-h-screen flex items-center justify-center p-6 h-full">
      <div className="w-full min-h-40 bg-white flex-1 h-full flex flex-col items-center justify-start gap-12">
        <div className="w-full flex items-center justify-between">
          <h1 className="text-gray-950 font-semibold text-2xl">
            Usuários da plataforma
          </h1>
        </div>
        <div className="w-full flex items-center gap-10 justify-start flex-wrap">
          {allUsers?.map((u, index) => {
            if (user?._id === u._id) return null;

            return <UserCard user={u} key={index} />;
          })}
        </div>
      </div>
    </div>
  );
}
