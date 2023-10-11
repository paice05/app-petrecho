import React, { useState, useEffect } from "react";
import { ScrollView, StyleSheet, Dimensions, View } from "react-native";

import { Text, Block } from "galio-framework";
import { useValidateRequiredFields } from "../../components/hooks/useValidateRequiredFields";
import { useColorContext } from "../../context/colors";
import CustomInput from "../../components/CustomInput";
import { Button, Icon } from "../../components";
import CustomTextInput from "../../components/CustomTextInput";
import { nowTheme } from "../../constants";
import { api } from "../../services/api";

const TemplatesForm = ({ route, navigation }) => {
  const params = route.params;
  const isEditing = params?.itemId;

  const [fields, setFields] = useState({
    title: "",
    content: `Olá {{contato}}, estou passando para te dizer que seu agendamento está marcado: 
    dia {{dia}} {{dia-da-semana}} ás {{horário}}. Aguardo sua presença! `,
  });

  const { validate, errors } = useValidateRequiredFields({
    fields: ["title", "content"],
  });

  const { colors } = useColorContext();

  useEffect(() => {
    validate(fields);
  }, [fields]);

  const handleSubmitCreate = async () => {
    if (Object.values(errors).filter(Boolean).length) return;

    const payload = {
      title: fields.title,
      content: fields.content,
    };

    try {
      await api.request().post("/templates", payload);
      navigation.goBack();
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmitUpdate = async () => {
    if (Object.values(errors).filter(Boolean).length) return;

    const payload = {
      title: fields.title,
      content: fields.content,
    };

    try {
      await api.request().put(`/templates/${isEditing}`, payload);
      navigation.goBack();
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (isEditing) {
      const fecthTemplates = async () => {
        try {
          const response = await api.request().get(`/templates/${isEditing}`);
          console.log({ response });
          setFields({
            title: response.data.title,
            content: response.data.content,
          });
        } catch (error) {
          console.log(error);
        }
      };

      fecthTemplates();
    }
  }, []);

  return (
    <View style={[styles.container, { backgroundColor: colors.BACKGROUND }]}>
      <ScrollView showsVerticalScrollIndicator={true}>
        <Block
          gap={10}
          style={[
            styles.cardContainer,
            { backgroundColor: colors.BACKGROUND_CARD },
          ]}
        >
          <Block>
            <CustomInput
              placeholder="Novo agendamento"
              labelText="Título"
              value={fields.title}
              onChangeText={(value) => setFields({ ...fields, title: value })}
              iconContent={
                <Icon
                  size={16}
                  name="file-text"
                  family="feather"
                  style={styles.inputIcons}
                  color={colors.ICON}
                />
              }
            />
            {errors?.["title"] && (
              <Text center size={14} color={colors.DANGER}>
                Campo obrigatório
              </Text>
            )}
          </Block>

          <Block>
            <CustomTextInput
              labelText="Conteúdo"
              rows={8}
              numbersOfLines={8}
              maxLength={200}
              //placeholder="Digite o conteúdo do template"
              onChangeText={(value) => setFields({ ...fields, content: value })}
              value={fields.content}
            />
            {errors?.["content"] && (
              <Text center size={14} color={colors.DANGER}>
                Campo obrigatório
              </Text>
            )}
          </Block>
        </Block>
      </ScrollView>
      <Block row center>
        <Button
          style={styles.button}
          backgroundColor={colors.BUTTON_BACK}
          onPress={() => navigation.goBack()}
        >
          <Text size={16} bold color={colors.TEXT_BUTTON_BACK}>
            Voltar
          </Text>
        </Button>
        <Button
          style={styles.primaryButton}
          backgroundColor={colors.BUTTON_REGISTER_OR_UPDATE}
          onPress={isEditing ? handleSubmitUpdate : handleSubmitCreate}
        >
          <Text size={16} bold color={colors.TEXT_BUTTON_REGISTER_UPDATE}>
            {isEditing ? "Atualizar" : "Cadastrar"}
          </Text>
        </Button>
      </Block>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 15,
  },
  cardContainer: {
    paddingHorizontal: 10,
    paddingVertical: 20,
    borderRadius: 10,
  },
  inputIcons: {
    marginRight: 12,
  },
  button: {
    marginBottom: nowTheme.SIZES.BASE,
    borderRadius: 10,
    width: 120,
    height: 40,
    borderWidth: 1,
    borderColor: nowTheme.COLORS.BORDER,
  },
  primaryButton: {
    marginBottom: nowTheme.SIZES.BASE,
    borderRadius: 10,
    height: 40,
  },
});

export default TemplatesForm;
