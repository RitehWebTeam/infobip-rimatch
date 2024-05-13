/* import { useField } from "formik";
import { useState } from "react";
import CloseIcon from "@mui/icons-material/Close";
import cx from "classnames";
import { View } from "react-native";
import { Button, TextInput } from "react-native-paper";
interface TagInputProps {
  name: string;
  className?: string;
  placeholder?: string;
  disabled?: boolean;
}

const TagInput = ({
  name,
  className: classStyle,
  disabled = false,
  placeholder,
}: TagInputProps) => {
  const [currentInputValue, setCurrentInputValue] = useState("");
  const [field, , helpers] = useField<string[]>(name);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (value.endsWith(" ")) {
      addTag(value.trim());
    } else {
      setCurrentInputValue(value);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (
      e.key === "Backspace" &&
      currentInputValue === "" &&
      field.value.length > 0
    ) {
      removeTag(field.value.length - 1);
    }
  };

  const addTag = (newTag: string) => {
    if (!newTag) return;
    helpers.setValue([...field.value, newTag]);
    setCurrentInputValue("");
  };

  const removeTag = (index: number) => {
    const newTags = field.value.filter((_, i) => i !== index);
    helpers.setValue(newTags);
  };

  return (
    <>
      <TextInput
        onBlur={field.onBlur}
        id={name}
        className={classStyle}
        onChange={handleChange}
        value={currentInputValue}
        onKeyDown={handleKeyDown}
        placeholder={placeholder ?? "Add a tag"}
        disabled={disabled}
      />
      <View className="flex flex-row flex-wrap gap-x-2 gap-y-3 mt-2">
        {field?.value.map((tag, index) => (
          <Tag
            key={index}
            index={index}
            value={tag}
            disabled={disabled}
            onRemove={removeTag}
          />
        ))}
      </View>
    </>
  );
};

interface TagProps {
  value: string;
  index: number;
  disabled?: boolean;
  onRemove: (index: number) => void;
}

const Tag = ({ value, index, onRemove, disabled = false }: TagProps) => {
  return (
    <View className="text-md inline-flex items-center gap-2 py-0.5 pl-2 pr-0.5 rounded-2xl border border-red-500">
      <View className={cx({ "opacity-65": disabled })}>{value}</View>
      <Button
        
        disabled={disabled}
        className="bg-red-400 disabled:opacity-65 disabled:cursor-not-allowed rounded-full w-6 h-6 flex justify-center items-center text-white"
        onClick={() => onRemove(index)}
      >
        <CloseIcon fontSize="inherit" />
      </Button>
    </View>
  );
};

export default TagInput; */