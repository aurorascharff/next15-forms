import ActionStateForm from './ActionStateForm';
import ActionStateFormValidated from './ActionStateFormValidated';
import Conform from './Conform';
import ReactHookForm from './ReactHookForm';

export default function Home() {
  return (
    <div className="flex flex-col gap-16 p-16">
      <div>
        React Hook Form
        <ReactHookForm />
      </div>
      <div>
        Action State Form
        <ActionStateForm />
      </div>
      <div>
        Action State Form Validated
        <ActionStateFormValidated />
      </div>
      <div>
        Conform
        <Conform />
      </div>
    </div>
  );
}
