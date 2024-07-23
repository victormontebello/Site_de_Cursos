import { Link } from "react-router-dom";
import { cn } from "../lib/utils";

type AuthenticationLayoutProps = {
  children: React.ReactNode;
  label: "sign-in" | "sign-up";
};

export default function AuthenticationLayout({
  children,
  label,
}: AuthenticationLayoutProps) {
  const buttonLabel = label.includes("sign-in") ? "Cadastrar" : "Login";
  const buttonLink = label.includes("sign-in") ? "/sign-up" : "/sign-in";

  return (
    <>
      <div className="container relative h-screen flex flex-col items-center justify-center md:grid lg:max-w-none lg:grid-cols-2 lg:px-0">
        <Link
          to={buttonLink}
          className={cn(
            "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2",
            "bg-gray-800 hover:bg-gray-900 absolute right-4 top-4 md:right-8 md:top-8"
          )}
        >
          {buttonLabel}
        </Link>
        <div className="relative hidden h-full flex-col bg-muted p-10 text-white dark:border-r lg:flex">
          <div className="absolute inset-0 bg-gradient-to-br from-zinc-800 via-black to-zinc-800" />
          <div className="relative z-20 flex items-center text-lg font-medium">
            <h1>Site de cursos</h1>
          </div>
        </div>
        <div className="lg:p-8">
          <div className="mx-auto flex w-full flex-col items-center justify-center space-y-6 sm:w-[350px]">
            {children}
            <p className="px-8 text-center text-sm text-muted-foreground">
              Ao clicar em continuar, você concorda com nossos{" "}
              <Link
                to="/terms"
                className="underline underline-offset-4 hover:text-primary"
              >
                Termos de serviço
              </Link>{" "}
              e{" "}
              <Link
                to="/privacy"
                className="underline underline-offset-4 hover:text-primary"
              >
                Política de Privacidade
              </Link>
              .
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
