import React from "react";
import {
  TouchableOpacity,
  StyleSheet,
  Platform,
  Dimensions,
  Keyboard,
  Vibration,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import {
  Button,
  Block,
  NavBar,
  Text,
  theme,
  Button as GaButton,
} from "galio-framework";

import Icon from "./Icon";
import Input from "./Input";
import Tabs from "./Tabs";
import nowTheme from "../constants/Theme";
import { useColorContext } from "../context/colors";

const { width } = Dimensions.get("window");

const NewClient = ({ navigation }) => {
  const { colors } = useColorContext();
  return (
    <TouchableOpacity
      onPress={() => {
        const vibrationDuration = 100;

        Vibration.vibrate(vibrationDuration);

        navigation.navigate("ClientForm");
      }}
    >
      <Block row center gap={3}>
        <Icon size={20} name="plus-circle" color={colors.ICON} />
        <Text bold size={16} color={colors.TEXT}>
          CRIAR
        </Text>
      </Block>
    </TouchableOpacity>
  );
};

const ImportContacts = ({ navigation }) => {
  const { colors } = useColorContext();
  return (
    <TouchableOpacity
      onPress={() => {
        const vibrationDuration = 100;

        Vibration.vibrate(vibrationDuration);

        navigation.navigate("ImportContacts");
      }}
    >
      <Icon size={20} name="download" color={colors.ICON} />
    </TouchableOpacity>
  );
};

const NewService = ({ navigation }) => {
  const { colors } = useColorContext();

  return (
    <TouchableOpacity
      onPress={() => {
        const vibrationDuration = 100;

        Vibration.vibrate(vibrationDuration);

        navigation.navigate("ServiceForm");
      }}
    >
      <Block row center gap={3}>
        <Icon size={20} name="plus-circle" color={colors.ICON} />
        <Text bold size={16} color={colors.TEXT}>
          CRIAR
        </Text>
      </Block>
    </TouchableOpacity>
  );
};

const NewSchedule = ({ navigation }) => {
  const { colors } = useColorContext();

  return (
    <TouchableOpacity
      onPress={() => {
        const vibrationDuration = 100;

        Vibration.vibrate(vibrationDuration);

        navigation.navigate("ScheduleForm");
      }}
    >
      <Block row center gap={3}>
        <Icon size={20} name="plus-circle" color={colors.ICON} />
        <Text bold size={16} color={colors.TEXT}>
          CRIAR
        </Text>
      </Block>
    </TouchableOpacity>
  );
};

const EditConfig = ({ navigation }) => {
  const { colors } = useColorContext();

  return (
    <TouchableOpacity
      onPress={() => {
        const vibrationDuration = 100;

        Vibration.vibrate(vibrationDuration);

        navigation.navigate("ConfigForm");
      }}
    >
      <Block row center gap={3}>
        <Icon size={20} name="edit" color={colors.ICON} />
        <Text bold size={16} color={colors.TEXT}>
          EDITAR
        </Text>
      </Block>
    </TouchableOpacity>
  );
};

const NewTemplate = ({ navigation }) => {
  const { colors } = useColorContext();

  return (
    <TouchableOpacity
      onPress={() => {
        const vibrationDuration = 100;

        Vibration.vibrate(vibrationDuration);

        navigation.navigate("TemplatesForm");
      }}
    >
      <Block row center gap={3}>
        <Icon size={20} name="plus-circle" color={colors.ICON} />
        <Text bold size={16} color={colors.TEXT}>
          NOVO
        </Text>
      </Block>
    </TouchableOpacity>
  );
};

const handleLeftPress = (back, navigation) => {
  const vibrationDuration = 100;

  Vibration.vibrate(vibrationDuration);

  return back ? navigation.goBack() : navigation.openDrawer();
};
const RenderRight = (props) => {
  const { title } = props;

  const navigation = useNavigation();

  switch (title) {
    case "Agendamentos":
      return [<NewSchedule navigation={navigation} />];
    case "Clientes":
      return [
        <Block row gap={20}>
          <ImportContacts navigation={navigation} />
          <NewClient navigation={navigation} />
        </Block>,
      ];
    case "Serviços":
      return [<NewService navigation={navigation} />];
    case "Configurações":
      return [<EditConfig navigation={navigation} />];
    case "Templates":
      return [<NewTemplate navigation={navigation} />];
    default:
      break;
  }
};

const RenderOptions = (props) => {
  const { optionLeft, optionRight } = props;

  return (
    <Block row style={styles.options}>
      <Button shadowless style={[styles.tab, styles.divider]}>
        <Block row middle>
          <Icon
            name="bulb"
            family="NowExtra"
            size={18}
            style={{ paddingRight: 8 }}
            color={nowTheme.COLORS.HEADER}
          />
          <Text size={16} style={styles.tabTitle}>
            {optionLeft || "Beauty"}
          </Text>
        </Block>
      </Button>
      <Button shadowless style={styles.tab}>
        <Block row middle>
          <Icon
            size={18}
            name="bag-162x"
            family="NowExtra"
            style={{ paddingRight: 8 }}
            color={nowTheme.COLORS.HEADER}
          />
          <Text size={18} style={styles.tabTitle}>
            {optionRight || "Fashion"}
          </Text>
        </Block>
      </Button>
    </Block>
  );
};

const RenderTabs = (props) => {
  const { tabs, tabIndex } = props;
  const defaultTab = tabs && tabs[0] && tabs[0].id;

  if (!tabs) return null;
  const navigation = useNavigation();

  return (
    <Tabs
      data={tabs || []}
      initialIndex={tabIndex || defaultTab}
      onChange={(id) => navigation.setParams({ tabId: id })}
    />
  );
};
const RenderHeader = (props) => {
  const { search, options, tabs } = props;
  if (search || tabs || options) {
    return (
      <Block center>
        {options ? <RenderOptions {...props} /> : null}
        {tabs ? <RenderTabs {...props} /> : null}
      </Block>
    );
  }
};

export function Header({
  back,
  title,
  white,
  transparent,
  bgColor,
  iconColor,
  titleColor,
  ...props
}) {
  const navigation = useNavigation();
  const { colors } = useColorContext();

  const headerStyles = [
    styles.shadow,
    transparent ? { backgroundColor: "rgba(0,0,0,0)" } : null,
  ];

  const navbarStyles = [styles.navbar, { backgroundColor: colors.BACKGROUND }];

  return (
    <Block style={headerStyles}>
      <NavBar
        back={false}
        title={title}
        style={navbarStyles}
        transparent={transparent}
        right={<RenderRight title={title} />}
        rightStyle={[title === "Clientes" && { paddingRight: 20 }]}
        left={
          <Icon
            name={back ? "arrow-left" : "menu"}
            size={22}
            onPress={() => handleLeftPress(back, navigation)}
            color={colors.ICON}
          />
        }
        leftStyle={{ paddingVertical: 12, flex: 0.2 }}
        titleStyle={[
          styles.title,
          { color: colors.TEXT },
          titleColor && { color: titleColor },
        ]}
        {...props}
      />
      <RenderHeader {...props} />
    </Block>
  );
}

const styles = StyleSheet.create({
  button: {
    padding: 12,
    position: "relative",
  },
  title: {
    width: "100%",
    fontSize: 18,
    fontWeight: "bold",
  },
  navbar: {
    paddingTop: 70,
  },
  shadow: {
    backgroundColor: "#fff",
    shadowColor: "black",
    shadowOffset: { width: 0, height: 10 },
    shadowRadius: 6,
    shadowOpacity: 0.2,
    elevation: 3,
  },
  notify: {
    backgroundColor: nowTheme.COLORS.SUCCESS,
    borderRadius: 4,
    height: theme.SIZES.BASE / 2,
    width: theme.SIZES.BASE / 2,
    position: "absolute",
    top: 9,
    right: 12,
  },
  header: {
    backgroundColor: theme.COLORS.WHITE,
  },
  divider: {
    borderRightWidth: 0.3,
    borderRightColor: theme.COLORS.ICON,
  },
  search: {
    height: 48,
    width: width - 32,
    marginHorizontal: 16,
    borderWidth: 1,
    borderRadius: 30,
    borderColor: nowTheme.COLORS.BORDER,
  },
  options: {
    marginBottom: 24,
    marginTop: 10,
    elevation: 4,
  },
  tab: {
    backgroundColor: theme.COLORS.TRANSPARENT,
    width: width * 0.35,
    borderRadius: 0,
    borderWidth: 0,
    height: 24,
    elevation: 0,
  },
  tabTitle: {
    lineHeight: 19,
    color: nowTheme.COLORS.HEADER,
  },
  social: {
    width: theme.SIZES.BASE * 3.5,
    height: theme.SIZES.BASE * 3.5,
    borderRadius: theme.SIZES.BASE * 1.75,
    justifyContent: "center",
  },
});
