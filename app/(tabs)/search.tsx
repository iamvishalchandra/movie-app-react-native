import MovieCard from "@/component/MovieCard";
import SearchBar from "@/component/SearchBar";
import { icons } from "@/constants/icons";
import { images } from "@/constants/images";
import { fetchMovies } from "@/service/api";
import { updateSearchCount } from "@/service/appwrite";
import useFetch from "@/service/useFetch";
import { useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  Image,
  StyleSheet,
  Text,
  View,
} from "react-native";

const search = () => {
  const router = useRouter();
  const [query, setQuery] = useState("");

  const {
    data: movies,
    loading,
    error,
    reset,
    refetch: findMovies,
  } = useFetch(() => fetchMovies({ query }), false);

  useEffect(() => {
    const debounce = setTimeout(() => {
      searchMovies();
    }, 500);
    return () => clearTimeout(debounce);
  }, [query]);

  useEffect(() => {
    if (movies && movies?.length > 0 && movies?.[0])
      updateSearchCount(query, movies[0]);
  }, [movies]);

  const searchMovies = async () => {
    if (query.trim()) {
      await findMovies();
    } else {
      reset();
    }
  };

  return (
    <View className="flex-1 bg-primary">
      <Image
        source={images.bg}
        className="absolute z-0 flex-1 w-full"
        resizeMode="cover"
      />
      <FlatList
        data={movies}
        renderItem={({ item }) => <MovieCard movie={item} />}
        keyExtractor={(item) => item.id.toString()}
        className="px-5"
        numColumns={3}
        columnWrapperStyle={{
          justifyContent: "center",
          gap: 16,
          marginVertical: 16,
        }}
        contentContainerStyle={{ paddingBottom: 100 }}
        ListHeaderComponent={
          <>
            <View className="flex-row justify-center w-full mt-20">
              <Image source={icons.logo} className="w-12 h-12" />
            </View>
            <View className="my-5">
              <SearchBar
                placeholder="Search Movies..."
                value={query}
                setValue={setQuery}
              />
            </View>
            {loading && (
              <ActivityIndicator
                size="large"
                color="#0000ff"
                className="my-3"
              />
            )}
            {error && (
              <Text className="px-5 my-3 text-red-500">
                {" "}
                Error: {error.message}
              </Text>
            )}
            {!loading &&
              !error &&
              query.trim() &&
              movies &&
              movies?.length > 0 && (
                <Text className="text-xl font-bold text-white">
                  Search Result For <Text className="text-accent">{query}</Text>
                </Text>
              )}
          </>
        }
        ListEmptyComponent={
          !loading && !error ? (
            <View className="px-5 mt-10">
              <Text className="text-center text-gray-500">
                {query.trim() ? "No movies found" : "Search for a movie"}
              </Text>
            </View>
          ) : null
        }
      />
    </View>
  );
};

export default search;

const styles = StyleSheet.create({});
