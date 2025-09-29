import { CONFIG } from "@/config/config";
import type { Response, ResponseImage } from "@/interface/types";
import axios from "axios";

export class FileService {
  async uploadFile(file: File): Promise<Response<ResponseImage>> {
    const formData = new FormData();
    formData.append("file", file);
    const res = await axios.post(`${CONFIG.API_URL}/files`, formData);
    return res.data;
  }
}

export const fileService = new FileService();
