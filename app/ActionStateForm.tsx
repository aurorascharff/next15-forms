'use client';

import { useActionState } from 'react';
import { signInActionStateForm } from './actions';

export default function ActionStateForm() {
  const [state, formAction, isPending] = useActionState(signInActionStateForm, {
    error: undefined,
    success: false,
  });

  return (
    <form action={formAction}>
      <div>
        <label htmlFor="username">Username</label>
        <input id="username" name="username" type="text" />
      </div>

      <div>
        <label htmlFor="password">Password</label>
        <input id="password" name="password" type="password" />
      </div>

      {state?.error && <span>{state.error}</span>}

      <button type="submit" disabled={isPending}>
        {isPending ? 'Signing in...' : 'Sign In'}
      </button>
    </form>
  );
}
