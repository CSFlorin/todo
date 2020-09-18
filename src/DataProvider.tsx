import React from "react";
import { createContext } from "./createContext";
import { useLocalStorage } from "./useLocalStorage";

export interface Task {
  title: string;
  dueDate: string;
  isComplete: boolean;
  isDeleted: boolean;
}

interface Data {
  tasks: Task[];
  addTask: (title: string, dueDate: string) => void;
  updateTask: (index: number, task: Task) => void;
}

const [useData, DataContextProvider] = createContext<Data>();

const useDataProvider = () => {
  const [tasks, setTasks] = useLocalStorage<Task[]>("tasks", []);
  return {
    tasks,
    addTask: (title: string, dueDate: string) =>
      setTasks((tasks) => [
        { title, dueDate, isComplete: false, isDeleted: false },
        ...tasks,
      ]),
    updateTask: (index: number, task: Task) => {
      setTasks((tasks) => tasks.map((t, i) => (i === index ? task : t)));
    },
  };
};

export const DataProvider: React.FC = ({ children }) => {
  const value = useDataProvider();
  return <DataContextProvider value={value}>{children}</DataContextProvider>;
};

export { useData };
