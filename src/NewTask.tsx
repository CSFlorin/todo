import { Button } from "@material-ui/core";
import { TextField } from "@material-ui/core";
import "date-fns";
import DateFnsUtils from "@date-io/date-fns";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from "@material-ui/pickers";
import React, { useState, useRef, useEffect } from "react";
import { useData } from "./DataProvider";

export const NewTask: React.FC = () => {
  const [task, setTask] = useState("");
  const [day, setDay] = useState<Date | null>(() => {
    const newDay = new Date();
    newDay.setDate(newDay.getDate() + 7);
    return newDay;
  });
  const inputEl = useRef<HTMLDivElement>(null);
  const { addTask } = useData();

  useEffect(() => {
    inputEl.current?.focus();
  }, []);

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        addTask(task, day!.toISOString());
        setTask("");
        inputEl.current?.focus();
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
        }}
      >
        <div>
          <TextField
            id="task"
            label="Task"
            variant="filled"
            fullWidth
            value={task}
            onChange={(e) => setTask(e.target.value)}
            required
            inputRef={inputEl}
          />
          <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <KeyboardDatePicker
              id="due-date"
              disableToolbar
              variant="inline"
              inputVariant="filled"
              format="MM/dd/yyyy"
              margin="normal"
              label="Due date"
              value={day}
              onChange={(day: Date | null) => setDay(day)}
              fullWidth
              required
            />
          </MuiPickersUtilsProvider>
        </div>

        <Button
          variant="contained"
          color="primary"
          size="large"
          type="submit"
          style={{ height: "6rem", marginLeft: "1rem", width: "50%" }}
        >
          Add task
        </Button>
      </div>
    </form>
  );
};
