import { ProjectSchema, type Project } from "@/schema/proyect.shema";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";
import { Badge, Spinner } from "flowbite-react";
import { FaTrash } from "react-icons/fa";
import { proyectsService } from "@/services/proyects.service";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { useNavigate } from "react-router";
import { Checkbox } from "@/components/ui/checkbox";

export default function CreateProyect() {
  const form = useForm({
    resolver: zodResolver(ProjectSchema),
    defaultValues: {
      tecnologies: [],
      images: [],
      objectives: [],
      learnings: [],
    },
  });
  const [tecnologies, setTecnologies] = useState("");
  const [objectives, setObjectives] = useState("");
  const [learnings, setLearnings] = useState("");
  const [keywordInput, setKeywordInput] = useState("");
  const [badgeInput, setBadgeInput] = useState("");
  const [images, setImages] = useState<{
    file: File | null;
    alt: string;
  }>({
    file: null,
    alt: "",
  });

  const navigate = useNavigate();

  const { mutate, isPending } = useMutation({
    mutationFn: (data: Project) => proyectsService.createProject(data),
    onSuccess: () => {
      toast.success("Proyecto creado con éxito");
      navigate("/proyects");
    },
    onError: () => {
      toast.error("Error al crear el proyecto");
    },
  });

  const onSubmit = (data: Project) => {
    mutate(data);
  };

  const arquitecture = form.watch("arquitecture", []);

  console.log(form.watch());
  console.log("errors", form.formState.errors);

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        {isPending && (
          <div className="flex fixed top-0 left-0 h-screen w-full justify-center items-center bg-black/50 z-50">
            <Spinner />
          </div>
        )}
        <h1 className="text-2xl font-bold border-b pb-4">Crear Proyecto</h1>
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Titulo</FormLabel>
              <FormControl>
                <Input placeholder="Titulo del proyecto" {...field} />
              </FormControl>
              <FormDescription>
                El titulo debe ser conciso y descriptivo.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex items-center w-full gap-2">
          <FormField
            control={form.control}
            name="slug"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Slug</FormLabel>
                <FormControl>
                  <Input placeholder="Slug del proyecto" {...field} />
                </FormControl>
                <FormDescription>
                  El slug es una versión amigable del título para URLs (sin
                  espacios, todo en minúsculas, separado por guiones).
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="outStanding"
            render={({ field }) => (
              <FormItem className="flex items-center">
                <FormControl>
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={(checked) => field.onChange(checked)}
                  />
                </FormControl>
                <FormLabel>Destacado</FormLabel>
              </FormItem>
            )}
          />
        </div>

        <div className="flex flex-col w-full gap-y-4">
          <FormField
            control={form.control}
            name="keywords"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Keywords</FormLabel>
                <FormControl>
                  <div className="flex gap-x-2">
                    {" "}
                    <Input
                      placeholder="Keywords del proyecto"
                      onChange={(e) => setKeywordInput(e.target.value)}
                      value={keywordInput}
                    />
                    <Button
                      type="button"
                      onClick={() => {
                        if (keywordInput) {
                          field.onChange([...field.value, keywordInput]);
                          setKeywordInput("");
                        }
                      }}
                    >
                      Agregar
                    </Button>
                  </div>
                </FormControl>
                <FormDescription>
                  Proporcione las keywords del proyecto.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          {form.watch("keywords").length > 0 && (
            <div className="flex flex-wrap gap-2">
              {form.watch("keywords").map((obj, index) => (
                <Badge
                  className="flex items-center gap-x-4 justify-center"
                  color="info"
                  key={index}
                >
                  {obj}
                  <button
                    type="button"
                    className="hover:text-red-500 cursor-pointer ml-2"
                    onClick={() => {
                      const newTechs = form
                        .watch("keywords")
                        .filter((_, idx) => idx !== index);
                      form.setValue("keywords", newTechs);
                    }}
                  >
                    <FaTrash />
                  </button>
                </Badge>
              ))}
            </div>
          )}
        </div>

        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Descripción</FormLabel>
              <FormControl>
                <Textarea placeholder="Descripción del proyecto" {...field} />
              </FormControl>
              <FormDescription>
                La descripción debe ser detallada y clara.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="detail"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Detalle Card</FormLabel>
              <FormControl>
                <Textarea placeholder="Detalle corto del proyecto" {...field} />
              </FormControl>
              <FormDescription>
                La descripción debe ser detallada y clara.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex gap-x-2">
          <div className="flex flex-col w-full gap-y-4">
            <FormField
              control={form.control}
              name="urlImage.file"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Imagen de URL</FormLabel>
                  <FormControl>
                    <Input
                      type="file"
                      placeholder="URL de la imagen"
                      onChange={(e) => {
                        const file = e.target.files?.[0];

                        if (file) {
                          field.onChange(file);
                        }
                      }}
                    />
                  </FormControl>
                  <FormDescription>
                    Proporcione la URL de la imagen del proyecto.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="urlImage.alt"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Texto Alternativo</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Texto alternativo de la imagen"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    Proporcione un texto alternativo para la imagen.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          {form.watch("urlImage.file") ? (
            <img
              src={URL.createObjectURL(form.watch("urlImage.file"))}
              alt="Preview"
              className="size-32 object-cover rounded-md border"
            />
          ) : (
            <div className="size-32 rounded-md border bg-gray-200">
              Sin imagen
            </div>
          )}
        </div>

        <FormField
          control={form.control}
          name="githubUrl"
          render={({ field }) => (
            <FormItem>
              <FormLabel>URL de GitHub</FormLabel>
              <FormControl>
                <Input placeholder="URL de GitHub" {...field} />
              </FormControl>
              <FormDescription>
                Proporcione la URL del repositorio de GitHub.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="githubBackendUrl"
          render={({ field }) => (
            <FormItem>
              <FormLabel>URL de GitHub Backend</FormLabel>
              <FormControl>
                <Input placeholder="URL de GitHub Backend" {...field} />
              </FormControl>
              <FormDescription>
                Proporcione la URL del repositorio de GitHub Backend.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex flex-col w-full gap-y-4">
          <FormField
            control={form.control}
            name="tecnologies"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Tecnologías</FormLabel>
                <FormControl>
                  <div className="flex gap-x-2">
                    {" "}
                    <Input
                      placeholder="Tecnologías utilizadas"
                      onChange={(e) => setTecnologies(e.target.value)}
                      value={tecnologies}
                    />
                    <Button
                      type="button"
                      onClick={() => {
                        if (tecnologies) {
                          field.onChange([...field.value, tecnologies]);
                          setTecnologies("");
                        }
                      }}
                    >
                      Agregar
                    </Button>
                  </div>
                </FormControl>
                <FormDescription>
                  Proporcione las tecnologías utilizadas en el proyecto.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          {form.watch("tecnologies").length > 0 && (
            <div className="flex flex-wrap gap-2">
              {form.watch("tecnologies").map((tech, i) => (
                <Badge
                  className="flex items-center gap-x-4 justify-center"
                  color="info"
                  key={i}
                >
                  {tech}

                  <button
                    type="button"
                    className="hover:text-red-500 cursor-pointer ml-2"
                    onClick={() => {
                      const newTechs = form
                        .watch("tecnologies")
                        .filter((_, idx) => idx !== i);
                      form.setValue("tecnologies", newTechs);
                    }}
                  >
                    <FaTrash />
                  </button>
                </Badge>
              ))}
            </div>
          )}
        </div>

        <div className="flex flex-col w-full gap-y-4">
          <h2 className="text-xl font-bold border-b pb-2">
            Detalles del Proyecto
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="details.role"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Rol</FormLabel>
                  <FormControl>
                    <Input placeholder="Rol en el proyecto" {...field} />
                  </FormControl>
                  <FormDescription>
                    Describa su rol en el proyecto.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="details.time"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Tiempo dedicado</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Tiempo dedicado al proyecto"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    Indique el tiempo que dedicó al proyecto.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="details.team"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Equipo</FormLabel>
                  <FormControl>
                    <Input placeholder="Equipo del proyecto" {...field} />
                  </FormControl>
                  <FormDescription>
                    Indique el equipo del proyecto.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="details.status"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Estado</FormLabel>
                  <FormControl>
                    <Input placeholder="Estado del proyecto" {...field} />
                  </FormControl>
                  <FormDescription>
                    Indique el estado del proyecto
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>

        <FormField
          control={form.control}
          name="resume"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Resumen</FormLabel>
              <FormControl>
                <Textarea placeholder="Resumen del proyecto" {...field} />
              </FormControl>
              <FormDescription>
                Proporcione un resumen del proyecto.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex flex-col w-full gap-y-4">
          <FormField
            control={form.control}
            name="objectives"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Objetivos</FormLabel>
                <FormControl>
                  <div className="flex gap-x-2">
                    {" "}
                    <Input
                      placeholder="Objetivos del proyecto"
                      onChange={(e) => setObjectives(e.target.value)}
                      value={objectives}
                    />
                    <Button
                      type="button"
                      onClick={() => {
                        if (objectives) {
                          field.onChange([...field.value, objectives]);
                          setObjectives("");
                        }
                      }}
                    >
                      Agregar
                    </Button>
                  </div>
                </FormControl>
                <FormDescription>
                  Proporcione los objetivos del proyecto.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          {form.watch("objectives").length > 0 && (
            <div className="flex flex-wrap gap-2">
              {form.watch("objectives").map((obj, index) => (
                <Badge
                  className="flex items-center gap-x-4 justify-center"
                  color="info"
                  key={index}
                >
                  {obj}
                  <button
                    type="button"
                    className="hover:text-red-500 cursor-pointer ml-2"
                    onClick={() => {
                      const newTechs = form
                        .watch("objectives")
                        .filter((_, idx) => idx !== index);
                      form.setValue("objectives", newTechs);
                    }}
                  >
                    <FaTrash />
                  </button>
                </Badge>
              ))}
            </div>
          )}
        </div>

        <div className="flex flex-col w-full gap-y-4">
          <FormField
            control={form.control}
            name="learnings"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Aprendizajes</FormLabel>
                <FormControl>
                  <div className="flex gap-x-2">
                    {" "}
                    <Input
                      placeholder="Aprendizajes del proyecto"
                      onChange={(e) => setLearnings(e.target.value)}
                      value={learnings}
                    />
                    <Button
                      type="button"
                      onClick={() => {
                        if (learnings) {
                          field.onChange([...field.value, learnings]);
                          setLearnings("");
                        }
                      }}
                    >
                      Agregar
                    </Button>
                  </div>
                </FormControl>
                <FormDescription>
                  Proporcione los aprendizajes del proyecto.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          {form.watch("learnings").length > 0 && (
            <div className="flex flex-wrap gap-2">
              {form.watch("learnings").map((obj, index) => (
                <Badge
                  className="flex items-center gap-x-4 justify-center"
                  color="info"
                  key={index}
                >
                  {obj}
                  <button
                    type="button"
                    className="hover:text-red-500 cursor-pointer ml-2"
                    onClick={() => {
                      const newTechs = form
                        .watch("learnings")
                        .filter((_, idx) => idx !== index);
                      form.setValue("learnings", newTechs);
                    }}
                  >
                    <FaTrash />
                  </button>
                </Badge>
              ))}
            </div>
          )}
        </div>

        <div className="flex flex-col w-full gap-y-4">
          <span className="flex items-center w-full gap-2">
            <div className="w-full">
              <h2 className="text-xl font-bold border-b pb-2">
                Arquitectura del Proyecto
              </h2>
              <p className="text-gray-600 text-sm">
                Agrega al menos dos secciones para describir la arquitectura del
              </p>
            </div>

            <Button
              type="button"
              onClick={() => {
                const arquitecture = form.getValues("arquitecture") || [];
                form.setValue("arquitecture", [
                  ...arquitecture,
                  {
                    title: "",
                    badges: [],
                    detail: [],
                  },
                ]);
              }}
            >
              Agregar Sección de Arquitectura
            </Button>
          </span>

          {arquitecture.map((_, index) => (
            <div className="grid grid-cols-2 gap-2">
              <h1 className="col-span-2 text-xl font-semibold">
                Sección {index + 1} de {arquitecture.length}
              </h1>

              <FormField
                control={form.control}
                name={`arquitecture.${index}.title`}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Título de la Sección</FormLabel>
                    <FormControl>
                      <Input placeholder="Título" {...field} />
                    </FormControl>
                    <FormDescription>
                      Proporcione el título de la sección de arquitectura.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="flex flex-col w-full gap-y-4">
                <FormField
                  control={form.control}
                  name={`arquitecture.${index}.badges`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Badges</FormLabel>
                      <FormControl>
                        <div className="flex gap-x-2">
                          {" "}
                          <Input
                            placeholder="Badges del proyecto"
                            onChange={(e) => setBadgeInput(e.target.value)}
                            value={badgeInput}
                          />
                          <Button
                            type="button"
                            onClick={() => {
                              if (badgeInput) {
                                field.onChange([
                                  ...(field.value || []),
                                  badgeInput,
                                ]);
                                setBadgeInput("");
                              }
                            }}
                          >
                            Agregar
                          </Button>
                        </div>
                      </FormControl>
                      <FormDescription>
                        Proporcione los badges del proyecto.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {(form.watch(`arquitecture.${index}.badges`, []) || []).length >
                  0 && (
                  <div className="flex flex-wrap gap-2">
                    {(form.watch(`arquitecture.${index}.badges`, []) || []).map(
                      (obj, index) => (
                        <Badge
                          className="flex items-center gap-x-4 justify-center"
                          color="info"
                          key={index}
                        >
                          {obj}
                          <button
                            type="button"
                            className="hover:text-red-500 cursor-pointer ml-2"
                            onClick={() => {
                              const newTechs = (
                                form.watch(
                                  `arquitecture.${index}.badges`,
                                  []
                                ) as string[]
                              ).filter((_, idx) => idx !== index);
                              form.setValue(
                                `arquitecture.${index}.badges`,
                                newTechs
                              );
                            }}
                          >
                            <FaTrash />
                          </button>
                        </Badge>
                      )
                    )}
                  </div>
                )}
              </div>

              <div className="flex flex-col w-full gap-y-4">
                <div className="flex items-center gap-2">
                  <h1 className="text-xl font-semibold">
                    Agregar detalle clave - valor en la sección de arquitectura
                  </h1>
                  <Button
                    onClick={() => {
                      const details =
                        form.getValues(`arquitecture.${index}.detail`) || [];
                      form.setValue(`arquitecture.${index}.detail`, [
                        ...details,
                        {
                          key: "",
                          value: "",
                        },
                      ]);
                    }}
                    type="button"
                  >
                    Agregar Detalle
                  </Button>
                </div>

                {(form.watch(`arquitecture.${index}.detail`) || []).map(
                  (_, detailIndex) => (
                    <div className="flex items-center gap-2">
                      <FormField
                        control={form.control}
                        name={`arquitecture.${index}.detail.${detailIndex}.key`}
                        render={({ field }) => (
                          <FormItem className="w-full">
                            <FormLabel>Clave</FormLabel>
                            <FormControl>
                              <Input placeholder="Clave" {...field} />
                            </FormControl>
                            <FormDescription>
                              Proporcione la clave del detalle.
                            </FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name={`arquitecture.${index}.detail.${detailIndex}.value`}
                        render={({ field }) => (
                          <FormItem className="w-full">
                            <FormLabel>Valor</FormLabel>
                            <FormControl>
                              <Input placeholder="Valor" {...field} />
                            </FormControl>
                            <FormDescription>
                              Proporcione el valor del detalle.
                            </FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  )
                )}
              </div>

              <div>
                <FormField
                  control={form.control}
                  name={`arquitecture.${index}.colSpan`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>ColSpan</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="ColSpan"
                          type="number"
                          {...field}
                          onChange={(e) => {
                            const value = parseInt(e.target.value, 10);
                            field.onChange(isNaN(value) ? 1 : value);
                          }}
                        />
                      </FormControl>
                      <FormDescription>
                        Proporcione el colSpan de la sección de arquitectura.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>
          ))}
        </div>

        <div className="flex flex-col w-full gap-y-4">
          <div className="flex gap-x-2">
            <div className="flex flex-col w-full gap-y-4">
              <FormField
                control={form.control}
                name="images"
                render={() => (
                  <FormItem>
                    <FormLabel>Imagen de URL</FormLabel>
                    <FormControl>
                      <Input
                        type="file"
                        placeholder="URL de la imagen"
                        onChange={(e) => {
                          const file = e.target.files?.[0];
                          if (file) {
                            setImages({ ...images, file });
                          }
                        }}
                      />
                    </FormControl>
                    <FormDescription>
                      Proporcione la URL de la imagen del proyecto.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="images"
                render={() => (
                  <FormItem>
                    <FormLabel>Texto Alternativo</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Texto alternativo de la imagen"
                        value={images.alt}
                        onChange={(e) =>
                          setImages({ ...images, alt: e.target.value })
                        }
                      />
                    </FormControl>
                    <FormDescription>
                      Proporcione un texto alternativo para la imagen.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {images.file ? (
              <div>
                <img
                  src={URL.createObjectURL(images.file!)}
                  alt="Preview"
                  className="size-32 object-cover rounded-md border"
                />

                <Button
                  type="button"
                  onClick={() => {
                    form.setValue("images", [
                      ...form.getValues("images"),
                      {
                        file: images.file!,
                        alt: images.alt,
                      },
                    ]);
                    setImages({ file: null, alt: "" });
                  }}
                >
                  Agregar Imagen
                </Button>
              </div>
            ) : (
              <div className="size-32 rounded-md border bg-gray-200">
                Sin imagen
              </div>
            )}
          </div>

          <div className="flex flex-wrap gap-2">
            {form.watch("images").map((image, index) => (
              <div key={index}>
                <img
                  src={URL.createObjectURL(image.file)}
                  alt={image.alt}
                  className="size-32 object-cover rounded-md border"
                />
                <p>{image.alt}</p>

                <Button
                  variant="destructive"
                  className="w-full"
                  type="button"
                  onClick={() => {
                    const newImages = form
                      .watch("images")
                      .filter((_, idx) => idx !== index);
                    form.setValue("images", newImages);
                  }}
                >
                  <FaTrash />
                </Button>
              </div>
            ))}
          </div>
        </div>

        <Button type="submit">Crear Proyecto</Button>
      </form>
    </Form>
  );
}
