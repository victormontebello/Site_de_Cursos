import { Link, useLocation } from "react-router-dom";

import { Sheet, SheetContent, SheetTrigger } from "../../ui/sheet";
import { Button } from "../../ui/button";

import {
  IconBuildingStore,
  IconHistory,
  IconNotes,
  IconSettings,
} from "@tabler/icons-react";
import { Package2, PanelLeft } from "lucide-react";
import { cn } from "../../../lib/utils";

export default function LeftNavBarMobile() {
  const { pathname } = useLocation();

  const isOrdersRoutes = pathname.includes("/orders");
  const isHistoryRoutes = pathname.includes("/history");
  const isBussinessRoutes = pathname.includes("/bussiness");
  const isSettingsRoutes = pathname.includes("/settings");

  return (
    <header className="sticky top-0 z-30 flex min-h-14 items-center gap-4 border-b bg-background sm:static sm:h-auto sm:border-0 sm:bg-transparent px-8 py-4 sm:hidden">
      <Sheet>
        <SheetTrigger asChild>
          <Button size="icon" variant="outline" className="sm:hidden">
            <PanelLeft className="h-5 w-5" />
            <span className="sr-only">Toggle Menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="sm:max-w-xs">
          <nav className="grid gap-6 text-lg font-medium">
            <div className="group flex h-10 w-10 shrink-0 items-center justify-center gap-2 rounded-full bg-primary text-lg font-semibold text-primary-foreground md:text-base">
              <Package2 className="h-5 w-5 transition-all group-hover:scale-110" />
              <span className="sr-only">Cursos +</span>
            </div>
            <Link
              to="/orders"
              className={cn(
                "flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground",
                {
                  "text-foreground": isOrdersRoutes,
                }
              )}
            >
              <IconNotes size={24} />
              <span>Pedidos</span>
            </Link>
            <Link
              to="/history"
              className={cn(
                "flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground",
                {
                  "text-foreground": isHistoryRoutes,
                }
              )}
            >
              <IconHistory size={24} />
              <span>Histórico</span>
            </Link>
            <Link
              to="/bussiness"
              className={cn(
                "flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground",
                {
                  "text-foreground": isBussinessRoutes,
                }
              )}
            >
              <IconBuildingStore size={24} />
              <span>Empresa</span>
            </Link>

            <Link
              to="/settings"
              className={cn(
                "flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground",
                {
                  "text-foreground": isSettingsRoutes,
                }
              )}
            >
              <IconSettings size={24} />
              <span>Configurações</span>
            </Link>
          </nav>
        </SheetContent>
      </Sheet>
    </header>
  );
}
