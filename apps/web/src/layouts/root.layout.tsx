import { Outlet, useNavigate } from "react-router-dom";
import { ClerkProvider } from "@clerk/clerk-react";
import { localization } from "../data/localization";
import { TooltipProvider } from "../components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "react-query";
import { Toaster } from "sonner";

const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

const queryClient = new QueryClient();

if (!PUBLISHABLE_KEY) {
  throw new Error("Missing Publishable Key");
}

export default function RootLayout() {
  const navigate = useNavigate();

  return (
    <ClerkProvider
      routerPush={(to) => navigate(to)}
      routerReplace={(to) => navigate(to, { replace: true })}
      publishableKey={PUBLISHABLE_KEY}
      localization={localization}
    >
      <Toaster richColors />
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          <main className="font-sans">
            <Outlet />
          </main>
        </TooltipProvider>
      </QueryClientProvider>
    </ClerkProvider>
  );
}
