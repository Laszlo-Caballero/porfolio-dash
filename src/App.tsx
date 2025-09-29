import { Route, Routes } from "react-router";
import ProjectsRoute from "./routes/proyects.route";
import Header from "./components/layout/header";

export default function App() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />

      <div className="flex flex-col flex-1 h-full w-full   p-4">
        <Routes>
          <Route path="/" element={<h1>Hola Mundo</h1>} />
          <Route path="/proyects/*" element={<ProjectsRoute />} />
        </Routes>
      </div>
    </div>
  );
}
