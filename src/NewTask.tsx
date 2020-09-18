import { Button } from "@material-ui/core";
import { TextField } from "@material-ui/core";
import React, { useState } from "react";
import { useData } from "./DataProvider";

export const NewTask: React.FC = () => {
  const [task, setTask] = useState("");
  const { addTask } = useData();
  return (
    <>
      <div
        style={{
          display: "flex",
          alignItems: "center",
        }}
      >
        <TextField
          id="filled-basic"
          label="Task"
          variant="filled"
          size="small"
          fullWidth
          value={task}
          onChange={(e) => setTask(e.target.value)}
        />
        <Button
          variant="contained"
          color="primary"
          size="large"
          fullWidth
          onClick={() => {
            addTask(task);
            setTask("");
          }}
        >
          Add task
        </Button>
      </div>
    </>
  );
};
