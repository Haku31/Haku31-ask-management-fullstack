import { Grid, Paper, Box, Typography } from '@mui/material';
import {
  Assignment as AssignmentIcon,
  CheckCircle as CheckCircleIcon,
  HourglassEmpty as HourglassEmptyIcon,
  Pending as PendingIcon,
} from '@mui/icons-material';
import { TaskStats as TaskStatsType } from '../types/task.types';

interface TaskStatsProps {
  stats: TaskStatsType;
}

interface StatCardProps {
  title: string;
  value: number;
  icon: React.ReactNode;
  color: string;
}

const StatCard: React.FC<StatCardProps> = ({ title, value, icon, color }) => (
  <Paper
    sx={{
      p: { xs: 2, sm: 3 },
      display: 'flex',
      alignItems: 'center',
      gap: { xs: 1.5, sm: 2 },
      transition: 'transform 0.2s',
      '&:hover': {
        transform: 'translateY(-4px)',
      },
    }}
  >
    <Box
      sx={{
        bgcolor: `${color}20`,
        color: color,
        p: { xs: 1.5, sm: 2 },
        borderRadius: 2,
        display: 'flex',
        '& svg': {
          fontSize: { xs: 32, sm: 40 }
        }
      }}
    >
      {icon}
    </Box>
    <Box>
      <Typography 
        variant="h4" 
        component="div" 
        fontWeight="bold"
        sx={{ fontSize: { xs: '1.75rem', sm: '2.125rem' } }}
      >
        {value}
      </Typography>
      <Typography 
        variant="body2" 
        color="text.secondary"
        sx={{ fontSize: { xs: '0.75rem', sm: '0.875rem' } }}
      >
        {title}
      </Typography>
    </Box>
  </Paper>
);

export const TaskStats: React.FC<TaskStatsProps> = ({ stats }) => {
  return (
    <Grid container spacing={{ xs: 2, sm: 3 }} sx={{ mb: 3 }}>
      <Grid item xs={6} sm={6} md={3}>
        <StatCard
          title="Total de Tareas"
          value={stats.total}
          icon={<AssignmentIcon sx={{ fontSize: 40 }} />}
          color="#1976d2"
        />
      </Grid>
      <Grid item xs={6} sm={6} md={3}>
        <StatCard
          title="Por Hacer"
          value={stats.todo}
          icon={<PendingIcon />}
          color="#f44336"
        />
      </Grid>
      <Grid item xs={6} sm={6} md={3}>
        <StatCard
          title="En Progreso"
          value={stats.inProgress}
          icon={<HourglassEmptyIcon />}
          color="#ff9800"
        />
      </Grid>
      <Grid item xs={6} sm={6} md={3}>
        <StatCard
          title="Completadas"
          value={stats.completed}
          icon={<CheckCircleIcon sx={{ fontSize: 40 }} />}
          color="#4caf50"
        />
      </Grid>
    </Grid>
  );
};

