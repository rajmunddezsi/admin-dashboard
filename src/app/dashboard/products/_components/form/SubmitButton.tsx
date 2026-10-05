"use client";

import { useFormStatus } from "react-dom";

interface SubmitButtonProps {
  label?: string;
  pendingLabel?: string;
}

export default function SubmitButton({
  label = "Submit",
  pendingLabel = "Please wait",
}: SubmitButtonProps) {
  const { pending } = useFormStatus();

  return (
    <button type="submit" disabled={pending}>
      {pending ? pendingLabel : label}
    </button>
  );
}
