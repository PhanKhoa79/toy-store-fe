import { z } from 'zod';

type LoginSchemaMessages = {
  invalidEmail: string;
  passwordMin: string;
};

export function createLoginSchema(messages: LoginSchemaMessages) {
  return z.object({
    email: z.string().email(messages.invalidEmail),
    password: z.string().min(8, messages.passwordMin)
  });
}

export type LoginFormValues = z.infer<ReturnType<typeof createLoginSchema>>;
