import React, { useEffect, useState } from "react";
import {
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Vibration,
  RefreshControl,
} from "react-native";
import { Block, Text } from "galio-framework";

import { useColorContext } from "../../context/colors";

export const Navigation = ({
  items = [],
  refreshing,
  onRefresh,
  manualActive,
}) => {
  const [active, setActive] = useState(manualActive || 0);
  const { colors } = useColorContext();

  useEffect(() => {
    if (manualActive || manualActive === 0) setActive(manualActive);
  }, [manualActive]);

  return (
    <Block flex={1} style={{ backgroundColor: "transparent", marginTop: -70 }}>
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
                if (item?.disabled) return;

                const vibrationDuration = 100;

                // Faz o dispositivo vibrar
                Vibration.vibrate(vibrationDuration);

                setActive(index);
              }}
            >
              <Text
                center={item?.center}
                size={item?.size || 22}
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
          onRefresh && (
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          )
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
    paddingVertical: 20,
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
