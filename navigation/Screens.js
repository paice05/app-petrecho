import React, { useEffect } from "react";
import { Dimensions } from "react-native";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { createStackNavigator } from "@react-navigation/stack";

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
import RegisterForm from "../screens/Login/Form";
import Template from "../screens/Templates/List";
import TemplatesView from "../screens/Templates/View";
import { ImportContacts } from "../screens/Clients/components/ImportContacts";
import { Config } from "../screens/Config";
import { ConfigForm } from "../screens/Config/Form";

import { useColorContext } from "../context/colors";

import { Clients as ScheduleComponentsClients } from "../screens/Schedules/components/Clients";
import { Services as ScheduleComponentsServices } from "../screens/Schedules/components/Services";
import { Employees as ScheduleComponentsEmployees } from "../screens/Schedules/components/Employees";
import { CampaignList } from "../screens/Campaign/List";
import { CampaignForm } from "../screens/Campaign/Form";
import { Templates as CampaignComponentsTemplates } from "../screens/Campaign/components/Templates";
import { Clients as CampaignComponentsClients } from "../screens/Campaign/components/Clients";
import { CampaignReport } from "../screens/Campaign/Report";

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
          headerShown: false,
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

      <Stack.Screen
        name="ScheduleComponentsClients"
        component={ScheduleComponentsClients}
        options={{
          header: ({ navigation, scene }) => {
            return (
              <Header
                title="Pesquisando clientes"
                back
                navigation={navigation}
                scene={scene}
              />
            );
          },
        }}
      />

      <Stack.Screen
        name="ScheduleComponentsServices"
        component={ScheduleComponentsServices}
        options={{
          header: ({ navigation, scene }) => {
            return (
              <Header
                title="Pesquisando serviços"
                back
                navigation={navigation}
                scene={scene}
              />
            );
          },
        }}
      />
      <Stack.Screen
        name="ScheduleComponentsEmployees"
        component={ScheduleComponentsEmployees}
        options={{
          header: ({ navigation, scene }) => {
            return (
              <Header
                title="Pesquisando funcionários"
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
function CampaignsStack(props) {
  return (
    <Stack.Navigator
      initialRouteName="Campanhas"
      screenOptions={{
        mode: "card",
        headerShown: "screen",
      }}
    >
      <Stack.Screen
        name="Campaign"
        component={CampaignList}
        options={{
          header: ({ navigation, scene }) => (
            <Header title="Campanhas" navigation={navigation} scene={scene} />
          ),
          cardStyle: {
            backgroundColor: nowTheme.COLORS.PRIMARY_BACK_GROUND_COLOR,
          },
        }}
      />

      <Stack.Screen
        name="CampaignForm"
        component={CampaignForm}
        options={{
          header: ({ route, navigation, scene }) => {
            const params = route.params;

            const isEditing = params?.itemId;

            return (
              <Header
                title={isEditing ? "Atualizar campanha" : "Nova campanha"}
                back
                navigation={navigation}
                scene={scene}
              />
            );
          },
          // headerTransparent: true,
        }}
      />

      <Stack.Screen
        name="CampaignReport"
        component={CampaignReport}
        options={{
          header: ({ route, navigation, scene }) => {
            return (
              <Header
                title="Relatório da campanha"
                back
                navigation={navigation}
                scene={scene}
              />
            );
          },
          // headerTransparent: true,
        }}
      />

      <Stack.Screen
        name="CampaignComponentsTemplates"
        component={CampaignComponentsTemplates}
        options={{
          header: ({ navigation, scene }) => {
            return (
              <Header
                title="Pesquisando templates"
                back
                navigation={navigation}
                scene={scene}
              />
            );
          },
        }}
      />

      <Stack.Screen
        name="CampaignComponentsClients"
        component={CampaignComponentsClients}
        options={{
          header: ({ navigation, scene }) => {
            return (
              <Header
                title="Pesquisando clientes"
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
  const { colors } = useColorContext();
  return (
    <Stack.Navigator
      initialRouteName="Configurações"
      // screenOptions={{
      //   mode: "card",
      //   headerShown: "screen",
      // }}
    >
      <Stack.Screen
        name="Configurações"
        component={Config}
        options={{
          header: ({ scene }) => (
            <Header
              title="Configurações"
              scene={scene}
              bgColor={colors.PRIMARY_MENU_COLOR}
            />
          ),
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

function TemplatesStack(props) {
  return (
    <Stack.Navigator
      initialRouteName="Templates"
      screenOptions={{
        mode: "card",
        headerShown: "screen",
      }}
    >
      <Stack.Screen
        name="Templates"
        component={Template}
        options={{
          header: ({ navigation, scene }) => (
            <Header title="Templates" navigation={navigation} scene={scene} />
          ),
          cardStyle: {
            backgroundColor: nowTheme.COLORS.PRIMARY_BACK_GROUND_COLOR,
          },
        }}
      />

      <Stack.Screen
        name="TemplatesView"
        component={TemplatesView}
        options={{
          header: ({ route, navigation, scene }) => {
            const params = route.params;

            const isEditing = params?.itemId;

            return (
              <Header
                title={isEditing ? "Atualizar template" : "Criando template"}
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
        name="Templates"
        component={TemplatesStack}
        options={{
          headerShown: false,
        }}
      />

      <Drawer.Screen
        name="Campanhas"
        component={CampaignsStack}
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
      <Stack.Screen
        name="Cadastro"
        component={RegisterForm}
        options={{
          headerShown: false,
          backgroundColor: nowTheme.COLORS.PRIMARY_BACK_GROUND_COLOR,
        }}
      />
      <Stack.Screen name="App" component={AppStack} />
    </Stack.Navigator>
  );
}
