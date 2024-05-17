import React, { useState } from "react";
import {
  View,
  Image,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  Text,
  Modal,
} from "react-native";
import { Entypo } from "@expo/vector-icons";
import { launchImageLibrary } from "react-native-image-picker";
import { Formik, FormikConfig } from "formik";
import { UsersService } from "../../../../../api/users";
import useCurrentUserContext from "../../../../../hooks/useCurrentUser";
import { FlatList } from "react-native-gesture-handler";
import { EvilIcons } from "@expo/vector-icons";
import * as Yup from "yup";
import { Button } from "react-native-paper";
import { set } from "react-hook-form";
import { useTheme } from "../../../../../context/ThemeProvider";
const screenWidth = Dimensions.get("window").width;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },

  addButton: {
    backgroundColor: "#ee5253",
    width: 60,
    height: 60,
    borderRadius: 30,
    alignItems: "center",
    justifyContent: "center",
    position: "absolute",
    bottom: 20,
    right: 20,
  },
  modalBackground: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  dialogContainer: {
    backgroundColor: "white",
    padding: 20,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    maxWidth: screenWidth - 40,
  },
  modalImage: {
    width: screenWidth - 100,
    height: screenWidth - 100,
    marginBottom: 20,
    borderRadius: 8,
  },
});
interface NewImageValues {
  galleryImage?: File;
}
const newImageValidationSchema = Yup.object({
  galleryImage: Yup.mixed<File>()
    .required("Required")
    .test("fileSize", "File size must be smaller than 2 MB", (value) => {
      return value && value.size <= 2 * 1024 * 1024;
    }),
});

type NewImageOnSubmit = FormikConfig<NewImageValues>["onSubmit"];
const Gallery = () => {
  const { mutate: addPhotos } = UsersService.useAddUserPhotos();
  const { mutate: removePhotos } = UsersService.useRemoveUserPhotos();
  const currentUser = useCurrentUserContext();
  let userImages = currentUser.photos;
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [imageUri, setImageUri] = useState<string>("");
  const {theme} = useTheme();
  const showCameraRoll = async () => {
    const response = await launchImageLibrary({
      mediaType: "photo",
      quality: 0.5,
      maxWidth: 500,
      maxHeight: 500,
      includeBase64: false,
    });

    if (response && response.assets && response.assets.length > 0) {
      setSelectedImage(response.assets[0] as File);
      setImageUri(response.assets[0].uri as string);
      setIsDialogOpen(true);
    }
  };

  const handleSubmit: NewImageOnSubmit = async (values, helpers) => {
    
    const newImage = selectedImage as File;
    
    addPhotos([newImage], {
      onSuccess: () => {
        setIsDialogOpen(false);
        helpers.resetForm({ values: { galleryImage: undefined } });
      },
      onSettled: () => helpers.setSubmitting(false),
      onError: (error) => {
        console.log(error);
      }
    });
  };

  const closeModal = () => {
    setIsDialogOpen(false);
  };

  const fetchPhotos = () => {
    userImages = currentUser.photos;
  };

  return (
    <View style={[styles.container,{backgroundColor:theme.colors.primary}]}>
      <Formik<NewImageValues>
        initialValues={{ galleryImage: undefined }}
        onSubmit={handleSubmit}
        validationSchema={newImageValidationSchema}
      >
        
           <Modal
           animationType="fade"
           transparent={true}
           visible={isDialogOpen}
           onRequestClose={() => setIsDialogOpen(false)}
         >
           <TouchableOpacity
             style={styles.modalBackground}
             activeOpacity={1}
             onPress={closeModal}
           >
             <View style={styles.dialogContainer}>
               {selectedImage && (
                 <Image
                   source={{ uri: imageUri }}
                   style={styles.modalImage}
                   resizeMode="contain"
                   
                 />
               )}
               <Button
                 style={{
                   backgroundColor: "#ee5253",
                   width: 120,
                   height: 40,
                   borderRadius: 20,
                   alignItems: "center",
                   justifyContent: "center",
                   marginBottom: 10,
                 }}
                 /* onPress={() => {
                   handleSubmit();
                 }} TODO handaling submit for images  */
               >
                 <Text style={{ color: "white" }}>Upload Image</Text>
               </Button>
               <TouchableOpacity onPress={showCameraRoll}>
                 <Text style={{ color: "#ee5253" }}>Choose from Gallery</Text>
               </TouchableOpacity>
             </View>
           </TouchableOpacity>
         </Modal>
       
       
      </Formik>

      <View className=" flex justify-between items-center gap-4">
        <FlatList
          data={userImages}
          keyExtractor={(image: string, index: any) => {
            return userImages.indexOf(image).toString();
          }}
          numColumns={2}
          renderItem={({ item, index }) => (
            <View
              key={index}
              style={{
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Image
                source={{ uri: item }}
                style={{
                  width: 150,
                  height: 200,
                  margin: 18,
                  borderRadius: 10,
                }}
                resizeMode="cover"
              />
              <TouchableOpacity
                style={{
                  position: "absolute",
                  top: 25,
                  right: 25,
                }}
                onPress={() => {
                  removePhotos([item]);
                  fetchPhotos();
                }}
              >
                <EvilIcons name="trash" size={30} color="red" />
              </TouchableOpacity>
            </View>
          )}
        />
      </View>

      <TouchableOpacity onPress={showCameraRoll} style={styles.addButton}>
        <Entypo name="plus" size={30} color="white" />
      </TouchableOpacity>
    </View>
  );
};

export default Gallery;
