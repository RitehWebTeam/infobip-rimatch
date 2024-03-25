import { View, Text } from "react-native";

interface childrenProps {
  children: React.ReactNode;
}

export const Root = ({ children }: childrenProps) => {
  return (
    <View>
      <Text>Root</Text>
      <View>{children}</View>
    </View>
  );
};
