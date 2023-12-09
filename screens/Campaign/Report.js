import { ScrollView, StyleSheet, View, TouchableOpacity } from "react-native";
import { Block, Text } from "galio-framework";
import { useState } from "react";

import { useRequestFindOne } from "../../components/hooks/useRequestFindOne";
import { useColorContext } from "../../context/colors";
import { useEffect } from "react";
import { LoadingOverlay } from "../../components/LoadingOverlay";
import { Button } from "../../components";
import { nowTheme } from "../../constants";
import { formartDate } from "../../utils/formartDate";
import { api } from "../../services/api";

const status = {
  pending: "Pendente",
  sent: "Enviado",
  falied: "Falhou",
};

export function CampaignReport({ route, navigation }) {
  const params = route.params;

  const [resendStart, setResendStart] = useState(false);
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

  const handleResendCampaign = async ({ campaignId }) => {
    try {
      setResendStart(true);
      const response = await api
        .request()
        .post(`/campaigns/${campaignId}/start`);
      setResendStart(false);
      if (response) execFindOne();
    } catch (error) {
      setResendStart(false);
    }
  };

  return (
    <View
      style={[
        styles.card,
        { backgroundColor: colors.BACKGROUND, borderColor: colors.TEXT },
      ]}
    >
      <LoadingOverlay visible={loadingFindOne} />
      <ScrollView>
        <Block
          style={[
            styles.container,
            { backgroundColor: colors.BACKGROUND_CARD },
          ]}
        >
          {Array.isArray(response?.schedules) &&
            response?.schedules.map((item) => (
              <Block key={item.id} flex space="between">
                <Block row space="between" style={{ paddingTop: 15 }}>
                  <Text size={18} color={colors.TEXT}>
                    {item?.shortName || item?.user?.name.length > 20
                      ? `${item?.user?.name.slice(0, 20)}...`
                      : item?.user?.name || "Indefinido"}
                  </Text>
                  <Text size={18} color={colors.TEXT}>
                    {" "}
                    {status[item.CampaignSchedule.status] || "indefinido"}
                  </Text>
                </Block>
                <Block row space="between">
                  <Text size={14} color={colors.SUB_TEXT}>
                    {item?.user?.cellPhone
                      .replace(/\D/g, "")
                      .replace(/(\d{2})(\d)/, "($1) $2")
                      .replace(/(\d{5})(\d)/, "$1-$2")
                      .replace(/(-\d{4})\d+?$/, "$1")}
                  </Text>
                  <Text size={14} color={colors.SUB_TEXT}>
                    {formartDate(item?.scheduleAt, "dd/MM/YYY - HH:mm")}
                  </Text>
                </Block>
                <Block style={styles.separate}>
                  {item.CampaignSchedule.status === "falied" ? (
                    <Block center>
                      <TouchableOpacity
                        onPress={() =>
                          handleResendCampaign({ campaignId: item.id })
                        }
                        style={[
                          styles.button,
                          {
                            backgroundColor: colors.BUTTON_REGISTER_OR_UPDATE,
                            marginTop: 15,
                          },
                        ]}
                      >
                        <Text bold size={16} color="#fff">
                          Reenviar
                        </Text>
                      </TouchableOpacity>
                    </Block>
                  ) : null}
                </Block>
              </Block>
            ))}
        </Block>
        <Block row center style={styles.buttonContainer}>
          <Button
            style={styles.buttonBack}
            backgroundColor={colors.BUTTON_BACK}
            onPress={() => navigation.goBack()}
          >
            <Text size={16} bold color={colors.TEXT_BUTTON_BACK}>
              Voltar
            </Text>
          </Button>
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
  container: {
    padding: 16,
    borderRadius: 5,
  },
  button: {
    maxWidth: 200,
    borderRadius: 10,
    paddingHorizontal: 20,
    paddingVertical: 12,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  separate: {
    borderBottomWidth: 1,
    borderBottomColor: nowTheme.COLORS.BORDER,
    paddingBottom: 10,
  },
  buttonBack: {
    borderRadius: 10,
    width: 120,
    height: 40,
    backgroundColor: "#eee",
    borderWidth: 1,
    borderColor: nowTheme.COLORS.BORDER,
    backgroundColor: "white",
  },
  buttonContainer: {
    paddingHorizontal: nowTheme.SIZES.BASE,
    paddingVertical: 15,
  },
});
