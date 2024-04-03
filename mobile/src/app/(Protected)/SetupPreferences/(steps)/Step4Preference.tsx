/* import React from 'react';
import { View, Text, Button } from 'react-native';
import ImagePicker from 'react-native-image-picker';
import { Image } from 'react-native';
const Step4Preferences = () => {
  const [profileImageUrl, setProfileImageUrl] = React.useState(null);

  const handleChooseImage = () => {
    const options = {
      title: 'Select Profile Picture',
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
      maxWidth: 500,
      maxHeight: 500,
    };

    ImagePicker.showImagePicker(options, (response: { didCancel: unknown; error: unknown; uri: string ; }) => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else {
        const source = { uri: response.uri };
        setProfileImageUrl(source);
      }
    });
  };

 

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Choose your profile picture</Text>
      <Text style={{ fontSize: 12, color: 'gray', marginBottom: 8 }}>Max size: 500 KB</Text>
      <Button title="Select Picture" onPress={handleChooseImage} />
      {profileImageUrl && (
        <View style={{ marginTop: 20 }}>
          <Text>Selected Image:</Text>
          <Image
            source={profileImageUrl}
            style={{ width: 200, height: 200, marginTop: 10 }}
          />
        </View>
      )}
    </View>
  );
};

export default Step4Preferences;
 */
