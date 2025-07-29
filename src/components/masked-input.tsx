import { MaskedInput as AntdMaskedInput } from "antd-mask-input";

type MaskedInputProps = {
  mask: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
  disabled?: boolean;
  placeholder?: string;
  name?: string;
  className?: string;
};

function MaskedInput(props: MaskedInputProps) {
  const {
    mask,
    value,
    onChange,
    onBlur,
    disabled,
    placeholder,
    name,
    className,
  } = props;

  return (
    <AntdMaskedInput
      mask={mask}
      value={value}
      onChange={onChange}
      onBlur={onBlur}
      disabled={disabled}
      placeholder={placeholder}
      name={name}
      className={className}
    />
  );
}

export default MaskedInput;
