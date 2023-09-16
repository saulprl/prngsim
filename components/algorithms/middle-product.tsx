import { useEffect, useState } from "react";

import { useForm } from "react-hook-form";

import { FlatList, ScrollView, StyleSheet, Text, View } from "react-native";
import { CustomInput } from "../ui/custom-input";
import { CustomButton, CustomButtonTitle } from "../ui/custom-button";
import { RNGItem } from "../ui/rng-item";
import { InfoModal, InfoModalContent, InfoModalTitle } from "../ui/modal";
import { MathJax } from "../ui/mathjax";

interface MiddleSquareForm {
  x0: string;
  x1: string;
  n: string;
}

export const MiddleProduct = () => {
  const [openModal, setOpenModal] = useState(false);
  const [numbers, setNumbers] = useState<RNGItem[]>([]);
  const { control, handleSubmit, reset, setFocus } =
    useForm<MiddleSquareForm>();

  const generateNumbers = (data: MiddleSquareForm) => {
    setNumbers([]);
    const digits = data.x0.length;

    const x0 = +data.x0;
    const x1 = +data.x1;
    const n = +data.n;

    if (digits < 4 || digits !== data.x1.length || n === 0) {
      setOpenModal(true);

      return;
    }

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
        digits,
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

  const handleCloseModal = () => setOpenModal(false);

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
          contentContainerStyle={{ paddingHorizontal: 16 }}
          data={numbers}
          renderItem={({ item }) => <RNGItem number={item} />}
        />
      </View>
      <InfoModal open={openModal} onClose={handleCloseModal}>
        <InfoModalTitle>Algoritmo de productos medios</InfoModalTitle>
        <InfoModalContent>
          <Text>
            Este algoritmo requiere{" "}
            <Text style={styles.bold}>dos semillas</Text> de{" "}
            <Text style={styles.bold}>D dígitos</Text>.
          </Text>
          <View style={styles.inlineEquationWrapper}>
            <MathJax>{`\\(D > 3\\)`}</MathJax>
          </View>
          <View style={styles.inlineEquationWrapper}>
            <MathJax>{`\\(x_0\\)`}</MathJax>
            <Text>y</Text>
            <MathJax>{`\\(x_1\\)`}</MathJax>
            <Text>
              deben ser de <Text style={styles.bold}>D dígitos</Text>.
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
