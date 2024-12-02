import React from "react";
import "./App.css";
import Header from "./components/Header";
import TodoPage from "./pages/TodoPage";

function App() {
  return (
    <div className="App">
      <Header />
      <TodoPage />
    </div>
  );
}

export default App;
