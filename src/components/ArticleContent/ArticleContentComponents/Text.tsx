import FormattedText from '../../../ui/FormattedText/FormattedText';

interface TextProps {
  text?: string;
}

const Text: React.FC<TextProps> = ({ text }) => {
  return <FormattedText text={text} />;
};

export default Text;
