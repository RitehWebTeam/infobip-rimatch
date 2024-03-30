import React, { useEffect } from 'react';
import { Formik } from 'formik';
import Step1Preferences from "./steps/Step1Preferences";
import * as Yup from 'yup';
import { PreferencesHeader } from './PreferencesHeader';
import Step1Preferences from './steps/Step1Preferences';
import Step2Preferences from './steps/Step2Preferences';
import Step3Preferences from './steps/Step3Preferences';
import Step4Preferences from './steps/Step4Preferences';
import { UsersService } from '@/api/users';
import useAuth from '@/hooks/useAuth';
import useLogout from '@/hooks/useLogout';
import { toBase64 } from '@/utils';

const initialValues = {
  description: '',
  phoneNumber: '',
  location: '',
  favouriteSong: '',
  profileImageUrl: null,
  tags: [],
  preferences: {
    ageGroupMin: '',
    ageGroupMax: '',
    partnerGender: '',
  },
};

const SetupPreferencesPage = () => {
  const { auth, setAuth } = useAuth();
  const { mutateAsync: initPreferences } = UsersService.useInitPreferences();
  const logout = useLogout();

  useEffect(() => {
    // Hacky solution should change
    // If the user is active we redirect him to / which is ok
    // If the user is not logged in we also redirect him to / which will either redirect him to /login or
    // or it will refresh his token and return him here
    if (auth?.active || !auth?.accessToken) {
      navigate('/');
    }
  }, [auth?.active, auth?.accessToken]);

  const handleSubmit = async (values) => {
    // TODO: Error handling

    const mappedValues = await mapPreferenceValues(values);
    await initPreferences(mappedValues);
    setAuth((prev) => ({
      ...prev,
      active: true,
    }));
    navigate('/');
  };

  const mapPreferenceValues = async (values) => ({
    ...values,
    profileImageUrl: await toBase64(values.profileImageUrl || ''),
    preferences: {
      ageGroupMin: parseInt(values.preferences.ageGroupMin, 10),
      ageGroupMax: parseInt(values.preferences.ageGroupMax, 10),
      partnerGender: values.preferences.partnerGender,
    },
  });

  return (
    <PreferencesHeader>
      <Formik
        initialValues={initialValues}
        onSubmit={handleSubmit}
        validationSchema={Step1ValidationSchema}
      >
        {({ handleSubmit, isSubmitting }) => (
          <>
            <Step1Preferences handleSubmit={handleSubmit} />
            <Step2Preferences />
            <Step3Preferences />
            <Step4Preferences />
          </>
        )}
      </Formik>
    </PreferencesHeader>
  );
};

export default SetupPreferencesPage;