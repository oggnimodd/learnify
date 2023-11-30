import { View, Text, Image, Dimensions, Pressable } from "react-native";
import React from "react";
import { Carousel } from "react-native-snap-carousel";
import tw from "twrnc";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "@/screens";
import { Movie } from "@/models";
import { FALLBACK_MOVIE_POSTER, ImageSize, getPosterPath } from "@/api";

type TrendingMoviesProps = {
  data: Movie[];
};

const { width, height } = Dimensions.get("window");

const TrendingMovies: React.FC<TrendingMoviesProps> = ({ data }) => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const handleClick = (item: Movie) => {
    navigation.navigate("MovieDetailsScreen", item);
  };

  return (
    <View style={tw`mb-8`}>
      <Text style={tw`text-white text-xl mx-4 mb-5`}>Trending</Text>
      <Carousel
        data={data}
        renderItem={({ item }) => (
          <MovieCard handleClick={handleClick} item={item} />
        )}
        firstItem={1}
        inactiveSlideOpacity={0.6}
        sliderWidth={width}
        itemWidth={width * 0.62}
        slideStyle={{ display: "flex", alignItems: "center" }}
        vertical={false} // Add this line
      />
    </View>
  );
};

type MovieCardProps = {
  item: Movie;
  handleClick: (item: Movie) => void;
};

const MovieCard: React.FC<MovieCardProps> = ({ item, handleClick }) => {
  return (
    <Pressable onPress={() => handleClick(item)}>
      <Image
        style={tw.style("rounded-3xl", {
          width: width * 0.6,
          height: height * 0.4,
        })}
        source={{
          uri:
            getPosterPath(item.poster_path, ImageSize.SIZE_500) ||
            FALLBACK_MOVIE_POSTER,
        }}
      />
    </Pressable>
  );
};

export default TrendingMovies;
