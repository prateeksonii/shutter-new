import { useState } from "react";
import SignInForm from "../components/SignInForm";
import SignUpForm from "../components/SignUpForm";

const Home = () => {
  const [showSignInForm, setShowSignInForm] = useState(true);

  return (
    <div className="mx-auto container min-h-screen flex items-center">
      <div className="h-full grid grid-cols-[2fr_1fr] w-full gap-8">
        <div className="text-primary-content">
          <h1 className="text-6xl">Shutter</h1>
          <p className="text-2xl text-neutral-content">
            A messenger that features privacy and security.
          </p>
          <div className="mt-4">
            <button className="btn btn-primary">Get started</button>
          </div>
        </div>
        <div className="card bg-base-300 shadow-2xl w-full">
          {showSignInForm ? (
            <SignInForm setShowSignInForm={setShowSignInForm} />
          ) : (
            <SignUpForm setShowSignInForm={setShowSignInForm} />
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;
