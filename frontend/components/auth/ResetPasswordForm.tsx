"use client";

import { useActionState } from "react";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { Alert } from "@/components/ui/Alert";
import { resetPasswordAction } from "@/lib/actions/auth.actions";

export const ResetPasswordForm = ({ token }: { token: string }) => {
  const action = resetPasswordAction.bind(null, token);
  const [state, formAction, isPending] = useActionState(action, undefined);

  return (
    <form action={formAction} className="flex flex-col gap-4">
      {state && !state.success && (
        <Alert type="error" message={state.message} />
      )}
      <Input
        id="password"
        name="password"
        label="New password"
        type="password"
        placeholder="••••••••"
        required
      />
      <Button loading={isPending} type="submit">
        Reset password
      </Button>
    </form>
  );
};
