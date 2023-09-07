import { useState } from "react";

import { StyleSheet, View } from "react-native";

import { StatusBar as ExpoStatus } from "expo-status-bar";

import { ConstantMultiplier } from "../components/algorithms/constant-multiplier";
import { Linear } from "../components/algorithms/linear";
import { MiddleSquare } from "../components/algorithms/middle-square";
import { Multiplicative } from "../components/algorithms/multiplicative";

import { AlgorithmSelect } from "../components/ui/algorithm-select";

const algorithms = {
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

export const HomeScreen = () => {
  const [algorithm, setAlgorithm] = useState(Object.keys(algorithms)[0] || "");

  const handleAlgorithmChange = (algorithm) => {
    setAlgorithm(algorithm);
  };

  const Form = algorithms[algorithm]?.algo;

  return (
    <View style={styles.appContainer}>
      <View style={styles.contentWrapper}>
        <AlgorithmSelect
          algorithms={algorithms}
          selectedAlgorithm={algorithm}
          onSelect={handleAlgorithmChange}
        />
        {algorithms[algorithm]?.algo && <Form />}
      </View>
      <ExpoStatus style="light" />
    </View>
  );
};

const styles = StyleSheet.create({
  appContainer: {
    flex: 1,
    backgroundColor: "#fff",
  },
  contentWrapper: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-start",
    gap: 8,
  },
});
