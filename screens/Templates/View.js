import React, { useState, useEffect } from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import { Text, Block } from "galio-framework";

import { Button, Icon } from "../../components";
import { nowTheme } from "../../constants";
import { useColorContext } from "../../context/colors";
import { api } from "../../services/api";
import { CustomInputTouch } from "../../components/CustomInputTouch";
import { useRequestFindOne } from "../../components/hooks/useRequestFindOne";
import { LoadingOverlay } from "../../components/LoadingOverlay";

const TemplatesForm = ({ route, navigation }) => {
  const params = route.params;
  const isEditing = params?.itemId;

  const [fields, setFields] = useState({
    title: "",
    content: "",
  });

  const { colors } = useColorContext();

  const { execute, response, loading } = useRequestFindOne({
    path: "/templates",
    id: isEditing,
  });

  useEffect(() => {
    if (response) {
      setFields({
        title: response.title,
        content: response.content,
      });
    }
  }, [response]);

  useEffect(() => {
    if (isEditing) {
      execute();
    }
  }, []);

  return (
    <View style={[styles.container, { backgroundColor: colors.BACKGROUND }]}>
      <LoadingOverlay visible={loading} />
      <ScrollView showsVerticalScrollIndicator={true}>
        <Block
          gap={10}
          style={[
            styles.cardContainer,
            { backgroundColor: colors.BACKGROUND_CARD },
          ]}
        >
          <CustomInputTouch
            icon="file-text"
            label="Título do template"
            onPress={() => {}}
            value={fields.title}
          />

          <CustomInputTouch
            icon=""
            label="Conteúdo"
            onPress={() => {}}
            value={fields.content}
          />
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
});

export default TemplatesForm;
