import React, { useCallback, useEffect, useState } from "react";
import { StyleSheet, ScrollView, Alert, View } from "react-native";

import CardService from "../../components/CardService";

import { PaginationSimple } from "../../components/PaginationSimple";

import { Block, Text } from "galio-framework";
import { useFocusEffect } from "@react-navigation/native";
import { useRequestFindMany } from "../../components/hooks/useRequestFindMany";
import { useRequestDestroy } from "../../components/hooks/useRequestDestroy";
import { LoadingOverlay } from "../../components/LoadingOverlay";
import { useColorContext } from "../../context/colors";

const Services = ({ navigation }) => {
  const [services, setServices] = useState([]);
  const [hasClean, setHasClean] = useState(false);

  const [pagination, setPagination] = useState({
    currentPage: 0,
    total: 0,
    lastPage: 0,
  });

  const { colors } = useColorContext();

  const {
    execute: findMany,
    response,
    loading,
  } = useRequestFindMany({ path: "/services" });
  const { execute: destroy } = useRequestDestroy({
    path: "/services",
    callbackSuccess: findMany,
  });

  useEffect(() => {
    if (response) {
      setPagination({
        currentPage: response.currentPage,
        lastPage: response.lastPage,
        total: response.total,
      });
      setServices(response.data);
    }
  }, [response]);

  useFocusEffect(
    useCallback(() => {
      setHasClean(!hasClean);
      findMany();
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
    Alert.alert("Cuidado", "você deseja remover esse serviço?", [
      {
        text: "Cancelar",
        onPress: () => {},
        style: "cancel",
      },
      { text: "Confirmar", onPress: () => destroy(id) },
    ]);

  return (
    <View
      style={[
        styles.card,
        {
          backgroundColor: colors.BACKGROUND,
        },
      ]}
    >
      <LoadingOverlay visible={loading} />
      <ScrollView showsVerticalScrollIndicator={true}>
        {services.length === 0 && (
          <Text center style={{ marginTop: 20, marginBottom: 20 }}>
            {" "}
            Nenhum registro encontrado{" "}
          </Text>
        )}

        {services.map((item) => {
          return (
            <CardService
              key={item.id}
              navigation={navigation}
              id={item.id}
              nome={item.name}
              image={item.image}
              valor={item.price}
              tempoMedio={item.averageTime}
              onDeleted={() => handleConfirmDelete(item.id)}
            />
          );
        })}
      </ScrollView>

      <PaginationSimple
        currentPage={pagination.currentPage}
        total={pagination.total}
        lastPage={pagination.lastPage}
        handleNextPage={handleNextPage}
        handlePreviousPage={handlePreviousPage}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    flex: 1,
    padding: 15,
  },
});

export default Services;
