import { FC } from "react";

type SignInFormProps = {
  setShowSignInForm: React.Dispatch<React.SetStateAction<boolean>>;
};

const SignInForm: FC<SignInFormProps> = ({ setShowSignInForm }) => {
  return (
    <div className="card-body">
      <h2 className="text-xl">Sign In</h2>
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
      </div>
      <div className="form-control mt-6 flex flex-col gap-4">
        <button className="btn btn-primary">Login</button>
        <button
          className="btn btn-outline"
          onClick={() => setShowSignInForm(false)}
        >
          Create an account
        </button>
      </div>
    </div>
  );
};

export default SignInForm;
