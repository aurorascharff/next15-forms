'use server';

import { parseWithZod } from '@conform-to/zod';
import { revalidatePath } from 'next/cache';
import { signInSchema } from './types';
import type { SignInFormData, SignInFormErrors } from './types';

export async function signInReactHookForm(data: SignInFormData) {
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

type ActionState = {
  error?: string;
  success: boolean;
};

export async function signInActionStateForm(_prevState: ActionState, formData: FormData) {
  const result = signInSchema.safeParse(Object.fromEntries(formData));
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

type ActionStateValidated = {
  errors?: SignInFormErrors;
  data?: SignInFormData;
  success: boolean;
};

export async function signInActionStateFormValidated(_prevState: ActionStateValidated, formData: FormData) {
  const result = signInSchema.safeParse(Object.fromEntries(formData));
  console.log('Signing in with data', result.data);

  if (!result.success) {
    return {
      data: result.data,
      errors: result.error.formErrors,
      success: false,
    };
  }

  return {
    success: true,
  };
}

export async function signInConform(_prevState: unknown, formData: FormData) {
  console.log('Signing in with data', formData);
  const submission = parseWithZod(formData, {
    schema: signInSchema,
  });

  if (submission.status !== 'success') {
    return submission.reply();
  }

  revalidatePath('/');
}
