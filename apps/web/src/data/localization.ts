import { ptBR } from "@clerk/localizations";
import type { LocalizationResource } from "@clerk/types";

export const localization: LocalizationResource = {
  ...ptBR,
  formFieldLabel__emailAddress: "Email",
  formFieldLabel__password: "Senha",
  formButtonPrimary: "Continuar",
  formFieldAction__forgotPassword: "Esqueceu a senha?",
  signIn: {
    start: {
      title: "Entrar em Site de cursos",
      subtitle: "Bem vindo de volta! Faça login para continuar",
    },
    password: {
      title: "Coloque sua senha",
      subtitle: "Digite a senha associada à sua conta",
      actionLink: "Utilizar outro método",
    },
  },
  signUp: {
    start: {
      title: "Crie sua conta",
      subtitle: "Bem-vindo! Preencha suas informações para começar.",
    },
    emailCode: {
      title: "Verifique seu email",
      subtitle: "Digite o código de verificação enviado para seu e-mail",
    },
  },
};
