import { Course } from "@/graphql";

export type RootStackParamList = {
  HomeScreen: undefined;
  CourseScreen: Course;
};
