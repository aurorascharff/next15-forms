'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { signIn1 } from './actions';
import { signInSchema } from './types';
import type { SignInFormData } from './types';

function SignInForm1() {
  const {
    formState: { errors, isSubmitting },
    handleSubmit,
    register,
  } = useForm<SignInFormData>({
    resolver: zodResolver(signInSchema),
  });

  async function onSubmit(data: SignInFormData) {
    console.log(data);
    try {
      await signIn1(data);
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <label htmlFor="username">Username</label>
        <input id="username" type="text" {...register('username')} />
        {errors.username && <span>{errors.username.message}</span>}
      </div>

      <div>
        <label htmlFor="password">Password</label>
        <input id="password" type="password" {...register('password')} />
        {errors.password && <span>{errors.password.message}</span>}
      </div>

      <button type="submit" disabled={isSubmitting}>
        {isSubmitting ? 'Signing in...' : 'Sign In'}
      </button>
    </form>
  );
}

export default SignInForm1;
