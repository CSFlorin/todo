import React, { useState } from "react";
import { createContext } from "./createContext";

export interface Task {
  title: string;
  isComplete: boolean;
  isDeleted: boolean;
}

interface Data {
  tasks: Task[];
  addTask: (title: string) => void;
  updateTask: (index: number, task: Task) => void;
}

const [useData, DataContextProvider] = createContext<Data>();

const useDataProvider = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  return {
    tasks,
    addTask: (title: string) =>
      setTasks((tasks) => [
        { title, isComplete: false, isDeleted: false },
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
