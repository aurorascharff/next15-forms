'use server';

import { parseWithZod } from '@conform-to/zod';
import { revalidatePath } from 'next/cache';
import { signInSchema } from './types';
import type { SignInFormData } from './types';

export async function signIn1(data: SignInFormData) {
  console.log('Signing in with data', data);
  const result = signInSchema.safeParse(data);

  if (!result.success) {
    return {
      error: 'Invalid form data',
      success: false,
    };
  }

  console.log('Sign in successful');
  return {
    success: true,
  };
}

type State = {
  error?: string;
  success: boolean;
};

export async function signIn2(prevState: State, data: FormData) {
  const result = signInSchema.safeParse(Object.fromEntries(data));
  console.log('Signing in with data', result.data);

  if (!result.success) {
    return {
      error: 'Invalid form data',
      success: false,
    };
  }

  return {
    success: true,
  };
}

export async function signIn3(_prevState: unknown, formData: FormData) {
  console.log('Signing in with data', formData);
  const submission = parseWithZod(formData, {
    schema: signInSchema,
  });

  if (submission.status !== 'success') {
    return submission.reply();
  }

  revalidatePath('/');
}
