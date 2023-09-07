import { FC, ReactNode } from "react";
import {
  Pressable,
  PressableProps,
  StyleSheet,
  Text,
  TextProps,
  View,
} from "react-native";

interface Props extends PressableProps {
  children: ReactNode;
}

export const CustomButton: FC<Props> = (props) => {
  const { children, onPress, style, ...rest } = props;

  return (
    <View style={styles.wrapper}>
      <Pressable
        {...rest}
        onPress={onPress}
        style={[styles.button]}
        android_ripple={{ color: "#b00b41" }}
      >
        {children}
      </Pressable>
    </View>
  );
};

export const CustomButtonTitle: FC<TextProps> = (props) => {
  return <Text style={[styles.title, props?.style]}>{props.children}</Text>;
};

const styles = StyleSheet.create({
  wrapper: {
    borderRadius: 8,
    overflow: "hidden",
  },
  button: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#e91e63",
    paddingVertical: 8,
    paddingHorizontal: 16,
  },
  title: {
    color: "#fff",
    fontWeight: "bold",
    textTransform: "uppercase",
  },
});
