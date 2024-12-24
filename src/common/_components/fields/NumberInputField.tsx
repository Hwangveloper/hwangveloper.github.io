import React, { useEffect, useState } from "react";
import {
  FormControl,
  TextField,
} from "@mui/material";
import { Control, Controller } from "react-hook-form";

interface NumberInputFieldProps {
  label: string;
  name: string;
  control: Control<any>;
  defaultValue?: number;
  minLength?: number;
  error?: boolean;
  helperText?: string;
  onChange: (value: number) => void;
}

const NumberInputField: React.FC<NumberInputFieldProps> = ({ label, name, control, defaultValue, minLength, error, helperText, onChange }) => {

  const [value, setValue] = useState<number | undefined>(defaultValue);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = event.target.value;

    // 값이 정규식에 일치하는 경우에만 상태를 업데이트
    if (/^[0-9]*$/.test(newValue) || newValue === "") {
      setValue(Number(newValue));
      onChange(Number(newValue));
    }
  };

  useEffect(() => {
    setValue(defaultValue);
  }, [defaultValue]);
  
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
            value={value}
            autoFocus
            margin="dense"
            label={label}
            fullWidth
            type="text"
            error={error}
            helperText={helperText}
            onChange={handleChange}
          />
        )}
      />
    </FormControl>
  );
};

export default NumberInputField;