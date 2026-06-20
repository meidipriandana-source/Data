/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface Employee {
  id: number;
  nama: string;
  nip: string;
  gender: 'L' | 'P';
  tempatLahir: string;
  tanggalLahir: string; // DD/MM/YYYY
  usiaTahun: number;
  usiaBulan: number;
  tmtCpns: string; // DD/MM/YYYY
  golongan: string; // e.g. "IV/d", "IV/c", "III/c"
  pangkat: string; // e.g. "Pembina Utama Madya", "Pembina"
  jabatanTerakhir: string;
  rumpunJabatan: string; // "Jabatan Fungsional Tertentu", "Jabatan Struktural", "Jabatan Fungsional Umum/ Pelaksana"
  pendidikanTerakhir: string;
  tingkatPendidikanTerakhir: string; // "S2", "S1", "DIII", "DIV Profesi", "SMA/SLTA", "S2 Profesi"
  unitRuangan: string;
  bidang: string; // "Bidang Pelayanan Medik", "Bidang Pelayanan Keperawatan", "Bidang Pelayanan Penunjang", "Bagian Perencanaan", "Bagian Sekretariat", etc.
  statusKepegawaian: 'Aktif' | 'Cuti' | 'Tugas Belajar' | 'Tidak Aktif Sementara';
  jenisKepegawaian: 'PNS' | 'P3K' | 'BLUD';
  keterangan: string;
}

export type ActiveTab = 'dashboard' | 'directory' | 'pensiun' | 'badge' | 'consultant' | 'about';
