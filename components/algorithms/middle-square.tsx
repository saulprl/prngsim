import { useState } from "react";

import { useForm } from "react-hook-form";

import { FlatList, Text, StyleSheet, View } from "react-native";
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

interface MiddleSquareForm {
  seed: string;
  n: string;
}

export const MiddleSquare = () => {
  const [openModal, setOpenModal] = useState(false);
  const [numbers, setNumbers] = useState<RNGItem[]>([]);
  const [error, setError] = useState<string>(null);
  const { control, handleSubmit, reset } = useForm<MiddleSquareForm>();

  const generateNumbers = (data: MiddleSquareForm) => {
    setNumbers([]);

    let seed = +data.seed;
    const n = +data.n;
    const digits = seed.toString().length;

    if (digits < 4) {
      setError("La semilla debe tener al menos 4 dígitos.");

      return;
    }

    if (n === 0) {
      setError("La cantidad de números aleatorios debe ser mayor a 0.");

      return;
    }

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
        digits,
      };
      setNumbers((prev) => [...prev, generatedNumber]);
    }
  };

  const handleClear = () => {
    setNumbers([]);
    reset({
      seed: "",
      n: "",
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
              style={{ borderColor: "#0080FF" }}
            >
              <CustomButtonTitle
                variant="outlined"
                style={{ color: "#0080FF" }}
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
        <InfoModalTitle>Algoritmo de cuadrados medios</InfoModalTitle>
        <InfoModalContent>
          <Text>
            Propuesto por <Text style={styles.bold}>John Von Neumann</Text> en{" "}
            <Text style={styles.bold}>1949</Text>. Fácil de entender e
            implementar, pero <Text style={styles.bold}>limitado</Text> en
            cuanto a <Text style={styles.bold}>calidad</Text> y{" "}
            <Text style={styles.bold}>longitud</Text>.
          </Text>
          <View style={styles.inlineEquationWrapper}>
            <MathJax>{`\\(D > 3\\)`}</MathJax>
          </View>
          <View style={styles.inlineEquationWrapper}>
            <MathJax>{`\\(x_0\\)`}</MathJax>
            <Text>
              debe ser de <Text style={styles.bold}>D dígitos</Text>.
            </Text>
          </View>
          <View style={styles.inlineEquationWrapper}>
            <MathJax>{`\\(n\\)`}</MathJax>
            <Text>es la cantidad de números aleatorios deseada.</Text>
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
    flex: 2,
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
