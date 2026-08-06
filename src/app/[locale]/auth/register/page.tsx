"use client";

import { RegisterForm } from "@/features/auth/register/components/register-form";
import { useRegister } from "@/features/auth/register/hooks/use-register";

const RegisterPage = () => {
  const props = useRegister();
  return <RegisterForm {...props} />;
};

export default RegisterPage;
