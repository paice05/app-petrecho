import { ScrollView } from "react-native";
import { Block } from "galio-framework";

import { useColorContext } from "../../context/colors";
import { NotificationItem } from "./NotificationItem";

export function Notifications() {
  const { colors } = useColorContext();

  return (
    <Block flex={1} padding={18} backgroundColor={colors.BACKGROUND}>
      <ScrollView>
        {Array.from({ length: 10 }).map((_, index) => (
          <NotificationItem key={index} />
        ))}
      </ScrollView>
    </Block>
  );
}
