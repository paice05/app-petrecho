import React from "react";

import {
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Vibration,
  View,
} from "react-native";
import { Block, Text } from "galio-framework";
import {
  Menu,
  MenuProvider,
  MenuOptions,
  MenuOption,
  MenuTrigger,
  renderers,
} from "react-native-popup-menu";

import Icon from "../Icon";
import { nowTheme } from "../../constants";
import { useColorContext } from "../../context/colors";

const { SlideInMenu, ContextMenu, NotAnimatedContextMenu, Popover } = renderers;

const SimpleMenu = ({ children, styleContainer, items = [] }) => {
  const { colors } = useColorContext();

  return (
    <View>
      <Menu
        renderer={SlideInMenu}
        rendererProps={{ anchorStyle: styles.anchorStyle }}
        style={{ height: 50 }}
      >
        <MenuTrigger
          children={<Block style={styleContainer}>{children}</Block>}
        />
        <MenuOptions
          customStyles={{
            optionsContainer: {
              maxHeight: 300,
              paddingBottom: 25,
              paddingLeft: 5,
              backgroundColor: colors.BACKGROUND,
            },
          }}
        >
          <ScrollView>
            {items
              .filter((item) => !item.disable)
              .map((item, key) => (
                <MenuOption
                  key={key}
                  style={{ paddingVertical: 15 }}
                  onSelect={() => {
                    const vibrationDuration = 100;

                    // Faz o dispositivo vibrar
                    Vibration.vibrate(vibrationDuration);

                    item.onSelect(item.text);
                  }}
                  children={
                    <Block row gap={7} style={{ alignItems: "center" }}>
                      {item.icon && (
                        <Icon
                          size={18}
                          color={colors.TEXT}
                          name={item.icon}
                          family="feather"
                        />
                      )}
                      <Text size={18} color={colors.TEXT}>
                        {item.text}
                      </Text>
                    </Block>
                  }
                />
              ))}
          </ScrollView>
        </MenuOptions>
      </Menu>
    </View>
  );
};

export default SimpleMenu;

const styles = StyleSheet.create({
  anchorStyle: {
    backgroundColor: "blue",
  },
});
