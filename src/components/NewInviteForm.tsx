import { BiSearch } from "react-icons/bi";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { privateApi } from "../api";
import { User } from "../types/models";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAtom } from "jotai";
import invitesAtom from "../atoms/invitesAtom";
import activeTabAtom from "../atoms/activeTabAtom";

const searchFormValidator = z.object({
  username: z.string().min(1),
});

type SearchFormValues = z.infer<typeof searchFormValidator>;

const useNewInviteForm = () => {
  const navigate = useNavigate();
  const [invites, setInvites] = useAtom(invitesAtom);
  const [, setActiveTab] = useAtom(activeTabAtom);
  const [users, setUsers] = useState<User[]>([]);

  const { handleSubmit, register } = useForm<SearchFormValues>({
    resolver: zodResolver(searchFormValidator),
  });

  const { mutateAsync } = useMutation(async (values: SearchFormValues) => {
    try {
      const res = await privateApi.get("/api/v1/users", {
        params: {
          username: values.username,
        },
      });

      return res.data.users as User[];
    } catch (err) {
      return [];
    }
  });

  const onSubmit: SubmitHandler<SearchFormValues> = async (values) => {
    const users = await mutateAsync(values);
    setUsers(users);
  };

  const handleNewInvite = (user: User) => {
    setActiveTab("invites");
    if (!invites.some((invite) => invite.Username === user.Username)) {
      setInvites([user, ...invites]);
    }
    navigate(`../${user.Username}`);
  };

  return { register, handleSubmit, onSubmit, users, handleNewInvite };
};

const NewInviteForm = () => {
  const { handleNewInvite, handleSubmit, onSubmit, register, users } =
    useNewInviteForm();

  return (
    <nav className="p-2 navbar relative">
      <form className="w-full" onSubmit={handleSubmit(onSubmit)}>
        <div className="form-control w-full">
          <div className="input-group">
            <input
              type="text"
              placeholder="Search by username"
              className="input input-bordered w-full"
              {...register("username")}
            />
            <button className="btn btn-ghost btn-square" type="submit">
              <BiSearch className="text-2xl" />
            </button>
          </div>
          <label className="label self-start">
            <span className="label-text-alt">Press Enter to search</span>
          </label>
        </div>
      </form>

      {users.length > 0 && (
        <ul className="menu absolute top-24 left-2 right-2 z-10 bg-base-300 rounded-box">
          {users.map((user) => (
            <li className="self-start w-full" key={user.ID}>
              <button
                onClick={() => handleNewInvite(user)}
                className="text-left w-full"
              >
                <div className="flex items-baseline gap-2">
                  <div className="text-lg text-primary-content">
                    {user.Name}
                  </div>
                  <div>@{user.Username}</div>
                </div>
              </button>
            </li>
          ))}
        </ul>
      )}
    </nav>
  );
};

export default NewInviteForm;
