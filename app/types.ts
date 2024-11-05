import { z } from 'zod';

export const signInSchema = z.object({
  password: z.string().min(6, 'Password must be at least 6 characters'),
  username: z.string().min(3, 'Username must be at least 3 characters'),
});
export type SignInFormData = z.infer<typeof signInSchema>;

export type SignInFormErrors = z.inferFlattenedErrors<typeof signInSchema>;
