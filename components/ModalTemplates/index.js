import React, { useEffect, useState } from "react";
import { Block, Text } from "galio-framework";
import {
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  Linking,
  Alert,
  View,
} from "react-native";
import { Modal } from "../Modal";
import Button from "../Button";
import { useColorContext } from "../../context/colors";
import { Navigation } from "../Navigation";
import { nowTheme } from "../../constants";

const width = Dimensions.get("screen").width;

export function ModalTemplates({
  isVisible,
  changeVisible,
  templates,
  cellPhone,
  clientName,
  selectDay,
  selectHour,
  dayOfWeek,
}) {
  const { colors } = useColorContext();

  const [textTemplate, setTextTemplate] = useState("");
  const [manualActive, setManualActive] = useState(0);

  useEffect(() => {
    return () => {
      setManualActive(0);
    };
  }, []);

  useEffect(() => {
    if (!textTemplate) return;

    const handleReplaceAll = ({
      mensagem,
      contato,
      dia,
      diaDaSemana,
      horario,
    }) => {
      let temp = mensagem;

      if (temp.includes("{{contato}}"))
        temp = temp.replace("{{contato}}", contato);
      if (temp.includes("{{dia}}")) temp = temp.replace("{{dia}}", dia);
      if (temp.includes("{{dia-da-semana}}"))
        temp = temp.replace("{{dia-da-semana}}", `(${diaDaSemana})`);
      if (temp.includes("{{horario}}"))
        temp = temp.replace("{{horario}}", horario);

      return temp;
    };

    const response = handleReplaceAll({
      mensagem: textTemplate,
      contato: clientName,
      dia: selectDay,
      diaDaSemana: dayOfWeek,
      horario: selectHour,
    });

    setTextTemplate(response);
  }, [textTemplate, clientName, selectDay, dayOfWeek, selectHour]);

  return (
    <Modal
      isVisible={isVisible}
      handleCancel={() => {
        setManualActive(0);
        changeVisible();
      }}
      handleConfirm={changeVisible}
    >
      <Navigation
        manualActive={manualActive}
        items={[
          {
            title: "Selecionar",
            disabled: true,
            center: true,
            size: 18,
            children: (
              <Block>
                <ScrollView style={styles.scroll}>
                  <Block gap={10}>
                    {templates.map((item) => {
                      return (
                        <TouchableOpacity
                          onPress={() => {
                            setTextTemplate(item.content);
                            setManualActive(1);
                          }}
                        >
                          <Block
                            style={[
                              styles.container,
                              { backgroundColor: colors.BACKGROUND },
                            ]}
                          >
                            <Text color={colors.TEXT}>{item.title}</Text>
                          </Block>
                        </TouchableOpacity>
                      );
                    })}
                  </Block>
                </ScrollView>
              </Block>
            ),
          },
          {
            title: "Enviar",
            disabled: true,
            center: true,
            size: 18,
            children: (
              <View flex={1}>
                <ScrollView
                  showsVerticalScrollIndicator={true}
                  style={[
                    styles.scroll,
                    {
                      backgroundColor: colors.BACKGROUND,
                      paddingHorizontal: 8,
                      paddingVertical: 16,
                      borderRadius: 5,
                    },
                  ]}
                >
                  <Text color={colors.TEXT}>{textTemplate}</Text>
                </ScrollView>

                <Block center row>
                  <Button
                    onPress={() => {
                      setManualActive(0);
                    }}
                    style={styles.button}
                    backgroundColor={colors.DANGER}
                  >
                    <Text color="white">Voltar</Text>
                  </Button>
                  <Button
                    style={styles.button}
                    backgroundColor={colors.SUCCESS}
                    color={colors.SUCCESS}
                    onPress={() => {
                      if (!cellPhone) {
                        Alert.alert(
                          "Não foi possível enviar",
                          "Esse contato não tem um número de telefone cadastrado!"
                        );

                        return;
                      }

                      const url = `https://wa.me/55${cellPhone}?text=${textTemplate}`;

                      Linking.openURL(url);
                      setManualActive(0);
                      changeVisible();
                    }}
                  >
                    <Text color="black">whatsapp</Text>
                  </Button>
                </Block>
              </View>
            ),
          },
        ]}
      />
    </Modal>
  );
}

const styles = StyleSheet.create({
  scroll: {
    maxHeight: 300,
  },
  container: {
    paddingHorizontal: 8,
    paddingVertical: 16,
    borderRadius: 10,
  },
  button: {
    marginBottom: nowTheme.SIZES.BASE,
    borderRadius: 10,
    width: 120,
    height: 40,
    borderWidth: 1,
    borderColor: nowTheme.COLORS.BORDER,
  },
});
