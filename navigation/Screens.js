import React from 'react';
import { Animated, Dimensions, Easing } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createStackNavigator } from '@react-navigation/stack';
// header for screens
import { Header, Icon } from '../components';
import { nowTheme, tabs } from '../constants';

import Articles from '../screens/Articles';
import { Block } from 'galio-framework';
import Components from '../screens/Components';
// drawer
import CustomDrawerContent from './Menu';
// screens
import Pro from '../screens/Pro';
import SettingsScreen from '../screens/Settings';
import Home from '../screens/Home';
import Onboarding from '../screens/Onboarding';
import Profile from '../screens/Profile';
import Register from '../screens/Register';
import Clients from '../screens/Clients/List';
import ClientForm from '../screens/Clients/Form';
import SchedulesForm from '../screens/Schedules/Form';
import ScheduleList from '../screens/Schedules/List';
import ReportList from '../screens/Reports/List';
import EntryReport from '../screens/Reports/EntryReports';
import ExitReport from '../screens/Reports/ExitReports';
import ServiceList from '../screens/Service/List';
import ServiceForm from '../screens/Service/Form';
import RegisterExitForm from '../screens/Reports/FormRegisterExit';
import Login from '../screens/Login';

const { width } = Dimensions.get('screen');

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

function LoginStack(props) {
  return (
    <Stack.Navigator
      initialRouteName="Login"
      screenOptions={{
        mode: 'card',
        headerShown: false,
      }}
    >
      <Stack.Screen
        name="Login"
        component={Login}
        options={{
          backgroundColor: '#FFFFFF',
        }}
      />
    </Stack.Navigator>
  );
}
function ComponentsStack(props) {
  return (
    <Stack.Navigator
      initialRouteName="Components"
      screenOptions={{
        mode: 'card',
        headerShown: 'screen',
      }}
    >
      <Stack.Screen
        name="Components"
        component={Components}
        options={{
          header: ({ navigation, scene }) => (
            <Header title="Components" navigation={navigation} scene={scene} />
          ),
          backgroundColor: '#FFFFFF',
        }}
      />
    </Stack.Navigator>
  );
}

function ArticlesStack(props) {
  return (
    <Stack.Navigator
      initialRouteName="Articles"
      screenOptions={{
        mode: 'card',
        headerShown: 'screen',
      }}
    >
      <Stack.Screen
        name="Articles"
        component={Articles}
        options={{
          header: ({ navigation, scene }) => (
            <Header title="Articles" navigation={navigation} scene={scene} />
          ),
          backgroundColor: '#FFFFFF',
        }}
      />
    </Stack.Navigator>
  );
}

function AccountStack(props) {
  return (
    <Stack.Navigator
      initialRouteName="Account"
      screenOptions={{
        mode: 'card',
        headerShown: 'screen',
      }}
    >
      <Stack.Screen
        name="Account"
        component={Register}
        options={{
          header: ({ navigation, scene }) => (
            <Header transparent title="Create Account" navigation={navigation} scene={scene} />
          ),
          headerTransparent: true,
        }}
      />
    </Stack.Navigator>
  );
}

function ProfileStack(props) {
  return (
    <Stack.Navigator
      initialRouteName="Profile"
      screenOptions={{
        mode: 'card',
        headerShown: 'screen',
      }}
    >
      <Stack.Screen
        name="Profile"
        component={Profile}
        options={{
          header: ({ navigation, scene }) => (
            <Header transparent white title="Profile" navigation={navigation} scene={scene} />
          ),
          cardStyle: { backgroundColor: '#FFFFFF' },
          headerTransparent: true,
        }}
      />
    </Stack.Navigator>
  );
}

function HomeStack(props) {
  return (
    <Stack.Navigator
      screenOptions={{
        mode: 'card',
        headerShown: 'screen',
      }}
    >
      <Stack.Screen
        name="Home"
        component={Home}
        options={{
          header: ({ navigation, scene }) => (
            <Header title="Home" search options navigation={navigation} scene={scene} />
          ),
          cardStyle: { backgroundColor: '#FFFFFF' },
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
        mode: 'card',
        headerShown: 'screen',
      }}
    >
      <Stack.Screen
        name="Clientes"
        component={Clients}
        options={{
          header: ({ navigation, scene }) => (
            <Header title="Clientes" navigation={navigation} scene={scene} />
          ),
          cardStyle: { backgroundColor: '#FFFFFF' },
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
                title={isEditing ? 'Atualizar cliente' : 'Novo Cliente'}
                back
                navigation={navigation}
                scene={scene}
              />
            );
          },
          headerTransparent: true,
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
        mode: 'card',
        headerShown: 'screen',
      }}
    >
      <Stack.Screen
        name="Agendamentos"
        component={ScheduleList}
        options={{
          header: ({ navigation, scene }) => (
            <Header title="Agendamentos" navigation={navigation} scene={scene} />
          ),
          cardStyle: { backgroundColor: '#FFFFFF' },
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
                title={isEditing ? 'Atualizar agendamento' : 'Novo Agendamento'}
                back
                navigation={navigation}
                scene={scene}
              />
            );
          },
          headerTransparent: true,
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
        mode: 'card',
        headerShown: 'screen',
      }}
    >
      <Stack.Screen
        name="Service"
        component={ServiceList}
        options={{
          header: ({ navigation, scene }) => (
            <Header title="Serviços" navigation={navigation} scene={scene} />
          ),
          cardStyle: { backgroundColor: '#FFFFFF' },
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
                title={isEditing ? 'Atualizar serviço' : 'Novo Serviço'}
                back
                navigation={navigation}
                scene={scene}
              />
            );
          },
          headerTransparent: true,
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
        mode: 'card',
        headerShown: 'screen',
      }}
    >
      <Stack.Screen
        name="Relatorios"
        component={ReportList}
        options={{
          header: ({ navigation, scene }) => (
            <Header title="Relatórios" navigation={navigation} scene={scene} />
          ),
          cardStyle: { backgroundColor: '#FFFFFF' },
        }}
      />
      <Stack.Screen
        name="EntryReports"
        component={EntryReport}
        options={{
          header: ({ navigation, scene }) => {
            return <Header title={'Entradas'} back navigation={navigation} scene={scene} />;
          },
          headerTransparent: true,
        }}
      />
      <Stack.Screen
        name="ExitReports"
        component={ExitReport}
        options={{
          header: ({ navigation, scene }) => {
            return <Header title={'Saídas'} back navigation={navigation} scene={scene} />;
          },
          headerTransparent: true,
        }}
      />
      <Stack.Screen
        name="FormRegisterExits"
        component={RegisterExitForm}
        options={{
          header: ({ navigation, scene }) => {
            return <Header title={'Registrar saída'} back navigation={navigation} scene={scene} />;
          },
          headerTransparent: true,
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
      drawerContentOptions={{
        activeTintcolor: nowTheme.COLORS.WHITE,
        inactiveTintColor: nowTheme.COLORS.WHITE,
        activeBackgroundColor: 'transparent',
        itemStyle: {
          width: width * 0.75,
          backgroundColor: 'transparent',
          paddingVertical: 16,
          paddingHorizonal: 12,
          justifyContent: 'center',
          alignContent: 'center',
          alignItems: 'center',
          overflow: 'hidden',
        },
        labelStyle: {
          fontSize: 18,
          marginLeft: 12,
          fontWeight: 'normal',
        },
      }}
      initialRouteName="Agendamentos"
    >
      <Drawer.Screen
        name="Home"
        component={HomeStack}
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
        name="Agendamentos"
        component={SchedulesStack}
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
        name="Relatorios"
        component={ReportsStack}
        options={{
          headerShown: false,
        }}
      />
      <Drawer.Screen
        name="Components"
        component={ComponentsStack}
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
      <Drawer.Screen
        name="Articles"
        component={ArticlesStack}
        options={{
          headerShown: false,
        }}
      />
      <Drawer.Screen
        name="Profile"
        component={ProfileStack}
        options={{
          headerShown: false,
        }}
      />
      <Drawer.Screen
        name="Account"
        component={AccountStack}
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
        mode: 'card',
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
