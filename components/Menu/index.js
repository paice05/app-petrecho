import React from 'react';

import { StyleSheet, View } from 'react-native';
import { Block, Text } from 'galio-framework';
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
                children={
                  <Block row gap={7}>
                    {item.icon && <Icon color={item.color} name={item.icon} family="feather" />}
                    <Text color={item.color}>{item.text}</Text>
                  </Block>
                }
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
