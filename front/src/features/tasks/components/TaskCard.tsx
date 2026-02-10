import {
  Card,
  CardContent,
  CardActions,
  Typography,
  IconButton,
  Chip,
  Box,
  Tooltip,
  Menu,
  MenuItem,
} from '@mui/material';
import {
  Delete as DeleteIcon,
  MoreVert as MoreVertIcon,
} from '@mui/icons-material';
import { motion } from 'framer-motion';
import { useState } from 'react';
import { Task, TaskStatus } from '../types/task.types';
import { TASK_STATUS_LABELS, TASK_STATUS_COLORS } from '@/shared/utils/constants';

interface TaskCardProps {
  task: Task;
  onDelete: (taskId: string) => void;
  onUpdateStatus: (taskId: string, status: TaskStatus) => void;
}

export const TaskCard: React.FC<TaskCardProps> = ({ task, onDelete, onUpdateStatus }) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleStatusChange = (status: TaskStatus) => {
    onUpdateStatus(task.id, status);
    handleMenuClose();
  };

  const getStatusColor = (status: TaskStatus): 'error' | 'warning' | 'success' => {
    switch (status) {
      case 'TODO':
        return 'error';
      case 'IN_PROGRESS':
        return 'warning';
      case 'COMPLETED':
        return 'success';
      default:
        return 'error';
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
    >
      <Card
        sx={{
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          transition: 'transform 0.2s, box-shadow 0.2s',
          '&:hover': {
            transform: 'translateY(-4px)',
            boxShadow: 6,
          },
          borderLeft: 4,
          borderColor: TASK_STATUS_COLORS[task.status],
        }}
      >
        <CardContent sx={{ flexGrow: 1, p: { xs: 2, sm: 2 } }}>
          <Box display="flex" justifyContent="space-between" alignItems="flex-start" mb={1} gap={1}>
            <Typography 
              variant="h6" 
              component="h2" 
              gutterBottom
              sx={{ 
                fontSize: { xs: '1rem', sm: '1.25rem' },
                wordBreak: 'break-word'
              }}
            >
              {task.title}
            </Typography>
            <Chip
              label={TASK_STATUS_LABELS[task.status]}
              color={getStatusColor(task.status)}
              size="small"
              sx={{ flexShrink: 0 }}
            />
          </Box>
          <Typography 
            variant="body2" 
            color="text.secondary" 
            sx={{ 
              mb: 2,
              fontSize: { xs: '0.813rem', sm: '0.875rem' },
              wordBreak: 'break-word'
            }}
          >
            {task.description}
          </Typography>
          <Typography 
            variant="caption" 
            color="text.secondary"
            sx={{ fontSize: { xs: '0.688rem', sm: '0.75rem' } }}
          >
            Creado: {new Date(task.createdAt).toLocaleDateString('es-ES')}
          </Typography>
        </CardContent>
        <CardActions sx={{ justifyContent: 'space-between', px: { xs: 1.5, sm: 2 }, pb: { xs: 1.5, sm: 2 } }}>
          <Box>
            <Tooltip title="Cambiar estado">
              <IconButton size="small" onClick={handleMenuOpen}>
                <MoreVertIcon />
              </IconButton>
            </Tooltip>
            <Menu anchorEl={anchorEl} open={open} onClose={handleMenuClose}>
              <MenuItem onClick={() => handleStatusChange('TODO')}>
                Por Hacer
              </MenuItem>
              <MenuItem onClick={() => handleStatusChange('IN_PROGRESS')}>
                En Progreso
              </MenuItem>
              <MenuItem onClick={() => handleStatusChange('COMPLETED')}>
                Completada
              </MenuItem>
            </Menu>
          </Box>
          <Tooltip title="Eliminar tarea">
            <IconButton
              size="small"
              color="error"
              onClick={() => onDelete(task.id)}
            >
              <DeleteIcon />
            </IconButton>
          </Tooltip>
        </CardActions>
      </Card>
    </motion.div>
  );
};

