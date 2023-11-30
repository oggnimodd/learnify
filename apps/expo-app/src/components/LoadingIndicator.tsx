import { View, Dimensions } from "react-native";
import React from "react";
import * as Progress from "react-native-progress";
import tw from "twrnc";
import { colors } from "@/tailwind";

const { width, height } = Dimensions.get("window");

const Loading: React.FC = () => {
  return (
    <View
      style={tw.style(
        "absolute flex-row justify-center items-center bg-neutral-800",
        {
          width,
          height,
        },
      )}
    >
      <Progress.CircleSnail thickness={5} size={100} color={colors.blue[500]} />
    </View>
  );
};

export default Loading;
