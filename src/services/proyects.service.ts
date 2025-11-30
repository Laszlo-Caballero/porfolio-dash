import { CONFIG } from "../config/config";
import axios from "axios";
import type { Response, ResponseProject } from "../interface/types";
import type { Project } from "@/schema/proyect.shema";
import { fileService } from "./file.service";

export class ProyectsService {
  async getProjects(): Promise<Response<ResponseProject[]>> {
    const response = await axios.get(`${CONFIG.API_URL}/projects`);
    return response.data;
  }

  async createProject(data: Project): Promise<Response<ResponseProject>> {
    const { urlImage, images } = data;

    const [resUrlImage, ...resImages] = await Promise.all([
      fileService.uploadFile(urlImage.file),
      ...images.map(async (image) => {
        const res = await fileService.uploadFile(image.file);
        return {
          res,
          alt: image.alt,
        };
      }),
    ]);

    const payload = {
      title: data.title,
      slug: data.slug,
      description: data.description,
      urlImage: {
        url: resUrlImage.body.url,
        alt: urlImage.alt,
      },
      images: resImages.map(({ res, alt }) => ({ url: res.body.url, alt })),
      githubUrl: data.githubUrl,
      tecnologies: data.tecnologies,
      details: data.details,
      detail: data.detail,
      resume: data.resume,
      objectives: data.objectives,
      learnings: data.learnings,
      outStanding: data.outStanding,
      arquitecture: data.arquitecture,
    };

    const response = await axios.post(`${CONFIG.API_URL}/projects`, payload);
    return response.data;
  }
}

export const proyectsService = new ProyectsService();
