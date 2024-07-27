import * as React from "react";
import { useAuth, useUser } from "@clerk/clerk-react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import InitialLoadingScreen from "../components/global/initial-loading-screen";
import LeftNavBar from "../components/global/LeftNavBar/left-nav-bar";
import LeftNavBarMobile from "../components/global/LeftNavBar/left-nav-bar-mobile";
import { useUserStore, useUserSubscription } from "../stores/user";
import { useCourseStore, useCourseSubscription } from "../stores/course";
import isLoggedInUserRegistered from "../utils/isLoggedInUserRegistered";

const Subscriptions = () => {
  useUserSubscription();
  useCourseSubscription();
  return null;
};

export default function AuthLayout() {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const { userId, isLoaded } = useAuth();
  const { user } = useUser();

  const isLoadingUsers = useUserStore((state) => state.isLoadingUsers);
  const isLoadingCourses = useCourseStore((state) => state.isLoadingCourses);

  const allUsers = useUserStore((state) => state.allUsers);
  const setUser = useUserStore((state) => state.setUser);

  const userEmail = user?.emailAddresses[0].emailAddress;
  const isLoadingSubscriptions = isLoadingUsers || isLoadingCourses;

  const isOnboardingRoutes = pathname.includes("/onboarding");

  React.useEffect(() => {
    if (isLoaded && !userId) {
      navigate("/sign-in");
    } else if (isLoaded && !isLoadingUsers && userEmail && allUsers) {
      const isRegistered = isLoggedInUserRegistered({
        users: allUsers,
        email: userEmail,
      });

      const user = allUsers.find((user) => user.email === userEmail);
      if (isRegistered && user) {
        setUser(user);
      }
      if (!isRegistered) {
        navigate("/onboarding");
      }
      if (isRegistered && isOnboardingRoutes) {
        navigate("/home");
      }
    }
  }, [
    allUsers,
    isLoaded,
    isLoadingUsers,
    isOnboardingRoutes,
    navigate,
    setUser,
    user,
    userEmail,
    userId,
  ]);

  if (!isLoaded) return <InitialLoadingScreen />;

  return (
    <>
      <Subscriptions />

      {isLoadingSubscriptions && <InitialLoadingScreen />}

      {!isLoadingSubscriptions && (
        <div className="w-full flex min-h-screen">
          <LeftNavBar />
          <div className="flex flex-col w-full sm:pl-[72px] flex-1 gap-4">
            <LeftNavBarMobile />
            <div className=" h-full ">
              <Outlet />
            </div>
          </div>
        </div>
      )}
    </>
  );
}
