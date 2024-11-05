'use client';

import { useActionState } from 'react';
import { signIn2 } from './actions';

function SignInForm2() {
  const [state, formAction, isPending] = useActionState(signIn2, {
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

export default SignInForm2;
