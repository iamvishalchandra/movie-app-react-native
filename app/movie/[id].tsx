import { icons } from "@/constants/icons";
import { fetchMovieDetails } from "@/service/api";
import useFetch from "@/service/useFetch";
import { router, useLocalSearchParams } from "expo-router";
import React from "react";
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

interface IMovieInfo {
  label: string;
  value?: string | number | null;
}
const MovieInfo = ({ label, value }: IMovieInfo) => (
  <View className="flex-col items-start justify-center mt-5">
    <Text className="text-sm font-normal text-light-200">{label}</Text>
    <Text className="mt-2 text-sm font-bold text-light-100">
      {value ?? "NA"}
    </Text>
  </View>
);

const Movie = () => {
  const { id } = useLocalSearchParams();

  const {
    data: movie,
    loading,
    error,
  } = useFetch(() => fetchMovieDetails(id as string));
  console.log(movie?.budget);

  return (
    <View className="flex-1 bg-primary">
      <ScrollView contentContainerStyle={{ paddingBottom: 80 }}>
        <View>
          <Image
            source={{
              uri: `https://image.tmdb.org/t/p/w500${movie?.poster_path}`,
            }}
            className="w-full h-[550px]"
            resizeMode="stretch"
          />
        </View>
        <View className="flex-col items-start justify-center px-5 mt-5">
          <Text className="text-xl font-bold text-white">{movie?.title}</Text>
          <View className="flex-row items-center mt-2 gap-x-1">
            <Text className="text-sm text-light-200">
              {movie?.release_date?.split("-")[0]}
            </Text>
            <Text className="text-sm text-light-200">{movie?.runtime}m</Text>
          </View>
          <View className="flex-row items-center px-2 py-1 mt-2 rounded-md bg-dark-100 gap-x-1">
            <Image source={icons.star} />
            <Text className="text-sm font-bold text-white">
              {Math.round(movie?.vote_average ?? 0)}/10
            </Text>
            <Text className="text-sm text-light-200">
              ({movie?.vote_count} Votes)
            </Text>
          </View>
          <MovieInfo label="Overview" value={movie?.overview} />
          <MovieInfo
            label="Genres"
            value={movie?.genres.map((genre) => genre.name).join(" | ") || "NA"}
          />
          <View className="flex flex-row justify-between w-1/2">
            <MovieInfo
              label="Budget"
              value={
                movie && movie?.budget && movie?.budget > 0
                  ? `$${movie?.budget / 1000000} million`
                  : "NA"
              }
            />
            <MovieInfo
              label="Revenue"
              value={
                movie && movie?.revenue && movie?.revenue > 0
                  ? `$${Math.round(movie?.revenue / 1000000)} million`
                  : "NA"
              }
            />
          </View>
          <MovieInfo
            label="Production Company"
            value={
              movie?.production_companies
                .map((comp) => comp.name)
                .join(" | ") ?? "NA"
            }
          />
        </View>
      </ScrollView>
      <TouchableOpacity
        className="absolute bottom-5 left-0 right-0 mx-5 bg-accent rounded-lg py-3.5 flex flex-row items-center justify-center z-50"
        onPress={router.back}
      >
        <Image
          source={icons.arrow}
          className="size-5 mr-1 mt-0.5 rotate-180"
          tintColor={"#fff"}
        />
        <Text className="text-base font-semibold text-white"> Go Back</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Movie;

const styles = StyleSheet.create({});
