import type { FC } from "react";
import {
  Grid,
  ButtonGroup,
  Button,
  Box,
  Typography,
  Switch
} from "@mui/material";
import { useVMRequest } from "../context";
import type { DataCenter } from "../types";

const DATA_CENTERS = [
  { value: "da1", label: "DA1" },
  { value: "da2", label: "DA2" },
  { value: "ch3", label: "CH3" },
  { value: "va7", label: "VA7" },
];

export const Placement: FC = () => {
  const { formData, updateFormData } = useVMRequest();
  const { dataCenter } = formData;

  return (
    <Grid
      container
      spacing={3}
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
        marginTop: 4,
      }}>
        <Switch 
          size="medium"
          checked={dataCenter === "auto"}
          onChange={() => updateFormData({ dataCenter: "auto" })}
        />
        Automatically assign data center
      </Grid>
    </Grid>
  );
};
