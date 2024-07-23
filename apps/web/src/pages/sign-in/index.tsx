import AuthenticationLayout from "../../layouts/authentication-page.layout";
import SignInForm from "./sign-in.form";

export default function SignInPage() {
  return (
    <AuthenticationLayout label="sign-in">
      <SignInForm />
    </AuthenticationLayout>
  );
}
