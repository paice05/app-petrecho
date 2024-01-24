import React, { useCallback, useEffect, useState } from "react";
import { StyleSheet, ScrollView, Alert, View } from "react-native";
import { Block, Text } from "galio-framework";
import { useFocusEffect } from "@react-navigation/native";

import CardClient from "../../components/CardClient";
import { PaginationSimple } from "../../components/PaginationSimple";
import { useRequestFindMany } from "../../components/hooks/useRequestFindMany";
import { useRequestDestroy } from "../../components/hooks/useRequestDestroy";
import { LoadingOverlay } from "../../components/LoadingOverlay";
import { DateTimePicker } from "../../components/DatePiker";
import CustomInput from "../../components/CustomInput";
import { Button, Icon } from "../../components";
import { nowTheme } from "../../constants";
import { useColorContext } from "../../context/colors";
import { useClientContext } from "../../context/clients";
import { endOfDay, startOfDay } from "date-fns";

const Clients = ({ navigation }) => {
  const [clients, setClients] = useState([]);
  const [hasClean, setHasClean] = useState(false);
  const [filters, setFilters] = useState({});
  const [pagination, setPagination] = useState({
    currentPage: 0,
    total: 0,
    lastPage: 0,
  });

  const { colors } = useColorContext();
  const { openFilter, setOpenFilter, setCountFilters } = useClientContext();

  const {
    execute: findMany,
    response,
    loading,
  } = useRequestFindMany({ path: "/users" });
  const { execute: destroy } = useRequestDestroy({
    path: "/users",
    callbackSuccess: findMany,
  });

  useEffect(() => {
    if (response) {
      setPagination({
        currentPage: response.currentPage,
        lastPage: response.lastPage,
        total: response.total,
      });
      setClients(response.data);
    }
  }, [response]);

  useFocusEffect(
    useCallback(() => {
      setHasClean(!hasClean);
      findMany();
      setFilters({});
      setOpenFilter(false);
      setCountFilters(0);
    }, [])
  );

  const handleNextPage = () => {
    if (pagination.currentPage === pagination.lastPage) return;

    findMany({ page: pagination.currentPage + 1 });
  };

  const handlePreviousPage = () => {
    if (pagination.currentPage === 1) return;

    findMany({ page: pagination.currentPage - 1 });
  };

  const handleConfirmDelete = (id) =>
    Alert.alert("Cuidado", "você deseja remover esse cliente?", [
      {
        text: "Cancelar",
        onPress: () => {},
        style: "cancel",
      },
      { text: "Confirmar", onPress: () => destroy(id) },
    ]);

  const handleSubmitFilters = (clear = false) => {
    const countFilters = Object.values(filters).filter(Boolean).length;

    if (clear) {
      findMany();
      setCountFilters(0);
      setFilters({});

      return;
    }

    setCountFilters(countFilters);
    findMany({
      where: {
        ...(filters.name ? { name: { $iLike: `%${filters.name}%` } } : {}),
      },
      ...(filters.scheduleAt
        ? {
            include: [
              {
                model: "Schedule",
                as: "schedules",
                where: {
                  scheduleAt: {
                    $between: [
                      startOfDay(filters.scheduleAt),
                      endOfDay(filters.scheduleAt),
                    ],
                  },
                },
              },
            ],
          }
        : {}),
    });
  };

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: colors.BACKGROUND,
        },
      ]}
    >
      <ScrollView
        showsVerticalScrollIndicator={true}
        contentContainerStyle={styles.card}
      >
        <LoadingOverlay visible={loading} />

        <Block>
          {clients.length === 0 && (
            <Text center style={{ marginTop: 20, marginBottom: 20 }}>
              Nenhum registro encontrado
            </Text>
          )}

          {clients.map((item) => {
            return (
              <CardClient
                key={item.id}
                navigation={navigation}
                id={item.id}
                nome={item.name}
                telefone={item.cellPhone
                  .replace(/\D/g, "")
                  .replace(/(\d{2})(\d)/, "($1) $2")
                  .replace(/(\d{5})(\d)/, "$1-$2")
                  .replace(/(-\d{4})\d+?$/, "$1")}
                aniversario={item.birthDate}
                tipo={item.type === "pj" ? "Funcionário" : "Cliente"}
                isAdmin={item.isSuperAdmin}
                onDeleted={() => handleConfirmDelete(item.id)}
              />
            );
          })}
        </Block>
      </ScrollView>
      <PaginationSimple
        currentPage={pagination.currentPage}
        total={pagination.total}
        lastPage={pagination.lastPage}
        handleNextPage={handleNextPage}
        handlePreviousPage={handlePreviousPage}
      />

      {openFilter && (
        <Block style={styles.wrapperFilters}>
          <Block height="100%" justifyContent="flex-end">
            <Block
              style={[
                styles.contentFilters,
                { backgroundColor: colors.BACKGROUND },
              ]}
            >
              <Block>
                <CustomInput
                  placeholder="Digite o nome do cliente"
                  labelText="Nome"
                  value={filters.name}
                  onChangeText={(value) =>
                    setFilters({ ...filters, name: value })
                  }
                  iconContent={
                    <Icon
                      size={16}
                      name="user"
                      family="feather"
                      style={[styles.inputIcons, { color: colors.ICON }]}
                    />
                  }
                />
              </Block>
              <Block>
                <Text
                  size={16}
                  bold
                  style={{ marginLeft: 20, marginBottom: 5 }}
                  color={colors.TEXT}
                >
                  Agendados no dia
                </Text>
                <DateTimePicker
                  value={filters.scheduleAt}
                  onChange={(value) =>
                    setFilters({ ...filters, scheduleAt: value })
                  }
                  mode="date"
                  icon="calendar"
                  formart="dd MMMM"
                  placeholder="Informe uma data"
                  clear
                  onClickClear={() =>
                    setFilters({ ...filters, scheduleAt: null })
                  }
                />
              </Block>
              <Block row center>
                <Button
                  style={styles.button}
                  backgroundColor={colors.BUTTON_BACK}
                  onPress={() => {
                    setOpenFilter(false);

                    handleSubmitFilters(true);
                  }}
                >
                  <Text size={16} bold color={colors.TEXT_BUTTON_BACK}>
                    Limpar
                  </Text>
                </Button>
                <Button
                  style={styles.primary}
                  backgroundColor={colors.BUTTON_REGISTER_OR_UPDATE}
                  onPress={() => {
                    setOpenFilter(false);
                    handleSubmitFilters();
                  }}
                >
                  <Text
                    size={16}
                    bold
                    color={colors.TEXT_BUTTON_REGISTER_UPDATE}
                  >
                    Filtrar
                  </Text>
                </Button>
              </Block>
            </Block>
          </Block>
        </Block>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 15,
    position: "relative",
  },

  wrapperFilters: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    paddingVertical: 14,
    paddingHorizontal: 14,
  },

  contentFilters: {
    height: "auto",
    padding: 14,
  },
  inputIcons: {
    marginRight: 12,
  },
  button: {
    marginBottom: nowTheme.SIZES.BASE,
    borderRadius: 10,
    width: 120,
    height: 40,
    //backgroundColor: "#eee",
    borderWidth: 1,
    borderColor: nowTheme.COLORS.BORDER,
  },
  primary: {
    marginBottom: nowTheme.SIZES.BASE,
    borderRadius: 10,
    width: 120,
    height: 40,
  },
});

export default Clients;
