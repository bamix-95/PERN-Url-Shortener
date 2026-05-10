"use client";

import { useActionState } from "react";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { Alert } from "@/components/ui/Alert";
import { registerAction } from "@/lib/actions/auth.actions";

export const RegisterForm = () => {
  const [state, action, isPending] = useActionState(registerAction, undefined);

  return (
    <form action={action} className="flex flex-col gap-4">
      {state && !state.success && (
        <Alert type="error" message={state.message} />
      )}
      <Input
        id="name"
        name="name"
        label="Full name"
        type="text"
        placeholder="John Doe"
        required
      />
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
        Create account
      </Button>
    </form>
  );
};
