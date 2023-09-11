import { useState } from "react";

import { useForm } from "react-hook-form";

import { FlatList, StyleSheet, View } from "react-native";
import { CustomInput } from "../ui/custom-input";
import { CustomButton, CustomButtonTitle } from "../ui/custom-button";
import { RNGItem } from "../ui/rng-item";

interface ConstantMultiplierForm {
  seed: string;
  a: string;
  n: string;
}

export const ConstantMultiplier = () => {
  const [numbers, setNumbers] = useState<RNGItem[]>([]);
  const { control, handleSubmit, reset } = useForm<ConstantMultiplierForm>();

  const generateNumbers = (data: ConstantMultiplierForm) => {
    setNumbers([]);

    const a = +data.a;
    const n = +data.n;
    let seed = +data.seed;

    const digits = seed.toString().length;

    if (a.toString().length !== digits) return;

    const numbers: RNGItem[] = [];

    for (let i = 0; i < n; i++) {
      const multipliedSeed = a * seed;
      const seedString = multipliedSeed.toString();
      const startIndex = (seedString.length - digits) / 2;
      const endIndex = startIndex + digits;

      seed = +multipliedSeed.toString().substring(startIndex, endIndex);
      const random = seed / Math.pow(10, digits);

      const generatedNumber = {
        index: i + 1,
        random,
        seed,
      };

      numbers.push(generatedNumber);
    }

    setNumbers(numbers);
  };

  const handleClear = () => {
    setNumbers([]);
    reset({
      seed: "",
      a: "",
      n: "",
    });
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
            name="a"
            control={control}
            label="a"
            placeholder="a"
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
        <CustomButton variant="outlined" onPress={handleClear}>
          <CustomButtonTitle variant="outlined">Limpiar</CustomButtonTitle>
        </CustomButton>
      </View>
      <View style={styles.numbersList}>
        <FlatList
          contentContainerStyle={{ padding: 16 }}
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
