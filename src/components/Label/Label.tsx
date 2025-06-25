type Props = { text?: string; id?: string };

export const Label = ({ text, id }: Props) => {
  return (
    <label className="input-title" htmlFor={id}>
      {text}
    </label>
  );
};
