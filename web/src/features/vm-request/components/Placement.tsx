import type { FC } from "react";
import {
  Grid,
  ButtonGroup,
  Button,
  Box,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Typography
} from "@mui/material";
import { useVMRequest } from "../context";
import type { DataCenter, Tier } from "../types";

const DATA_CENTERS = [
  { value: "dc1", label: "DC1" },
  { value: "dc2", label: "DC2" },
  { value: "dc3", label: "DC3" },
];

const TIERS: Array<{ value: Tier; label: string }> = [
  { value: 'ui', label: 'UI' },
  { value: 'api', label: 'API' },
  { value: 'control-plane', label: 'Control Plane' },
  { value: 'execution-plane', label: 'Execution Plane' },
  { value: 'db', label: 'Data' },
  { value: 'other', label: 'Other' },
];

export const Placement: FC = () => {
  const { formData, updateFormData } = useVMRequest();
  const { dataCenter, tier } = formData;

  return (
    <Grid
      container
      spacing={3}
      sx={{
        marginTop: 2,
      }}
    >
      <Grid size={6}>
        <Box>
          <Typography variant="caption" sx={{ mb: 0.5, display: "block" }}>
            Data Center
          </Typography>
          <ButtonGroup variant="outlined" fullWidth size="large">
            {DATA_CENTERS.map((dc) => (
              <Button
                key={dc.value}
                sx={{ py: 2 }}
                variant={dataCenter === dc.value ? "contained" : "outlined"}
                onClick={() => updateFormData({ dataCenter: dc.value as DataCenter })}
              >
                {dc.label}
              </Button>
            ))}
          </ButtonGroup>
        </Box>
      </Grid>

      <Grid size={6} sx={{
        marginTop: 3,
      }}>
        <FormControl fullWidth>
            <InputLabel id="tierLabel">Tier</InputLabel>
            <Select
              id="tier"
              labelId="tierLabel"
              value={tier}
              label="Tier"
              size="medium"
              onChange={(e) => updateFormData({ tier: e.target.value as Tier })}
              sx={{
                padding: 0.25
              }}
            >
              {TIERS.map((t) => (
                <MenuItem key={t.value} value={t.value}>
                  {t.label}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
      </Grid>

    </Grid>
  );
};
