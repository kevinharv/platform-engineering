import { Typography, ButtonGroup, Button } from "@mui/material";
import { useVMRequest } from "../context";

export default function Environment() {
  const { formData, updateFormData } = useVMRequest();
  const { environment } = formData;

  const environments = [
    {
      "label": "Sandbox",
      "value": "sandbox"
    },
    {
      "label": "Development",
      "value": "dev"
    },
    {
      "label": "QA",
      "value": "qa"
    },
    {
      "label": "Production",
      "value": "prod"
    }
  ]

  return (
    <>
      <Typography variant="caption" sx={{ mb: 0.5, display: "block" }}>
        Environment
      </Typography>
      <ButtonGroup variant="outlined" fullWidth size="large" sx={{ margin: 0 }}>
        {environments.map((env) => (
          <Button
            key={env.value}
            sx={{ py: 2, margin: 0 }}
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
    </>
  );
}
