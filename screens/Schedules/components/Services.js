import React, { useState } from "react";

import { useNavigation, useRoute } from "@react-navigation/native";
import { Block, Text } from "galio-framework";
import { ScrollView, TouchableOpacity, View } from "react-native";

import { useColorContext } from "../../../context/colors";

export function Services() {
  const { colors } = useColorContext();
  const navigation = useNavigation();
  const route = useRoute();

  const { fields, setFields } = route.params;

  const [allServices, setAllServices] = useState([]);
  const [typeView, setTypeView] = useState("all"); // all | selected

  return (
    <View>
      <Block
        row
        space="between"
        style={{
          alignItems: "center",
          paddingLeft: 20,
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
              color={typeView === "selected" ? colors.TEXT : colors.BACKGROUND}
            >
              Selecionados ({fields.services.length})
            </Text>
          </TouchableOpacity>
        </Block>
      </Block>

      <ScrollView
        style={{
          maxHeight: 300,
        }}
      >
        <Block gap={10}>
          {(typeView === "selected"
            ? allServices.filter((item) =>
                fields.services.some((service) => service.id === item.id)
              )
            : allServices
          )
            .sort((a, b) => (a.name > b.name ? 1 : -1))
            .map((item) => {
              const itemSelected =
                fields.services.findIndex(
                  (service) => service.id === item.id
                ) !== -1;

              return (
                <Block>
                  <TouchableOpacity
                    key={item.id}
                    onPress={() => handleChangeService({ serviceId: item.id })}
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
                          fields.services.find(
                            (service) => service.id === item.id
                          )?.isPackage || false
                        }
                        onChange={() =>
                          handleChangeIsPackage({
                            serviceId: item.id,
                            isPackage:
                              !fields.services.find(
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
    </View>
  );
}
