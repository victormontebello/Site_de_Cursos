import { Separator } from "../../../components/ui/separator.js";
import { AccountForm } from "./account-form.js";

export default function SettingsAccountPage() {
  return (
    <div className="w-full space-y-6">
      <div>
        <h3 className="text-lg font-medium">Perfil</h3>
        <p className="text-sm text-muted-foreground">
          Essas são as informações do seu perfil de usuário na plataforma Cursos
          +
        </p>
      </div>
      <Separator />
      <AccountForm />
    </div>
  );
}
