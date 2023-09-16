import { FC, ReactNode, useState } from "react";
import { Modal, Pressable, StyleSheet, Text, View } from "react-native";

interface Props {
  open: boolean;
  onClose: () => void;
  children: ReactNode;
}

export const InfoModal: FC<Props> = ({ open, onClose, children }) => {
  return (
    // <View style={styles.backdrop}>
    <Modal animationType="fade" transparent={true} visible={open}>
      <Pressable onPress={onClose} style={styles.centeredView}>
        <Pressable
          onPress={(e) => e.stopPropagation()}
          style={styles.container}
        >
          {children}
        </Pressable>
      </Pressable>
    </Modal>
    // </View>
  );
};

interface InfoModalContentProps {
  children: ReactNode;
}

export const InfoModalContent: FC<InfoModalContentProps> = ({ children }) => {
  return <View style={styles.modalContent}>{children}</View>;
};

export const InfoModalTitle: FC<InfoModalContentProps> = ({ children }) => {
  return <Text style={styles.modalTitle}>{children}</Text>;
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    borderRadius: 8,
    padding: 12,
    alignItems: "center",
    width: "90%",
    elevation: 5,
    gap: 8,
  },
  centeredView: {
    flex: 1,
    backgroundColor: "#rgba(0,0,0,0.24)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalTitle: {
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
    color: "#e91e63",
  },
  modalContent: {
    alignItems: "flex-start",
    width: "100%",
  },
});
