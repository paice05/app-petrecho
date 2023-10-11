import React, { useState } from "react";
import {
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Vibration,
  RefreshControl,
} from "react-native";
import { Block, Text } from "galio-framework";

import { nowTheme } from "../../constants";
import { useColorContext } from "../../context/colors";

export const Navigation = ({ items = [], refreshing, onRefresh }) => {
  const [active, setActive] = useState(0);
  const { colors } = useColorContext();

  return (
    <Block flex={1}>
      <Block row center gap={40} style={styles.container}>
        {items.map((item, index) => (
          <Block key={index} row>
            {item.count > 0 ? (
              <Block style={styles.badge}>
                <Text size={16} bold>
                  {item.count}
                </Text>
              </Block>
            ) : null}
            <TouchableOpacity
              onPress={() => {
                const vibrationDuration = 100;

                // Faz o dispositivo vibrar
                Vibration.vibrate(vibrationDuration);

                setActive(index);
              }}
            >
              <Text
                size={22}
                color={index === active ? colors.ICON : colors.TEXT}
              >
                {item.title}
              </Text>
            </TouchableOpacity>
          </Block>
        ))}
      </Block>
      <ScrollView
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        {items[active].children}
      </ScrollView>
    </Block>
  );
};

const styles = StyleSheet.create({
  divider: {
    borderColor: "gray",
    borderRightWidth: 1,
  },
  container: {
    paddingHorizontal: 8,
    paddingVertical: 25,
  },
  badge: {
    backgroundColor: "white",
    color: "black",
    position: "absolute",
    top: -20,
    right: -20,
    padding: 5,
    borderRadius: 60,
  },
});
