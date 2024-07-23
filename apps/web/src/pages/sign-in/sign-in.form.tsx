import { SignIn } from "@clerk/clerk-react";

export default function SignInForm() {
  return (
    <SignIn
      routing="hash"
      signUpUrl="/sign-up"
      fallbackRedirectUrl={"/home"}
      appearance={{
        elements: {
          footerAction__signIn: "hidden",
          footer: "",
        },
      }}
    />
  );
}
