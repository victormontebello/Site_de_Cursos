import AuthenticationLayout from "../../layouts/authentication-page.layout";
import SignUpForm from "./sign-up.form";

export default function SignUpPage() {
  return (
    <AuthenticationLayout label="sign-up">
      <SignUpForm />
    </AuthenticationLayout>
  );
}
