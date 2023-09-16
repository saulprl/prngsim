import { useState } from "react";

import { useForm } from "react-hook-form";

import { FlatList, StyleSheet, Text, View } from "react-native";
import { CustomInput } from "../ui/custom-input";
import { CustomButton, CustomButtonTitle } from "../ui/custom-button";
import { RNGItem } from "../ui/rng-item";
import { InfoModal, InfoModalContent, InfoModalTitle } from "../ui/modal";
import { MathJax } from "../ui/mathjax";

interface ConstantMultiplierForm {
  seed: string;
  a: string;
  n: string;
}

export const ConstantMultiplier = () => {
  const [openModal, setOpenModal] = useState(false);
  const [numbers, setNumbers] = useState<RNGItem[]>([]);
  const { control, handleSubmit, reset } = useForm<ConstantMultiplierForm>();

  const generateNumbers = (data: ConstantMultiplierForm) => {
    setNumbers([]);

    const a = +data.a;
    const n = +data.n;
    let seed = +data.seed;

    const digits = seed.toString().length;

    if (digits < 4 || a.toString().length !== digits || n === 0) {
      setOpenModal(true);

      return;
    }

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
        seed: seed,
        digits,
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
        <InfoModalTitle>Algoritmo del multiplicador constante</InfoModalTitle>
        <InfoModalContent>
          <Text>
            Similar al algoritmo de{" "}
            <Text style={styles.bold}>productos medios</Text>, con la diferencia
            de usar una <Text style={styles.bold}>constante</Text> en lugar de
            una <Text style={styles.bold}>segunda semilla</Text>.
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
            <MathJax>{`\\(a\\)`}</MathJax>
            <Text>
              es la constante y debe ser de{" "}
              <Text style={styles.bold}>D dígitos</Text>.
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
