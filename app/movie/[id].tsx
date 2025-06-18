import { useLocalSearchParams } from "expo-router";
import React from "react";
import { StyleSheet, Text, View } from "react-native";

const Movie = () => {
  const { id } = useLocalSearchParams();
  return (
    <View>
      <Text>Movie - {id}</Text>
    </View>
  );
};

export default Movie;

const styles = StyleSheet.create({});
