import { create } from "zustand";
import { immer } from "zustand/middleware/immer";
import { nanoid } from "nanoid";

export interface Task {
  id: string;
  title: string;
  done: boolean;
}

type State = {
  tasks: Task[];
};

type Actions = {
  addTask: (task: Task) => void;
  removeTask: (taskId: string) => void;
  toggleTask: (taskId: string) => void;
};

export const useTaskStore = create<State & Actions>()(
  immer((set) => ({
    tasks: [],
    addTask: (task) =>
      set((state) => {
        state.tasks.push(task);
      }),
    removeTask: (taskId) =>
      set((state) => {
        state.tasks.splice(
          state.tasks.findIndex((task) => task.id === taskId),
          1,
        );
      }),
    toggleTask: (taskId) =>
      set((state) => {
        const index = state.tasks.findIndex((task) => task.id === taskId);
        state.tasks[index].done = !state.tasks[index].done;
      }),
  })),
);
