import { z } from 'zod';

type RegisterSchemaMessages = {
  invalidEmail: string;
  passwordMin: string;
  fullNameRequired: string;
  passwordMismatch: string;
};

export function createRegisterSchema(messages: RegisterSchemaMessages) {
  return z
    .object({
      fullName: z.string().min(1, messages.fullNameRequired),
      email: z.string().email(messages.invalidEmail),
      phone: z.string().optional(),
      password: z.string().min(8, messages.passwordMin),
      confirmPassword: z.string().min(8, messages.passwordMin)
    })
    .refine((values) => values.password === values.confirmPassword, {
      message: messages.passwordMismatch,
      path: ['confirmPassword']
    });
}

export type RegisterFormValues = z.infer<ReturnType<typeof createRegisterSchema>>;
