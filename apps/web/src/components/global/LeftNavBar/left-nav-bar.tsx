import { Link, useLocation } from "react-router-dom";

import {
  IconHome,
  IconList,
  IconSettings,
  IconUsers,
} from "@tabler/icons-react";
import { Tooltip, TooltipContent, TooltipTrigger } from "../../ui/tooltip";
import { cn } from "../../../lib/utils";
import { useUserStore } from "../../../stores/user";

export default function LeftNavBar() {
  const user = useUserStore((state) => state.user);

  const { pathname } = useLocation();

  const isHomeRoutes = pathname.includes("/home");
  const isCoursesRoutes = pathname.includes("/courses");
  const isSettingsRoutes = pathname.includes("/settings");
  const isUsersRoutes = pathname.includes("/users");

  return (
    <aside className="fixed inset-y-0 left-0 z-10 hidden w-[72px] flex-col border-r bg-background sm:flex">
      <nav className="flex flex-col items-center gap-4 px-2 sm:py-6">
        <Tooltip>
          <TooltipTrigger asChild>
            <Link
              to="/home"
              className={cn(
                "flex items-center p-2 justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground ",
                {
                  "bg-accent text-accent-foreground  border": isHomeRoutes,
                }
              )}
            >
              <IconHome size={24} />
              <span className="sr-only">Início</span>
            </Link>
          </TooltipTrigger>
          <TooltipContent side="right">Início</TooltipContent>
        </Tooltip>
        <Tooltip>
          <TooltipTrigger asChild>
            <Link
              to="/courses"
              className={cn(
                "flex items-center p-2 justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground ",
                {
                  "bg-accent text-accent-foreground  border": isCoursesRoutes,
                }
              )}
            >
              <IconList size={24} />
              <span className="sr-only">Cursos</span>
            </Link>
          </TooltipTrigger>
          <TooltipContent side="right">Cursos</TooltipContent>
        </Tooltip>
      </nav>
      <nav className="mt-auto flex flex-col items-center gap-4 px-2 sm:py-6">
        {user?.isAdmin && (
          <Tooltip>
            <TooltipTrigger asChild>
              <Link
                to="/users"
                className={cn(
                  "flex items-center p-2 justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground ",
                  {
                    "bg-accent text-accent-foreground border": isUsersRoutes,
                  }
                )}
              >
                <IconUsers size={24} />
                <span className="sr-only">Usuários</span>
              </Link>
            </TooltipTrigger>
            <TooltipContent side="right">Usuários</TooltipContent>
          </Tooltip>
        )}

        <Tooltip>
          <TooltipTrigger asChild>
            <Link
              to="/settings"
              className={cn(
                "flex items-center p-2 justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground ",
                {
                  "bg-accent text-accent-foreground border": isSettingsRoutes,
                }
              )}
            >
              <IconSettings size={24} />
              <span className="sr-only">Configurações</span>
            </Link>
          </TooltipTrigger>
          <TooltipContent side="right">Configurações</TooltipContent>
        </Tooltip>
      </nav>
    </aside>
  );
}
