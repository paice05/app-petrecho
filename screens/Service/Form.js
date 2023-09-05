import React, { useEffect, useState } from "react";
import { ScrollView, StyleSheet, Dimensions } from "react-native";

// Galio components
import { Block, Text, theme } from "galio-framework";

// Now UI themed components
import { Button, Icon } from "../../components";
import CustomInput from "../../components/CustomInput";
import { nowTheme } from "../../constants";
import { api } from "../../services/api";
import { useValidateRequiredFields } from "../../components/hooks/useValidateRequiredFields";
import { CustomInputMask } from "../../components/CustomInputMask";

const ServiceForm = ({ route, navigation }) => {
  const params = route.params;

  const isEditing = params?.itemId;

  const [fields, setFields] = useState({
    name: "",
    price: "",
  });

  const { validate, errors } = useValidateRequiredFields({
    fields: ["name", "price"],
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
    <ScrollView showsVerticalScrollIndicator={true}>
      <Block flex gap={10} style={styles.cardContainer}>
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
              />
            }
          />
          {errors?.["name"] && (
            <Text center size={14} color={nowTheme.COLORS.PRIMARY}>
              campo obrigatório
            </Text>
          )}
        </Block>

        <Block>
          <Text size={16} bold style={{ marginLeft: 20, marginBottom: 5 }}>
            Preço
          </Text>
          <CustomInputMask
            placeholder="Digite o valor do serviço"
            value={fields.price}
            onChangeText={(text) => setFields({ ...fields, price: text })}
          />
          {errors?.["price"] && (
            <Text center size={14} color={nowTheme.COLORS.PRIMARY}>
              campo obrigatório
            </Text>
          )}
        </Block>

        <Block row center>
          <Button style={styles.button} onPress={() => navigation.goBack()}>
            <Text size={16} bold>
              Voltar
            </Text>
          </Button>
          <Button
            style={styles.primary}
            onPress={isEditing ? handleSubmitUpdate : handleSubmitCreate}
          >
            <Text size={16} bold color="#fff">
              {isEditing ? "Atualizar" : "Cadastrar"}
            </Text>
          </Button>
        </Block>
      </Block>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    padding: 10,
    margin: 15,
    borderRadius: 10,
    backgroundColor: "#fff",
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
    marginBottom: nowTheme.SIZES.BASE,
    borderRadius: 10,
    width: 120,
    height: 40,
    backgroundColor: nowTheme.COLORS.PRIMARY,
  },
  inputIcons: {
    marginRight: 12,
    color: nowTheme.COLORS.PRIMARY,
  },
});

export default ServiceForm;
