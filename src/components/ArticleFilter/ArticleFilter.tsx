import { useState } from 'react';

import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';

import style from './ArticleFilter.module.scss';
import { ArticleFilterType } from './../../../types/entities/articleType';

const ArticleFilter = () => {
  const [filter, setFilter] = useState<ArticleFilterType>('new');

  const handleChange = (event: SelectChangeEvent) => {
    const selectedType = event.target.value as ArticleFilterType;
    setFilter(selectedType);
  };

  return (
    <div className={style.filter}>
      <Box sx={{ minWidth: 400 }}>
        <FormControl fullWidth>
          <InputLabel 
            id="article-filter-select-label"
            sx={{
              fontFamily: 'inherit',
              '&.MuiInputLabel-shrink': {
                color: 'var(--color-text-link)'
              }
            }}>Фильтрация статей</InputLabel>
          <Select
            labelId="article-filter-select-label"
            id="article-filter-select"
            value={filter}
            label="Фильтрация статей"
            onChange={handleChange}
            sx={{
              fontFamily: 'inherit',
              '& .MuiOutlinedInput-notchedOutline': {
                borderColor: 'var(--color-element)'
              },
              '&:hover .MuiOutlinedInput-notchedOutline': {
                borderColor: 'var(--color-element-hover)'
              },
              '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                borderColor: 'var(--color-element-hover)'
              }
            }}
          >
            <MenuItem 
              value="popular"
              sx={{
                fontFamily: 'inherit',
                '&.Mui-selected': {
                  backgroundColor: 'var(--color-element-transparent)'
                },
                '&.Mui-selected:hover': {
                  backgroundColor: 'var(--color-element-transparent)'
                },
              }}>Популярные</MenuItem>
            <MenuItem 
              value="new"
              sx={{
                fontFamily: 'inherit',
                '&.Mui-selected': {
                  backgroundColor: 'var(--color-element-transparent)'
                },
                '&.Mui-selected:hover': {
                  backgroundColor: 'var(--color-element-transparent)'
                },
              }}>Новые</MenuItem>
            <MenuItem 
              value="old"
              sx={{
                fontFamily: 'inherit',
                '&.Mui-selected': {
                  backgroundColor: 'var(--color-element-transparent)'
                },
                '&.Mui-selected:hover': {
                  backgroundColor: 'var(--color-element-transparent)'
                },
              }}>Старые</MenuItem>
          </Select>
        </FormControl>
      </Box>
    </div>
  );
};

export default ArticleFilter;
