"use client";

import { createCoupon } from "../actions";
import type { CouponFormState } from "../actions";

import SubmitButton from "./SubmitButton";
import { useActionState } from "react";

const INITIAL_STATE: CouponFormState = {
  errors: {},
  message: "",
  status: "idle",
};

export default function CouponForm() {
  const [state, formAction] = useActionState(createCoupon, INITIAL_STATE);

  return (
    <form action={formAction}>
      <div>
        <label htmlFor="code">Code</label>
        <input id="code" name="code" type="text" />
      </div>

      <div>
        <label htmlFor="description">Description</label>
        <textarea id="description" name="description"></textarea>
      </div>

      <div>
        <label htmlFor="discount">Discount percentage</label>
        <input id="discount" name="discount" type="number" />
      </div>

      <div>
        <label htmlFor="minimumOrderValue">Minimum order value</label>
        <input id="minimumOrderValue" name="minimumOrderValue" type="number" />
      </div>

      <SubmitButton />

      {state.status === "failed" && (
        <>
          {state.errors?.code?.map((err) => (
            <div key={err}>{err}</div>
          ))}
          {state.errors?.description?.map((err) => (
            <div key={err}>{err}</div>
          ))}
          {state.errors?.discount?.map((err) => (
            <div key={err}>{err}</div>
          ))}
          {state.errors?.minimumOrderValue?.map((err) => (
            <div key={err}>{err}</div>
          ))}
        </>
      )}

      {state.status !== "idle" && <div>{state.message}</div>}
    </form>
  );
}
