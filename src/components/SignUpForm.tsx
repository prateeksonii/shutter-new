import { FC } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { publicApi } from "../api";

type SignUpFormProps = {
  setShowSignInForm: React.Dispatch<React.SetStateAction<boolean>>;
};

const signUpValidator = z.object({
  name: z.string().min(1, "Name cannot be empty"),
  username: z.string().min(4, "Username is too short"),
  password: z.string().min(4, "Password is too short"),
});

type SignUpFormValues = z.infer<typeof signUpValidator>;

const SignUpForm: FC<SignUpFormProps> = ({ setShowSignInForm }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignUpFormValues>({
    resolver: zodResolver(signUpValidator),
  });

  const { mutateAsync } = useMutation(async (data: SignUpFormValues) =>
    publicApi.post("/api/v1/users", data)
  );

  const onSubmit: SubmitHandler<SignUpFormValues> = async (values) => {
    await mutateAsync(values);
    setShowSignInForm(true);
  };

  return (
    <div className="card-body">
      <h2 className="text-xl">Create an account</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="form-control">
          <label className="label">
            <span className="label-text">Full name</span>
          </label>
          <input
            type="text"
            placeholder="John Doe"
            className="input input-bordered"
            {...register("name")}
          />
          {errors.name && (
            <label className="label">
              <span className="label-text-alt text-error">
                {errors.name.message}
              </span>
            </label>
          )}
        </div>
        <div className="form-control">
          <label className="label">
            <span className="label-text">Username</span>
          </label>
          <input
            type="text"
            placeholder="jonhndoe"
            className="input input-bordered"
            {...register("username")}
          />
          {errors.username && (
            <label className="label">
              <span className="label-text-alt text-error">
                {errors.username.message}
              </span>
            </label>
          )}
        </div>
        <div className="form-control">
          <label className="label">
            <span className="label-text">Password</span>
          </label>
          <input
            type="password"
            placeholder="********"
            className="input input-bordered"
            {...register("password")}
          />

          {errors.password ? (
            <label className="label">
              <span className="label-text-alt text-error">
                {errors.password.message}
              </span>
            </label>
          ) : (
            <label className="label">
              <span className="label-text-alt">
                Password must contain atleast 4 characters.
              </span>
            </label>
          )}
        </div>
        <div className="form-control flex flex-col gap-4">
          <button className="btn btn-primary" type="submit">
            Create an account
          </button>
          <button
            className="btn btn-outline"
            onClick={() => setShowSignInForm(true)}
          >
            Already registered? Login
          </button>
        </div>
      </form>
    </div>
  );
};

export default SignUpForm;
