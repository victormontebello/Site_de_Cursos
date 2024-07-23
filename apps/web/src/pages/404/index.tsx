import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AuthLayout from "../../layouts/auth.layout";
export default function NotFoundPage() {
  const navigate = useNavigate();

  useEffect(() => {
    navigate("/home");
  });

  return <AuthLayout></AuthLayout>;
}
