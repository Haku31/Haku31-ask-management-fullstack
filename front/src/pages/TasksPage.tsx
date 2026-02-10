import { useEffect, useState, useMemo } from 'react';
import { Box, Button, Snackbar, Alert, ToggleButtonGroup, ToggleButton, Typography } from '@mui/material';
import { Add as AddIcon, ViewList as ViewListIcon, ViewKanban as ViewKanbanIcon } from '@mui/icons-material';
import { Layout } from '@/shared/components/Layout';
import { TaskList } from '@/features/tasks/components/TaskList';
import { TaskBoard } from '@/features/tasks/components/TaskBoard';
import { TaskForm } from '@/features/tasks/components/TaskForm';
import { TaskFilters } from '@/features/tasks/components/TaskFilters';
import { ConfirmDialog } from '@/shared/components/ConfirmDialog';
import { useAppDispatch, useAppSelector } from '@/app/hooks';
import {
  fetchTasks,
  createTask,
  deleteTask,
  updateTaskStatus,
  setFilters,
  clearError,
} from '@/features/tasks/tasksSlice';
import { CreateTaskDto, TaskStatus } from '@/features/tasks/types/task.types';

export const TasksPage: React.FC = () => {
  const dispatch = useAppDispatch();
  const { tasks, loading, error, filters } = useAppSelector((state) => state.tasks);
  const [formOpen, setFormOpen] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState<'success' | 'error'>('success');
  const [viewMode, setViewMode] = useState<'list' | 'board'>('board');
  const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false);
  const [taskToDelete, setTaskToDelete] = useState<string | null>(null);

  useEffect(() => {
    dispatch(fetchTasks());
  }, [dispatch]);

  useEffect(() => {
    if (error) {
      showSnackbar(error, 'error');
      dispatch(clearError());
    }
  }, [error, dispatch]);

  const filteredTasks = useMemo(() => {
    return tasks.filter((task) => {
      const matchesStatus = filters.status === 'ALL' || task.status === filters.status;
      const matchesSearch = task.title.toLowerCase().includes(filters.search.toLowerCase());
      return matchesStatus && matchesSearch;
    });
  }, [tasks, filters]);

  const showSnackbar = (message: string, severity: 'success' | 'error') => {
    setSnackbarMessage(message);
    setSnackbarSeverity(severity);
    setSnackbarOpen(true);
  };

  const handleCreateTask = async (data: CreateTaskDto) => {
    try {
      await dispatch(createTask(data)).unwrap();
      setFormOpen(false);
      showSnackbar('Tarea creada exitosamente', 'success');
    } catch (err: any) {
      showSnackbar(err || 'Error al crear la tarea', 'error');
    }
  };

  const handleDeleteTask = (taskId: string) => {
    setTaskToDelete(taskId);
    setDeleteConfirmOpen(true);
  };

  const handleConfirmDelete = async () => {
    if (!taskToDelete) return;

    try {
      await dispatch(deleteTask(taskToDelete)).unwrap();
      showSnackbar('Tarea eliminada exitosamente', 'success');
    } catch (err: any) {
      showSnackbar(err || 'Error al eliminar la tarea', 'error');
    } finally {
      setDeleteConfirmOpen(false);
      setTaskToDelete(null);
    }
  };

  const handleCancelDelete = () => {
    setDeleteConfirmOpen(false);
    setTaskToDelete(null);
  };

  const handleUpdateStatus = async (taskId: string, status: TaskStatus) => {
    try {
      await dispatch(updateTaskStatus({ taskId, status: { status } })).unwrap();
      showSnackbar('Estado actualizado exitosamente', 'success');
    } catch (err: any) {
      showSnackbar(err || 'Error al actualizar el estado', 'error');
    }
  };

  const handleFilterChange = (newFilters: { status: TaskStatus | 'ALL'; search: string }) => {
    dispatch(setFilters(newFilters));
  };

  return (
    <Layout>
      <Box>
        <Box sx={{ 
          display: 'flex', 
          flexDirection: { xs: 'column', md: 'row' },
          justifyContent: 'space-between', 
          alignItems: { xs: 'flex-start', md: 'center' },
          gap: 2,
          mb: 3 
        }}>
          <Box>
            <Typography variant="h4" component="h1" sx={{ mb: 1, fontSize: { xs: '1.75rem', md: '2.125rem' } }}>
              Gestión de Tareas
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Organiza y administra tus tareas de manera eficiente
            </Typography>
          </Box>
          <Box sx={{ 
            display: 'flex', 
            flexDirection: { xs: 'column', sm: 'row' },
            gap: 2,
            width: { xs: '100%', sm: 'auto' }
          }}>
            <ToggleButtonGroup
              value={viewMode}
              exclusive
              onChange={(_, newMode) => newMode && setViewMode(newMode)}
              size="small"
              fullWidth
              sx={{ display: { xs: 'flex', sm: 'inline-flex' } }}
            >
              <ToggleButton value="board">
                <ViewKanbanIcon sx={{ mr: { xs: 0, sm: 1 } }} />
                <Box component="span" sx={{ display: { xs: 'none', sm: 'inline' } }}>
                  Tablero
                </Box>
              </ToggleButton>
              <ToggleButton value="list">
                <ViewListIcon sx={{ mr: { xs: 0, sm: 1 } }} />
                <Box component="span" sx={{ display: { xs: 'none', sm: 'inline' } }}>
                  Lista
                </Box>
              </ToggleButton>
            </ToggleButtonGroup>
            <Button
              variant="contained"
              startIcon={<AddIcon />}
              onClick={() => setFormOpen(true)}
              size="large"
              fullWidth
              sx={{ display: { xs: 'flex', sm: 'inline-flex' } }}
            >
              Nueva Tarea
            </Button>
          </Box>
        </Box>

        <TaskFilters onFilterChange={handleFilterChange} />

        {viewMode === 'board' ? (
          <TaskBoard
            tasks={filteredTasks}
            onDelete={handleDeleteTask}
            onUpdateStatus={handleUpdateStatus}
          />
        ) : (
          <TaskList
            tasks={filteredTasks}
            loading={loading}
            onDelete={handleDeleteTask}
            onUpdateStatus={handleUpdateStatus}
          />
        )}

        <TaskForm
          open={formOpen}
          onClose={() => setFormOpen(false)}
          onSubmit={handleCreateTask}
          loading={loading}
        />

        <ConfirmDialog
          open={deleteConfirmOpen}
          title="Eliminar Tarea"
          message="¿Estás seguro de que deseas eliminar esta tarea? Esta acción no se puede deshacer."
          confirmText="Eliminar"
          cancelText="Cancelar"
          onConfirm={handleConfirmDelete}
          onCancel={handleCancelDelete}
          severity="error"
        />

        <Snackbar
          open={snackbarOpen}
          autoHideDuration={4000}
          onClose={() => setSnackbarOpen(false)}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        >
          <Alert
            onClose={() => setSnackbarOpen(false)}
            severity={snackbarSeverity}
            variant="filled"
          >
            {snackbarMessage}
          </Alert>
        </Snackbar>
      </Box>
    </Layout>
  );
};

