import {
  Dimensions,
  Image,
  Pressable,
  ScrollView,
  Text,
  View,
} from "react-native";
import tw from "twrnc";
import {
  NativeStackScreenProps,
  NativeStackNavigationProp,
} from "@react-navigation/native-stack";
import { RootStackParamList } from ".";
import { FC } from "react";
import { Course, useGetAllCategoriesQuery } from "@/graphql";
import { useNavigation } from "@react-navigation/native";

type Props = NativeStackScreenProps<RootStackParamList, "HomeScreen">;

const { width, height } = Dimensions.get("window");

const HomeScreen: FC<Props> = ({ navigation }) => {
  const { data: categories, isLoading, isError } = useGetAllCategoriesQuery({});

  if (isLoading)
    return (
      <View>
        <Text>Isloading...</Text>
      </View>
    );

  if (isError) {
    return (
      <View>
        <Text>Error</Text>
      </View>
    );
  }

  return (
    <View style={tw`flex-1 pt-6`}>
      <ScrollView style={tw`gap-y-4 mb-6`}>
        {categories?.allCategory?.map((category) => (
          <View style={tw`gap-y-1`} key={category._id}>
            <View style={tw`px-4`}>
              <Text style={tw`text-lg font-semibold`}>{category.title}</Text>
              <Text>{category.description}</Text>
            </View>
            <Courses courses={category.courses as Course[]} />
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

export default HomeScreen;

interface CoursesProps {
  courses: Course[];
}

const Courses: FC<CoursesProps> = ({ courses }) => {
  return (
    // Add gap
    <ScrollView
      contentContainerStyle={tw`flex-row gap-x-4 py-5 px-4`}
      horizontal
      showsHorizontalScrollIndicator={false}
    >
      {courses.map((course) => (
        <CourseCard key={course._id} course={course} />
      ))}
    </ScrollView>
  );
};

interface CourseCardProps {
  course: Course;
}

const CourseCard: FC<CourseCardProps> = ({ course }) => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  return (
    // Add shadow
    <Pressable
      style={tw.style("py-4 rounded-3xl", {
        width: width * 0.8,
      })}
      onPress={() => navigation.navigate("CourseScreen", course)}
    >
      {course.thumbnail?.asset?.url && (
        <Image
          source={{ uri: course.thumbnail?.asset?.url }}
          style={tw`w-full h-48 rounded-3xl`}
        />
      )}
      <Text style={tw`text-lg font-semibold mt-2`}>{course.title}</Text>
      <Text style={tw`mt-1`}>{course.description}</Text>
    </Pressable>
  );
};
