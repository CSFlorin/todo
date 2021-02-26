import { Checkbox, IconButton, TextField, Button } from "@material-ui/core";
import React, { useState } from "react";
import { Task as TaskInterface, useData } from "./DataProvider";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";

interface Props extends TaskInterface {
  index: number;
}

export const Task: React.FC<Props> = ({
  title,
  dueDate,
  isComplete,
  index,
}) => {
  const { updateTask } = useData();
  const [edit, setEdit] = useState(false);

  const [localTitle, setLocalTitle] = useState(title);

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

        {edit ? (
          <>
            <TextField
              id="title"
              label="Title"
              variant="filled"
              size="small"
              value={localTitle}
              onChange={(e) => setLocalTitle(e.target.value)}
            />
            <Button
              onClick={() => {
                updateTask(index, {
                  title: localTitle,
                });
                setEdit(false);
              }}
            >
              Save
            </Button>
          </>
        ) : (
          <div
            style={{ textDecoration: isComplete ? "line-through" : "initial" }}
            onClick={() => {
              setEdit(true);
            }}
          >
            {localTitle}
          </div>
        )}
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
