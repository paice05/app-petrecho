import { useCallback, useEffect, useState } from "react";
import { useFocusEffect } from "@react-navigation/native";
import { Alert, StyleSheet, View } from "react-native";
import { Block, Text } from "galio-framework";

import { useColorContext } from "../../context/colors";
import { CardCampaign } from "../../components/CardCampaign";
import { useRequestFindMany } from "../../components/hooks/useRequestFindMany";
import { useRequestDestroy } from "../../components/hooks/useRequestDestroy";
import { LoadingOverlay } from "../../components/LoadingOverlay";
import { PaginationSimple } from "../../components/PaginationSimple";
import { api } from "../../services/api";

export function CampaignList() {
  const { colors } = useColorContext();

  const [loadingStart, setLoadingStart] = useState(false);
  const [campaigns, setCampaigns] = useState([]);
  const [pagination, setPagination] = useState({
    currentPage: 0,
    total: 0,
    lastPage: 0,
  });

  const {
    execute: findMany,
    response,
    loading,
  } = useRequestFindMany({ path: "/campaigns" });

  const { execute: destroy } = useRequestDestroy({
    path: "/campaigns",
    callbackSuccess: () => {
      findMany();
    },
  });

  useEffect(() => {
    if (response) {
      setPagination({
        currentPage: response.currentPage,
        lastPage: response.lastPage,
        total: response.total,
      });
      setCampaigns(response.data);
    }
  }, [response]);

  useFocusEffect(
    useCallback(() => {
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

  const handleStartCampaign = async ({ campaignId }) => {
    try {
      setLoadingStart(true);
      const response = await api
        .request()
        .post(`/campaigns/${campaignId}/start`);
      setLoadingStart(false);
      if (response) findMany();
    } catch (error) {
      setLoadingStart(false);
    }
  };

  const handleConfirmDelete = (id) =>
    Alert.alert("Cuidado", "você deseja remover essa campanha?", [
      {
        text: "Cancelar",
        onPress: () => {},
        style: "cancel",
      },
      { text: "Confirmar", onPress: () => destroy(id) },
    ]);

  return (
    <View style={[styles.card, { backgroundColor: colors.BACKGROUND }]}>
      <LoadingOverlay visible={loading || loadingStart} />
      <Block>
        {campaigns.length === 0 && (
          <Text
            color={colors.TEXT}
            center
            style={{ marginTop: 20, marginBottom: 20 }}
          >
            Nenhum registro encontrado
          </Text>
        )}

        {campaigns.map((item) => {
          return (
            <CardCampaign
              key={item.id}
              id={item.id}
              name={item.name}
              content={item.content}
              status={item.status}
              countUsers={item.users.length}
              countSchedules={item.schedules.length}
              template={item?.template?.title}
              start={() => handleStartCampaign({ campaignId: item.id })}
              onDeleted={() => handleConfirmDelete(item.id)}
            />
          );
        })}
      </Block>

      <PaginationSimple
        currentPage={pagination.currentPage}
        total={pagination.total}
        lastPage={pagination.lastPage}
        handleNextPage={handleNextPage}
        handlePreviousPage={handlePreviousPage}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    flex: 1,
    padding: 15,
  },
});
