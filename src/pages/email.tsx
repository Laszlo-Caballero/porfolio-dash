import TableUse from "@/components/table";
import { emailService } from "@/services/email.service";
import { useQuery } from "@tanstack/react-query";
import { Spinner } from "flowbite-react";

export default function Email() {
  const { data, isLoading } = useQuery({
    queryKey: ["projects"],
    queryFn: async () => {
      return emailService.getAllEmails();
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
        <h1>Emails</h1>
      </div>

      <TableUse
        data={data?.body || []}
        columns={[
          {
            header: "Nombre",
            accessorKey: "name",
          },
          {
            header: "Email",
            accessorKey: "email",
          },
          {
            header: "Telefono",
            accessorKey: "phone",
          },
          {
            header: "Mensaje",
            accessorKey: "message",
          },
        ]}
      />
    </div>
  );
}
