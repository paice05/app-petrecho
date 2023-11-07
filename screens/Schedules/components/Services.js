import React, { useEffect, useState } from "react";

import { useNavigation, useRoute } from "@react-navigation/native";
import { Block, Text } from "galio-framework";
import { ScrollView, StyleSheet, TouchableOpacity, View } from "react-native";

import { useColorContext } from "../../../context/colors";
import { useRequestFindMany } from "../../../components/hooks/useRequestFindMany";
import { LoadingOverlay } from "../../../components/LoadingOverlay";
import { nowTheme } from "../../../constants";
import { Switch } from "../../../components";

export function Services() {
  const { colors } = useColorContext();
  const navigation = useNavigation();
  const route = useRoute();

  const { fields, setFields } = route.params;

  const [allServices, setAllServices] = useState([]);
  const [serviceSelected, setServiceSelected] = useState([]);
  const [typeView, setTypeView] = useState("all"); // all | selected
  const [averageTime, setAverageTime] = useState("");
  console.log({ serviceSelected });
  const {
    execute: execServices,
    response: responseServices,
    loading: loadingServices,
  } = useRequestFindMany({
    path: "/services",
    defaultQuery: { perPage: 100 },
  });

  useEffect(() => {
    if (responseServices) {
      setAllServices(responseServices.data);
    }
  }, [responseServices]);

  // loading services
  useEffect(() => {
    execServices();

    setServiceSelected(fields.services);
  }, []);

  useEffect(() => {
    // Atualiza o estado averageTime quando há mudanças em serviceSelected
    setAverageTime(serviceSelected.map((item) => item.averageTime).join("; "));
  }, [serviceSelected]);

  const handleChangeServiceSelected = ({ serviceId, name, averageTime }) => {
    if (serviceSelected.findIndex((item) => item.id === serviceId) !== -1) {
      setServiceSelected(
        serviceSelected.filter((item) => item.id !== serviceId)
      );

      setFields({
        ...fields,
        services: serviceSelected.filter((item) => item.id !== serviceId),
      });

      return;
    }

    setServiceSelected([
      ...serviceSelected,
      { id: serviceId, isPackage: false, name, averageTime },
    ]);

    setFields({
      ...fields,
      services: [
        ...serviceSelected,
        { id: serviceId, isPackage: false, name, averageTime },
      ],
    });
  };

  const handleChangeServiceIsPackage = ({ serviceId, isPackage }) => {
    setFields({
      ...fields,
      services: serviceSelected.map((item) => {
        if (item.id === serviceId) {
          return {
            ...item,
            isPackage: isPackage,
          };
        }

        return item;
      }),
    });

    setServiceSelected(
      serviceSelected.map((item) => {
        if (item.id === serviceId) {
          return {
            ...item,
            isPackage: isPackage,
          };
        }

        return item;
      })
    );
  };

  return (
    <Block style={[styles.container, { backgroundColor: colors.BACKGROUND }]}>
      <LoadingOverlay visible={loadingServices} />
      <Block flex={1}>
        <Block
          style={[styles.group, { backgroundColor: colors.BACKGROUND_CARD }]}
        >
          <Block
            row
            space="between"
            style={{
              alignItems: "center",
              paddingLeft: 20,
              paddingBottom: 20,
            }}
          >
            <Text size={16} bold color={colors.TEXT}>
              Serviços
            </Text>

            <Block row gap={20}>
              <TouchableOpacity onPress={() => setTypeView("all")}>
                <Text
                  size={16}
                  color={typeView === "all" ? colors.TEXT : colors.BACKGROUND}
                >
                  Todos
                </Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => setTypeView("selected")}>
                <Text
                  size={16}
                  color={
                    typeView === "selected" ? colors.TEXT : colors.BACKGROUND
                  }
                >
                  Selecionados ({serviceSelected.length})
                </Text>
              </TouchableOpacity>
            </Block>
          </Block>

          <ScrollView>
            <Block gap={10} style={{ paddingVertical: 10 }}>
              {(typeView === "selected"
                ? allServices.filter((item) =>
                    serviceSelected.some((service) => service.id === item.id)
                  )
                : allServices
              )
                .sort((a, b) => (a.name > b.name ? 1 : -1))
                .map((item) => {
                  const itemSelected =
                    serviceSelected.findIndex(
                      (service) => service.id === item.id
                    ) !== -1;

                  return (
                    <Block>
                      <TouchableOpacity
                        key={item.id}
                        onPress={() => {
                          handleChangeServiceSelected({
                            serviceId: item.id,
                            name: item.name,
                          });
                          handleChangeServiceSelected({
                            serviceId: item.id,
                            name: item.name,
                            averageTime: item.averageTime,
                          });
                        }}
                      >
                        <Block
                          row
                          space="between"
                          style={[
                            {
                              backgroundColor: "#FFFFFF",
                              padding: 8,
                              borderRadius: 4,
                              flex: 1,
                            },
                            itemSelected
                              ? {
                                  backgroundColor: colors.BACKGROUND,
                                  borderBottomLeftRadius: 0,
                                  borderBottomRightRadius: 0,
                                }
                              : {},
                          ]}
                        >
                          <Text color={itemSelected ? "white" : ""}>
                            {item.name}
                          </Text>
                          <Text color={itemSelected ? "white" : ""}>
                            {Number(item.price).toLocaleString("pt-BR", {
                              style: "currency",
                              currency: "BRL",
                              currencyDisplay: "symbol",
                            })}
                          </Text>
                        </Block>
                      </TouchableOpacity>
                      {itemSelected && (
                        <Block
                          row
                          style={[
                            styles.details,
                            { borderColor: colors.BACKGROUND },
                          ]}
                        >
                          <Switch
                            value={
                              serviceSelected.find(
                                (service) => service.id === item.id
                              )?.isPackage || false
                            }
                            onChange={() =>
                              handleChangeServiceIsPackage({
                                serviceId: item.id,
                                isPackage:
                                  !serviceSelected.find(
                                    (service) => service.id === item.id
                                  )?.isPackage || false,
                              })
                            }
                            trackColor={{
                              false: colors.SUB_TEXT,
                              true: colors.BUTTON,
                            }}
                          />
                          <Text size={16} color={colors.SUB_TEXT}>
                            sessão de pacote
                          </Text>
                        </Block>
                      )}
                    </Block>
                  );
                })}
            </Block>
          </ScrollView>
        </Block>
      </Block>

      {serviceSelected.length > 0 ? (
        <Block
          style={{
            padding: 15,
            borderRadius: 10,
            backgroundColor: colors.BACKGROUND_CARD,
          }}
        >
          <Text color={colors.TEXT} size={16}>
            Serviços selecionados:{" "}
            {serviceSelected.map((item) => item.name).join("; ")}
          </Text>
        </Block>
      ) : null}

      <Block row center gap={20}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={[
            styles.button,
            {
              backgroundColor: colors.BUTTON_BACK,
            },
          ]}
        >
          <Text center bold color={colors.TEXT_BUTTON_BACK}>
            Cancelar
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={[
            styles.button,
            {
              backgroundColor: colors.BUTTON_REGISTER_OR_UPDATE,
            },
          ]}
        >
          <Text center bold color={colors.TEXT_BUTTON_REGISTER_UPDATE}>
            Confirmar
          </Text>
        </TouchableOpacity>
      </Block>
    </Block>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 15,
    gap: 20,
  },
  group: {
    borderRadius: 10,
    paddingHorizontal: 8,
    paddingVertical: 20,
  },
  button: {
    marginBottom: nowTheme.SIZES.BASE,
    borderRadius: 10,
    width: 120,
    height: 40,
    borderWidth: 1,
    borderColor: nowTheme.COLORS.BORDER,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  details: {
    borderWidth: 1,
    borderRadius: 4,
    height: 50,
    borderTopWidth: 0,
    borderTopLeftRadius: 0,
    borderTopRightRadius: 0,
    alignItems: "center",
  },
});
