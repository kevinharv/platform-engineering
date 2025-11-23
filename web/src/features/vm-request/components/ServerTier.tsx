import { FormControl, InputLabel, Select, MenuItem } from "@mui/material";
import { useVMRequest } from "../context";
import type { Tier } from "../types";

const TIERS: Array<{ value: Tier; label: string }> = [
  { value: 'ui', label: 'UI' },
  { value: 'api', label: 'API' },
  { value: 'control-plane', label: 'Control Plane' },
  { value: 'execution-plane', label: 'Execution Plane' },
  { value: 'db', label: 'Data' },
  { value: 'other', label: 'Other' },
];

export function ServerTier() {
  const { formData, updateFormData } = useVMRequest();
  const { tier } = formData;

    return (
        <FormControl fullWidth>
            <InputLabel id="tierLabel">Tier</InputLabel>
            <Select
              id="tier"
              labelId="tierLabel"
              value={tier}
              label="Tier"
              size="medium"
              onChange={(e) => updateFormData({ tier: e.target.value as Tier })}
            >
              {TIERS.map((t) => (
                <MenuItem key={t.value} value={t.value}>
                  {t.label}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
    );
}