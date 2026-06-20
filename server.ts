/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import express from "express";
import path from "path";
import dotenv from "dotenv";
import { GoogleGenAI } from "@google/genai";
import { createServer as createViteServer } from "vite";

// Load environment variables
dotenv.config();

const app = express();
const PORT = 3000;

// Set up JSON body parsing with reasonable size limits
app.use(express.json({ limit: "10mb" }));

// Initialize Gemini client on the server side
let ai: GoogleGenAI | null = null;
function getGeminiClient(): GoogleGenAI {
  if (!ai) {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      throw new Error("GEMINI_API_KEY environment variable is required. Please set it in Settings > Secrets.");
    }
    ai = new GoogleGenAI({
      apiKey,
      httpOptions: {
        headers: {
          "User-Agent": "aistudio-build",
        },
      },
    });
  }
  return ai;
}

// 1. API: Server health check
app.get("/api/health", (req, res) => {
  res.json({ status: "healthy", timestamp: new Date().toISOString() });
});

// 2. API: Gemini AI consultation on employee directory
app.post("/api/gemini", async (req: express.Request, res: express.Response) => {
  try {
    const { prompt, employees } = req.body;
    if (!prompt) {
      res.status(400).json({ error: "Permintaan (prompt) tidak boleh kosong." });
      return;
    }

    const client = getGeminiClient();

    // Prepare system instructions and prompt context
    const response = await client.models.generateContent({
      model: "gemini-3.5-flash",
      contents: [
        {
          text: `Anda adalah "SI-RSUD AI Specialist", asisten kecerdasan buatan super canggih untuk menganalisis data kepegawaian RSUD (Rumah Sakit Umum Daerah).
Anda memiliki akses penuh ke basis data pegawai RSUD berikut dalam format JSON:

${JSON.stringify(employees, null, 2)}

Pedoman Anda:
1. Jawab pertanyaan pengguna secara akurat, taktis, profesional, dan dalam Bahasa Indonesia yang sangat sopan.
2. Gunakan markdown dengan sangat teliti (tabel, poin-poin, tulisan tebal, list, bagan sederhana) agar tampilannya sangat indah dan mudah dibaca oleh Direktur dan HRD Rumah Sakit.
3. Bantu melakukan kalkulasi atau pemfilteran jika diminta, seperti:
   - Menghitung masa pensiun (Rata-rata fungsional umum pensiun umur 58 tahun di PNS Indonesia, fungsional perawat/bidan/dokter ahli madya di umur 60 tahun, dan dokter spesialis utama di umur 65 tahun).
   - Menghitung statistik PNS (Golongan IV, III, dst).
   - Mengelompokkan berdasarkan Unit/Ruangan atau Bidang.
   - Merekomendasikan pelatihan/diklat strategis berdasarkan kompetensi atau bidang mereka.
4. Jika ditanya bagaimana cara mengoptimalkan staf atau analisis kesenjangan kapasitas (gap analysis), berikan rekomendasi berkelas tinggi berskala rumah sakit daerah.`
        },
        { text: prompt }
      ]
    });

    res.json({ text: response.text });
  } catch (error: any) {
    console.error("Gemini API Error:", error);
    // Provide user-friendly errors
    res.status(500).json({ 
      error: error.message || "Gagal menghubungi Gemini AI. Pastikan GEMINI_API_KEY Anda sudah dikonfigurasi dengan benar di Secrets panel." 
    });
  }
});

// Serve Frontend using Vite in Dev or static files in Production
async function initializeVite() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`[SI-RSUD Server] berjalan lancar di http://localhost:${PORT}`);
  });
}

initializeVite().catch((err) => {
  console.error("Gagal memulai server Vite:", err);
});
