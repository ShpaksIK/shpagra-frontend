import { SelectChangeEvent, default as SelectComponent } from '@mui/material/Select';
import Box from '@mui/material/Box';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import { useState } from 'react';

type ValueType = {
  value: string;
  text: string;
};

interface SelectProps {
  values: ValueType[];
  currentValue?: string;
  title?: string;
  onChange: (selectedType: any) => void;
}

const Select: React.FC<SelectProps> = ({ values, currentValue, title, onChange }) => {
  const [value, setValue] = useState(currentValue || values[0].value);

  const menuItemSx = {
    fontFamily: 'inherit',
    '&.Mui-selected': {
      backgroundColor: 'var(--color-element-transparent)',
    },
    '&.Mui-selected:hover': {
      backgroundColor: 'var(--color-element-transparent)',
    },
    '&.Mui-focusVisible': {
      backgroundColor: 'var(--color-element-transparent)',
    },
    '&.Mui-selected.Mui-focusVisible': {
      backgroundColor: 'var(--color-element-transparent)',
    },
  };

  const handleChange = (event: SelectChangeEvent) => {
    const selectedType = event.target.value;
    setValue(selectedType);
    onChange(selectedType);
  };

  return (
    <Box sx={{ minWidth: 300 }}>
      <FormControl fullWidth>
        <InputLabel
          id="article-filter-select-label"
          sx={{
            fontFamily: 'inherit',
            '&.MuiInputLabel-shrink': {
              color: 'var(--color-text-link)',
            },
          }}
        >
          {title}
        </InputLabel>
        <SelectComponent
          labelId="article-filter-select-label"
          id="article-filter-select"
          value={value}
          label={title}
          onChange={handleChange}
          sx={{
            fontFamily: 'inherit',
            '& .MuiOutlinedInput-notchedOutline': {
              borderColor: 'var(--color-element)',
            },
            '&:hover .MuiOutlinedInput-notchedOutline': {
              borderColor: 'var(--color-element-hover)',
            },
            '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
              borderColor: 'var(--color-element-hover)',
            },
            '&.Mui-selected': {
              borderColor: 'var(--color-element-transparent)',
            },
          }}
          MenuProps={{
            disableScrollLock: true,
          }}
        >
          {values.map((value) => (
            <MenuItem value={value.value} sx={menuItemSx}>
              {value.text}
            </MenuItem>
          ))}
        </SelectComponent>
      </FormControl>
    </Box>
  );
};

export default Select;
