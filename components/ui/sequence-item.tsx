import { FC } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";

interface Props {
  value: number;
  index: number;
  onRemove: (index: number) => void;
}

export const SequenceItem: FC<Props> = ({ value, index, onRemove }) => {
  const handleRemove = () => onRemove(index);

  return (
    <Pressable onPress={handleRemove} style={styles.container}>
      <Text style={styles.text}>{value}</Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 8,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#e91e63",
  },
  text: {
    color: "#e91e63",
    fontWeight: "bold",
  },
});
