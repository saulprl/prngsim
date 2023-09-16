import { FC, ReactNode } from "react";
import { View } from "react-native";

import { MathJaxSvg } from "react-native-mathjax-text-svg";

interface Props {
  children: ReactNode;
}

export const MathJax: FC<Props> = ({ children }) => {
  return (
    <View style={{ height: 14 }}>
      <MathJaxSvg fontSize={16} fontCache={false} color="#e91e63">
        {children}
      </MathJaxSvg>
    </View>
  );
};
