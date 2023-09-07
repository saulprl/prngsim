import { FC } from "react";

import { StyleSheet, Text, View } from "react-native";

interface Props {
  number: {
    random: number;
    seed: number;
    index: number;
  };
}

export const RNGItem: FC<Props> = ({ number: { random, seed, index } }) => {
  return (
    <View style={styles.wrapper}>
      <View style={styles.textWrapper}>
        <Text style={styles.title}>r</Text>
        <Text style={styles.subscript}>{index}</Text>
        <Text style={styles.title}> = </Text>
        <Text style={styles.title}>{random.toFixed(6)}</Text>
      </View>
      <View style={styles.textWrapper}>
        <Text style={styles.title}>x</Text>
        <Text style={styles.subscript}>{index}</Text>
        <Text style={styles.title}> = </Text>
        <Text style={styles.title}>{seed}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    padding: 16,
    borderWidth: 1,
    borderColor: "#e91e63",
    borderRadius: 8,
    marginBottom: 16,
    flexDirection: "row",
    justifyContent: "space-between",
    maxHeight: 56,
  },
  title: {
    fontWeight: "bold",
    fontSize: 16,
    color: "#e91e63",
  },
  subscript: {
    fontSize: 10,
    lineHeight: 32,
    color: "#e91e63",
  },
  textWrapper: {
    flexDirection: "row",
  },
});
