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

    const resUrlImage = await fileService.uploadFile(urlImage.file);
    const resImages = await Promise.all(
      images.map(async (image) => {
        const res = await fileService.uploadFile(image.file);
        return {
          res,
          alt: image.alt,
        };
      })
    );
    const payload = {
      tite: data.title,
      description: data.description,
      urlImage: {
        url: resUrlImage.url,
        alt: urlImage.alt,
      },
      images: resImages.map(({ res, alt }) => ({ url: res.url, alt })),
      githubUrl: data.githubUrl,
      tecnologies: data.tecnologies,
      details: data.details,
      resume: data.resume,
      objectives: data.objectives,
      learnings: data.learnings,
    };

    const response = await axios.post(`${CONFIG.API_URL}/projects`, payload);
    return response.data;
  }
}

export const proyectsService = new ProyectsService();
