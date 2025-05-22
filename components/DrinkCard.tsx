import { Link } from "expo-router";
import { View, Text, Image } from "react-native";
import { DrinkFiltered } from "../lib/theCocktailDb";
import { useTheme } from "@emotion/react";

export default function DrinkCard(props: DrinkFiltered) {
  const theme = useTheme();
  return (
    <View
      style={{
        backgroundColor: theme.colors.backgroundSecondary,
        width: "100%",
        height: 350,
        display: "flex",
        justifyContent: "center",
        padding: 16,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: theme.colors.borderColor,
      }}
    >
      <Link
        href={{
          pathname: "/(tabs)/cocktails/[id]",
          params: { id: props.idDrink },
        }}
        style={{ width: "100%", height: "100%" }}
      >
        <View
          style={{
            width: "100%",
            height: "100%",
            justifyContent: "center",
            alignItems: "center",
            padding: 0,
            gap: 10,
          }}
        >
          <Text
            style={{
              color: theme.colors.text,
              fontSize: 30,
              textAlign: "center",
            }}
          >
            {props.strDrink}
          </Text>
          <Text
            style={{
              color: theme.colors.text,
              fontSize: 20,
              textAlign: "center",
            }}
          >
            ({props.strAlcoholic})
          </Text>
          <Image
            source={{
              uri: props.strDrinkThumb,
            }}
            style={{
              width: 200,
              height: 200,
              borderRadius: 8,
              borderWidth: 1,
              borderColor: theme.colors.borderColor,
            }}
          />
        </View>
      </Link>
    </View>
  );
}
