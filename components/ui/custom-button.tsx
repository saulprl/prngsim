import { FC, ReactNode } from "react";
import {
  Pressable,
  PressableProps,
  StyleSheet,
  Text,
  TextProps,
  View,
  ViewStyle,
} from "react-native";

type Variant = "flat" | "outlined" | "text" | "contained";

const rippleColor = (variant: Variant) => {
  switch (variant) {
    case "flat":
      return "#fff";
    case "outlined":
      return "#fff";
    case "text":
      return "#e91e63";
    case "contained":
      return "#fff";
    default:
      return "#fff";
  }
};

interface Props extends PressableProps {
  children: ReactNode;
  variant?: Variant;
  style?: ViewStyle;
}

export const CustomButton: FC<Props> = (props) => {
  const { variant = "contained", children, onPress, ...rest } = props;

  const ripple = rippleColor(variant);

  return (
    <View style={styles.wrapper}>
      <Pressable
        {...rest}
        onPress={onPress}
        style={[styles.button, styles[variant], props.style]}
        android_ripple={{ color: ripple }}
      >
        {children}
      </Pressable>
    </View>
  );
};

interface TitleProps extends TextProps {
  variant?: Variant;
  children: ReactNode;
}

export const CustomButtonTitle: FC<TitleProps> = (props) => {
  const { variant = "contained" } = props;

  return (
    <Text style={[textStyles.title, textStyles[variant], props?.style]}>
      {props.children}
    </Text>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    borderRadius: 8,
    overflow: "hidden",
  },
  button: {
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
  },
  contained: {
    backgroundColor: "#e91e63",
  },
  flat: {
    backgroundColor: "#e91e63",
  },
  text: {
    backgroundColor: "transparent",
  },
  outlined: {
    backgroundColor: "transparent",
    borderWidth: 1,
    borderColor: "#e91e63",
  },
});

const textStyles = StyleSheet.create({
  title: {
    color: "#fff",
    fontWeight: "bold",
    textTransform: "uppercase",
  },
  outlined: {
    color: "#e91e63",
  },
  flat: {
    color: "#fff",
  },
  text: {
    color: "#e91e63",
  },
  contained: {
    color: "#fff",
  },
});
