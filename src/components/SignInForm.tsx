import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { FC } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";
import { publicApi } from "../api";

type SignInFormProps = {
  setShowSignInForm: React.Dispatch<React.SetStateAction<boolean>>;
};

const signInValidator = z.object({
  username: z.string().min(4, "Username is too short"),
  password: z.string().min(4, "Password is too short"),
});

type SignInFormValues = z.infer<typeof signInValidator>;

const SignInForm: FC<SignInFormProps> = ({ setShowSignInForm }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignInFormValues>({
    resolver: zodResolver(signInValidator),
  });

  const queryClient = useQueryClient();

  const { mutateAsync } = useMutation(async (data: SignInFormValues) => {
    const res = await publicApi.post("/api/v1/auth/signin", data);
    localStorage.setItem("shutter_token", res.data.token);
  });

  const onSubmit: SubmitHandler<SignInFormValues> = async (values) => {
    await mutateAsync(values);
    setShowSignInForm(false);
    queryClient.invalidateQueries(["auth.me"]);
  };

  return (
    <div className="card-body">
      <h2 className="text-xl">Sign In</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
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
          {errors.password && (
            <label className="label">
              <span className="label-text-alt text-error">
                {errors.password.message}
              </span>
            </label>
          )}
        </div>
        <div className="form-control mt-6 flex flex-col gap-4">
          <button className="btn btn-primary" type="submit">
            Sign In
          </button>
          <button
            className="btn btn-outline"
            onClick={() => setShowSignInForm(false)}
          >
            Create an account
          </button>
        </div>
      </form>
    </div>
  );
};

export default SignInForm;
