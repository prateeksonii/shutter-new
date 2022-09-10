import { FC } from "react";

type SignUpFormProps = {
  setShowSignInForm: React.Dispatch<React.SetStateAction<boolean>>;
};

const SignUpForm: FC<SignUpFormProps> = ({ setShowSignInForm }) => {
  return (
    <div className="card-body">
      <h2 className="text-xl">Create an account</h2>
      <div className="form-control">
        <label className="label">
          <span className="label-text">Full name</span>
        </label>
        <input
          type="text"
          placeholder="John Doe"
          className="input input-bordered"
        />
      </div>
      <div className="form-control">
        <label className="label">
          <span className="label-text">Username</span>
        </label>
        <input
          type="text"
          placeholder="jonhndoe"
          className="input input-bordered"
        />
      </div>
      <div className="form-control">
        <label className="label">
          <span className="label-text">Password</span>
        </label>
        <input
          type="password"
          placeholder="********"
          className="input input-bordered"
        />
        <label className="label">
          <span className="label-text-alt">
            Password must contain atleast 4 characters.
          </span>
        </label>
      </div>
      <div className="form-control flex flex-col gap-4">
        <button className="btn btn-primary">Create an account</button>
        <button
          className="btn btn-outline"
          onClick={() => setShowSignInForm(true)}
        >
          Already registered? Login
        </button>
      </div>
    </div>
  );
};

export default SignUpForm;
