import React from "react";
import { View, Image, StyleSheet } from "react-native";

const Avatar = ({ url }) => {
  return (
    <View style={styles.avatar}>
      {url && (
        <Image
          source={{
            uri: url,
          }}
          style={styles.image}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  avatar: {
    backgroundColor: "#D9D9D9",
    justifyContent: "center",
    alignItems: "center",
    width: 100,
    height: 100,
    borderRadius: 20,
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 20,
  },
});

export default Avatar;
