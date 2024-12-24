import React from "react";
import {
  FormControl,
} from "@mui/material";
import { Control, Controller } from "react-hook-form";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { Dayjs } from "dayjs";
import { DATE_FORMAT } from "../../_constants/common";

interface DatePickerFieldProps {
  label: string;
  name: string;
  control: Control<any>;
  defaultValue?: Dayjs;
  minLength?: number;
  error?: boolean;
  helperText?: string;
  onChange: (value: Dayjs | null) => void;
}

const DatePickerField: React.FC<DatePickerFieldProps> = ({ label, name, control, defaultValue, minLength, error, helperText, onChange }) => {

  return (
    <FormControl fullWidth error={!!error} margin="dense">
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
          <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="ko">
            <DatePicker
              {...field}
              label={label}
              format={DATE_FORMAT}
              value={defaultValue}
              onChange={onChange}
              slotProps={{ textField: { fullWidth: true } }}
            />
          </LocalizationProvider>
        )}
      />
    </FormControl>
  );
};

export default DatePickerField;