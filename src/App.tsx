import React from "react";
import { Content } from "./Content";
import { DataProvider } from "./DataProvider";
import { Title } from "./Title";

function App() {
  return (
    <>
      <Title />
      <DataProvider>
        <Content />
      </DataProvider>
    </>
  );
}

export default App;
