"use client";

import { useActionState } from "react";
import { use } from "react";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { Alert } from "@/components/ui/Alert";
import { loginAction } from "@/lib/actions/auth.actions";

interface LoginFormProps {
  searchParams: Promise<{ registered?: string; reset?: string }>;
}

export const LoginForm = ({ searchParams }: LoginFormProps) => {
  const params = use(searchParams);
  const [state, action, isPending] = useActionState(loginAction, undefined);

  return (
    <form action={action} className="flex flex-col gap-4">
      {params.registered && (
        <Alert
          type="success"
          message="Account created! Please verify your email before logging in."
        />
      )}
      {params.reset && (
        <Alert
          type="success"
          message="Password reset successful. You can now log in."
        />
      )}
      {state && !state.success && (
        <Alert type="error" message={state.message} />
      )}
      <Input
        id="email"
        name="email"
        label="Email address"
        type="email"
        placeholder="john@example.com"
        required
      />
      <Input
        id="password"
        name="password"
        label="Password"
        type="password"
        placeholder="••••••••"
        required
      />
      <Button loading={isPending} type="submit">
        Sign in
      </Button>
    </form>
  );
};
