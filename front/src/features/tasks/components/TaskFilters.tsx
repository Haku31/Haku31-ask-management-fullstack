import { useState, useEffect } from 'react';
import {
  Box,
  TextField,
  MenuItem,
  InputAdornment,
  Paper,
} from '@mui/material';
import { Search as SearchIcon } from '@mui/icons-material';
import { TaskStatus } from '../types/task.types';
import { TASK_STATUS_LABELS } from '@/shared/utils/constants';

interface TaskFiltersProps {
  onFilterChange: (filters: { status: TaskStatus | 'ALL'; search: string }) => void;
}

export const TaskFilters: React.FC<TaskFiltersProps> = ({ onFilterChange }) => {
  const [status, setStatus] = useState<TaskStatus | 'ALL'>('ALL');
  const [search, setSearch] = useState('');

  useEffect(() => {
    const timer = setTimeout(() => {
      onFilterChange({ status, search });
    }, 300); // Debounce de 300ms

    return () => clearTimeout(timer);
  }, [status, search, onFilterChange]);

  return (
    <Paper sx={{ p: 2, mb: 3 }}>
      <Box
        sx={{
          display: 'flex',
          gap: 2,
          flexDirection: { xs: 'column', sm: 'row' },
        }}
      >
        <TextField
          label="Buscar"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Buscar por título..."
          fullWidth
          size="small"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
        />
        <TextField
          select
          label="Estado"
          value={status}
          onChange={(e) => setStatus(e.target.value as TaskStatus | 'ALL')}
          size="small"
          sx={{ minWidth: { xs: '100%', sm: 200 } }}
        >
          <MenuItem value="ALL">Todos</MenuItem>
          <MenuItem value="TODO">{TASK_STATUS_LABELS.TODO}</MenuItem>
          <MenuItem value="IN_PROGRESS">{TASK_STATUS_LABELS.IN_PROGRESS}</MenuItem>
          <MenuItem value="COMPLETED">{TASK_STATUS_LABELS.COMPLETED}</MenuItem>
        </TextField>
      </Box>
    </Paper>
  );
};

