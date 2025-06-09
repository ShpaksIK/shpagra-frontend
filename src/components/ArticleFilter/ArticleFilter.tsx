import React from 'react';
import { connect } from 'react-redux';

import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';

import style from './ArticleFilter.module.scss';
import { ArticleFilterType } from '../../redux/types/articleFilterType';
import { setArticleFilterType } from '../../redux/reducers/articleReducer';
import { AppStateType } from '../../redux';

interface StateProps {
  articleFilterType: ArticleFilterType;
}

interface DispatchProps {
  setArticleFilterType: (newType: ArticleFilterType) => void;
}

type ArticleFilterProps = StateProps & DispatchProps;

const ArticleFilter: React.FC<ArticleFilterProps> = ({
  articleFilterType,
  setArticleFilterType,
}) => {
  const [age, setAge] = React.useState<ArticleFilterType>(articleFilterType);

  const handleChange = (event: SelectChangeEvent) => {
    const selectedType = event.target.value as ArticleFilterType;
    setAge(selectedType);
    setArticleFilterType(selectedType);
  };

  return (
    <div className={style.articleFilter}>
      <Box sx={{ minWidth: 120 }}>
        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">Фильтрация статей</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={age}
            label="Фильтрация статей"
            onChange={handleChange}
          >
            <MenuItem value="popular">Популярные</MenuItem>
            <MenuItem value="new">Новые</MenuItem>
            <MenuItem value="old">Старые</MenuItem>
          </Select>
        </FormControl>
      </Box>
    </div>
  );
};

const mapState = (state: AppStateType) => {
  return {
    articleFilterType: state.article.articleFilterType,
  };
};

export default connect(mapState, { setArticleFilterType })(ArticleFilter);
