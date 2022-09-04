import * as React from "react";
import Svg, { Path } from "react-native-svg";

const CloseIcon = (props, { onPress }) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={1.5}
    stroke="#000"
    className="w-6 h-6"
    onPress={onPress}
    {...props}
  >
    <Path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M6 18 18 6M6 6l12 12"
    />
  </Svg>
);

export default CloseIcon;
