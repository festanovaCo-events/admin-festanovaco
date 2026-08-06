"use client";

import { LoginForm } from "@/features/auth/login/components/login-form";
import { useLogin } from "@/features/auth/login/hooks/use-login";

const LoginPage = () => {
  const props = useLogin();
  return <LoginForm {...props} />;
};

export default LoginPage;
