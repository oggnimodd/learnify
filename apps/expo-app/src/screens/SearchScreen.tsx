import { useQuery } from "@tanstack/react-query";
import {
  View,
  Text,
  TextInput,
  Pressable,
  Image,
  ScrollView,
  TouchableWithoutFeedback,
  Dimensions,
  ActivityIndicator,
} from "react-native";
import React, { useCallback, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { XMarkIcon } from "react-native-heroicons/outline";
import {
  FALLBACK_MOVIE_POSTER,
  ImageSize,
  getPosterPath,
  searchMovies,
} from "@/api";
import tw from "twrnc";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from ".";
import { colors } from "@/tailwind";
import { useDebouncedValue } from "@/hooks";

const { width, height } = Dimensions.get("window");

type SearchScreenProps = NativeStackScreenProps<
  RootStackParamList,
  "SearchScreen"
>;

const SearchScreen: React.FC<SearchScreenProps> = ({ navigation }) => {
  const [search, setSearch] = useState("");
  const [appliedSearch] = useDebouncedValue(search, 500);

  const {
    data: results,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["search", appliedSearch],
    queryFn: () => searchMovies(appliedSearch),
    enabled: appliedSearch !== "",
  });

  const handleSearch = useCallback(() => {
    if (search && search.length > 2) {
      setSearch(search); // trigger the query
    }
  }, [search]);

  return (
    <SafeAreaView style={tw`bg-neutral-800 flex-1 py-8`}>
      {/* search input */}
      <View
        style={tw`mx-4 mb-3 flex-row justify-between items-center border border-neutral-500 rounded-full`}
      >
        <TextInput
          onChangeText={setSearch}
          onEndEditing={handleSearch}
          placeholder="Search Movie"
          placeholderTextColor={"lightgray"}
          style={tw.style(
            "pb-1 pl-6 flex-1 text-base font-semibold text-white tracking-wider",
          )}
        />
        <Pressable
          onPress={() => navigation.navigate("HomeScreen")}
          style={tw`rounded-full p-3 m-1 bg-neutral-500`}
        >
          <XMarkIcon size="25" color="white" />
        </Pressable>
      </View>

      {/* search results */}
      {isLoading ? (
        <View style={tw`justify-center mt-4`}>
          <ActivityIndicator size="large" color={colors.blue[500]} />
        </View>
      ) : isError ? (
        <View style={tw`flex-row justify-center`}>
          <Image
            source={require("../../assets/images/movieTime.png")}
            style={tw`h-96 w-96`}
          />
        </View>
      ) : results && results.length > 0 ? (
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingHorizontal: 15 }}
        >
          <Text style={tw`text-blue-500 font-semibold ml-1 mb-3`}>
            Results ({results.length})
          </Text>
          <View style={tw`flex-row justify-between flex-wrap`}>
            {results.map((item, index) => {
              return (
                <TouchableWithoutFeedback
                  key={item.id}
                  onPress={() => navigation.push("MovieDetailsScreen", item)}
                >
                  <View style={tw`gap-y-2 mb-4`}>
                    <Image
                      source={{
                        uri:
                          getPosterPath(item.poster_path, ImageSize.SIZE_185) ||
                          FALLBACK_MOVIE_POSTER,
                      }}
                      style={tw.style("rounded-3xl", {
                        width: width * 0.44,
                        height: height * 0.3,
                      })}
                    />
                    <Text style={tw`text-gray-300 ml-1 font-semibold`}>
                      {item.title.length > 22
                        ? `${item.title.slice(0, 22)}...`
                        : item.title}
                    </Text>
                  </View>
                </TouchableWithoutFeedback>
              );
            })}
          </View>
        </ScrollView>
      ) : !isLoading && results && results.length === 0 ? (
        <View style={tw`items-center`}>
          <Text style={tw`text-blue-500 font-semibold`}>No results</Text>
        </View>
      ) : null}
    </SafeAreaView>
  );
};

export default SearchScreen;
