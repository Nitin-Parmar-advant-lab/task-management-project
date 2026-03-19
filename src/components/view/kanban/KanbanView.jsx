import KanbanColumn from "./KanbanColumn";
import useFetchTask from "../../../hooks/useFetchTask";
import { useState } from "react";
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
import { useDispatch, useSelector } from "react-redux";
import { tasksAction } from "../../../store/taskSlice";
import LoginModal from "../../LoginModal";
import TaskCard from "./TaskCard";

export default function KanbanView() {
    const dispatch = useDispatch();
    const { todoTasks, inProgressTasks, completedTasks } = useFetchTask();
    const [selectedTask, setSelectedTask] = useState(null);
    const [activeId, setActiveId] = useState(null);

    const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
    const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);

    const allTasks = [...todoTasks, ...inProgressTasks, ...completedTasks];
    const activeTask = allTasks.find((t) => t.id === activeId);

    const sensors = useSensors(
        useSensor(PointerSensor, {
            activationConstraint: {
                distance: 5,
            },
        }),
    );

    function onCardClick(task) {
        if (isLoggedIn) {
            setSelectedTask(task);
        } else {
            setIsLoginModalOpen(true);
        }
    }

    function handleDragStart(event) {
        if (!isLoggedIn) {
            setIsLoginModalOpen(true);
            return;
        }
        setActiveId(event.active.id);
    }

    function handleDragOver(event) {
        if (!isLoggedIn) return;

        const { active, over } = event;
        if (!over) return;

        const taskId = active.id;
        const overId = over.id;

        const currentTask = allTasks.find((task) => task.id === taskId);

        if (currentTask && currentTask.category !== overId) {
            dispatch(
                tasksAction.moveTask({
                    taskId: taskId,
                    newCategory: overId,
                }),
            );
        }
    }

    function handleDragEnd(event) {
        setActiveId(null);
        if (!isLoggedIn) {
            return;
        }

        const { active, over } = event;

        if (!over) return;

        const taskId = active.id;
        const newCategory = over.id;

        const currentTask = allTasks.find((task) => task.id === taskId);

        if (currentTask && currentTask.category !== newCategory) {
            dispatch(
                tasksAction.moveTask({
                    taskId: taskId,
                    newCategory: newCategory,
                }),
            );
        }
    }

    return (
        <DndContext
            sensors={sensors}
            collisionDetection={closestCorners}
            onDragStart={handleDragStart}
            onDragOver={handleDragOver}
            onDragEnd={handleDragEnd}
        >
            <div
                id="kanban-view"
                className="flex gap-6 px-5 h-full overflow-x-auto p-2 dark:bg-[#000000] bg-amber-100"
            >
                <div id="todo-task" className="flex-1 min-w-75">
                    <KanbanColumn
                        id="Todo"
                        title="Todo"
                        tasks={todoTasks}
                        onCardClick={onCardClick}
                    />
                </div>

                <div id="in-progress-task" className="flex-1 min-w-75">
                    <KanbanColumn
                        id="In Progress"
                        title="In Progress"
                        tasks={inProgressTasks}
                        onCardClick={onCardClick}
                    />
                </div>

                <div id="completed-task" className="flex-1 min-w-75">
                    <KanbanColumn
                        id="Completed"
                        title="Completed"
                        tasks={completedTasks}
                        onCardClick={onCardClick}
                    />
                </div>
            </div>

            <DragOverlay>
                {activeTask ? (
                    <div className="w-full">
                        <TaskCard task={activeTask} isOverlay={true} />
                    </div>
                ) : null}
            </DragOverlay>

            <Modal
                isOpen={selectedTask}
                onClose={() => setSelectedTask(null)}
                modalWidth="min-w-2xl"
            >
                <TaskForm
                    key={selectedTask?.id || "new-task"}
                    onClose={() => setSelectedTask(null)}
                    task={selectedTask}
                />
            </Modal>
            <Modal
                isOpen={isLoginModalOpen}
                onClose={() => setIsLoginModalOpen(false)}
                modalWidth="max-w-md"
            >
                <LoginModal onClose={() => setIsLoginModalOpen(false)} />
            </Modal>
        </DndContext>
    );
}
