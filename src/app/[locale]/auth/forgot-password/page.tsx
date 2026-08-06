"use client";

import { ForgotPasswordForm } from "@/features/auth/forgot-password/components/forgot-password-form";
import { useForgotPassword } from "@/features/auth/forgot-password/hooks/use-forgot-password";

const ForgotPasswordPage = () => {
  const props = useForgotPassword();
  return <ForgotPasswordForm {...props} />;
};

export default ForgotPasswordPage;
