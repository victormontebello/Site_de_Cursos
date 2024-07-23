import { SignUp } from "@clerk/clerk-react";

export default function SignUpForm() {
  return (
    <SignUp
      routing="hash"
      signInUrl="/sign-in"
      fallbackRedirectUrl={"/home"}
      appearance={{
        elements: {
          footerAction__signUp: "hidden",
          footer: "",
        },
      }}
    />
  );
}
