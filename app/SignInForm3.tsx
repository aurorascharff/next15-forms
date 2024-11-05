'use client';

import { getFormProps, getInputProps, useForm } from '@conform-to/react';
import { parseWithZod } from '@conform-to/zod';
import { useActionState } from 'react';
import { signIn3 } from './actions';
import { signInSchema } from './types';

export default function SignInForm3() {
  const [lastResult, action, isPending] = useActionState(signIn3, undefined);
  const [form, fields] = useForm({
    lastResult,
    onValidate({ formData }: { formData: FormData }) {
      return parseWithZod(formData, { schema: signInSchema });
    },
    shouldRevalidate: 'onInput',
    shouldValidate: 'onBlur',
  });

  return (
    <form action={action} {...getFormProps(form)}>
      <div>
        <label htmlFor="username">Username</label>
        <input {...getInputProps(fields.username, { type: 'text' })} key={fields.username.key} />
        <span>{fields.username.errors}</span>
      </div>

      <div>
        <label htmlFor="password">Password</label>
        <input {...getInputProps(fields.password, { type: 'text' })} key={fields.password.key} />
        <span>{fields.password.errors}</span>
      </div>

      <button type="submit" disabled={isPending}>
        {isPending ? 'Signing in...' : 'Sign In'}
      </button>
    </form>
  );
}
