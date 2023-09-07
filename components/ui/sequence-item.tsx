import { FC } from "react";
import { StyleSheet, Text, View } from "react-native";

interface Props {
  value: number;
}

export const SequenceItem: FC<Props> = ({ value }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>{value}</Text>
    </View>
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
