import { icons } from "@/constants/icons";
import React from "react";
import { Image, TextInput, View } from "react-native";

interface ISearchBar {
  placeholder: string;
  onPress?: () => void;
  value?: string;
  setValue?: React.Dispatch<React.SetStateAction<string>>;
}

const SearchBar = ({ placeholder, onPress, value, setValue }: ISearchBar) => {
  return (
    <View className="flex-row items-center px-5 py-4 rounded-full bg-dark-200">
      <Image
        source={icons.search}
        className="size-5"
        resizeMode="contain"
        tintColor="#ab8bff"
      />
      <TextInput
        onPress={onPress}
        placeholder={placeholder}
        value={value}
        onChangeText={(e) => setValue && setValue(e)}
        placeholderTextColor="#a8b5db"
        className="flex-1 ml-2 text-white"
      />
    </View>
  );
};

export default SearchBar;
