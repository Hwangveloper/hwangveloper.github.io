import React from "react";
import {
  Box,
  Checkbox,
  FormControl,
  Typography,
} from "@mui/material";
import { Control, Controller } from "react-hook-form";

interface CheckboxInputFieldProps {
  label: string;
  name: string;
  control: Control<any>;
  defaultValue?: boolean;
  error?: boolean;
  helperText?: string;
  onChange: (value: boolean) => void;
}

const CheckboxInputField: React.FC<CheckboxInputFieldProps> = ({ label, name, control, defaultValue, error, helperText, onChange }) => {

  return (
    <FormControl fullWidth error={!!error}>
      <Controller
        name={name}
        control={control}
        defaultValue={defaultValue}
        rules={{
          required: `${label}을/를 입력해주세요.`,
        }}
        render={({ field }) => (
          <Box display="flex" flexDirection="row" alignItems="center">
            <Checkbox
              {...field}
              color="primary"
              defaultChecked={defaultValue}
              value={defaultValue}
              size="large"
              autoFocus
              onChange={(e, checked) => onChange(checked)}
            />
            <Typography>
              {label}
            </Typography>
          </Box>
          
        )}
      />
    </FormControl>
  );
};

export default CheckboxInputField;