import React, { useEffect, useState } from "react";
import { ScrollView, StyleSheet, View } from "react-native";

// Galio components
import { Block, Text, theme } from "galio-framework";

// Now UI themed components
import { nowTheme } from "../../constants";
import { Button, Icon } from "../../components";
import CustomInput from "../../components/CustomInput";
import { api } from "../../services/api";
import { useValidateRequiredFields } from "../../components/hooks/useValidateRequiredFields";
import { CustomInputMask } from "../../components/CustomInputMask";
import { useColorContext } from "../../context/colors";

const RegisterExitForm = ({ navigation }) => {
  const [fields, setFields] = useState({
    description: "",
    value: "",
  });

  const { validate, errors } = useValidateRequiredFields({
    fields: ["description", "value"],
  });

  const { colors } = useColorContext();

  useEffect(() => {
    validate(fields);
  }, [fields]);

  const handleSubmitRegister = async () => {
    if (Object.values(errors).filter(Boolean).length) return;

    const value = fields?.value.replace("R$", "").replace(",", ".");

    const payload = {
      description: fields.description,
      value,
    };

    try {
      await api.request().post("/reports/register-out", payload);
      navigation.goBack();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.BACKGROUND }]}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Block
          flex
          gap={10}
          style={[
            styles.cardContainer,
            { backgroundColor: colors.BACKGROUND_CARD },
          ]}
        >
          <Block>
            <Block>
              <CustomInput
                placeholder="Digite a descrição"
                style={[styles.inputStyle]}
                labelText="Descrição"
                value={fields.description}
                onChangeText={(value) =>
                  setFields({ ...fields, description: value })
                }
                iconContent={
                  <Icon
                    size={16}
                    name="file-text"
                    family="feather"
                    style={[styles.inputIcons, { color: colors.ICON }]}
                  />
                }
              />
              {errors?.["description"] && (
                <Text center size={14} color={colors.DANGER}>
                  campo obrigatório
                </Text>
              )}
            </Block>

            <Block>
              <CustomInputMask
                placeholder="Digite o valor da saída"
                value={fields.value}
                onChangeText={(item) => setFields({ ...fields, value: item })}
              />
              {errors?.["value"] && (
                <Text center size={14} color={colors.DANGER}>
                  campo obrigatório
                </Text>
              )}
            </Block>
          </Block>

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
              style={styles.primary}
              backgroundColor={colors.BUTTON_REGISTER_OR_UPDATE}
              onPress={handleSubmitRegister}
            >
              <Text size={16} bold color={colors.TEXT_BUTTON_REGISTER_UPDATE}>
                Cadastrar
              </Text>
            </Button>
          </Block>
        </Block>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  title: {
    padding: 8,
    paddingHorizontal: 18,
    marginTop: 20,
    color: nowTheme.COLORS.BORDER_COLOR,
    borderRadius: 4,
    borderStyle: "solid",
    borderWidth: 1,
    borderColor: "#00acc1",
    backgroundColor: "#00acc1",
  },
  container: {
    flex: 1,
  },
  cardContainer: {
    padding: 10,
    margin: 15,
    borderRadius: 10,
  },
  button: {
    marginBottom: nowTheme.SIZES.BASE,
    borderRadius: 10,
    width: 120,
    height: 40,
    backgroundColor: "#eee",
    borderWidth: 1,
    borderColor: nowTheme.COLORS.BORDER,
  },
  primary: {
    marginBottom: theme.SIZES.BASE,
    borderRadius: 10,
    width: 120,
    height: 40,
    backgroundColor: nowTheme.COLORS.PRIMARY,
  },
  wrapperButtons: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: theme.SIZES.BASE,
    marginTop: 15,
  },
  inputIcons: {
    marginRight: 12,
    color: nowTheme.COLORS.PRIMARY,
  },
  inputStyle: {
    borderWidth: 1,
    borderColor: "#E3E3E3",
    borderRadius: 21.5,
  },
});

export default RegisterExitForm;
