import { Route, Routes } from "react-router-dom"
import TodoList from "./components/TodoList"
import TaskDetails from "./page/TaskDetails"

function App() {

  return (
    <>
    
    <Routes>
    <Route path="/" element={<TodoList />} />
      <Route path="/taskdetail/:id" element={<TaskDetails />} />
    </Routes>
    </>
  )
}

export default App
