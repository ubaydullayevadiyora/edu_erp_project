import { Outlet } from "react-router-dom"

const TeacherLayout= () => {
  return (
    <div>
      <h1>TeacherLayout</h1>
      <Outlet/>
    </div>
  )
}

export default TeacherLayout