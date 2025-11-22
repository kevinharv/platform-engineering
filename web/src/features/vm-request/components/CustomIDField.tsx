import { TextField } from "@mui/material";
import { useVMRequest } from "../context";

export default function CustomIDField() {
  const { formData, updateFormData } = useVMRequest();
  const { customID } = formData;

  return (
    <TextField
      label="Custom ID"
      size="medium"
      value={customID || ""}
      onChange={(e) =>
        updateFormData({
          customID: e.target.value.slice(0, 2).toUpperCase(),
        })
      }
      placeholder="KH"
      fullWidth
    />
  );
}
