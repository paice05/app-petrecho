import React, { useCallback, useEffect, useState } from "react";
import { View, StyleSheet, ScrollView, Alert } from "react-native";
import { useFocusEffect } from "@react-navigation/native";

import { Text, Block } from "galio-framework";

import { useColorContext } from "../../context/colors";
import { LoadingOverlay } from "../../components/LoadingOverlay";
import CardTemplates from "../../components/CardTemplates";
import { useRequestFindMany } from "../../components/hooks/useRequestFindMany";
import { useRequestDestroy } from "../../components/hooks/useRequestDestroy";
import { PaginationSimple } from "../../components/PaginationSimple";

// import { Container } from './styles';

const Templates = ({ navigation }) => {
  const [templates, setTemplates] = useState([]);
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
  } = useRequestFindMany({ path: "/templates" });

  const { execute: destroy } = useRequestDestroy({
    path: "/templates",
    callbackSuccess: findMany,
  });

  useEffect(() => {
    if (response) {
      setPagination({
        currentPage: response.currentPage,
        lasPage: response.lastPage,
        total: response.total,
      });
      setTemplates(response.data);
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
    Alert.alert("Cuidado", "você deseja remover este template?", [
      {
        text: "Cancelar",
        onPress: () => {},
        style: "cancel",
      },
      { text: "Confirmar", onPress: () => destroy(id) },
    ]);

  return (
    <View style={[styles.card, { backgroundColor: colors.BACKGROUND }]}>
      <LoadingOverlay visible={loading} />
      <ScrollView showsVerticalScrollIndicator={true}>
        {templates.length === 0 && (
          <Text center style={{ marginTop: 20, marginBottom: 20 }}>
            Nenhum registro encontrado
          </Text>
        )}

        {templates.map((item) => {
          return (
            <CardTemplates
              key={item.id}
              navigation={navigation}
              id={item.id}
              title={item.title}
              content={item.content}
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

export default Templates;
