import * as SettingsCard from "@/components/SettingsCard";
import { Theme } from "@/context/ThemeProvider";
import useTheme from "@/hooks/useTheme";
import * as RadioGroup from "@radix-ui/react-radio-group";

interface RadioItemProps {
  value: string;
  id: string;
  label: string;
}

const RadioItem = ({ value, id, label }: RadioItemProps) => (
  <div className="flex items-center gap-4 justify-between">
    <label htmlFor={id}>{label}</label>
    <RadioGroup.Item
      value={value}
      id={id}
      className="bg-white w-[25px] h-[25px] border border-[#E8E6EA] dark:border-[#494343] rounded-full"
    >
      <RadioGroup.Indicator className="flex items-center justify-center w-full h-full relative after:block after:w-[11px] after:h-[11px] after:rounded-full after:bg-red-500" />
    </RadioGroup.Item>
  </div>
);

const SettingsTheme = () => {
  const { theme, setThemeMode } = useTheme();

  const handleChange = (value: Theme) => {
    setThemeMode(value);
  };

  return (
    <SettingsCard.Root>
      <SettingsCard.Header title="Theme" />
      <RadioGroup.Root
        defaultValue={theme}
        onValueChange={handleChange}
        className="flex flex-col w-full px-4 gap-3"
      >
        <RadioItem value="light" id="light" label="Light" />
        <RadioItem value="dark" id="dark" label="Dark" />
        <RadioItem value="system" id="system" label="System" />
      </RadioGroup.Root>
    </SettingsCard.Root>
  );
};

export default SettingsTheme;
