import { Pressable, StyleSheet, Text, View } from "react-native";

export const CustomButton = (props) => {
  const { children, onPress, ...rest } = props;

  return (
    <View style={styles.wrapper}>
      <Pressable
        {...rest}
        onPress={onPress}
        style={[styles.button, rest?.style]}
        android_ripple={{ color: "#b00b41" }}
      >
        {children}
      </Pressable>
    </View>
  );
};

CustomButton.Title = function CustomButtonTitle(props) {
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
