import React from "react";
import { useData, categories } from "./DataProvider";
import { NewTask } from "./NewTask";
import { Task } from "./Task";

export const Content: React.FC = () => {
  const { tasks } = useData();
  return (
    <div style={{ margin: "1rem 3rem" }}>
      <NewTask />

      {categories.map((category) => {
        const filteredTasks = tasks
          .map((task, index) => ({ ...task, index }))
          .filter(({ category: c }) => c === category);
        return (
          <div key={category}>
            <h3>{category}</h3>
            {filteredTasks.map((task) => {
              if (task.isDeleted) return null;
              return <Task key={task.id} {...task} />;
            })}
          </div>
        );
      })}
    </div>
  );
};
