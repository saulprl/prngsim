import { useEffect, useState } from "react";

import { useForm } from "react-hook-form";

import { FlatList, ScrollView, StyleSheet, View } from "react-native";
import { CustomInput } from "../ui/custom-input";
import { CustomButton, CustomButtonTitle } from "../ui/custom-button";
import { RNGItem } from "../ui/rng-item";

interface MiddleSquareForm {
  x0: string;
  x1: string;
  n: string;
}

export const MiddleProduct = () => {
  const [numbers, setNumbers] = useState<RNGItem[]>([]);
  const { control, handleSubmit, reset, setFocus } =
    useForm<MiddleSquareForm>();

  const generateNumbers = (data: MiddleSquareForm) => {
    setNumbers([]);
    const digits = data.x0.length;

    if (digits < 4 || digits !== data.x1.length) return;

    const x0 = +data.x0;
    const x1 = +data.x1;
    const n = +data.n;

    const seeds = [x0, x1];

    for (let i = 0; i < n; i++) {
      const product = seeds[i] * seeds[i + 1];
      const productString = product.toString();
      const startIndex = Math.floor((productString.length - digits) / 2);
      const endIndex = startIndex + digits;

      const nextSeed = +productString.substring(startIndex, endIndex);
      const random = nextSeed / Math.pow(10, digits);

      seeds.push(nextSeed);
      const generatedNumber = {
        index: i + 1,
        random,
        seed: nextSeed,
      };

      setNumbers((prev) => [...prev, generatedNumber]);
    }
  };

  useEffect(() => {
    setFocus("x0");
  }, [setFocus]);

  const handleClear = () => {
    setNumbers([]);
    reset({
      x0: "",
      x1: "",
      n: "",
    });
  };

  return (
    <View style={styles.container}>
      <View style={styles.form}>
        <View style={styles.formInput}>
          <CustomInput
            name="x0"
            control={control}
            label="Semilla 1"
            placeholder="x0"
            selectionColor="#e91e63"
            keyboardType="numeric"
            onSubmitEditing={() => setFocus("x1")}
            onEndEditing={() => setFocus("x1")}
            returnKeyType="next"
          />
        </View>
        <View style={styles.formInput}>
          <CustomInput
            name="x1"
            control={control}
            label="Semilla 2"
            placeholder="x1"
            selectionColor="#e91e63"
            keyboardType="numeric"
            onSubmitEditing={() => setFocus("n")}
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
          contentContainerStyle={{ paddingHorizontal: 16 }}
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
