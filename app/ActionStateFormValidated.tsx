'use client';

import { useActionState } from 'react';
import { signInActionStateFormValidated } from './actions';
import type { SignInFormData, SignInFormErrors } from './types';

export default function ActionStateFormValidated() {
  const [state, formAction, isPending] = useActionState(signInActionStateFormValidated, {
    data: {} as SignInFormData,
    errors: {} as SignInFormErrors,
    success: false,
  });

  return (
    <form action={formAction}>
      <div>
        <label htmlFor="username">Username</label>
        <input defaultValue={state.data?.username} id="username" name="username" type="text" />
        {state.errors?.fieldErrors?.username && <span>{state.errors?.fieldErrors?.username}</span>}
      </div>

      <div>
        <label htmlFor="password">Password</label>
        <input defaultValue={state.data?.password} id="password" name="password" type="password" />
        {state.errors?.fieldErrors?.password && <span>{state.errors?.fieldErrors?.password}</span>}
      </div>

      <button type="submit" disabled={isPending}>
        {isPending ? 'Signing in...' : 'Sign In'}
      </button>
    </form>
  );
}
