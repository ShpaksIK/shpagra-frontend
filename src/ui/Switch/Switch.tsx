import { useState } from 'react';
import { default as SwitchComponent } from '@mui/material/Switch';

import { SettingsType } from '../../types/settingsType';

interface SwitchProps {
  checked: boolean;
  type: SettingsType;
  onChange?: (checked: boolean, type: SettingsType) => void;
}

const Switch: React.FC<SwitchProps> = ({ checked, type, onChange }) => {
  const [isChecked, setChecked] = useState(checked);
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = event.target.checked;
    setChecked(newValue);
    onChange?.(newValue, type);
  };

  return (
    <SwitchComponent
      checked={isChecked}
      onChange={handleChange}
      sx={{
        '& .MuiSwitch-switchBase': {
          color: 'var(--color-element-secondary)',
          '&.Mui-checked': {
            color: 'var(--color-element)',
          },
          '&.Mui-checked + .MuiSwitch-track': {
            backgroundColor: 'var(--color-element)',
          },
        },
        '& .MuiSwitch-track': {
          backgroundColor: 'var(--color-element-secondary)',
        },
      }}
    />
  );
};

export default Switch;
