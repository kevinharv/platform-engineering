import type { FC } from "react";
import {
  Grid,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  ButtonGroup,
  Button,
  Box,
} from "@mui/material";
import { useVMRequest } from "../context";
import type { OSFamily } from "../types";

const OS_VERSIONS = {
  linux: [
    { value: "rhel-10", label: "Red Hat Enterprise Linux 10" },
    { value: "rhel-9", label: "Red Hat Enterprise Linux 9" },
    { value: "ubuntu-2404", label: "Ubuntu Server 24.04 LTS" },
    { value: "ubuntu-2204", label: "Ubuntu Server 22.04 LTS" },
  ],
  windows: [
    { value: "windows-2025", label: "Windows Server 2025" },
    { value: "windows-2022", label: "Windows Server 2022" },
  ],
};

export const OSSection: FC = () => {
  const { formData, updateFormData } = useVMRequest();
  const { osFamily, osVersion } = formData;

  const handleOSFamilyChange = (newFamily: OSFamily) => {
    updateFormData({
      osFamily: newFamily,
      // Reset version when family changes
      osVersion: "",
    });
  };

  return (
    <Grid container spacing={3} sx={{
        marginTop: 4
    }}>
      <Grid size={5}>
        <Box>
          <ButtonGroup variant="outlined" fullWidth size="large">
            <Button
              sx={{ py: 2 }}
              variant={osFamily === "linux" ? "contained" : "outlined"}
              onClick={() => handleOSFamilyChange("linux")}
            >
              Linux
            </Button>
            <Button
              sx={{ py: 2 }}
              variant={osFamily === "windows" ? "contained" : "outlined"}
              onClick={() => handleOSFamilyChange("windows")}
            >
              Windows
            </Button>
          </ButtonGroup>
        </Box>
      </Grid>

      <Grid size={7}>
        <FormControl fullWidth>
          <InputLabel id="osVersionLabel">OS Version</InputLabel>
          <Select
            id="osVersion"
            labelId="osVersionLabel"
            value={osVersion}
            label="OS Version"
            disabled={!osFamily}
            onChange={(e) => updateFormData({ osVersion: e.target.value })}
            sx={{
                padding: 0.25
            }}
          >
            {osFamily &&
              OS_VERSIONS[osFamily].map((os) => (
                <MenuItem key={os.value} value={os.value}>
                  {os.label}
                </MenuItem>
              ))}
          </Select>
        </FormControl>
      </Grid>
    </Grid>
  );
};
