import React from "react";
import { createContext } from "./createContext";
import { useLocalStorage } from "./useLocalStorage";
import { v4 as uuidv4 } from "uuid";

export const categories = ["work", "todo", "code review"] as const;

export type Category = typeof categories[number];

export interface Task {
  title: string;
  dueDate: string;
  isComplete: boolean;
  isDeleted: boolean;
  category: Category;
  id: string;
}

interface Data {
  tasks: Task[];
  addTask: (title: string, dueDate: string, category: Category) => void;
  updateTask: (index: number, task: Partial<Task>) => void;
}

const [useData, DataContextProvider] = createContext<Data>();

const useDataProvider = () => {
  const [tasks, setTasks] = useLocalStorage<Task[]>("tasks", []);
  return {
    tasks,
    addTask: (title: string, dueDate: string, category: Category) =>
      setTasks((tasks) => [
        {
          title,
          dueDate,
          isComplete: false,
          isDeleted: false,
          category,
          id: uuidv4(),
        },
        ...tasks,
      ]),
    updateTask: (index: number, task: Partial<Task>) => {
      setTasks((tasks) =>
        tasks.map((t, i) => (i === index ? { ...t, ...task } : t))
      );
    },
  };
};

export const DataProvider: React.FC = ({ children }) => {
  const value = useDataProvider();
  return <DataContextProvider value={value}>{children}</DataContextProvider>;
};

export { useData };
