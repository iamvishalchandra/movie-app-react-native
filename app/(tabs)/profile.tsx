import { icons } from "@/constants/icons";
import React from "react";
import { Image, StyleSheet, Text, View } from "react-native";

const profile = () => {
  return (
    <View className="flex-1 px-10 bg-primary">
      <View className="flex flex-col items-center justify-center flex-1 gap-5">
        <Image className="size-10" tintColor="#fff" source={icons.person} />
        <Text className="text-base text-gray-500">Profile</Text>
      </View>
    </View>
  );
};

export default profile;

const styles = StyleSheet.create({});
