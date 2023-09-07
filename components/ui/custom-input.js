import { forwardRef, useState } from "react";
import { useController } from "react-hook-form";

import { StyleSheet, Text, TextInput, View } from "react-native";

export const CustomInput = (props) => {
  const { name, control } = props;

  const [focused, setFocused] = useState(false);
  const { field } = useController({
    name,
    control,
    defaultValue: "",
  });

  const handleFocus = () => {
    setFocused(true);
  };

  const handleBlur = () => {
    setFocused(false);
  };

  return (
    <View style={styles.wrapper}>
      {props?.label && <Text style={styles.label}>{props.label}</Text>}
      <TextInput
        {...props}
        onFocus={handleFocus}
        onBlur={handleBlur}
        value={field.value}
        onChangeText={field.onChange}
        style={[styles.formInput, focused && styles.focusedInput, props?.style]}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    gap: 4,
  },
  label: {
    paddingLeft: 4,
  },
  formInput: {
    borderWidth: 1,
    borderColor: "#aaa",
    borderRadius: 8,
    padding: 8,
    backgroundColor: "#fff",
    width: "100%",
  },
  focusedInput: {
    borderColor: "#e91e63",
  },
});
