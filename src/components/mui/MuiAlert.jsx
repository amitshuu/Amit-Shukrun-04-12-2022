import * as React from 'react';
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';

export default function BasicAlerts({ type, text }) {
  return (
    <Stack sx={{ width: '100%' }} spacing={2}>
      <Alert severity={type}>{text}</Alert>
    </Stack>
  );
}
