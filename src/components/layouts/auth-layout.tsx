import { FC } from "react";
import Image from "next/image";
import { AuthLayoutProps } from "@/interfaces";

export const AuthLayout: FC<AuthLayoutProps> = ({
  children,
  title = "Hi, Welcome back",
}) => {
  return (
    <div className="flex min-h-screen">
      <div className="hidden lg:flex lg:w-1/4 bg-gray-50 flex-col justify-between p-12">
        <div className="flex items-center justify-center flex-col flex-1 gap-8">
          <div className="flex flex-col">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">{title}</h1>
            <p className="text-gray-600 text-sm">
              More effectively with optimized workflows.
            </p>
          </div>

          <Image
            width={0}
            height={0}
            loading="eager"
            src="/assets/auth/welcome.svg"
            alt="Dashboard illustration"
            className="max-w-md w-full"
            draggable={false}
          />
        </div>
      </div>

      <div className="flex-1 flex items-center justify-center p-8 bg-white">
        <div className="w-full max-w-md">{children}</div>
      </div>
    </div>
  );
};
