import { Route, Routes } from "react-router";
import Projects from "../pages/proyects";

export default function ProjectsRoute() {
  return (
    <Routes>
      <Route path="/" element={<Projects />} />
      <Route path="/new" element={<h1>Nuevo Proyecto</h1>} />
      <Route path="/edit/:id" element={<h1>Editar Proyecto</h1>} />
    </Routes>
  );
}
