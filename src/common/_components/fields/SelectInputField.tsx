import React from "react";
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";
import { Control, Controller } from "react-hook-form";

interface SelectInputFieldProps {
  label: string;
  name: string;
  control: Control<any>;
  defaultValue?: string;
  options: { label: string, value: string }[];
  disabled?: boolean;
  error?: boolean;
  helperText?: string;
  onChange: (value: string) => void;
}

const SelectInputField: React.FC<SelectInputFieldProps> = ({ label, name, control, defaultValue, options, disabled, error, helperText, onChange }) => {

  return (
    <FormControl fullWidth error={!!error} margin="dense">
      <InputLabel id="select-label">{label}</InputLabel>
      <Controller
        name={name}
        control={control}
        defaultValue={defaultValue}
        rules={{
          required: `${label}을/를 입력해주세요.`,
        }}
        render={({ field }) => (
          <Select
            {...field}
            autoFocus
            label={label}
            fullWidth
            error={error}
            onChange={(e) => onChange(e.target.value)}
            disabled={disabled}
          >
            {options.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </Select>
        )}
      />
      {error && (
        <p style={{ color: "red", fontSize: "0.8em" }}>
          {helperText}
        </p>
      )}
    </FormControl>
  );
};

export default SelectInputField;