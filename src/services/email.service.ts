import { CONFIG } from "@/config/config";
import type { Response, ResponseEmail } from "@/interface/types";
import axios from "axios";

export class EmailService {
  async getAllEmails(): Promise<Response<ResponseEmail[]>> {
    const res = await axios.get(`${CONFIG.API_URL}/email`);

    return res.data;
  }
}

export const emailService = new EmailService();
