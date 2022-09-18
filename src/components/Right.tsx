import { useAtom } from "jotai";
import { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { BiSend } from "react-icons/bi";
import { useNavigate, useParams } from "react-router-dom";
import { z } from "zod";
import { privateApi } from "../api";
import contactsAtom from "../atoms/contactsAtom";
import invitesAtom from "../atoms/invitesAtom";
import { User } from "../types/models";
import NewInviteForm from "./NewInviteForm";
import TopBar from "./TopBar";

const messageFormValidator = z.object({
  message: z.string().min(1),
});

type MessageFormValues = z.infer<typeof messageFormValidator>;

const Right = () => {
  const { username } = useParams();

  const [contacts] = useAtom(contactsAtom);
  const [invites, setInvites] = useAtom(invitesAtom);
  const [isInvite, setIsInvite] = useState(false);
  const [currentUser, setCurrentUser] = useState<User>();

  const { register, handleSubmit } = useForm<MessageFormValues>();

  useEffect(() => {
    const contact = contacts.find((contact) => contact.Username === username);

    if (contact) {
      setCurrentUser(contact);
      setIsInvite(false);
    } else {
      const invite = invites.find((invite) => invite.Username === username);

      setCurrentUser(invite);
      setIsInvite(true);
    }
  }, [username]);

  if (!username) return <div>No username provided</div>;

  const onSubmit: SubmitHandler<MessageFormValues> = async (values) => {
    if (isInvite) {
      await privateApi.post(`/api/v1/invites/${username}`, values);
    }
  };

  return (
    <div className="flex flex-col h-full">
      {username === "new" ? <NewInviteForm /> : <TopBar user={currentUser} />}

      <div className="flex-1"></div>

      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="p-4 form-control">
          <label className="input-group">
            <input
              type="text"
              placeholder="Send message..."
              className="input input-bordered w-full"
              {...register("message")}
            />
            <button type="submit" className="btn btn-primary">
              <BiSend className="text-2xl" />
            </button>
          </label>
        </div>
      </form>
    </div>
  );
};

export default Right;
