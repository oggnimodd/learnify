import {
  View,
  Text,
  Image,
  Dimensions,
  Pressable,
  ScrollView,
  Platform,
} from "react-native";
import React, { useState } from "react";
import { LinearGradient } from "expo-linear-gradient";
import { ChevronLeftIcon } from "react-native-heroicons/outline";
import { HeartIcon } from "react-native-heroicons/solid";
import { SafeAreaView } from "react-native-safe-area-context";
import { Cast, MovieList, LoadingIndicator } from "@/components";
import { useQuery } from "@tanstack/react-query";
import {
  getMovieCredits,
  getMovieDetails,
  getSimilarMovies,
  getPosterPath,
  FALLBACK_MOVIE_POSTER,
  ImageSize,
} from "@/api";
import tw from "twrnc";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from ".";

const ios = Platform.OS === "ios";
const topMargin = ios ? "" : " mt-3";

const { width, height } = Dimensions.get("window");

type MovieScreenProps = NativeStackScreenProps<
  RootStackParamList,
  "MovieDetailsScreen"
>;

const MovieScreen: React.FC<MovieScreenProps> = ({ navigation, route }) => {
  const movieId = route.params.id;

  const [isFavourite, toggleFavourite] = useState(false);

  const movieDetailsQuery = useQuery({
    queryKey: ["movieDetails", movieId],
    queryFn: () => getMovieDetails(movieId),
  });

  const movieCreditsQuery = useQuery({
    queryKey: ["movieCredits", movieId],
    queryFn: () => getMovieCredits(movieId),
  });

  const similarMoviesQuery = useQuery({
    queryKey: ["similarMovies", movieId],
    queryFn: () => getSimilarMovies(movieId),
  });

  const isLoading =
    movieDetailsQuery.isLoading ||
    movieCreditsQuery.isLoading ||
    similarMoviesQuery.isLoading;

  if (isLoading) {
    return <LoadingIndicator />;
  }

  return (
    <ScrollView
      contentContainerStyle={{ paddingBottom: 20 }}
      style={tw`flex-1 bg-neutral-900`}
    >
      {/* back button and movie poster */}
      <View style={tw`w-full`}>
        <SafeAreaView
          style={tw`absolute z-20 w-full flex-row justify-between items-center px-4 ${topMargin}`}
        >
          <Pressable
            style={tw`rounded-xl p-1`}
            onPress={() => navigation.goBack()}
          >
            <ChevronLeftIcon size="28" strokeWidth={2.5} color="white" />
          </Pressable>

          <Pressable onPress={() => toggleFavourite(!isFavourite)}>
            <HeartIcon
              size="35"
              style={isFavourite ? tw`text-red-500` : tw`text-white`}
            />
          </Pressable>
        </SafeAreaView>

        <View>
          <Image
            source={{
              uri:
                getPosterPath(
                  movieDetailsQuery.data?.poster_path || "",
                  ImageSize.SIZE_500,
                ) || FALLBACK_MOVIE_POSTER,
            }}
            style={{ width, height: height * 0.55 }}
          />
          <LinearGradient
            colors={[
              "transparent",
              "rgba(23, 23, 23, 0.8)",
              "rgba(23, 23, 23, 1)",
            ]}
            start={{ x: 0.5, y: 0 }}
            end={{ x: 0.5, y: 1 }}
            style={tw.style("absolute bottom-0", {
              width,
              height: height * 0.4,
            })}
          />
        </View>
      </View>

      {/* movie details */}

      <View style={tw`gap-y-2`}>
        {/* title */}
        <Text
          style={tw`text-white text-center text-3xl font-bold tracking-widest`}
        >
          {movieDetailsQuery.data?.title}
        </Text>

        {/* status, release year, runtime */}
        {movieDetailsQuery.data?.id ? (
          <Text
            style={tw`text-neutral-400 font-semibold text-base text-center`}
          >
            {movieDetailsQuery.data?.status} •{" "}
            {movieDetailsQuery.data?.release_date?.split("-")[0] || "N/A"} •{" "}
            {movieDetailsQuery.data?.runtime} min
          </Text>
        ) : null}

        {/* genres */}
        {movieDetailsQuery.data?.genres?.length &&
        movieDetailsQuery.data?.genres?.length > 0 ? (
          <View style={tw`flex-row flex-wrap justify-center`}>
            {movieDetailsQuery?.data?.genres.map((genre) => (
              <Text
                key={genre.id + genre.name}
                style={tw`text-white text-sm font-semibold m-1 px-2 py-1 rounded-full bg-neutral-700`}
              >
                {genre.name}
              </Text>
            ))}
          </View>
        ) : null}

        {/* overview */}
        <Text style={tw`text-white text-base font-light mt-3 px-4`}>
          {movieDetailsQuery.data?.overview}
        </Text>

        {/* cast */}
        <Cast cast={movieCreditsQuery.data?.cast || []} />

        {/* similar movies */}
        <MovieList
          title="Similar Movies"
          hideSeeAll={true}
          data={similarMoviesQuery.data || []}
        />
      </View>
    </ScrollView>
  );
};

export default MovieScreen;
