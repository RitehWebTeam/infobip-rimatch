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
  <label htmlFor={id} className="flex items-center gap-4 justify-between">
    {label}
    <RadioGroup.Item
      value={value}
      id={id}
      className="bg-white w-6 h-6 border border-[#E8E6EA] dark:border-neutral-800 rounded-full flex justify-center items-center p-0.5"
    >
      <RadioGroup.Indicator className="flex items-center justify-center w-full h-full rounded-full bg-red-500" />
    </RadioGroup.Item>
  </label>
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
