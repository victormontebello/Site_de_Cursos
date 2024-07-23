import { IconCheck, IconInfoCircle, IconLogout } from "@tabler/icons-react";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "../../components/ui/tabs";

import { useState } from "react";
import SettingsAccountPage from "./account";
import { Button } from "../../components/ui/button";
import { cn } from "../../lib/utils";
import Spinner from "../../components/global/spinner";
import { SignOutButton } from "@clerk/clerk-react";

const TABS_TRIGGER_STYLES =
  "items-center justify-center text-lg border shadow-md px-4 py-2 h-28 rounded-xl w-60 flex gap-2 hover:bg-gray-50 data-[state=active]:bg-gray-100";

export default function SettingsPage() {
  const [tab, setTab] = useState("profile");

  const [isConfirmingLogout, setIsConfirmingLogout] = useState(false);
  const [isLogginOut, setIsLogginOut] = useState(false);

  return (
    <Tabs
      defaultValue="info"
      value={tab}
      onValueChange={setTab}
      className="p-8 flex w-full flex-col h-full flex-1"
    >
      <div className="flex flex-col gap-8 h-full flex-1">
        <div className="flex items-start justify-center gap-6 w-full flex-col">
          <div className="w-full flex items-center justify-between gap-4">
            <div className="w-full">
              <h1 className="text-2xl font-semibold">Configurações</h1>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-6 items-start justify-between overflow-hidden">
          <div className="h-full flex justify-between items-center flex-col gap-6">
            <TabsList className="w-full grid grid-cols-2 gap-6 h-[unset] p-0 bg-transparent">
              <TabsTrigger value="profile" className={TABS_TRIGGER_STYLES}>
                <IconInfoCircle />
                <h2>Perfil</h2>
              </TabsTrigger>
              {!isConfirmingLogout && (
                <Button
                  onClick={() => setIsConfirmingLogout(true)}
                  className={cn(
                    "whitespace-nowrap text-gray-900 font-medium bg-gray-50 ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:text-foreground data-[state=active]:shadow-sm items-center justify-center text-lg border shadow-md px-4 py-2 h-28 rounded-xl w-60 flex gap-2 hover:bg-gray-50 data-[state=active]:bg-gray-100",
                    TABS_TRIGGER_STYLES
                  )}
                >
                  <IconLogout size={16} />
                  <p>Sair</p>
                </Button>
              )}
              {isConfirmingLogout && (
                <SignOutButton>
                  <Button
                    onClick={() => setIsLogginOut(true)}
                    className={cn(
                      "whitespace-nowrap text-gray-900 font-medium bg-gray-50 ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:text-foreground data-[state=active]:shadow-sm items-center justify-center text-lg border shadow-md px-4 py-2 h-28 rounded-xl w-60 flex gap-2 hover:bg-gray-50 data-[state=active]:bg-gray-100",
                      TABS_TRIGGER_STYLES
                    )}
                  >
                    {!isLogginOut && <IconCheck size={16} color="#ef4444" />}
                    {isLogginOut && <Spinner color="#ef4444" />}
                    <p className="text-red-500">Confirmar</p>
                  </Button>
                </SignOutButton>
              )}
            </TabsList>
          </div>

          <TabsContent
            value="profile"
            className={`w-full flex flex-1 h-full rounded-md border py-6 px-8 m-0  ${
              tab !== "profile" && "hidden"
            }`}
          >
            <SettingsAccountPage />
          </TabsContent>
        </div>
      </div>
    </Tabs>
  );
}
