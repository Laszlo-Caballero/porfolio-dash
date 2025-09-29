import { Route, Routes } from "react-router";
import Projects from "../pages/proyects";
import CreateProyect from "@/pages/create/CreateProyect";

export default function ProjectsRoute() {
  return (
    <Routes>
      <Route path="/" element={<Projects />} />
      <Route path="/new" element={<CreateProyect />} />
      <Route path="/edit/:id" element={<h1>Editar Proyecto</h1>} />
    </Routes>
  );
}
