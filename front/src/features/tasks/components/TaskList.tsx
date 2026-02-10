import { Grid, Box, Typography, Skeleton } from '@mui/material';
import { AnimatePresence } from 'framer-motion';
import { TaskCard } from './TaskCard';
import { Task, TaskStatus } from '../types/task.types';

interface TaskListProps {
  tasks: Task[];
  loading: boolean;
  onDelete: (taskId: string) => void;
  onUpdateStatus: (taskId: string, status: TaskStatus) => void;
}

export const TaskList: React.FC<TaskListProps> = ({
  tasks,
  loading,
  onDelete,
  onUpdateStatus,
}) => {
  if (loading) {
    return (
      <Grid container spacing={3}>
        {[1, 2, 3, 4, 5, 6].map((item) => (
          <Grid item xs={12} sm={6} md={4} key={item}>
            <Skeleton variant="rectangular" height={200} sx={{ borderRadius: 1 }} />
          </Grid>
        ))}
      </Grid>
    );
  }

  if (tasks.length === 0) {
    return (
      <Box
        sx={{
          textAlign: 'center',
          py: 8,
          px: 2,
        }}
      >
        <Typography variant="h6" color="text.secondary" gutterBottom>
          No hay tareas disponibles
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Crea tu primera tarea usando el botón "Nueva Tarea"
        </Typography>
      </Box>
    );
  }

  return (
    <Grid container spacing={3}>
      <AnimatePresence>
        {tasks.map((task) => (
          <Grid item xs={12} sm={6} md={4} key={task.id}>
            <TaskCard
              task={task}
              onDelete={onDelete}
              onUpdateStatus={onUpdateStatus}
            />
          </Grid>
        ))}
      </AnimatePresence>
    </Grid>
  );
};

