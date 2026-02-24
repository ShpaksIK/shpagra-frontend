import { ArticleFilterType } from '../../types/entities/articleType';
import Block from '../../ui/Block/Block';
import { useAppDispatch, useAppSelector } from '../../hooks/useStore';
import { setFilter } from '../../redux/slices/articleSlice/articleSlice';
import Select from '../../ui/Select/Select';

const ArticleFilter = () => {
  const dispatch = useAppDispatch();

  const filter = useAppSelector((state) => state.article.filter);

  const handleChangeArticlesFilter = (value: ArticleFilterType) => {
    dispatch(setFilter(value));
  };

  const filterValues = [
    {
      value: 'popular',
      text: 'Популярные',
    },
    {
      value: 'new',
      text: 'Новые',
    },
    {
      value: 'old',
      text: 'Старые',
    },
  ];

  return (
    <Block>
      <Select
        title="Фильтрация статей"
        values={filterValues}
        currentValue={filterValues.find((v) => (v.value = filter))}
        onChange={handleChangeArticlesFilter}
      />
    </Block>
  );
};

export default ArticleFilter;
