import React from "react";
import { Icon } from "galio-framework";

class IconExtra extends React.Component {
  render() {
    const { name, family, ...rest } = this.props;

    return (
      <Icon
        size={this.props.size || 16}
        name={name}
        family="feather"
        {...rest}
      />
    );
  }
}

export default IconExtra;
