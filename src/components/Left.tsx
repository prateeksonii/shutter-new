import { useAtom } from "jotai";
import userAtom from "../atoms/userAtom";

const Left = () => {
  const [user] = useAtom(userAtom);

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
      </div>
    </div>
  );
};

export default Left;
