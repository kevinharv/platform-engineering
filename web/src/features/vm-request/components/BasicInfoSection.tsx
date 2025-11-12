import type { FC } from "react";
import {
  FormControl,
  TextField,
  ButtonGroup,
  Button,
  Autocomplete,
  Box,
  Typography,
} from "@mui/material";
import { useVMRequest } from "../context";
import type { Environment, NetworkZone } from "../types";

const APPLICATIONS = [
  "API",
  "Active Directory Domain Services",
  "SailPoint IIQ",
  "Reporting Dashboard",
  "AI Engine",
];

const ENVIRONMENTS: Array<{ value: Environment; label: string }> = [
  { value: "dev", label: "Development" },
  { value: "qa", label: "QA" },
  { value: "prod", label: "Production" },
];

const ZONES: Array<{ value: NetworkZone; label: string }> = [
  { value: "public", label: "Public" },
  { value: "private", label: "Private" },
  { value: "data", label: "Data" },
  { value: "pci", label: "PCI" },
];

export const BasicInfoSection: FC = () => {
  const { formData, updateFormData } = useVMRequest();
  const { application, environment, networkZone } = formData;

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
      <Box
        sx={{
          padding: 0,
        }}
      >
        <FormControl
          sx={{
            minWidth: "40%",
          }}
        >
          <Autocomplete
            value={application}
            onChange={(_, newValue) =>
              updateFormData({ application: newValue || "" })
            }
            options={APPLICATIONS}
            renderInput={(params) => (
              <TextField {...params} label="Application" size="medium" />
            )}
          />
        </FormControl>

        <FormControl
          sx={{
            minWidth: "40%",
            ml: 2,
          }}
        >
          <TextField
            label="Custom ID"
            size="medium"
            value={formData.customID || ""}
            onChange={(e) =>
              updateFormData({
                customID: e.target.value.slice(0, 2).toUpperCase(),
              })
            }
            placeholder="KH"
          />
        </FormControl>
      </Box>

      <Box sx={{ display: "flex", gap: 2 }}>
        <Box sx={{ flex: 1 }}>
          <Typography variant="caption" sx={{ mb: 0.5, display: "block" }}>
            Environment
          </Typography>
          <ButtonGroup variant="outlined" fullWidth size="large">
            {ENVIRONMENTS.map((env) => (
              <Button
                key={env.value}
                sx={{ py: 2 }}
                variant={environment === env.value ? "contained" : "outlined"}
                onClick={() => {
                  updateFormData({
                    environment: env.value,
                  });
                }}
              >
                {env.label}
              </Button>
            ))}
          </ButtonGroup>
        </Box>

        <Box sx={{ flex: 1 }}>
          <Typography variant="caption" sx={{ mb: 0.5, display: "block" }}>
            Network Zone
          </Typography>
          <ButtonGroup variant="outlined" fullWidth size="large">
            {ZONES.map((zone) => (
              <Button
                key={zone.value}
                sx={{ py: 2 }}
                variant={networkZone === zone.value ? "contained" : "outlined"}
                onClick={() => {
                  updateFormData({
                    networkZone: zone.value,
                  });
                }}
              >
                {zone.label}
              </Button>
            ))}
          </ButtonGroup>
        </Box>
      </Box>
    </Box>
  );
};
