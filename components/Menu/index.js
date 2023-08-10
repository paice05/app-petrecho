// SimpleMenu.js
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React from 'react';
import {
  Menu,
  MenuProvider,
  MenuOptions,
  MenuOption,
  MenuTrigger,
  renderers,
} from 'react-native-popup-menu';
import Icon from '../Icon';
import { nowTheme } from '../../constants';
import { Block } from 'galio-framework';

const { SlideInMenu } = renderers;

const SimpleMenu = ({ items = [] }) => {
  return (
    <View>
      <Menu renderer={SlideInMenu}>
        <MenuTrigger
          tri
          children={
            <Block style={styles.more} middle>
              <Icon
                size={12}
                color={nowTheme.COLORS.PRIMARY}
                name="more-vertical"
                family="feather"
              />
            </Block>
          }
        />
        <MenuOptions>
          {items
            .filter((item) => !item.disable)
            .map((item, key) => (
              <MenuOption
                key={key}
                style={{ paddingVertical: 15 }}
                onSelect={item.onSelect}
                text={item.text}
              />
            ))}
        </MenuOptions>
      </Menu>
    </View>
  );
};

export default SimpleMenu;

const styles = StyleSheet.create({
  more: {
    width: 25,
    height: 25,
    borderWidth: 1,
    borderStyle: 'solid',
    borderColor: nowTheme.COLORS.PRIMARY,
    borderRadius: 3,
  },
});
