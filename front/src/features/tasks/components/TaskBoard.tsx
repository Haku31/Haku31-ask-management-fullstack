import { useMemo, useState } from 'react';
import {
  DndContext,
  DragEndEvent,
  DragOverlay,
  DragStartEvent,
  PointerSensor,
  useSensor,
  useSensors,
  useDroppable,
} from '@dnd-kit/core';
import { Box, Paper, Typography, Chip, alpha } from '@mui/material';
import { Task, TaskStatus } from '../types/task.types';
import { TaskCard } from './TaskCard';
import { TASK_STATUS_LABELS, TASK_STATUS_COLORS } from '@/shared/utils/constants';
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { DraggableTaskCard } from './DraggableTaskCard';

interface TaskBoardProps {
  tasks: Task[];
  onDelete: (taskId: string) => void;
  onUpdateStatus: (taskId: string, status: TaskStatus) => void;
}

interface Column {
  id: TaskStatus;
  title: string;
  color: string;
}

const columns: Column[] = [
  {
    id: 'TODO',
    title: TASK_STATUS_LABELS.TODO,
    color: TASK_STATUS_COLORS.TODO,
  },
  {
    id: 'IN_PROGRESS',
    title: TASK_STATUS_LABELS.IN_PROGRESS,
    color: TASK_STATUS_COLORS.IN_PROGRESS,
  },
  {
    id: 'COMPLETED',
    title: TASK_STATUS_LABELS.COMPLETED,
    color: TASK_STATUS_COLORS.COMPLETED,
  },
];

// Componente interno para columna droppable
interface DroppableColumnProps {
  column: Column;
  tasks: Task[];
  onDelete: (taskId: string) => void;
  onUpdateStatus: (taskId: string, status: TaskStatus) => void;
}

const DroppableColumn: React.FC<DroppableColumnProps> = ({ column, tasks, onDelete, onUpdateStatus }) => {
  const { setNodeRef, isOver } = useDroppable({
    id: column.id,
  });

  return (
    <Paper
      ref={setNodeRef}
      sx={{
        flex: 1,
        minWidth: { xs: '100%', md: 320 },
        maxWidth: { xs: '100%', md: 400 },
        bgcolor: isOver ? alpha(column.color, 0.1) : alpha(column.color, 0.03),
        p: 2,
        borderTop: 3,
        borderColor: column.color,
        transition: 'all 0.2s',
        transform: isOver ? 'scale(1.02)' : 'scale(1)',
        '&:hover': {
          bgcolor: alpha(column.color, 0.05),
        },
      }}
    >
      {/* Column Header */}
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          mb: 2,
          pb: 1,
          borderBottom: 1,
          borderColor: 'divider',
        }}
      >
        <Typography variant="h6" fontWeight="bold">
          {column.title}
        </Typography>
        <Chip
          label={tasks.length}
          size="small"
          sx={{
            bgcolor: column.color,
            color: 'white',
            fontWeight: 'bold',
          }}
        />
      </Box>

      {/* Task Cards */}
      <SortableContext
        items={tasks.map((t) => t.id)}
        strategy={verticalListSortingStrategy}
      >
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            gap: 2,
            minHeight: 100,
          }}
        >
          {tasks.length === 0 ? (
            <Box
              sx={{
                textAlign: 'center',
                py: 4,
                color: 'text.secondary',
                bgcolor: isOver ? alpha(column.color, 0.1) : 'transparent',
                borderRadius: 1,
                border: isOver ? `2px dashed ${column.color}` : 'none',
                transition: 'all 0.2s',
              }}
            >
              <Typography variant="body2">
                {isOver ? '¡Suelta aquí!' : 'Arrastra tareas aquí'}
              </Typography>
            </Box>
          ) : (
            tasks.map((task) => (
              <DraggableTaskCard
                key={task.id}
                task={task}
                onDelete={onDelete}
                onUpdateStatus={onUpdateStatus}
              />
            ))
          )}
        </Box>
      </SortableContext>
    </Paper>
  );
};

export const TaskBoard: React.FC<TaskBoardProps> = ({ tasks, onDelete, onUpdateStatus }) => {
  const [activeTask, setActiveTask] = useState<Task | null>(null);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    })
  );

  const tasksByStatus = useMemo(() => {
    return {
      TODO: tasks.filter((task) => task.status === 'TODO'),
      IN_PROGRESS: tasks.filter((task) => task.status === 'IN_PROGRESS'),
      COMPLETED: tasks.filter((task) => task.status === 'COMPLETED'),
    };
  }, [tasks]);

  const handleDragStart = (event: DragStartEvent) => {
    const task = tasks.find((t) => t.id === event.active.id);
    setActiveTask(task || null);
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    setActiveTask(null);

    if (!over) return;

    const taskId = active.id as string;
    
    // Determinar el nuevo estado basado en dónde se soltó
    let newStatus: TaskStatus | undefined;
    
    // Si se soltó sobre una columna
    if (over.id === 'TODO' || over.id === 'IN_PROGRESS' || over.id === 'COMPLETED') {
      newStatus = over.id as TaskStatus;
    } else {
      // Si se soltó sobre otra tarea, obtener el estado de esa columna
      const overTask = tasks.find((t) => t.id === over.id);
      if (overTask) {
        newStatus = overTask.status;
      }
    }

    if (!newStatus) return;

    const task = tasks.find((t) => t.id === taskId);
    if (task && task.status !== newStatus) {
      console.log('🔄 Updating task:', taskId, 'from', task.status, 'to', newStatus);
      onUpdateStatus(taskId, newStatus);
    }
  };

  return (
    <DndContext sensors={sensors} onDragStart={handleDragStart} onDragEnd={handleDragEnd}>
      <Box
        sx={{
          display: 'flex',
          flexDirection: { xs: 'column', md: 'row' },
          gap: 2,
          overflowX: { xs: 'visible', md: 'auto' },
          pb: 2,
          minHeight: { xs: 'auto', md: '70vh' },
        }}
      >
        {columns.map((column) => (
          <DroppableColumn
            key={column.id}
            column={column}
            tasks={tasksByStatus[column.id]}
            onDelete={onDelete}
            onUpdateStatus={onUpdateStatus}
          />
        ))}
      </Box>

      <DragOverlay>
        {activeTask ? (
          <Box sx={{ cursor: 'grabbing', opacity: 0.8, transform: 'rotate(-5deg)' }}>
            <TaskCard
              task={activeTask}
              onDelete={() => {}}
              onUpdateStatus={() => {}}
            />
          </Box>
        ) : null}
      </DragOverlay>
    </DndContext>
  );
};
