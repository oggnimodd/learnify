import {
  ActivityIndicator,
  Linking,
  Platform,
  Pressable,
  ScrollView,
  Text,
  View,
} from "react-native";
import tw from "twrnc";
import {
  NativeStackNavigationProp,
  NativeStackScreenProps,
} from "@react-navigation/native-stack";
import { RootStackParamList } from ".";
import { FC, useState } from "react";
import {
  Chapter,
  useGetCourseChapterIdsQuery,
  useGetChapterDetailsQuery,
} from "@/graphql";
import { useNavigation } from "@react-navigation/native";
import YoutubeVideo from "react-native-youtube-iframe";
// Please see vite.config.ts to see the aliasing for the web version
import { PortableText } from "@portabletext/react-native";

type Props = NativeStackScreenProps<RootStackParamList, "CourseScreen">;

// Check platform
const isAndroid = Platform.OS === "android";

const CourseScreen: FC<Props> = ({ navigation, route }) => {
  const courseId = route.params._id;

  // If there is no course id, go back
  if (!courseId) {
    navigation.goBack();
    return null;
  }

  const {
    data: chapterIds,
    isLoading,
    isError,
  } = useGetCourseChapterIdsQuery({
    courseId,
  });

  if (isLoading) {
    return (
      <View>
        <Text>Isloading...</Text>
      </View>
    );
  }

  if (isError) {
    return (
      <View>
        <Text>Error</Text>
      </View>
    );
  }

  // Map to string
  const chapters = chapterIds?.Course?.chapters
    ?.map((chapter) => chapter?._id)
    .filter((chapter) => typeof chapter === "string");

  // Go back if chapters is empty
  if (!chapters) {
    navigation.goBack();
    return null;
  }

  return (
    <ScrollView style={tw`flex-1 mt-6`}>
      <Pressable onPress={() => navigation.goBack()}>
        <Text>Go Back</Text>
      </Pressable>

      <View style={tw`px-4`}>
        <Text style={tw`font-semibold text-3xl`}>{route.params.title}</Text>
        <Text>{route.params.description}</Text>
      </View>

      {chapterIds?.Course?.chapters && (
        <CourseChapter
          chapterLength={chapterIds?.Course?.chapters?.length}
          chapters={chapters as string[]}
        />
      )}
    </ScrollView>
  );
};

export default CourseScreen;

interface CourseCardProps {
  chapters: string[];
  chapterLength: number;
}

const CourseChapter: FC<CourseCardProps> = ({ chapters, chapterLength }) => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  // Track the current chapter
  const [currentChapter, setCurrentChapter] = useState(0);
  const isFirstChapter = currentChapter === 0;
  const isLastChapter = currentChapter === chapterLength - 1;

  const {
    data: chapter,
    isLoading,
    isError,
  } = useGetChapterDetailsQuery({
    chapterId: chapters[currentChapter],
  });

  if (isLoading) {
    return (
      <View>
        <ActivityIndicator size={"large"} color={"black"} />
      </View>
    );
  }

  if (isError) {
    return (
      <View>
        <Text>Error</Text>
      </View>
    );
  }

  const videoId = chapter?.Chapter?.videoUrl?.split("v=")[1];

  return (
    <View>
      {/* Content */}
      <View style={tw`p-4`}>
        <Text style={tw`text-2xl font-semibold text-blue-500 mb-2`}>
          {chapter?.Chapter?.title}
        </Text>
        {videoId && (
          <View style={tw`mb-4 ${isAndroid ? "h-[200px]" : "h-auto"}`}>
            <YoutubeVideo height={200} videoId={videoId} />
          </View>
        )}

        <PortableText value={chapter?.Chapter?.contentRaw} />
      </View>

      <View style={tw`flex-row justify-between mt-4 px-4 pb-4`}>
        <Pressable
          onPress={() => {
            if (!isFirstChapter) {
              setCurrentChapter(currentChapter - 1);
            }
          }}
          disabled={isFirstChapter}
          style={tw.style("bg-blue-500 px-2 py-2 rounded-sm text-white", {
            "opacity-0": isFirstChapter,
          })}
        >
          <Text>Previous</Text>
        </Pressable>

        <Pressable
          onPress={() => {
            if (!isLastChapter) {
              setCurrentChapter(currentChapter + 1);
            } else {
              navigation.navigate("HomeScreen");
            }
          }}
          style={tw`bg-blue-500 px-2 py-2 rounded-sm text-white`}
        >
          {isLastChapter ? <Text>Finish</Text> : <Text>Next</Text>}
        </Pressable>
      </View>
    </View>
  );
};
