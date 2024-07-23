import * as React from "react";
import { useAuth } from "@clerk/clerk-react";
import { Outlet, useNavigate } from "react-router-dom";
import InitialLoadingScreen from "../components/global/initial-loading-screen";
import LeftNavBar from "../components/global/LeftNavBar/left-nav-bar";
import LeftNavBarMobile from "../components/global/LeftNavBar/left-nav-bar-mobile";
import { useUserSubscription } from "../stores/user";

const Subscriptions = () => {
  useUserSubscription();
  return <></>;
};

export default function AuthLayout() {
  const { userId, isLoaded } = useAuth();
  const navigate = useNavigate();

  React.useEffect(() => {
    if (isLoaded && !userId) {
      navigate("/sign-in");
    }
  }, [isLoaded, navigate, userId]);

  if (!isLoaded) return <InitialLoadingScreen />;

  return (
    <>
      <Subscriptions />

      <div className="w-full flex min-h-screen">
        <LeftNavBar />
        <div className="flex flex-col w-full sm:pl-[72px] flex-1 gap-4">
          <LeftNavBarMobile />
          <div className=" h-full ">
            <Outlet />
          </div>
        </div>
      </div>
    </>
  );
}
