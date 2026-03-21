import KanbanColumn from "./KanbanColumn";
import useFetchTask from "../../../hooks/useFetchTask";
import { useState, useRef, useMemo, useCallback } from "react";
import Modal from "../../ui/Modal";
import TaskForm from "../../TaskForm";
import {
    DndContext,
    PointerSensor,
    useSensor,
    useSensors,
    closestCorners,
    DragOverlay,
} from "@dnd-kit/core";
import { useDispatch } from "react-redux";
import { tasksAction } from "../../../store/taskSlice";
import TaskCard from "./TaskCard";

export default function KanbanView() {
    const dispatch = useDispatch();
    const { todoTasks, inProgressTasks, completedTasks } = useFetchTask();

    const [selectedTask, setSelectedTask] = useState(null);
    const [activeId, setActiveId] = useState(null);

    const lastOverCategory = useRef(null);

    const taskMap = useMemo(() => {
        const map = new Map();
        [...todoTasks, ...inProgressTasks, ...completedTasks].forEach(
            (task) => {
                map.set(task.id, task);
            },
        );
        return map;
    }, [todoTasks, inProgressTasks, completedTasks]);

    const activeTask = useMemo(
        () => (activeId ? taskMap.get(activeId) : null),
        [activeId, taskMap],
    );

    const sensors = useSensors(
        useSensor(PointerSensor, {
            activationConstraint: {
                distance: 5,
            },
        }),
    );

    const onCardClick = useCallback((task) => {
        setSelectedTask(task);
    }, []);

    const handleDragStart = useCallback((event) => {
        setActiveId(event.active.id);
    }, []);

    const handleDragOver = useCallback(
        (event) => {
            const { active, over } = event;
            if (!over) return;

            const taskId = active.id;
            const overId = over.id;
            const overCategory = taskMap.get(overId)?.category || overId;

            const currentTask = taskMap.get(taskId);
            if (!currentTask) return;

            if (currentTask.category === overCategory) return;
            if (lastOverCategory.current === overCategory) return;

            if (!["Todo", "In Progress", "Completed"].includes(overCategory)) return;

            lastOverCategory.current = overCategory;

            dispatch(
                tasksAction.moveTask({
                    taskId,
                    newCategory: overCategory,
                }),
            );
        },
        [dispatch, taskMap],
    );

    const handleDragEnd = useCallback(() => {
        setActiveId(null);
        lastOverCategory.current = null;
    }, []);

    const columns = useMemo(
        () => [
            { id: "Todo", title: "Todo", tasks: todoTasks },
            { id: "In Progress", title: "In Progress", tasks: inProgressTasks },
            { id: "Completed", title: "Completed", tasks: completedTasks },
        ],
        [todoTasks, inProgressTasks, completedTasks],
    );

    return (
        <DndContext
            sensors={sensors}
            collisionDetection={closestCorners}
            onDragStart={handleDragStart}
            onDragOver={handleDragOver}
            onDragEnd={handleDragEnd}
        >
            <div className="flex gap-6 px-5 h-full overflow-x-auto p-4 bg-[#F5F5F7] dark:bg-[#000000]">
                {columns.map((col) => (
                    <div key={col.id} className="flex-1 min-w-75">
                        <KanbanColumn
                            id={col.id}
                            title={col.title}
                            tasks={col.tasks}
                            onCardClick={onCardClick}
                        />
                    </div>
                ))}
            </div>

            <DragOverlay>
                {activeTask && (
                    <div className="w-full">
                        <TaskCard task={activeTask} isOverlay={true} />
                    </div>
                )}
            </DragOverlay>

            <Modal
                isOpen={selectedTask}
                onClose={() => setSelectedTask(null)}
                modalWidth="w-[95%] sm:w-[85%] md:w-[80%] lg:max-w-2xl"
            >
                <TaskForm
                    key={selectedTask?.id || "new-task"}
                    onClose={() => setSelectedTask(null)}
                    task={selectedTask}
                />
            </Modal>
        </DndContext>
    );
}
