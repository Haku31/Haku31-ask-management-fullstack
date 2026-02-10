import { useEffect, useMemo } from 'react';
import { Box, Paper, Typography, Grid } from '@mui/material';
import {
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import { Layout } from '@/shared/components/Layout';
import { TaskStats } from '@/features/tasks/components/TaskStats';
import { useAppDispatch, useAppSelector } from '@/app/hooks';
import { fetchTasks } from '@/features/tasks/tasksSlice';
import { TaskStats as TaskStatsType } from '@/features/tasks/types/task.types';
import { TASK_STATUS_COLORS, TASK_STATUS_LABELS } from '@/shared/utils/constants';

export const DashboardPage: React.FC = () => {
  const dispatch = useAppDispatch();
  const { tasks } = useAppSelector((state) => state.tasks);

  useEffect(() => {
    dispatch(fetchTasks());
  }, [dispatch]);

  const stats: TaskStatsType = useMemo(() => {
    const todo = tasks.filter((task) => task.status === 'TODO').length;
    const inProgress = tasks.filter((task) => task.status === 'IN_PROGRESS').length;
    const completed = tasks.filter((task) => task.status === 'COMPLETED').length;

    return {
      total: tasks.length,
      todo,
      inProgress,
      completed,
    };
  }, [tasks]);

  const chartData = useMemo(
    () => [
      {
        name: TASK_STATUS_LABELS.TODO,
        value: stats.todo,
        color: TASK_STATUS_COLORS.TODO,
      },
      {
        name: TASK_STATUS_LABELS.IN_PROGRESS,
        value: stats.inProgress,
        color: TASK_STATUS_COLORS.IN_PROGRESS,
      },
      {
        name: TASK_STATUS_LABELS.COMPLETED,
        value: stats.completed,
        color: TASK_STATUS_COLORS.COMPLETED,
      },
    ],
    [stats]
  );

  const barChartData = useMemo(
    () => [
      { name: 'Por Hacer', cantidad: stats.todo },
      { name: 'En Progreso', cantidad: stats.inProgress },
      { name: 'Completadas', cantidad: stats.completed },
    ],
    [stats]
  );

  return (
    <Layout>
      <Box>
        <Box sx={{ mb: 4 }}>
          <Typography 
            variant="h4" 
            component="h1" 
            gutterBottom
            sx={{ fontSize: { xs: '1.75rem', md: '2.125rem' } }}
          >
            Dashboard
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Vista general de todas tus tareas
          </Typography>
        </Box>

        <TaskStats stats={stats} />

        <Grid container spacing={3}>
          <Grid item xs={12} lg={6}>
            <Paper sx={{ p: { xs: 2, sm: 3 } }}>
              <Typography variant="h6" gutterBottom sx={{ fontSize: { xs: '1rem', sm: '1.25rem' } }}>
                Distribución por Estado
              </Typography>
              <Box sx={{ width: '100%', height: { xs: 250, sm: 300 } }}>
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={barChartData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis 
                      dataKey="name" 
                      tick={{ fontSize: 12 }}
                      angle={-15}
                      textAnchor="end"
                      height={60}
                    />
                    <YAxis tick={{ fontSize: 12 }} />
                    <Tooltip />
                    <Legend wrapperStyle={{ fontSize: '12px' }} />
                    <Bar dataKey="cantidad" fill="#1976d2" />
                  </BarChart>
                </ResponsiveContainer>
              </Box>
            </Paper>
          </Grid>

          <Grid item xs={12} lg={6}>
            <Paper sx={{ p: { xs: 2, sm: 3 } }}>
              <Typography variant="h6" gutterBottom sx={{ fontSize: { xs: '1rem', sm: '1.25rem' } }}>
                Proporción de Tareas
              </Typography>
              <Box sx={{ width: '100%', height: { xs: 250, sm: 300 } }}>
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={chartData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, percent }) =>
                        `${name}: ${(percent * 100).toFixed(0)}%`
                      }
                      outerRadius={window.innerWidth < 600 ? 60 : 80}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {chartData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                    <Legend wrapperStyle={{ fontSize: '12px' }} />
                  </PieChart>
                </ResponsiveContainer>
              </Box>
            </Paper>
          </Grid>
        </Grid>

        {tasks.length === 0 && (
          <Box sx={{ textAlign: 'center', py: 8 }}>
            <Typography variant="h6" color="text.secondary">
              No hay datos para mostrar
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Crea algunas tareas para ver las estadísticas
            </Typography>
          </Box>
        )}
      </Box>
    </Layout>
  );
};

