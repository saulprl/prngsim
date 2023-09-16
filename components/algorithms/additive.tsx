import { useState } from "react";

import { useForm } from "react-hook-form";

import { FlatList, ScrollView, StyleSheet, Text, View } from "react-native";
import { CustomInput } from "../ui/custom-input";
import { CustomButton, CustomButtonTitle } from "../ui/custom-button";
import { RNGItem } from "../ui/rng-item";
import { SequenceItem } from "../ui/sequence-item";
import { InfoModal, InfoModalContent, InfoModalTitle } from "../ui/modal";
import { MathJax } from "../ui/mathjax";

interface SequenceForm {
  sequence: string;
}

interface AdditiveForm {
  modulus: string;
  n: string;
}

export const Additive = () => {
  const [openModal, setOpenModal] = useState(false);
  const [sequence, setSequence] = useState<number[]>([]);
  const [numbers, setNumbers] = useState<RNGItem[]>([]);

  const {
    control: sequenceControl,
    handleSubmit: sequenceSubmit,
    reset: sequenceReset,
  } = useForm<SequenceForm>();
  const {
    control: algoControl,
    handleSubmit: algoSubmit,
    reset: algoReset,
  } = useForm<AdditiveForm>();

  const handleAddToSequence = (data: SequenceForm) => {
    if (data.sequence.length === 0) return;

    const number = +data.sequence;
    setSequence((prev) => [...prev, number]);
    sequenceReset({ sequence: "" });
  };

  const handleRemoveFromSequence = (index: number) => {
    setSequence((prev) => prev.filter((_, i) => i !== index));
  };

  const generateNumbers = (data: AdditiveForm) => {
    setNumbers([]);

    const modulus = +data.modulus;
    const n = +data.n;
    const sequenceCopy = [...sequence];
    const seqLength = sequenceCopy.length;

    if (seqLength === 0 || modulus === 0 || n === 0) {
      setOpenModal(true);
      return;
    }

    for (let i = 0; i < n; i++) {
      const index = i + seqLength;
      const nextSeed =
        (sequenceCopy[index - 1] + sequenceCopy[index - seqLength]) % modulus;

      const random = nextSeed / (modulus - 1);

      const generatedNumber = {
        index: i + 1,
        random,
        seed: nextSeed,
      };

      sequenceCopy.push(nextSeed);
      setNumbers((prev) => [...prev, generatedNumber]);
    }
  };

  const handleClear = () => {
    setSequence([]);
    setNumbers([]);
    sequenceReset({ sequence: "" });
    algoReset({ modulus: "", n: "" });
  };

  const handleCloseModal = () => setOpenModal(false);

  return (
    <View style={styles.container}>
      <View style={styles.sequenceContainer}>
        {sequence.length === 0 && (
          <Text style={{ fontSize: 14, textAlign: "center" }}>
            No hay números en la secuencia
          </Text>
        )}
        <FlatList
          data={sequence}
          renderItem={({ item, index }) => (
            <SequenceItem
              value={item}
              index={index}
              onRemove={handleRemoveFromSequence}
            />
          )}
          contentContainerStyle={styles.sequenceList}
          horizontal={true}
        />
      </View>
      <View style={[styles.form, { alignItems: "flex-end" }]}>
        <View style={{ flex: 4 }}>
          <CustomInput
            name="sequence"
            control={sequenceControl}
            label="Agregar número a la secuencia"
            placeholder="x"
            selectionColor="#e91e63"
            keyboardType="numeric"
            onSubmitEditing={sequenceSubmit(handleAddToSequence)}
            blurOnSubmit={false}
          />
        </View>
        <View style={{ flex: 1 }}>
          <CustomButton
            onPress={sequenceSubmit(handleAddToSequence)}
            style={{ height: 44 }}
          >
            <CustomButtonTitle>+</CustomButtonTitle>
          </CustomButton>
        </View>
      </View>
      <View style={styles.form}>
        <View style={styles.formInput}>
          <CustomInput
            name="modulus"
            control={algoControl}
            label="Módulo"
            placeholder="m"
            selectionColor="#e91e63"
            keyboardType="numeric"
          />
        </View>
        <View style={styles.formInput}>
          <CustomInput
            name="n"
            control={algoControl}
            label="n"
            placeholder="n"
            selectionColor="#e91e63"
            keyboardType="numeric"
          />
        </View>
      </View>
      <View style={styles.formActions}>
        <CustomButton onPress={algoSubmit(generateNumbers)}>
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
        <InfoModalTitle>Algoritmo congruencial aditivo</InfoModalTitle>
        <InfoModalContent>
          <Text>
            Requiere una secuencia previa de <Text style={styles.bold}>n</Text>{" "}
            números enteros para generar una nueva secuencia. Su{" "}
            <Text style={styles.bold}>ecuación recursiva</Text> es:
          </Text>
          <View style={styles.equationWrapper}>
            <MathJax>{`\\(x_i = (x_{i-1} + x_{i-n}) mod (m)\\)`}</MathJax>
          </View>
          <View style={styles.equationWrapper}>
            <MathJax>{`\\(i = n+1,n+2,n+3,...,N\\)`}</MathJax>
          </View>
          <View style={styles.inlineEquationWrapper}>
            <Text>Los números</Text>
            <MathJax>{`\\(r_i\\)`}</MathJax>
            <Text>pueden ser generados</Text>
            <Text>mediante la ecuación:</Text>
          </View>
          <View style={styles.equationWrapper}>
            <MathJax>{`\\(r_i = \\frac{x_i}{m-1}\\)`}</MathJax>
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
  sequenceContainer: {
    height: 48,
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  sequenceList: {
    alignItems: "center",
    gap: 8,
    paddingHorizontal: 16,
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
