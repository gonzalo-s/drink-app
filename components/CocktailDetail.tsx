import { View, Text, Image } from "react-native";
import { useTheme } from "@emotion/react";
import {
  SafeAreaView,
  useSafeAreaInsets,
} from "react-native-safe-area-context";
import Ingredient from "./Ingredient";
import { Drink } from "@/lib/theCocktailDb";

type CocktailDetailProps = {
  details: Drink;
};

export default function CocktailDetail(props: CocktailDetailProps) {
  const theme = useTheme();

  return (
    <View
      style={{
        padding: 16,
        width: "100%",
        height: "100%",
        flex: 1,
        backgroundColor: theme.colors.background,
        borderRadius: theme.border.radius,
        borderWidth: theme.border.width,
        borderColor: theme.colors.borderColor,
      }}
    >
      <View
        style={{
          flex: 1,
          height: "100%",
          width: "100%",
          gap: 20,
          justifyContent: "flex-start",
        }}
      >
        <Text
          style={{
            width: "100%",
            textAlign: "center",
            color: theme.colors.text,
            fontSize: 50,
          }}
        >
          {props.details.strDrink}
        </Text>
        <View style={{ flexDirection: "row", gap: 20 }}>
          <Image
            source={{ uri: props.details.strDrinkThumb }}
            style={{
              width: 200,
              height: 200,
              borderRadius: theme.border.radius,
              borderWidth: theme.border.width,
              borderColor: theme.colors.borderColor,
            }}
          />
          <View style={{ gap: 10 }}>
            <Text style={{ color: theme.colors.text, fontSize: 26 }}>
              Category:
            </Text>
            <Text style={{ color: theme.colors.text, fontSize: 16 }}>
              {props.details.strCategory} - {props.details.strAlcoholic}
            </Text>
            <Text style={{ color: theme.colors.text, fontSize: 26 }}>
              Glass:
            </Text>
            <Text style={{ color: theme.colors.text, fontSize: 16 }}>
              {props.details.strGlass}
            </Text>
          </View>
        </View>
        <Text style={{ color: theme.colors.text, fontSize: 26 }}>
          Instructions:
        </Text>
        <Text style={{ color: theme.colors.text, fontSize: 16 }}>
          {props.details.strInstructions}
        </Text>

        <Text style={{ color: theme.colors.text, fontSize: 26 }}>
          Ingredients:
        </Text>
        <View
          style={{
            gap: 10,
            justifyContent: "space-between",
          }}
        >
          {props.details?.ingredientInstructions?.length &&
            props.details.ingredientInstructions.length > 0 &&
            props.details.ingredientInstructions.map((item) => {
              return <Ingredient {...item} key={item.ingredient} />;
            })}
        </View>
      </View>
    </View>
  );
}
