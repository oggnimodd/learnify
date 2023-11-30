import { Cast, Movie } from "@/models";

export type RootStackParamList = {
  HomeScreen: undefined;
  MovieDetailsScreen: Movie;
  PersonDetailsScreen: Cast;
  SearchScreen: undefined;
};
