import { CONFIG } from "../config/config";
import axios from "axios";
import type { Response, ResponseProject } from "../interface/types";

export class ProyectsService {
  async getProjects(): Promise<Response<ResponseProject[]>> {
    const response = await axios.get(`${CONFIG.API_URL}/projects`);
    return response.data;
  }
}

export const proyectsService = new ProyectsService();
