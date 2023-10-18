import React, { useEffect, useState } from "react";
import { ScrollView, StyleSheet, Dimensions, View } from "react-native";

// Galio components
import { Block, Text, theme } from "galio-framework";

// Now UI themed components
import { Button, Icon } from "../../components";
import CustomInput from "../../components/CustomInput";
import { nowTheme } from "../../constants";
import { api } from "../../services/api";
import { useValidateRequiredFields } from "../../components/hooks/useValidateRequiredFields";
import { CustomInputMask } from "../../components/CustomInputMask";
import { useColorContext } from "../../context/colors";
import { CustomInputMaskHours } from "../../components/CustomInputMaskHours";

const ServiceForm = ({ route, navigation }) => {
  const params = route.params;
  const { colors } = useColorContext();

  const isEditing = params?.itemId;

  const [fields, setFields] = useState({
    name: "",
    price: "",
    averageTime: "",
  });

  const { validate, errors } = useValidateRequiredFields({
    fields: ["name", "price", "averageTime"],
  });

  useEffect(() => {
    validate(fields);
  }, [fields]);

  const handleSubmitCreate = async () => {
    if (Object.values(errors).filter(Boolean).length) return;

    const price = fields?.price.replace("R$", "").replace(",", ".");

    const payload = {
      name: fields.name,
      price,
      averageTime: fields.averageTime,
    };

    try {
      await api.request().post("/services", payload);

      navigation.goBack();
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmitUpdate = async () => {
    if (Object.values(errors).filter(Boolean).length) return;

    const price = fields?.price.replace("R$", "").replace(",", ".");

    const payload = {
      name: fields.name,
      price,
      averageTime: fields.averageTime,
    };

    try {
      await api.request().put(`/services/${isEditing}`, payload);

      navigation.goBack();
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (isEditing) {
      const fecthServices = async () => {
        try {
          const response = await api.request().get(`/services/${isEditing}`);

          setFields({
            name: response.data.name,
            price: Number(response.data.price).toLocaleString("pt-BR", {
              style: "currency",
              currency: "BRL",
              currencyDisplay: "symbol",
              averageTime: response.data.averageTime,
            }),
          });
        } catch (error) {
          console.log(error);
        }
      };

      fecthServices();
    } // busca dados da API
  }, []);

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: colors.BACKGROUND,
        },
      ]}
    >
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
              placeholder="Digite o nome do serviço"
              labelText="Nome"
              value={fields.name}
              onChangeText={(value) => setFields({ ...fields, name: value })}
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
            {errors?.["name"] && (
              <Text center size={14} color={colors.DANGER}>
                campo obrigatório
              </Text>
            )}
          </Block>

          <Block>
            <Text
              color={colors.TEXT}
              size={16}
              bold
              style={{ marginLeft: 20, marginBottom: 5 }}
            >
              Preço
            </Text>
            <CustomInputMask
              placeholder="Digite o valor do serviço"
              value={fields.price}
              onChangeText={(text) => setFields({ ...fields, price: text })}
            />
            {errors?.["price"] && (
              <Text center size={14} color={colors.DANGER}>
                campo obrigatório
              </Text>
            )}
          </Block>
          <Block>
            <Text
              color={colors.TEXT}
              size={16}
              bold
              style={{ marginLeft: 20, marginBottom: 5 }}
            >
              Tempo médio
            </Text>
            <CustomInputMaskHours
              placeholder="Digite o tempo médio do serviço"
              value={fields.averageTime}
              onChangeText={(text) =>
                setFields({ ...fields, averageTime: text })
              }
            />
            {errors?.["averageTime"] && (
              <Text center size={14} color={colors.DANGER}>
                campo obrigatório
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
          style={styles.primary}
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
  button: {
    marginBottom: nowTheme.SIZES.BASE,
    borderRadius: 10,
    width: 120,
    height: 40,
    backgroundColor: "#eee",
    borderWidth: 1,
    borderColor: nowTheme.COLORS.BORDER,
    backgroundColor: "white",
  },
  primary: {
    marginBottom: nowTheme.SIZES.BASE,
    borderRadius: 10,
    width: 120,
    height: 40,
  },
  inputIcons: {
    marginRight: 12,
  },
});

export default ServiceForm;
