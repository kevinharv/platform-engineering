import type { FC } from 'react';
import { Box, Grid, TextField } from '@mui/material';
import { useVMRequest } from '../context';
import type { Tag } from '../types';

export const TagsSection: FC = () => {
  const { formData, updateFormData } = useVMRequest();
  const { tags } = formData;

  const handleTagChange = (index: number, key: string, value: string) => {
    const newTags = [...tags];
    newTags[index] = { key, value };
    updateFormData({ tags: newTags });
  };

  const addNewTag = () => {
    if (tags.length < 20) {
      updateFormData({ tags: [...tags, { key: '', value: '' }] });
    }
  };

  return (
    <Box sx={{ mt: 2 }}>
      {tags.map((tag: Tag, idx: number) => (
        <Grid container spacing={1} key={idx} sx={{ mb: 1 }}>
          <Grid size={6}>
            <TextField
              fullWidth
              label={`Key ${idx + 1}`}
              variant="outlined"
              size="small"
              value={tag.key}
              onChange={(e) => handleTagChange(idx, e.target.value, tag.value)}
            />
          </Grid>
          <Grid size={6}>
            <TextField
              fullWidth
              label={`Value ${idx + 1}`}
              variant="outlined"
              size="small"
              value={tag.value}
              onChange={(e) => handleTagChange(idx, tag.key, e.target.value)}
            />
          </Grid>
        </Grid>
      ))}
      {tags.length < 20 && tags[tags.length - 1]?.key && tags[tags.length - 1]?.value && (
        <Box sx={{ mt: 2 }}>
          <TextField
            fullWidth
            label={`Key ${tags.length + 1}`}
            variant="outlined"
            size="small"
            onChange={(e) => {
              if (e.target.value) {
                addNewTag();
              }
            }}
          />
        </Box>
      )}
      <Box sx={{ fontSize: 12, color: 'text.secondary', mt: 1 }}>
        Enter up to 20 tags. A new line will be added when both key and value are filled.
      </Box>
    </Box>
  );
};