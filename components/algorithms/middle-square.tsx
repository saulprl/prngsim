import { useState } from "react";

import { useForm } from "react-hook-form";

import { ScrollView, StyleSheet, View } from "react-native";
import { CustomInput } from "../ui/custom-input";
import { CustomButton, CustomButtonTitle } from "../ui/custom-button";
import { RNGItem } from "../ui/rng-item";

interface MiddleSquareForm {
  seed: string;
  n: string;
}

export const MiddleSquare = () => {
  const [numbers, setNumbers] = useState([]);
  const { control, handleSubmit } = useForm<MiddleSquareForm>();

  const generateNumbers = (data: MiddleSquareForm) => {
    setNumbers([]);

    let seed = +data.seed;
    const n = +data.n;
    const digits = seed.toString().length;

    if (digits < 4) return;

    for (let i = 0; i < n; i++) {
      const square = Math.pow(seed, 2);
      const squareString = square.toString();
      const startIndex = Math.floor((squareString.length - digits) / 2);
      const endIndex = startIndex + digits;

      seed = +squareString.substring(startIndex, endIndex);
      const random = seed / Math.pow(10, digits);

      const generatedNumber = {
        index: i + 1,
        random,
        seed,
      };
      setNumbers((prev) => [...prev, generatedNumber]);
    }
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
            name="n"
            control={control}
            label="n"
            placeholder="n"
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
        <ScrollView contentContainerStyle={{ paddingHorizontal: 16 }}>
          {numbers.map((number, index) => (
            <RNGItem key={`${number}-${index}`} number={number} />
          ))}
        </ScrollView>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    gap: 16,
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
  },
  form: {
    width: "100%",
    paddingHorizontal: 16,
    gap: 16,
    flexDirection: "row",
    flexWrap: "wrap",
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
    flex: 2,
    width: "100%",
    gap: 16,
  },
});
