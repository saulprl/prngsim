import { useState } from "react";

import { useForm } from "react-hook-form";

import { FlatList, StyleSheet, View } from "react-native";

import { CustomButton, CustomButtonTitle } from "../ui/custom-button";
import { CustomInput } from "../ui/custom-input";
import { RNGItem } from "../ui/rng-item";

export interface LinearForm {
  seed: string;
  g: string;
  k: string;
  c: string;
}

export const Linear = () => {
  const [numbers, setNumbers] = useState<RNGItem[]>([]);
  const { control, handleSubmit } = useForm<LinearForm>();

  const generateNumbers = (data: LinearForm) => {
    setNumbers([]);

    const g = +data.g;
    const k = +data.k;
    const c = +data.c;
    let seed = +data.seed;

    const multiplier = 1 + 4 * k;
    const modulus = Math.pow(2, g);

    const numbers: RNGItem[] = [];

    for (let i = 0; i < modulus; i++) {
      seed = (multiplier * seed + c) % modulus;
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
        <View style={styles.formInput}>
          <CustomInput
            name="c"
            control={control}
            label="c"
            placeholder="c"
            selectionColor="#e91e63"
            keyboardType="numeric"
          />
        </View>
      </View>
      <View style={styles.formActions}>
        <CustomButton onPress={handleSubmit(generateNumbers)}>
          <CustomButtonTitle>Generar</CustomButtonTitle>
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
