import { FC } from "react";
import { User } from "../types/models";

type TopBarProps = {
  user?: User;
};

const TopBar: FC<TopBarProps> = ({ user }) => {
  return (
    <nav className="navbar gap-4 bg-neutral-focus p-4 shadow-lg">
      <div className="avatar placeholder bg-zinc-600 rounded-full">
        <div className="w-12 text-xl">{user?.Name.at(0)}</div>
      </div>
      <div className="flex flex-col items-start">
        <div className="text-xl text-primary-content">{user?.Name}</div>
        <div>@{user?.Username}</div>
      </div>
    </nav>
  );
};

export default TopBar;
