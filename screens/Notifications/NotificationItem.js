import { useState } from "react";
import { Block, Text } from "galio-framework";

import { useColorContext } from "../../context/colors";
import { TouchableOpacity } from "react-native";

const titles = {
  1: "Novo Agendamento",
  2: "Agendamento Confirmado",
  3: "Agendamento Cancelado",
};

const content = `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin
tincidunt, nisl nec congue aliquet, nunc odio aliquam justo, id
tincidunt odio nunc a ante.Lorem ipsum dolor sit amet, consectetur
adipiscing elit. Proin tincidunt, nisl nec congue aliquet, nunc odio
aliquam justo, id tincidunt odio nunc a ante. Lorem ipsum dolor sit
amet, consectetur adipiscing elit. Proin tincidunt, nisl nec congue
aliquet, nunc odio aliquam justo, id tincidunt odio nunc a ante.`;

const CONTENT_MAX_LENGTH = 150;

export function NotificationItem() {
  const { colors } = useColorContext();

  const [show, setShow] = useState(false);

  return (
    <Block
      padding={8}
      marginVertical={8}
      backgroundColor={colors.BACKGROUND_CARD}
    >
      <Block row justifyContent="space-between">
        <Text size={18} color={colors.TEXT}>
          {titles[Math.floor(Math.random() * 3) + 1]}
        </Text>
        <Text color={colors.TEXT}>22/02/2024 12:00</Text>
      </Block>
      <TouchableOpacity onPress={() => setShow(!show)}>
        <Text size={16} color={colors.SUB_TEXT}>
          {!show && content.length > CONTENT_MAX_LENGTH
            ? content.slice(0, CONTENT_MAX_LENGTH) + "..."
            : content}
        </Text>
        <Text center color={colors.TEXT}>
          {show ? "toque para ler menos" : "toque para ler mais"}
        </Text>
      </TouchableOpacity>
    </Block>
  );
}
