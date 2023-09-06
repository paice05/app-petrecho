import React, { useCallback, useEffect, useState } from "react";
import { StyleSheet, ScrollView, Alert } from "react-native";
import { Block, Text } from "galio-framework";
import { useFocusEffect } from "@react-navigation/native";

import CardClient from "../../components/CardClient";
import { PaginationSimple } from "../../components/PaginationSimple";
import { useRequestFindMany } from "../../components/hooks/useRequestFindMany";
import { useRequestDestroy } from "../../components/hooks/useRequestDestroy";
import { LoadingOverlay } from "../../components/LoadingOverlay";

const Clients = ({ navigation }) => {
  const [clients, setClients] = useState([]);
  const [hasClean, setHasClean] = useState(false);

  const [pagination, setPagination] = useState({
    currentPage: 0,
    total: 0,
    lastPage: 0,
  });

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

  return (
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
              telefone={item.cellPhone}
              aniversario={item.birthDate}
              tipo={item.type === "pj" ? "Funcionário" : "Cliente"}
              isAdmin={item.isSuperAdmin}
              onDeleted={() => handleConfirmDelete(item.id)}
            />
          );
        })}
        <PaginationSimple
          currentPage={pagination.currentPage}
          total={pagination.total}
          lastPage={pagination.lastPage}
          handleNextPage={handleNextPage}
          handlePreviousPage={handlePreviousPage}
        />
      </Block>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  card: {
    padding: 15,
  },
});

export default Clients;
