import { useAtom } from "jotai";
import { useState } from "react";
import { NavLink } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { Link } from "react-router-dom";
import invitesAtom from "../atoms/invitesAtom";
import userAtom from "../atoms/userAtom";

const Left = () => {
  const [user] = useAtom(userAtom);
  const location = useLocation();

  const [invites] = useAtom(invitesAtom);

  const [activeTab, setActiveTab] = useState<"contacts" | "invites">(
    "contacts"
  );

  if (!user) return <div>Loading...</div>;

  return (
    <div className="drawer bg-base-300">
      <div className="drawer-side">
        <div className="p-5 flex items-center gap-3 border-b-2 border-base-100">
          <div className="avatar online">
            <div className="w-10 rounded-full !grid place-items-center bg-primary-focus text-white">
              {user.Name[0]}
            </div>
          </div>
          <h4 className="font-sans font-medium text-xl">{user.Name}</h4>
        </div>
        <ul className="menu">
          <Link to="new">
            <li>
              <button
                className={`${
                  location.pathname === "/chat/new" ? "active" : ""
                } btn btn-link rounded-none`}
                disabled={location.pathname === "/chat/new"}
              >
                New chat
              </button>
            </li>
          </Link>
          <li>
            <div className="tabs justify-center tabs-boxed">
              <button
                className={`tab flex-1 ${
                  activeTab === "contacts" ? "tab-active" : ""
                }`}
                onClick={() => setActiveTab("contacts")}
              >
                Contacts
              </button>
              <button
                className={`tab flex-1 ${
                  activeTab === "invites" ? "tab-active" : ""
                }`}
                onClick={() => setActiveTab("invites")}
              >
                Invites
              </button>
            </div>
          </li>
          {activeTab === "contacts"
            ? null
            : invites.map((invite) => (
                <li key={invite.ID}>
                  <NavLink to={`/chat/${invite.Username}`}>
                    {invite.Name}
                  </NavLink>
                </li>
              ))}
        </ul>
      </div>
    </div>
  );
};

export default Left;
