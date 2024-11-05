import SignInForm1 from './SignInForm1';
import SignInForm2 from './SignInForm2';
import SignInForm3 from './SignInForm3';

export default function Home() {
  return (
    <div className="flex flex-col gap-16 p-16">
      <SignInForm1 />
      <SignInForm2 />
      <SignInForm3 />
    </div>
  );
}
