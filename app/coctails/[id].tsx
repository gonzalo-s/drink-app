import { View, Text, Image, StyleSheet } from "react-native";
import { useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { getDrinkById } from "../../lib/theCoctailDb";

export default function DrinkDetails() {
  const [details, setDetails] = useState(null);
  const { id } = useLocalSearchParams();

  function getId() {
    if (typeof id === "string") {
      return id;
    }
    return id[0];
  }

  useEffect(() => {
    async function getDrinkDetailsById() {
      const response = await getDrinkById(getId());

      setDetails(response);
    }

    getDrinkDetailsById();
  }, []);

  if (!details) {
    return (
      <View style={{ justifyContent: "center", alignItems: "center" }}>
        <Text>Loading...</Text>{" "}
      </View>
    );
  }

  return (
    <View>
      <Text>Drink Details ID: {getId()}</Text>
      <Image
        source={{
          uri: details.strDrinkThumb,
        }}
        style={styles.cardImage}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#1f1f1f",
    width: "100%",
    padding: 16,
    borderRadius: 8,
    marginBottom: 10,
    gap: 10,
  },
  cardTitle: {
    color: "white",
    fontSize: 20,
  },
  cardImage: {
    width: 100,
    height: 100,
    borderRadius: 8,
  },
});
