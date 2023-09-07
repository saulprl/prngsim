import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";

export const AlgorithmSelect = ({
  algorithms,
  selectedAlgorithm,
  onSelect,
}) => {
  return (
    <View style={styles.wrapper}>
      <ScrollView contentContainerStyle={styles.radioGroup} horizontal={true}>
        {Object.keys(algorithms).map((key) => (
          <Pressable
            key={key}
            onPress={onSelect.bind(null, key)}
            style={[
              key === selectedAlgorithm && styles.selected,
              styles.algorithmItem,
            ]}
          >
            <Text style={[key === selectedAlgorithm && styles.selectedText]}>
              {algorithms[key].name}
            </Text>
          </Pressable>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    height: "10%",
  },
  radioGroup: {
    gap: 8,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 8,
  },
  selected: {
    backgroundColor: "#e91e6333",
  },
  selectedText: {
    fontWeight: "bold",
    color: "#e91e63",
  },
  algorithmItem: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderWidth: 1,
    borderColor: "#e91e63",
    borderRadius: 50,
  },
});
