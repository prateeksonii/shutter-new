import { useNavigate, useParams } from "react-router-dom";
import { BiSearch } from "react-icons/bi";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { privateApi } from "../api";
import { User } from "../types/models";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useAtom } from "jotai";
import invitesAtom from "../atoms/invitesAtom";
import { useLocation } from "react-router-dom";

const searchFormValidator = z.object({
  username: z.string().min(1),
});

type SearchFormValues = z.infer<typeof searchFormValidator>;

const Right = () => {
  const navigate = useNavigate();
  const { username } = useParams();

  const { handleSubmit, register } = useForm<SearchFormValues>({
    resolver: zodResolver(searchFormValidator),
  });

  const [users, setUsers] = useState<User[]>([]);

  const [invites, setInvites] = useAtom(invitesAtom);

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
    setInvites([user, ...invites]);
    navigate(`../${user.Username}`);
  };

  if (!username) return <div>No username provided</div>;

  if (username === "new") {
    return (
      <div className="p-4">
        <nav className="relative">
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
            <ul className="menu absolute top-19 left-0 right-0 z-10 bg-base-300 rounded-box">
              {users.map((user) => (
                <li>
                  <button onClick={() => handleNewInvite(user)}>
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
      </div>
    );
  }

  return <div>right</div>;
};

export default Right;
