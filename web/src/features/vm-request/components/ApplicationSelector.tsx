import { Autocomplete, TextField } from "@mui/material";
import { useVMRequest } from "../context";

export default function ApplicationSelector() {
  const { formData, updateFormData } = useVMRequest();
  const { application } = formData;

  const applicationList = [
    "Sailpoint IIQ",
    "Active Directory",
    "Ansible Automation Platform",
  ];

  return (
    <Autocomplete
      value={application}
      onChange={(_, newValue) =>
        updateFormData({ application: newValue || "" })
      }
      options={applicationList}
      renderInput={(params) => (
        <TextField {...params} label="Application" size="medium" fullWidth />
      )}
    />
  );
}
