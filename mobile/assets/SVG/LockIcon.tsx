import Svg, { Path } from "react-native-svg";
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const LockIcon = (props: any) => {
  return (
    <Svg
      className="h-6 w-6 text-gray-400"
      viewBox="0 0 20 20"
      fill="gray"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <Path
        fillRule="evenodd"
        d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
        clipRule="evenodd"
      />
    </Svg>
  );
};

export default LockIcon;
