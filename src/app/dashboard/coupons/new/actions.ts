"use server";

import z from "zod";

export interface CouponFormState {
  errors?: {
    code?: string[];
    description?: string[];
    discount?: string[];
    minimumOrderValue?: string[];
  };
  message?: string;
  status: "idle" | "failed" | "success";
}

const CouponFormSchema = z.object({
  code: z
    .string()
    .trim()
    .min(1, { error: "Code is required!" })
    .min(3, { error: "Code must be at least 3 characters!" }),
  description: z
    .string()
    .trim()
    .nonempty({ error: "Description is required!" }),
  discount: z
    .string()
    .trim()
    .min(1, { error: "Discount is required!" })
    .pipe(
      z.coerce
        .number<string>()
        .min(1, { error: "Discount must be at least 1!" })
        .max(100, { error: "Discount must be at most 100!" }),
    ),
  minimumOrderValue: z
    .string()
    .trim()
    .min(1, { error: "Minimum order value is required" })
    .pipe(
      z.coerce
        .number<string>()
        .min(0, { error: "Value must be 0 or greater!" }),
    ),
});

export async function createCoupon(
  _prevState: CouponFormState,
  formData: FormData,
): Promise<CouponFormState> {
  const validatedFields = CouponFormSchema.safeParse({
    code: formData.get("code"),
    description: formData.get("description"),
    discount: formData.get("discount"),
    minimumOrderValue: formData.get("minimumOrderValue"),
  });

  if (!validatedFields.success) {
    return {
      errors: z.flattenError(validatedFields.error).fieldErrors,
      message: "Fix the errors!",
      status: "failed",
    };
  }

  // TODO: Save goes here if we would have an existing database...

  // TODO: revalidatePath('/coupons'), if we would have an /coupons page

  return {
    message: "Coupon saved successfully!",
    status: "success",
  };
}
