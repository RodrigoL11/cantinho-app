import React from "react";
import { ActivityIndicator, View } from "react-native";

interface Props {
  load?: boolean
}

export function Loading({ load }: Props) {
  if (!load) return null;

  return (
    <View style={{flex: 1}}>
      <ActivityIndicator color="secondary.700" />
    </View>
  );
}