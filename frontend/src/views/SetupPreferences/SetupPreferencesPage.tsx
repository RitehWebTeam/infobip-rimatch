import { FormikStepper } from "@/components/forms/FormikStepper";
import Step1Preferences from "./steps/Step1Preferences";
import Step2Preferences from "./steps/Step2Preferences";
import Step3Preferences from "./steps/Step3Preferences";
import Step4Preferences from "./steps/Step4Preferences";
import { PreferencesInitData } from "@/types/User";
import { UsersService } from "@/api/users";
import { useNavigate } from "react-router-dom";
import useAuth from "@/hooks/useAuth";
import { useEffect } from "react";

const initialValues = {
  description: "",
  phoneNumber: "",
  location: "",
  favouriteSong: "",
  profileImageUrl: null,
  tags: [],
  preferences: {
    ageGroupMin: "",
    ageGroupMax: "",
    partnerGender: "",
  },
};

type SetupPreferencesValues = typeof initialValues & {
  profileImageUrl: File | null;
};

const mapPreferenceValues = async (
  values: SetupPreferencesValues
): Promise<PreferencesInitData> => ({
  ...values,
  profileImageUrl: await toBase64(values.profileImageUrl!),
  preferences: {
    ageGroupMin: parseInt(values.preferences.ageGroupMin, 10),
    ageGroupMax: parseInt(values.preferences.ageGroupMax, 10),
    partnerGender: values.preferences.partnerGender,
  },
});

const toBase64 = (file: File): Promise<string> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = reject;
  });

const SetupPreferencesPage = () => {
  const navigate = useNavigate();
  const { auth, setAuth } = useAuth();
  const { mutateAsync: initPreferences } = UsersService.useInitPreferences();
  useEffect(() => {
    // Hacky solution should change
    // If the user is active we redirect him to / which is ok
    // If the user is not logged in we also redirect him to / which will either redirect him to /login or
    // or it will refresh his token and return him here
    if (auth?.active || !auth?.accessToken) {
      navigate("/");
    }
  }, [auth?.active, auth?.accessToken, navigate]);

  const handleSubmit = async (values: SetupPreferencesValues) => {
    // TODO: Error handling

    const mappedValues = await mapPreferenceValues(values);
    await initPreferences(mappedValues);
    setAuth((prev) => ({
      ...prev!,
      active: true,
    }));
    navigate("/");
  };
  return (
    <PreferencesHeader>
      <FormikStepper<SetupPreferencesValues>
        initialValues={initialValues}
        onSubmit={handleSubmit}
      >
        <Step1Preferences />
        <Step2Preferences />
        <Step3Preferences />
        <Step4Preferences />
      </FormikStepper>
    </PreferencesHeader>
  );
};

interface PreferencesHeaderProps {
  children: React.ReactNode;
}

const PreferencesHeader = ({ children }: PreferencesHeaderProps) => {
  return (
    <div
      className="flex flex-col justify-center items-center flex-grow"
      id="red-to-black"
    >
      <div className="flex w-full flex-grow justify-center md:pb-8 sm:max-h-[50rem]">
        <div className="bg-white dark:bg-[#343030] flex w-[30rem] flex-col h-full items-center px-10 py-8 sm:rounded-lg shadow-lg shadow-black min-h-fit">
          {children}
        </div>
      </div>
    </div>
  );
};

export default SetupPreferencesPage;
