import { FC } from "react";

import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";

import { ConstantMultiplier } from "../algorithms/constant-multiplier";
import { Linear } from "../algorithms/linear";
import { MiddleSquare } from "../algorithms/middle-square";
import { Multiplicative } from "../algorithms/multiplicative";

export const algorithms = {
  "middle-square": {
    name: "Cuadrados medios",
    algo: MiddleSquare,
  },
  "linear-congruential": {
    name: "Congruencia lineal",
    algo: Linear,
  },
  "multiplicative-congruential": {
    name: "Congruencia multiplicativa",
    algo: Multiplicative,
  },
  "constant-multiplier": {
    name: "Multiplicador constante",
    algo: ConstantMultiplier,
  },
};

export type AlgorithmKey = keyof typeof algorithms;

interface Props {
  selectedAlgorithm: AlgorithmKey;
  onSelect: (key: AlgorithmKey) => void;
}

export const AlgorithmSelect: FC<Props> = ({ selectedAlgorithm, onSelect }) => {
  return (
    <View style={styles.wrapper}>
      <ScrollView contentContainerStyle={styles.radioGroup} horizontal={true}>
        {Object.keys(algorithms).map((key) => (
          <Pressable
            key={key}
            onPress={onSelect.bind(null, key)}
            style={[
              key === selectedAlgorithm && styles.selected,
              styles.algorithmItem,
            ]}
          >
            <Text style={[key === selectedAlgorithm && styles.selectedText]}>
              {algorithms[key].name}
            </Text>
          </Pressable>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    height: "10%",
  },
  radioGroup: {
    gap: 8,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 8,
  },
  selected: {
    backgroundColor: "#e91e6333",
  },
  selectedText: {
    fontWeight: "bold",
    color: "#e91e63",
  },
  algorithmItem: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderWidth: 1,
    borderColor: "#e91e63",
    borderRadius: 50,
  },
});
