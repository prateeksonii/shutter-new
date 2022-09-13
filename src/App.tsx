import { useQuery } from "@tanstack/react-query";
import { useAtom } from "jotai";
import {
  BrowserRouter,
  Navigate,
  Outlet,
  Route,
  Routes,
} from "react-router-dom";
import { privateApi } from "./api";
import userAtom from "./atoms/userAtom";
import Chat from "./routes/Chat";
import Home from "./routes/Home";
import { User } from "./types/models";

const PublicRoute = () => {
  const [user] = useAtom(userAtom);

  if (user) {
    return <Navigate to="/chat" replace />;
  }

  return <Outlet />;
};

const PrivateRoute = () => {
  const [user] = useAtom(userAtom);

  if (!user) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
};

const App = () => {
  const [, setUser] = useAtom(userAtom);

  const { isLoading, isError } = useQuery(
    ["auth.me"],
    async () => {
      try {
        const res = await privateApi.get("/api/v1/auth/me");
        if (res.data.error) return null;
        setUser(res.data.user as User);
        return {};
      } catch (err) {
        return null;
      }
    },
    {
      retry: false,
    }
  );

  if (isLoading) return <div>Loading...</div>;

  if (isError) return <div>Something went wrong...</div>;

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<PublicRoute />}>
          <Route path="" element={<Home />} />
        </Route>
        <Route path="/chat" element={<PrivateRoute />}>
          <Route path="" element={<Chat />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
