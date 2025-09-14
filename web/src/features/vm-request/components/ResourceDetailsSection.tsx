import type { FC } from "react";
import {
  Grid,
  FormControl,
  TextField,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";
import { useVMRequest } from "../context";
import type { PatchingDay, PatchingWindow } from "../types";

const PATCHING_DAYS: Array<{ value: PatchingDay; label: string }> = [
  { value: "su", label: "Sunday" },
  { value: "mo", label: "Monday" },
  { value: "tu", label: "Tuesday" },
  { value: "we", label: "Wednesday" },
  { value: "th", label: "Thursday" },
  { value: "fr", label: "Friday" },
  { value: "sa", label: "Saturday" },
];

const PATCHING_WINDOWS: Array<{ value: PatchingWindow; label: string }> = [
  { value: "0100-0400", label: "01:00-04:00" },
  { value: "0500-0800", label: "05:00-08:00" },
  { value: "0900-1200", label: "09:00-12:00" },
  { value: "1300-1600", label: "13:00-16:00" },
  { value: "1700-2000", label: "17:00-20:00" },
  { value: "2100-0000", label: "21:00-00:00" },
];

const COST_CENTERS = ["020343", "176223", "904555", "409898", "102033"];

export const ResourceDetailsSection: FC = () => {
  const { formData, updateFormData } = useVMRequest();
  const { patchingDay, patchingWindow, costCenter, quantity } = formData;

  return (
    <Grid container spacing={3} sx={{
      marginTop: 4
    }}>
      <Grid size={3}>
        <FormControl fullWidth>
          <InputLabel id="patchingDayLabel">Patching Day</InputLabel>
          <Select
            id="patchingDay"
            labelId="patchingDayLabel"
            value={patchingDay}
            label="Patching Day"
            size="medium"
            onChange={(e) =>
              updateFormData({ patchingDay: e.target.value as PatchingDay })
            }
          >
            {PATCHING_DAYS.map((day) => (
              <MenuItem key={day.value} value={day.value}>
                {day.label}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Grid>

      <Grid size={3}>
        <FormControl fullWidth>
          <InputLabel id="patchingWindowLabel">Patching Window</InputLabel>
          <Select
            id="patchingWindow"
            labelId="patchingWindowLabel"
            value={patchingWindow}
            label="Patching Window"
            size="medium"
            onChange={(e) =>
              updateFormData({
                patchingWindow: e.target.value as PatchingWindow,
              })
            }
          >
            {PATCHING_WINDOWS.map((window) => (
              <MenuItem key={window.value} value={window.value}>
                {window.label}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Grid>

      <Grid size={3}>
        <FormControl fullWidth>
          <TextField
            select
            label="Cost Center"
            value={costCenter}
            size="medium"
            onChange={(e) => updateFormData({ costCenter: e.target.value })}
          >
            {COST_CENTERS.map((cc) => (
              <MenuItem key={cc} value={cc}>
                {cc}
              </MenuItem>
            ))}
          </TextField>
        </FormControl>
      </Grid>

      <Grid size={3}>
        <FormControl fullWidth>
          <TextField
            id="quantity"
            label="Quantity"
            type="number"
            variant="outlined"
            value={quantity.toFixed(0)}
            size="medium"
            onChange={(e) =>
              updateFormData({
                quantity: Number(e.target.value),
              })
            }
          />
        </FormControl>
      </Grid>
    </Grid>
  );
};
