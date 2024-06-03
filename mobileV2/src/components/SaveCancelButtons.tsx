
import { ActivityIndicator, TouchableOpacity, View } from "react-native";
import { AntDesign } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';
interface SaveCancelButtonsProps {
  isSubmitting: boolean;
  editMode: boolean;
  handleEditClick: () => void;
  handleSubmitClick: () => void;
  handleCancelClick: () => void;
}

const SaveCancelButtons = ({
  isSubmitting,
  editMode,
  handleCancelClick,
  handleEditClick,
  handleSubmitClick,
}: SaveCancelButtonsProps) => {
  return (
    <View className="flex items-center flex-row gap-6">
      {isSubmitting && editMode ? (
       <ActivityIndicator size="large" color="#0000ff" />
      ) : !editMode ? (
        <TouchableOpacity
          onPress={handleEditClick}
        >
          <Feather name="edit-2" size={24} color="red" />
        </TouchableOpacity>
      ) : (
        <>
          <TouchableOpacity onPress={handleSubmitClick}>
            <AntDesign name="check" size={24} color="green" />
          </TouchableOpacity>
          <TouchableOpacity
           
           onPress={handleCancelClick}
            className="hover:text-red-700"
          >
           <Entypo name="cross" size={24} color="red" />
          </TouchableOpacity>
        </>
      )}
    </View>
  );
};

export default SaveCancelButtons;