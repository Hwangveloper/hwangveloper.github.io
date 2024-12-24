import React from "react";
import {
  FormControl,
  TextField,
} from "@mui/material";
import { Control, Controller } from "react-hook-form";

interface TextInputFieldProps {
  label: string;
  name: string;
  control: Control<any>;
  defaultValue?: string;
  minLength?: number;
  error?: boolean;
  helperText?: string;
  onChange: (value: string) => void;
}

const TextInputField: React.FC<TextInputFieldProps> = ({ label, name, control, defaultValue, minLength, error, helperText, onChange }) => {

  return (
    <FormControl fullWidth error={!!error}>
      <Controller
        name={name}
        control={control}
        defaultValue={defaultValue}
        rules={{
          required: `${label}을/를 입력해주세요.`,
          minLength: minLength && {
            value: minLength,
            message: `${label}은/는 최소 ${minLength}자 이상이어야 합니다.`,
          },
        }}
        render={({ field }) => (
          <TextField
            {...field}
            autoFocus
            margin="dense"
            label={label}
            fullWidth
            type="text"
            error={error}
            helperText={helperText}
            onChange={(e) => onChange(e.target.value)}
          />
        )}
      />
    </FormControl>
  );
};

export default TextInputField;