import { View, Text, ScrollView, Pressable, Image } from "react-native";
import React, { FC } from "react";
import tw from "twrnc";
import { Cast as CastType } from "@/models";
import { FALLBACK_PERSON_IMAGE, ImageSize, getPosterPath } from "@/api";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "@/screens";

type CastProps = {
  cast: CastType[];
};

const Cast: FC<CastProps> = ({ cast }) => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  return (
    <View style={tw`my-6`}>
      <Text style={tw`text-white text-lg mx-4 mb-5`}>Top Cast</Text>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 15 }}
      >
        {cast?.map((person) => {
          return (
            <Pressable
              key={`cast-${person.cast_id}`}
              onPress={() => navigation.navigate("PersonDetailsScreen", person)}
              style={tw`mr-4 items-center`}
            >
              <View
                style={tw`overflow-hidden rounded-full h-20 w-20 items-center border border-neutral-500`}
              >
                <Image
                  style={tw`rounded-2xl h-24 w-20`}
                  source={{
                    uri:
                      getPosterPath(
                        person?.profile_path || "",
                        ImageSize.SIZE_185,
                      ) || FALLBACK_PERSON_IMAGE,
                  }}
                />
              </View>

              <Text style={tw`text-white text-xs mt-1`}>
                {person?.character.length > 10
                  ? `${person.character.slice(0, 10)}...`
                  : person?.character}
              </Text>
              <Text style={tw`text-neutral-400 text-xs`}>
                {person?.original_name.length > 10
                  ? `${person.original_name.slice(0, 10)}...`
                  : person?.original_name}
              </Text>
            </Pressable>
          );
        })}
      </ScrollView>
    </View>
  );
};

export default Cast;
