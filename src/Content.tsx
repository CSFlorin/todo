import React from "react";
import { useData } from "./DataProvider";
import { NewTask } from "./NewTask";
import { Task } from "./Task";

export const Content: React.FC = () => {
  const { tasks } = useData();
  return (
    <div style={{ margin: "1rem 3rem" }}>
      <NewTask />
      {tasks.map((task, index) => {
        if (task.isDeleted) return null;
        return <Task key={index} {...task} index={index} />;
      })}
    </div>
  );
};
