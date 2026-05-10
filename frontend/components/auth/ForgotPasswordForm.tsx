"use client";

import { useActionState } from "react";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { Alert } from "@/components/ui/Alert";
import { forgotPasswordAction } from "@/lib/actions/auth.actions";

export const ForgotPasswordForm = () => {
  const [state, action, isPending] = useActionState(
    forgotPasswordAction,
    undefined,
  );

  return (
    <form action={action} className="flex flex-col gap-4">
      {state && (
        <Alert
          type={state.success ? "success" : "error"}
          message={state.message}
        />
      )}
      <Input
        id="email"
        name="email"
        label="Email address"
        type="email"
        placeholder="john@example.com"
        required
      />
      <Button loading={isPending} type="submit">
        Send reset link
      </Button>
    </form>
  );
};
