import { Typography, ButtonGroup, Button } from "@mui/material";
import { useVMRequest } from "../context";

export default function NetworkZone() {
  const { formData, updateFormData } = useVMRequest();
  const { networkZone } = formData;

  const zones = [
    {
      "label": "Public",
      "value": "public"
    },
    {
      "label": "Private",
      "value": "private"
    },
    {
      "label": "Data",
      "value": "data"
    },
    {
      "label": "PCI",
      "value": "pci"
    }
  ]

  return (
    <>
      <Typography variant="caption" sx={{ mb: 0.5, display: "block" }}>
        Network Zone
      </Typography>
      <ButtonGroup variant="outlined" fullWidth size="large">
        {zones.map((zone) => (
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
    </>
  );
}
