import { ScrollView, StyleSheet, View } from "react-native";
import { Block, Text } from "galio-framework";

import { useRequestFindOne } from "../../components/hooks/useRequestFindOne";
import { useColorContext } from "../../context/colors";
import { useEffect } from "react";
import { LoadingOverlay } from "../../components/LoadingOverlay";

const status = {
  pending: "Pendente",
  sent: "Enviado",
  falied: "Falhou",
};

export function CampaignReport({ route }) {
  const params = route.params;

  const { colors } = useColorContext();

  const {
    execute: execFindOne,
    response,
    loading: loadingFindOne,
  } = useRequestFindOne({
    path: "/campaigns",
    id: params?.itemId,
  });

  useEffect(() => {
    if (params?.itemId) execFindOne();
  }, []);

  return (
    <View style={[styles.card, { backgroundColor: colors.BACKGROUND }]}>
      <LoadingOverlay visible={loadingFindOne} />
      <ScrollView>
        <Block
          style={{
            borderWidth: 1,
            borderColor: colors.TEXT,
            padding: 16,
            borderRadius: 5,
          }}
        >
          {Array.isArray(response?.schedules) &&
            response.schedules.map((item) => (
              <Block key={item.id} row space="between">
                <Text size={18} color={colors.TEXT}>
                  {item?.user?.name || item?.user?.cellPhone || "Indefinido"}
                </Text>
                <Text size={18} color={colors.TEXT}>
                  {" "}
                  {status[item.CampaignSchedule.status] || "indefinido"}
                </Text>
              </Block>
            ))}
        </Block>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    flex: 1,
    padding: 15,
  },
});
