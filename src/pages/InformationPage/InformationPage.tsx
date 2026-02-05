import style from './InformationPage.module.scss';
import A from '../../ui/A/A';
import LayoutBase from '../../components/Layouts/LayoutBase/LayoutBase';
import Block from '../../ui/Block/Block';

const InformationPage = () => {
  return (
    <LayoutBase>
      <h2>Информация</h2>
      <Block className={style.main}>
        <A to="/info/privacy">Политика конфиденциальности</A>
        <A to="/info/terms">Условия использования</A>
        <A to="/info/site">Информация о сайте</A>
      </Block>
    </LayoutBase>
  );
};

export default InformationPage;
