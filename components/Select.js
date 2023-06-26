import React from 'react';
import { Dimensions, StyleSheet, View } from 'react-native';
import PropTypes from 'prop-types';
import ModalDropdown from 'react-native-modal-dropdown';
import { Block, Text } from 'galio-framework';

import Icon from './Icon';
import { nowTheme } from '../constants';

const { width } = Dimensions.get('screen');

class DropDown extends React.Component {
  state = {
    value: '',
  };

  componentDidMount() {
    const { initialValue } = this.props;

    this.setState({ value: initialValue });
  }

  handleOnSelect = (index, value) => {
    const { onSelect } = this.props;

    this.setState({ value: value });
  };

  render() {
    const {
      onSelect,
      iconName,
      iconFamily,
      iconSize,
      iconColor,
      color,
      textStyle,
      style,
      labelText,
      labelStyle,
      ...props
    } = this.props;

    const modalStyles = [styles.qty, color && { backgroundColor: color }, style];

    const textStyles = [styles.text, textStyle];

    const labelStyles = [styles.labelText];

    return (
      <Block style={styles.container}>
        <Text style={labelStyles}> {labelText} </Text>
        <ModalDropdown
          style={modalStyles}
          onSelect={this.handleOnSelect}
          dropdownStyle={styles.dropdown}
          dropdownTextStyle={{ paddingLeft: 16, fontSize: 12 }}
          searchPlaceholder="Escolha um tipo"
          {...props}
        >
          <Block flex row middle space="between">
            <Text size={12} style={textStyles}>
              {this.state.value}
            </Text>
            <Icon
              name={iconName || 'minimal-down2x'}
              family={iconFamily || 'NowExtra'}
              size={iconSize || 10}
              color={iconColor || nowTheme.COLORS.WHITE}
            />
          </Block>
        </ModalDropdown>
      </Block>
    );
  }
}

DropDown.propTypes = {
  onSelect: PropTypes.func,
  iconName: PropTypes.string,
  iconFamily: PropTypes.string,
  iconSize: PropTypes.number,
  color: PropTypes.string,
  textStyle: PropTypes.any,
};

const styles = StyleSheet.create({
  container: { marginBottom: 16 },
  qty: {
    width: width * 0.9,
    backgroundColor: '#FFFFFF',
    borderColor: nowTheme.COLORS.BORDER,
    borderWidth: 1,
    paddingHorizontal: 16,
    paddingTop: 10,
    paddingBottom: 9.5,
    borderRadius: 30,
    shadowColor: 'rgba(0, 0, 0, 0.1)',
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    shadowOpacity: 1,
  },
  text: {
    color: nowTheme.COLORS.WHITE,
    fontWeight: '600',
  },
  dropdown: {
    marginTop: 6,
    marginLeft: -14,
    width: 365,
  },
  labelText: {
    fontWeight: '500',
    fontSize: 14,
    marginLeft: 10,
    marginTop: 4,
    marginBottom: 5,
  },
});

export default DropDown;
