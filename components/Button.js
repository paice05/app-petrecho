import React from "react";
import { ActivityIndicator, StyleSheet, Vibration } from "react-native";
import { Block, Button } from "galio-framework";

import nowTheme from "../constants/Theme";

class ArButton extends React.Component {
  render() {
    const {
      small,
      shadowless,
      children,
      color,
      style,
      fontSize,
      round,
      loading,
      ...props
    } = this.props;

    const colorStyle = color && nowTheme.COLORS[color.toUpperCase()];

    const buttonStyles = [
      small && styles.smallButton,
      colorStyle === "neutral"
        ? { backgroundColor: "rgba(0,0,0,0)" }
        : color && { backgroundColor: colorStyle },
      round && { borderRadius: nowTheme.SIZES.BASE * 2 },
      !shadowless && styles.shadow,
      { ...style },
    ];

    return (
      <Button
        style={buttonStyles}
        shadowless
        textStyle={{ fontSize: fontSize || 12, fontWeight: "700" }}
        {...props}
        onPress={() => {
          const vibrationDuration = 100;

          // Faz o dispositivo vibrar
          Vibration.vibrate(vibrationDuration);

          this.props.onPress();
        }}
        disabled={loading}
      >
        <Block row gap={5}>
          {children}
          {loading ? <ActivityIndicator size="small" colo="#0000ff" /> : null}
        </Block>
      </Button>
    );
  }
}

ArButton.propTypes = {};

const styles = StyleSheet.create({
  smallButton: {
    width: 75,
    height: 28,
  },
});

export default ArButton;
