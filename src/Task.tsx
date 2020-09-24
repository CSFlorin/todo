import { Checkbox, Chip, IconButton } from "@material-ui/core";
import React from "react";
import { Task as TaskInterface, useData } from "./DataProvider";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";

interface Props extends TaskInterface {
  index: number;
}

export const Task: React.FC<Props> = ({
  title,
  dueDate,
  isComplete,
  category,
  index,
}) => {
  const { updateTask } = useData();
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        border: ".1rem",
        borderColor: "gray",
        borderStyle: "solid",
        borderRadius: ".25rem",
        margin: "1rem 0",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
        }}
      >
        <Checkbox
          checked={isComplete}
          color="primary"
          onChange={(e) => {
            updateTask(index, {
              isComplete: e.target.checked,
            });
          }}
        />
        <div
          style={{ textDecoration: isComplete ? "line-through" : "initial" }}
        >
          {title}
        </div>
        <div style={{ marginLeft: "1rem" }}>
          <Chip label={category} variant="outlined" />
        </div>
      </div>

      <div
        style={{
          display: "flex",
          alignItems: "center",
        }}
      >
        <div>{new Date(dueDate).toDateString()}</div>
        <IconButton
          color="secondary"
          onClick={() =>
            updateTask(index, {
              isDeleted: true,
            })
          }
        >
          <DeleteForeverIcon />
        </IconButton>
      </div>
    </div>
  );
};
