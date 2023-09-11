import { useState } from "react";

import { useForm } from "react-hook-form";

import { FlatList, ScrollView, StyleSheet, Text, View } from "react-native";
import { CustomInput } from "../ui/custom-input";
import { CustomButton, CustomButtonTitle } from "../ui/custom-button";
import { RNGItem } from "../ui/rng-item";
import { SequenceItem } from "../ui/sequence-item";

interface SequenceForm {
  sequence: string;
}

interface AdditiveForm {
  modulus: string;
  n: string;
}

export const Additive = () => {
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
    const number = +data.sequence;
    setSequence((prev) => [...prev, number]);
    sequenceReset({ sequence: "" });
  };

  const generateNumbers = (data: AdditiveForm) => {
    setNumbers([]);

    const modulus = +data.modulus;
    const n = +data.n;
    const sequenceCopy = [...sequence];
    const seqLength = sequenceCopy.length;

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
          renderItem={({ item }) => <SequenceItem value={item} />}
          contentContainerStyle={styles.sequenceList}
          horizontal={true}
        />
      </View>
      <View style={[styles.form, { alignItems: "flex-end" }]}>
        <View style={{ flex: 4 }}>
          <CustomInput
            name="sequence"
            control={sequenceControl}
            label="Secuencia"
            placeholder="Secuencia"
            selectionColor="#e91e63"
            keyboardType="numeric"
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
  numbersList: {
    flex: 2,
    width: "100%",
    gap: 16,
  },
});
