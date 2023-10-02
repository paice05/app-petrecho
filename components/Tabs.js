import React from "react";
import {
  StyleSheet,
  Dimensions,
  FlatList,
  Animated,
  TouchableOpacity,
  Vibration,
} from "react-native";
import { Block, Text, theme } from "galio-framework";

const { width } = Dimensions.get("screen");
import nowTheme from "../constants/Theme";
import { addDays, subDays } from "date-fns";

export default class Tabs extends React.Component {
  static defaultProps = {
    data: [], // id, title
  };

  state = {
    active: null,
  };

  componentDidMount() {
    const { selected } = this.props;
    if (selected) this.selectMenu(selected);
  }

  componentDidUpdate(prevProps) {
    if (this.props.selected !== prevProps.selected)
      this.selectMenu(this.props.selected);
  }

  animatedValue = new Animated.Value(1);

  animate() {
    this.animatedValue.setValue(0);

    Animated.timing(this.animatedValue, {
      toValue: 1,
      duration: 300,
      useNativeDriver: false,
    }).start();
  }

  menuRef = React.createRef();

  onScrollToIndexFailed = () => {
    this.menuRef.current.scrollToIndex({
      index: 0,
      viewPosition: 0.5,
    });
  };

  selectMenu = (id) => {
    this.setState({ active: id });

    this.menuRef.current.scrollToIndex({
      index: this.props.data.findIndex((item) => item.id === id),
      viewPosition: 0.5,
    });

    this.animate();
    this.props.onChange && this.props.onChange(id);
  };

  renderItem = (item) => {
    const isActive = this.state.active === item.id;
    const { date, colors } = this.props;

    const containerStyles = [
      styles.titleContainer,
      !isActive && { backgroundColor: "#e7e7e7" },
      isActive && {
        ...styles.containerShadow,
        backgroundColor: colors.BACKGROUND_CARD,
      },
    ];

    const currentDay = date.getDay();
    const result = currentDay - item.id;

    let day = date.getDate();
    if (result > 0) day = subDays(date, result).getDate();
    if (result < 0) day = addDays(date, result * -1).getDate();

    return (
      <TouchableOpacity
        onPress={() => {
          const vibrationDuration = 100;

          // Faz o dispositivo vibrar
          Vibration.vibrate(vibrationDuration);

          this.selectMenu(item.id);
        }}
      >
        <Block style={containerStyles}>
          <Animated.View style={[styles.menuTitle]}>
            <Text
              center
              color={isActive ? nowTheme.COLORS.WHITE : ""}
              size={12}
            >
              {item.title}
            </Text>
            <Text
              style={{ paddingHorizontal: 15 }}
              center
              color={isActive ? nowTheme.COLORS.WHITE : ""}
              size={18}
            >
              {day}
            </Text>
          </Animated.View>
        </Block>
      </TouchableOpacity>
    );
  };

  renderMenu = () => {
    const { data, ...props } = this.props;

    return (
      <FlatList
        {...props}
        data={data}
        horizontal={true}
        ref={this.menuRef}
        extraData={this.state}
        keyExtractor={(item) => item.id}
        showsHorizontalScrollIndicator={false}
        onScrollToIndexFailed={this.onScrollToIndexFailed}
        renderItem={({ item }) => this.renderItem(item)}
        contentContainerStyle={styles.menu}
      />
    );
  };

  render() {
    return <Block>{this.renderMenu()}</Block>;
  }
}

const styles = StyleSheet.create({
  container: {
    width: width,
    // backgroundColor: theme.COLORS.WHITE,
    zIndex: 2,
  },
  shadow: {
    shadowColor: theme.COLORS.BLACK,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    shadowOpacity: 0.2,
    elevation: 4,
  },
  menu: {
    paddingHorizontal: 35,
    paddingVertical: 8,
    // marginBottom: 20,
  },
  titleContainer: {
    alignItems: "center",
    // backgroundColor: nowTheme.COLORS.ACTIVE,
    borderRadius: 10,
    marginRight: 9,
    // paddingHorizontal: 10,
    paddingVertical: 3,
  },
  containerShadow: {
    shadowColor: "black",
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    shadowOpacity: 0.1,
    elevation: 1,
    color: nowTheme.COLORS.WHITE,
  },
  menuTitle: {
    paddingVertical: 8,
    minWidth: 50,
  },
});
