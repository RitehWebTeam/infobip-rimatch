import axios from 'axios';
import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';


export default function App() {

  const [msg, setMsg] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    axios.get("https://localhost:8080/api/users/me")
      .then((response) => {
        console.log(response);
        setMsg(response.data);
      })
      .catch((error) => {
     
        if (error.response) {
          setError(response.data.message);
        } else {
          setError("Error fetching data. Please try again later.");
        }
      });
  }, []);

  return (
    <View className="flex-1 items-center justify-center bg-red-500">
      <Text>Open up App.js to start working on your app!</Text>
      {error ? <Text>{error}</Text> : <Text>{msg}</Text>}
      
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
