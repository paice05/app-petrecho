import React, { useEffect } from "react";
import { Dimensions } from "react-native";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { createStackNavigator } from "@react-navigation/stack";
import messaging from "@react-native-firebase/messaging";
// header for screens
import { Header } from "../components";
import { nowTheme } from "../constants";

import CustomDrawerContent from "./Menu";
// screens

import Clients from "../screens/Clients/List";
import ClientForm from "../screens/Clients/Form";
import SchedulesForm from "../screens/Schedules/Form";
import ScheduleList from "../screens/Schedules/List";
import ReportList from "../screens/Reports/List";
import EntryReport from "../screens/Reports/EntryReports";
import ExitReport from "../screens/Reports/ExitReports";
import ServiceList from "../screens/Service/List";
import ServiceForm from "../screens/Service/Form";
import RegisterExitForm from "../screens/Reports/FormRegisterExit";
import Login from "../screens/Login";
import { ImportContacts } from "../screens/Clients/components/ImportContacts";
import { Config } from "../screens/Config";
import { ConfigForm } from "../screens/Config/Form";

const { width } = Dimensions.get("screen");

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

function LoginStack(props) {
  return (
    <Stack.Navigator
      initialRouteName="Login"
      screenOptions={{
        mode: "card",
        headerShown: false,
      }}
    >
      <Stack.Screen
        name="Login"
        component={Login}
        options={{
          backgroundColor: nowTheme.COLORS.PRIMARY_BACK_GROUND_COLOR,
        }}
      />
    </Stack.Navigator>
  );
}

function ClientsStack(props) {
  return (
    <Stack.Navigator
      initialRouteName="Clientes"
      screenOptions={{
        mode: "card",
        headerShown: "screen",
      }}
    >
      <Stack.Screen
        name="Clientes"
        component={Clients}
        options={{
          header: ({ navigation, scene }) => (
            <Header title="Clientes" navigation={navigation} scene={scene} />
          ),
          cardStyle: {
            backgroundColor: nowTheme.COLORS.PRIMARY_BACK_GROUND_COLOR,
          },
        }}
      />

      <Stack.Screen
        name="ClientForm"
        component={ClientForm}
        options={{
          header: ({ route, navigation, scene }) => {
            const params = route.params;

            const isEditing = params?.itemId;

            return (
              <Header
                title={isEditing ? "Atualizar cliente" : "Novo cliente"}
                back
                navigation={navigation}
                scene={scene}
              />
            );
          },
        }}
      />

      <Stack.Screen
        name="ImportContacts"
        component={ImportContacts}
        options={{
          header: ({ navigation, scene }) => (
            <Header
              back
              title="Importar contatos"
              navigation={navigation}
              scene={scene}
            />
          ),
          cardStyle: {
            backgroundColor: nowTheme.COLORS.PRIMARY_BACK_GROUND_COLOR,
          },
        }}
      />
    </Stack.Navigator>
  );
}

function SchedulesStack(props) {
  return (
    <Stack.Navigator
      initialRouteName="Agendamentos"
      screenOptions={{
        mode: "card",
        headerShown: "screen",
      }}
    >
      <Stack.Screen
        name="Agendamentos"
        component={ScheduleList}
        options={{
          header: ({ navigation, scene }) => (
            <Header
              title="Agendamentos"
              navigation={navigation}
              scene={scene}
            />
          ),

          cardStyle: {
            backgroundColor: nowTheme.COLORS.PRIMARY_BACK_GROUND_COLOR,
          },
        }}
      />

      <Stack.Screen
        name="ScheduleForm"
        component={SchedulesForm}
        options={{
          header: ({ route, navigation, scene }) => {
            const params = route.params;

            const isEditing = params?.itemId;

            return (
              <Header
                title={isEditing ? "Atualizar agendamento" : "Novo agendamento"}
                back
                navigation={navigation}
                scene={scene}
              />
            );
          },
        }}
      />
    </Stack.Navigator>
  );
}

function ServicesStack(props) {
  return (
    <Stack.Navigator
      initialRouteName="Serviços"
      screenOptions={{
        mode: "card",
        headerShown: "screen",
      }}
    >
      <Stack.Screen
        name="Service"
        component={ServiceList}
        options={{
          header: ({ navigation, scene }) => (
            <Header title="Serviços" navigation={navigation} scene={scene} />
          ),
          cardStyle: {
            backgroundColor: nowTheme.COLORS.PRIMARY_BACK_GROUND_COLOR,
          },
        }}
      />

      <Stack.Screen
        name="ServiceForm"
        component={ServiceForm}
        options={{
          header: ({ route, navigation, scene }) => {
            const params = route.params;

            const isEditing = params?.itemId;

            return (
              <Header
                title={isEditing ? "Atualizar serviço" : "Novo serviço"}
                back
                navigation={navigation}
                scene={scene}
              />
            );
          },
          // headerTransparent: true,
        }}
      />
    </Stack.Navigator>
  );
}

function ReportsStack(props) {
  return (
    <Stack.Navigator
      initialRouteName="Relatorios"
      screenOptions={{
        mode: "card",
        headerShown: "screen",
      }}
    >
      <Stack.Screen
        name="Relatorios"
        component={ReportList}
        options={{
          header: ({ navigation, scene }) => (
            <Header title="Relatórios" navigation={navigation} scene={scene} />
          ),
          cardStyle: {
            backgroundColor: nowTheme.COLORS.PRIMARY_BACK_GROUND_COLOR,
          },
        }}
      />
      <Stack.Screen
        name="EntryReports"
        component={EntryReport}
        options={{
          header: ({ navigation, scene }) => {
            return (
              <Header
                title={"Entradas"}
                back
                navigation={navigation}
                scene={scene}
              />
            );
          },
        }}
      />
      <Stack.Screen
        name="ExitReports"
        component={ExitReport}
        options={{
          header: ({ navigation, scene }) => {
            return (
              <Header
                title={"Saídas"}
                back
                navigation={navigation}
                scene={scene}
              />
            );
          },
        }}
      />
      <Stack.Screen
        name="FormRegisterExits"
        component={RegisterExitForm}
        options={{
          header: ({ navigation, scene }) => {
            return (
              <Header
                title={"Registrar saída"}
                back
                navigation={navigation}
                scene={scene}
              />
            );
          },
        }}
      />
    </Stack.Navigator>
  );
}

function ConfigStack(props) {
  return (
    <Stack.Navigator
      initialRouteName="Configurações"
      screenOptions={{
        mode: "card",
        headerShown: "screen",
      }}
    >
      <Stack.Screen
        name="Configurações"
        component={Config}
        options={{
          header: ({ navigation, scene }) => (
            <Header
              title="Configurações"
              navigation={navigation}
              scene={scene}
            />
          ),
          cardStyle: {
            backgroundColor: nowTheme.COLORS.PRIMARY_BACK_GROUND_COLOR,
          },
        }}
      />
      <Stack.Screen
        name="ConfigForm"
        component={ConfigForm}
        options={{
          header: ({ navigation, scene }) => (
            <Header
              title="Atualizar Configurações"
              navigation={navigation}
              scene={scene}
              back
            />
          ),
          cardStyle: {
            backgroundColor: nowTheme.COLORS.PRIMARY_BACK_GROUND_COLOR,
          },
        }}
      />
    </Stack.Navigator>
  );
}

function AppStack(props) {
  return (
    <Drawer.Navigator
      style={{ flex: 1 }}
      drawerContent={(props) => <CustomDrawerContent {...props} />}
      drawerStyle={{
        backgroundColor: nowTheme.COLORS.PRIMARY,
        width: width * 0.8,
      }}
      screenOptions={{
        activeTintcolor: nowTheme.COLORS.WHITE,
        inactiveTintColor: nowTheme.COLORS.WHITE,
        activeBackgroundColor: "transparent",
        itemStyle: {
          width: width * 0.75,
          backgroundColor: "transparent",
          paddingVertical: 16,
          paddingHorizonal: 12,
          justifyContent: "center",
          alignContent: "center",
          alignItems: "center",
          overflow: "hidden",
        },
        labelStyle: {
          fontSize: 18,
          marginLeft: 12,
          fontWeight: "normal",
        },
      }}
      initialRouteName="Agendamentos"
    >
      <Drawer.Screen
        name="Relatorios"
        component={ReportsStack}
        options={{
          headerShown: false,
        }}
      />

      <Drawer.Screen
        name="Agendamentos"
        component={SchedulesStack}
        options={{
          headerShown: false,
        }}
      />

      <Drawer.Screen
        name="Clientes"
        component={ClientsStack}
        options={{
          headerShown: false,
        }}
      />

      <Drawer.Screen
        name="Serviços"
        component={ServicesStack}
        options={{
          headerShown: false,
        }}
      />

      <Drawer.Screen
        name="Configurações"
        component={ConfigStack}
        options={{
          headerShown: false,
        }}
      />

      <Drawer.Screen
        name="Login"
        component={LoginStack}
        options={{
          headerShown: false,
        }}
      />
    </Drawer.Navigator>
  );
}

export default function OnboardingStack(props) {
  /* const requestUserPermissions = async () => {
    const authStatus = await messaging().requestPermission();
    const enabled = authStatus === 1 || authStatus === 2;

    if (enabled) {
      let tokenFCM = await messaging().getToken();
      console.log(`User token: ${tokenFCM}`);

      messaging().onTokenRefresh((newToken) => {
        console.log(`User new token: ${newToken}`);

        console.log("Authorization status: ", authStatus);
      });
    }
  };

  useEffect(() => {
    if (requestUserPermissions) {
      //return FCM token for the device
      messaging()
        .getToken()
        .then((token) => {
          console.log(token);
        });
    } else {
      console.log("Failed token status", authStatus);
    }

    // Check whether an initial notification is available
    messaging()
      .getInitialNotification()
      .then(async (remoteMessage) => {
        if (remoteMessage) {
          console.log(
            "Notification caused app to open from quit state:",
            remoteMessage.notification
          );
        }
      });

    // Assume a message-notification contains a "type" property in the data payload of the screen to open
    messaging().onNotificationOpenedApp(async (remoteMessage) => {
      console.log(
        "Notification caused app to open from background state:",
        remoteMessage.notification
      );
    });

    // Register background handler
    messaging().setBackgroundMessageHandler(async (remoteMessage) => {
      console.log("Message handled in the background!", remoteMessage);
    });

    const unsubscribe = messaging().onMessage(async (remoteMessage) => {
      Alert.alert("A new FCM message arrived!", JSON.stringify(remoteMessage));
    });

    return unsubscribe;
  }, []); */

  return (
    <Stack.Navigator
      screenOptions={{
        mode: "card",
        headerShown: false,
      }}
    >
      <Stack.Screen
        name="Onboarding"
        component={Login}
        option={{
          headerTransparent: true,
        }}
      />
      <Stack.Screen name="App" component={AppStack} />
    </Stack.Navigator>
  );
}
