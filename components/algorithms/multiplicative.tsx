import { useState } from "react";

import { FlatList, StyleSheet, Text, View } from "react-native";

import { useForm } from "react-hook-form";

import { CustomInput } from "../ui/custom-input";
import { CustomButton, CustomButtonTitle } from "../ui/custom-button";
import { RNGItem } from "../ui/rng-item";
import {
  ErrorModal,
  InfoModal,
  InfoModalContent,
  InfoModalTitle,
} from "../ui/modal";
import { MathJax } from "../ui/mathjax";

interface MultiplicativeForm {
  seed: string;
  g: string;
  k: string;
}

export const Multiplicative = () => {
  const [openModal, setOpenModal] = useState(false);
  const [error, setError] = useState<string>(null);
  const [numbers, setNumbers] = useState<RNGItem[]>([]);
  const { control, handleSubmit, reset } = useForm<MultiplicativeForm>();

  const generateNumbers = (data: MultiplicativeForm) => {
    setNumbers([]);

    const g = +data.g;
    const k = +data.k;
    let seed = +data.seed;

    const multiplier = 3 + 8 * k;
    const modulus = Math.pow(2, g);
    const period = modulus / 4;

    if (seed <= 0) {
      setError("La semilla debe ser mayor a 0.");

      return;
    }

    if (g <= 0 || g % 1 !== 0) {
      setError("g debe ser un número entero mayor a 0.");

      return;
    }

    if (k <= 0 || k % 1 !== 0) {
      setError("k debe ser un número entero mayor a 0.");

      return;
    }

    const numbers: RNGItem[] = [];

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

  const handleClear = () => {
    setNumbers([]);
    reset({
      seed: "",
      g: "",
      k: "",
    });
  };

  const handleCloseModal = () => setOpenModal(false);

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
          <CustomButtonTitle>Generar</CustomButtonTitle>
        </CustomButton>
        <View style={styles.formActionsRow}>
          <View style={styles.formActionsRowItem}>
            <CustomButton variant="outlined" onPress={handleClear}>
              <CustomButtonTitle variant="outlined">Limpiar</CustomButtonTitle>
            </CustomButton>
          </View>
          <View style={styles.formActionsRowItem}>
            <CustomButton
              variant="outlined"
              onPress={() => setOpenModal(true)}
              style={{ borderColor: "#0080ff" }}
            >
              <CustomButtonTitle
                variant="outlined"
                style={{ color: "#0080ff" }}
              >
                Info
              </CustomButtonTitle>
            </CustomButton>
          </View>
        </View>
      </View>
      <View style={styles.numbersList}>
        <FlatList
          contentContainerStyle={{ padding: 16 }}
          data={numbers}
          renderItem={({ item }) => <RNGItem number={item} />}
        />
      </View>
      <InfoModal open={openModal} onClose={handleCloseModal}>
        <InfoModalTitle>Algoritmo congruencial multiplicativo</InfoModalTitle>
        <InfoModalContent>
          <Text>
            Surge del algoritmo{" "}
            <Text style={styles.bold}>congruencial lineal</Text> cuando{" "}
            <Text style={styles.bold}>c = 0</Text>. La{" "}
            <Text style={styles.bold}>ecuación recursiva</Text> es:
          </Text>
          <View style={styles.equationWrapper}>
            <MathJax>{`\\(x_{i+1} = (a \\cdot x_i) mod (m)\\)`}</MathJax>
          </View>
          <View style={styles.equationWrapper}>
            <MathJax>{`\\(i = 0,1,2,3,...,n\\)`}</MathJax>
          </View>
          <Text>Donde:</Text>
          <View style={styles.inlineEquationWrapper}>
            <MathJax>{`\\(x_0\\)`}</MathJax>
            <Text>es la semilla.</Text>
          </View>
          <View style={styles.inlineEquationWrapper}>
            <MathJax>{`\\(a\\)`}</MathJax>
            <Text>es la constante multiplicativa.</Text>
          </View>
          <View style={styles.inlineEquationWrapper}>
            <MathJax>{`\\(m\\)`}</MathJax>
            <Text>es el módulo.</Text>
          </View>
          <Text>Condiciones:</Text>
          <View style={styles.inlineEquationWrapper}>
            <MathJax>{`\\(m = 2^g\\)`}</MathJax>
            <Text>donde g debe ser entero.</Text>
          </View>
          <View style={styles.inlineEquationWrapper}>
            <MathJax>{`\\(a = 3 + 8k\\)`}</MathJax>
            <Text>o</Text>
            <MathJax>{`\\(5 + 8k\\)`}</MathJax>
            <Text>donde k debe ser entero.</Text>
          </View>
          <View style={styles.inlineEquationWrapper}>
            <MathJax>{`\\(N = m/4 = 2^{g-2}\\)`}</MathJax>
            <Text>donde N es el período máximo.</Text>
          </View>
        </InfoModalContent>
        <View style={{ width: "100%" }}>
          <CustomButton onPress={handleCloseModal}>
            <CustomButtonTitle>Cerrar</CustomButtonTitle>
          </CustomButton>
        </View>
      </InfoModal>
      <ErrorModal open={error} onClose={() => setError(null)} />
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
  formActionsRow: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 8,
  },
  formActionsRowItem: {
    flex: 1,
  },
  numbersList: {
    flex: 3,
    width: "100%",
    gap: 16,
  },
  bold: {
    fontWeight: "bold",
    color: "#e91e63",
  },
  subscript: {
    fontSize: 6,
    lineHeight: 32,
    fontWeight: "bold",
    color: "#e91e63",
  },
  equationWrapper: {
    height: 40,
    padding: 8,
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    overflow: "hidden",
  },
  inlineEquationWrapper: {
    padding: 8,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    width: "100%",
    gap: 8,
    flexWrap: "wrap",
  },
});
