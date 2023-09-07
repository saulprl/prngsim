import { useState } from "react";

import { FlatList, StyleSheet, View } from "react-native";

import { useForm } from "react-hook-form";

import { CustomInput } from "../ui/custom-input";
import { CustomButton } from "../ui/custom-button";
import { RNGItem } from "../ui/rng-item";

export const Multiplicative = () => {
  const [numbers, setNumbers] = useState([]);
  const { control, handleSubmit } = useForm();

  const generateNumbers = (data) => {
    setNumbers([]);

    const g = +data.g;
    const k = +data.k;
    let seed = +data.seed;

    const multiplier = 3 + 8 * k;
    const modulus = Math.pow(2, g);
    const period = modulus / 4;

    const numbers = [];

    for (let i = 0; i < period; i++) {
      seed = (multiplier * seed) % modulus;
      const random = seed / (modulus - 1);

      const generatedNumber = {
        index: i + 1,
        random,
        seed,
      };

      numbers.push(generatedNumber);
    }

    setNumbers(numbers);
  };

  return (
    <View style={styles.container}>
      <View style={styles.form}>
        <View style={styles.formInput}>
          <CustomInput
            name="seed"
            control={control}
            label="Semilla"
            placeholder="Semilla"
            selectionColor="#e91e63"
            keyboardType="numeric"
          />
        </View>
        <View style={styles.formInput}>
          <CustomInput
            name="g"
            control={control}
            label="g"
            placeholder="g"
            selectionColor="#e91e63"
            keyboardType="numeric"
          />
        </View>
        <View style={styles.formInput}>
          <CustomInput
            name="k"
            control={control}
            label="k"
            placeholder="k"
            selectionColor="#e91e63"
            keyboardType="numeric"
          />
        </View>
      </View>
      <View style={styles.formActions}>
        <CustomButton onPress={handleSubmit(generateNumbers)}>
          <CustomButton.Title>Generar</CustomButton.Title>
        </CustomButton>
      </View>
      <View style={styles.numbersList}>
        <FlatList
          contentContainerStyle={{ paddingHorizontal: 16, paddingVertical: 16 }}
          data={numbers}
          renderItem={({ item }) => <RNGItem number={item} />}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    gap: 16,
    alignItems: "center",
    justifyContent: "flex-start",
    width: "100%",
  },
  form: {
    width: "100%",
    paddingHorizontal: 16,
    gap: 16,
    flexWrap: "wrap",
    flexDirection: "row",
    alignItems: "center",
  },
  formInput: {
    flex: 1,
  },
  formActions: {
    flex: 1,
    width: "100%",
    alignItems: "stretch",
    paddingHorizontal: 16,
    gap: 8,
  },
  numbersList: {
    flex: 3,
    width: "100%",
    gap: 16,
  },
});
