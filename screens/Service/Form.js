import React, { useEffect, useState } from "react";
import {
  ScrollView,
  StyleSheet,
  View,
  Image,
  TextInput,
  Modal,
} from "react-native";

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

  const [imageUrlModalVisible, setImageUrlModalVisible] = useState(false);
  const [tempImageUrl, setTempImageUrl] = useState("");

  const [fields, setFields] = useState({
    name: "",
    price: "",
    averageTime: "",
    image: "",
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
      image: fields.image,
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
      image: fields.image,
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
            averageTime: response.data.averageTime,
            image: response.data.image,
          });
        } catch (error) {
          console.log(error);
        }
      };

      fecthServices();
    } // busca dados da API
  }, []);

  const handleOpenModal = () => {
    setTempImageUrl("");
    setImageUrlModalVisible(true);
  };

  const handleCloseModal = () => {
    setImageUrlModalVisible(false);
  };

  const handleConfirmImageUrl = () => {
    setFields({ ...fields, image: tempImageUrl });
    setImageUrlModalVisible(false);
  };

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
          <Block style={styles.imageContainer}>
            <Button
              style={styles.buttonService}
              backgroundColor={colors.BUTTON_BACK}
              onPress={handleOpenModal}
            >
              <Text>Carregar Imagem</Text>
            </Button>
            {fields.image && (
              <Image
                style={styles.image}
                source={{ uri: fields.image }}
                resizeMode="contain"
              />
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

      <Modal
        visible={imageUrlModalVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={handleCloseModal}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Digite a URL da imagem:</Text>
            <TextInput
              style={styles.modalInput}
              placeholder="Insira a URL da imagem"
              value={tempImageUrl}
              onChangeText={setTempImageUrl}
              multiline={true}
              numberOfLines={4}
            />
            <Block row center>
              <Button
                style={styles.button}
                backgroundColor={colors.BUTTON_BACK}
                onPress={() => navigation.goBack()}
              >
                <Text size={12} bold color={colors.TEXT_BUTTON_BACK}>
                  Voltar
                </Text>
              </Button>
              <Button
                style={styles.primary}
                backgroundColor={colors.BUTTON_REGISTER_OR_UPDATE}
                onPress={handleConfirmImageUrl}
              >
                <Text size={12} bold color={colors.TEXT_BUTTON_REGISTER_UPDATE}>
                  Ok
                </Text>
              </Button>
            </Block>
          </View>
        </View>
      </Modal>
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
  buttonService: {
    marginBottom: nowTheme.SIZES.BASE,
    borderRadius: 10,
    width: 280,
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
  imageContainer: {
    alignItems: "center",
    marginBottom: 20,
  },
  image: {
    borderRadius: 30,
    borderWidth: 1,
    borderColor: nowTheme.COLORS.BORDER,
    width: "80%",
    height: 170,
    borderRadius: 10,
    marginLeft: 20,
    marginRight: 20,
  },
  input: {
    height: 40,
    width: "80%",
    borderColor: "gray",
    borderWidth: 1,
    marginTop: 10,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    backgroundColor: "white",
    padding: 20,
    borderRadius: 10,
  },
  modalTitle: {
    fontSize: 16,
    marginBottom: 10,
  },
  modalInput: {
    borderRadius: 30,
    borderWidth: 1,
    borderColor: nowTheme.COLORS.BORDER,
    height: 44,
    maxWidth: "80%",
    maxHeight: 100,
    fontSize: 12,
    marginBottom: 10,
    paddingLeft: 10,
    paddingRight: 10,
    paddingTop: 2,
    paddingBottom: 2,
  },
});

export default ServiceForm;
