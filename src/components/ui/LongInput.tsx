import { TextField, TextFieldProps } from "@mui/material";

type LongInputProps = TextFieldProps & {
  label: string;
  type: string;
};

const LongInput = ({ label, type, ...rest }: LongInputProps) => {
  return (
    <TextField
      label={label}
      type={type}
      fullWidth
      variant="outlined"
      sx={{
        width: "80%",
        maxWidth: 300,
      }}
      {...rest}
    />
  );
};

export default LongInput;
