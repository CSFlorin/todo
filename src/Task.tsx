import { Checkbox, IconButton } from "@material-ui/core";
import React from "react";
import { Task as TaskInterface, useData } from "./DataProvider";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";

interface Props extends TaskInterface {
  index: number;
}

export const Task: React.FC<Props> = ({
  title,
  isComplete,
  isDeleted,
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
              title,
              isDeleted,
              isComplete: e.target.checked,
            });
          }}
        />
        {title}
      </div>

      <IconButton
        color="secondary"
        onClick={() =>
          updateTask(index, {
            title,
            isDeleted: true,
            isComplete,
          })
        }
      >
        <DeleteForeverIcon />
      </IconButton>
    </div>
  );
};
