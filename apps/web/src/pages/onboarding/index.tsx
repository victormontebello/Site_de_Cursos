import { OnboardingForm } from "./onboarding.form";

export default function OnboardingPage() {
  return (
    <div className="w-full flex-1 min-h-screen flex flex-col items-start justify-center p-6 h-full gap-6">
      <div className="w-full  bg-white">
        <h1 className="text-gray-950 font-semibold text-2xl">Onboarding</h1>
      </div>
      <OnboardingForm />
    </div>
  );
}
