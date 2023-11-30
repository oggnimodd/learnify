import {
  UpcomingMovies,
  TrendingMovies,
  Movie,
  TopRatedMovies,
  SearchMovies,
  SimilarMovies,
  MovieDetails,
  Credits,
  PersonDetails,
  PersonMovieCast,
  PersonMovie,
} from "@/models";
import api from "./axios";
import { IMAGE_BASE_URL } from "./constants";

export const getTrendingMovies = async (): Promise<Movie[]> => {
  const response = await api.get<TrendingMovies>("/trending/movie/day");
  return response.data.results;
};

export const getUpcomingMovies = async (): Promise<Movie[]> => {
  const response = await api.get<UpcomingMovies>("/movie/upcoming");
  return response.data.results;
};

export const getTopRatedMovies = async (): Promise<Movie[]> => {
  const response = await api.get<TopRatedMovies>("/movie/top_rated");
  return response.data.results;
};

export const searchMovies = async (searchQuery: string): Promise<Movie[]> => {
  const response = await api.get<SearchMovies>("/search/movie", {
    params: {
      query: searchQuery.trim().toLowerCase(),
      include_adult: false,
      language: "en-US",
      page: "1",
    },
  });
  return response.data.results;
};

export const getMovieDetails = async (id: number): Promise<MovieDetails> => {
  const response = await api.get<MovieDetails>(`/movie/${id}`);
  return response.data;
};

export const getMovieCredits = async (id: number): Promise<Credits> => {
  const response = await api.get<Credits>(`/movie/${id}/credits`);
  return response.data;
};

export const getSimilarMovies = async (id: number): Promise<Movie[]> => {
  const response = await api.get<SimilarMovies>(`/movie/${id}/similar`);
  return response.data.results;
};

export const getPersonDetails = async (id: number): Promise<PersonDetails> => {
  const response = await api.get<PersonDetails>(`/person/${id}`);
  return response.data;
};

export const getPersonMovies = async (id: number): Promise<PersonMovie[]> => {
  const response = await api.get<PersonMovieCast>(
    `/person/${id}/movie_credits`,
  );
  return response.data.cast;
};

export enum ImageSize {
  SIZE_500 = "w500",
  SIZE_342 = "w342",
  SIZE_185 = "w185",
}

export const getPosterPath = (posterPath: string, size: ImageSize) =>
  posterPath ? `${IMAGE_BASE_URL}/${size}/${posterPath}` : null;
