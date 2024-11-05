'use client';

import { getFormProps, getInputProps, useForm } from '@conform-to/react';
import { parseWithZod } from '@conform-to/zod';
import { useActionState } from 'react';
import { useFormStatus } from 'react-dom';
import { signIn3 } from './actions';
import { signInSchema } from './types';

export default function SignInForm3() {
  const [lastResult, action] = useActionState(signIn3, undefined);
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
        <input {...getInputProps(fields.username, { type: 'text' })} id="username" type="text" />
        <span>{fields.username.errors}</span>
      </div>

      <div>
        <label htmlFor="password">Password</label>
        <input {...getInputProps(fields.password, { type: 'text' })} id="password" type="password" />
        <span>{fields.password.errors}</span>
      </div>
      <SubmitButton />
    </form>
  );
}

function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <button
      onClick={() => {
        console.log('Signing in...');
      }}
      type="submit"
      disabled={pending}
    >
      {pending ? 'Signing in...' : 'Sign In'}
    </button>
  );
}
