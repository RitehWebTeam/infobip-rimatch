import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import { Formik } from 'formik';
import * as Yup from 'yup';
import AuthService from '@/api/auth';
import { CircularProgress } from '@mui/material';
import { useNavigation } from '@react-navigation/native';
import { EmailAtIcon, LockIcon } from '../assets';

const LoginSchema = Yup.object().shape({
  email: Yup.string().required('Required').email('Must be valid email'),
  password: Yup.string().max(30, 'Must be 30 characters or less').required('Required'),
});

const LoginForm = () => {
  const [loginError, setLoginError] = useState('');
  const navigation = useNavigation();

  const handleSubmit = async (values, helpers) => {
    helpers.setSubmitting(true);
    setLoginError('');

    try {
      await AuthService.login(values);
      navigation.navigate('Home');
    } catch (error) {
      if (error.response && error.response.status === 401) {
        setLoginError(error.response.data.message ?? 'Invalid email or password');
      } else {
        setLoginError('Something went wrong');
      }
    } finally {
      helpers.setSubmitting(false);
    }
  };

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'red' }}>
      <Formik
        initialValues={{ email: '', password: '' }}
        validationSchema={LoginSchema}
        onSubmit={handleSubmit}
      >
        {({ handleChange, handleBlur, handleSubmit, values, errors, isSubmitting }) => (
          <View style={{ width: '80%', backgroundColor: 'white', borderRadius: 20, padding: 20 }}>
            <Text style={{ textAlign: 'center', fontSize: 30, fontWeight: 'bold', marginBottom: 10 }}>RiMatch</Text>
            <Text style={{ textAlign: 'center', fontSize: 16, marginBottom: 20 }}>Welcome Back</Text>
            <View style={{ flexDirection: 'row', alignItems: 'center', borderWidth: 2, borderColor: 'black', borderRadius: 10, paddingVertical: 10, paddingHorizontal: 20, marginBottom: 10 }}>
              <EmailAtIcon />
              <TextInput
                onChangeText={handleChange('email')}
                onBlur={handleBlur('email')}
                value={values.email}
                placeholder="Email address"
                keyboardType="email-address"
                style={{ flex: 1, marginLeft: 10 }}
              />
            </View>
            <Text style={{ color: 'red' }}>{errors.email}</Text>
            <View style={{ flexDirection: 'row', alignItems: 'center', borderWidth: 2, borderColor: 'black', borderRadius: 10, paddingVertical: 10, paddingHorizontal: 20, marginBottom: 10 }}>
              <LockIcon />
              <TextInput
                onChangeText={handleChange('password')}
                onBlur={handleBlur('password')}
                value={values.password}
                placeholder="Password"
                secureTextEntry
                style={{ flex: 1, marginLeft: 10 }}
              />
            </View>
            <Text style={{ color: 'red' }}>{errors.password}</Text>
            <Text style={{ color: 'red' }}>{loginError}</Text>
            <TouchableOpacity
              disabled={isSubmitting}
              onPress={handleSubmit}
              style={{ backgroundColor: 'red', borderRadius: 20, paddingVertical: 10, alignItems: 'center', marginTop: 10 }}
            >
              {isSubmitting ? <CircularProgress size="small" color="inherit" /> : <Text style={{ color: 'white', fontWeight: 'bold' }}>Login</Text>}
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => navigation.navigate('ForgotPassword')}
              style={{ marginTop: 10 }}
            >
              <Text style={{ color: 'white', fontWeight: 'bold' }}>Forgot Password?</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => navigation.navigate('Register')}
              style={{ marginTop: 10 }}
            >
              <Text style={{ color: 'red', fontWeight: 'bold' }}>Don't have an account? Sign up here!</Text>
            </TouchableOpacity>
          </View>
        )}
      </Formik>
    </View>
  );
};

export default LoginForm;
