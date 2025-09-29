import { useQuery } from "@tanstack/react-query";
import { proyectsService } from "../services/proyects.service";
import { Button, Spinner } from "flowbite-react";
import TableUse from "../components/table";
import { FaGithub } from "react-icons/fa";
import { Link } from "react-router";

export default function Projects() {
  const { data, isLoading } = useQuery({
    queryKey: ["projects"],
    queryFn: async () => {
      return proyectsService.getProjects();
    },
    refetchOnWindowFocus: false,
  });

  return (
    <div>
      {isLoading && (
        <div className="flex fixed top-0 left-0 h-screen w-full justify-center items-center bg-black/50 z-50">
          <Spinner />
        </div>
      )}

      <div className="my-4 bg-slate-700 border border-slate-500 p-4 text-white rounded-xl flex justify-between items-center">
        <h1>Proyectos</h1>

        <Button color="alternative">
          <Link to="/proyects/new">Nuevo Proyecto</Link>
        </Button>
      </div>

      <TableUse
        data={data?.body || []}
        columns={[
          {
            header: "Imagen Card",
            cell: ({ row }) => (
              <div>
                <img src={row.original.urlImage.url} className="size-20" />
              </div>
            ),
          },
          {
            header: "Titulo",
            accessorKey: "title",
          },
          {
            header: "Descripción",
            accessorKey: "description",
          },
          {
            header: "Slug",
            accessorKey: "slug",
          },
          {
            header: "GitHub",
            cell: ({ row }) => (
              <a
                href={row.original.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaGithub size={30} />
              </a>
            ),
          },
          {
            header: "Tecnologías",
            cell: ({ row }) => (
              <ul>
                {row.original.tecnologies.map((tech, i) => (
                  <li key={i}>{tech}</li>
                ))}
              </ul>
            ),
          },
          {
            header: "Destacado",
            cell: ({ row }) => (row.original.outStanding ? "Sí" : "No"),
          },
          {
            header: "Objetivos",
            cell: ({ row }) => (
              <ul>
                {row.original.objectives.map((objective, i) => (
                  <li key={i}>{objective}</li>
                ))}
              </ul>
            ),
          },
          {
            header: "Aprendizajes",
            cell: ({ row }) => (
              <ul>
                {row.original.learnings.map((learned, i) => (
                  <li key={i}>{learned}</li>
                ))}
              </ul>
            ),
          },
          {
            header: "Detalles",
            cell: ({ row }) => (
              <ul>
                <li>Rol: {row.original.details.role}</li>
                <li>Tiempo: {row.original.details.time}</li>
              </ul>
            ),
          },
          {
            header: "Acciones",
            cell: ({ row }) => (
              <div className="flex space-x-2">
                <Button color="purple" size="sm">
                  <Link to={`/proyects/edit/${row.original._id}`}>Editar</Link>
                </Button>
                <Button color="red" size="sm">
                  Eliminar
                </Button>
              </div>
            ),
          },
        ]}
      />
    </div>
  );
}
