import { useState } from "react";

import { StyleSheet, View } from "react-native";

import { StatusBar as ExpoStatus } from "expo-status-bar";

import {
  AlgorithmKey,
  AlgorithmSelect,
  algorithms,
} from "@/components/ui/algorithm-select";

export const HomeScreen = () => {
  const [algorithm, setAlgorithm] = useState<AlgorithmKey>("middle-square");

  const handleAlgorithmChange = (algorithm: AlgorithmKey) => {
    setAlgorithm(algorithm);
  };

  const Form = algorithms[algorithm]?.algo;

  return (
    <View style={styles.appContainer}>
      <View style={styles.contentWrapper}>
        <AlgorithmSelect
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
