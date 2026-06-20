/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useMemo } from 'react';
import { 
  Users, 
  UserCheck, 
  CalendarClock, 
  Clock,
  IdCard, 
  BrainCircuit, 
  Search, 
  Plus, 
  Edit, 
  Trash2, 
  Filter, 
  Sparkles, 
  Download, 
  RefreshCw, 
  UserPlus, 
  ChevronLeft, 
  ChevronRight, 
  FileSpreadsheet, 
  Printer, 
  CheckCircle,
  HelpCircle,
  AlertCircle,
  AlertTriangle,
  Hash,
  Activity,
  Award,
  LogOut,
  Sliders,
  ChevronDown,
  Folder,
  FolderOpen,
  Folders,
  Upload,
  Inbox,
  KeyRound,
  FileText,
  Copy,
  Check
} from 'lucide-react';
import * as XLSX from 'xlsx';
import { motion, AnimatePresence, useMotionValue, useTransform, useSpring } from 'motion/react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer, 
  PieChart, 
  Pie, 
  Cell 
} from 'recharts';
import { Employee, ActiveTab } from './types';
import { INITIAL_EMPLOYEES } from './data';
import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';

const MOCK_P3K_BLUD_ITEMS: Employee[] = [
  {
    id: 101,
    nama: "Ns. Heri Siswanto, S.Kep.",
    nip: "198504122023211003",
    gender: "L",
    tempatLahir: "Surabaya",
    tanggalLahir: "12/04/1985",
    usiaTahun: 41,
    usiaBulan: 2,
    tmtCpns: "01/06/2023",
    golongan: "IX",
    pangkat: "Penata Muda",
    jabatanTerakhir: "Perawat Ahli Pertama (PPPK)",
    rumpunJabatan: "Jabatan Fungsional Tertentu",
    pendidikanTerakhir: "Keperawatan Ners",
    tingkatPendidikanTerakhir: "S1 Profesi",
    unitRuangan: "Ruangan ICU",
    bidang: "Bidang Pelayanan Keperawatan",
    statusKepegawaian: "Aktif",
    jenisKepegawaian: "P3K",
    keterangan: "Diterima Seleksi PPPK Kesehatan 2023"
  },
  {
    id: 102,
    nama: "drg. Silvia Anggraeni",
    nip: "199008242022212015",
    gender: "P",
    tempatLahir: "Malang",
    tanggalLahir: "24/08/1990",
    usiaTahun: 35,
    usiaBulan: 9,
    tmtCpns: "01/01/2022",
    golongan: "X",
    pangkat: "Penata Muda",
    jabatanTerakhir: "Dokter Gigi Ahli Pertama (PPPK)",
    rumpunJabatan: "Jabatan Fungsional Tertentu",
    pendidikanTerakhir: "Pendidikan Dokter Gigi",
    tingkatPendidikanTerakhir: "S2",
    unitRuangan: "Klinik Gigi & Mulut",
    bidang: "Bidang Pelayanan Medik",
    statusKepegawaian: "Aktif",
    jenisKepegawaian: "P3K",
    keterangan: "-"
  },
  {
    id: 103,
    nama: "Ahmad Fauzi, A.Md.Kep.",
    nip: "199405022023211001",
    gender: "L",
    tempatLahir: "Tarakan",
    tanggalLahir: "02/05/1994",
    usiaTahun: 32,
    usiaBulan: 1,
    tmtCpns: "01/06/2023",
    golongan: "VII",
    pangkat: "Pengatur",
    jabatanTerakhir: "Perawat Terampil (PPPK)",
    rumpunJabatan: "Jabatan Fungsional Tertentu",
    pendidikanTerakhir: "DIII Keperawatan",
    tingkatPendidikanTerakhir: "DIII",
    unitRuangan: "Instalasi Gawat Darurat (IGD)",
    bidang: "Bidang Pelayanan Keperawatan",
    statusKepegawaian: "Aktif",
    jenisKepegawaian: "P3K",
    keterangan: "-"
  },
  {
    id: 104,
    nama: "Siti Rahmah, S.Kep.",
    nip: "BLUD-202104005",
    gender: "P",
    tempatLahir: "Samarinda",
    tanggalLahir: "15/10/1995",
    usiaTahun: 30,
    usiaBulan: 8,
    tmtCpns: "15/04/2021",
    golongan: "Non-ASN",
    pangkat: "Staff BLUD",
    jabatanTerakhir: "Perawat Klinik (BLUD)",
    rumpunJabatan: "Jabatan Fungsional Umum/ Pelaksana",
    pendidikanTerakhir: "S1 Keperawatan",
    tingkatPendidikanTerakhir: "S1",
    unitRuangan: "Ruangan Mawar",
    bidang: "Bidang Pelayanan Keperawatan",
    statusKepegawaian: "Aktif",
    jenisKepegawaian: "BLUD",
    keterangan: "Kontrak BLUD Mandiri RSUD"
  },
  {
    id: 105,
    nama: "dr. Hendra Setiawan",
    nip: "BLUD-202011002",
    gender: "L",
    tempatLahir: "Yogyakarta",
    tanggalLahir: "12/12/1993",
    usiaTahun: 32,
    usiaBulan: 6,
    tmtCpns: "01/11/2020",
    golongan: "Non-ASN",
    pangkat: "Dokter BLUD",
    jabatanTerakhir: "Dokter Jaga IGD (BLUD)",
    rumpunJabatan: "Jabatan Fungsional Tertentu",
    pendidikanTerakhir: "Profesi Dokter",
    tingkatPendidikanTerakhir: "S2",
    unitRuangan: "Instalasi Gawat Darurat (IGD)",
    bidang: "Bidang Pelayanan Medik",
    statusKepegawaian: "Aktif",
    jenisKepegawaian: "BLUD",
    keterangan: "-"
  },
  {
    id: 106,
    nama: "Pratiwi Santoso, A.Md.A.K.",
    nip: "BLUD-201908012",
    gender: "P",
    tempatLahir: "Tarakan",
    tanggalLahir: "08/04/1997",
    usiaTahun: 29,
    usiaBulan: 2,
    tmtCpns: "12/08/2019",
    golongan: "Non-ASN",
    pangkat: "Analis BLUD",
    jabatanTerakhir: "Pranata Laboratorium Kesehatan",
    rumpunJabatan: "Jabatan Fungsional Tertentu",
    pendidikanTerakhir: "DIII Analis Kesehatan",
    tingkatPendidikanTerakhir: "DIII",
    unitRuangan: "Instalasi Laboratorium",
    bidang: "Bidang Pelayanan Penunjang",
    statusKepegawaian: "Aktif",
    jenisKepegawaian: "BLUD",
    keterangan: "-"
  }
];

const exportIdCardToPdf = async (elementId: string, filename: string) => {
  const element = document.getElementById(elementId);
  if (!element) return;
  
  try {
    const canvas = await html2canvas(element, {
      scale: 3,
      useCORS: true,
      backgroundColor: null,
      logging: false,
    });
    
    const imgData = canvas.toDataURL('image/png');
    const imgWidth = canvas.width;
    const imgHeight = canvas.height;
    
    const mmWidth = 85.6;
    const mmHeight = (imgHeight / imgWidth) * mmWidth;
    
    const pdf = new jsPDF({
      orientation: 'portrait',
      unit: 'mm',
      format: [mmWidth, mmHeight]
    });
    
    pdf.addImage(imgData, 'PNG', 0, 0, mmWidth, mmHeight);
    pdf.save(filename);
  } catch (error) {
    console.error("Failed to export PDF:", error);
  }
};

const printIdCard = async (elementId: string) => {
  const element = document.getElementById(elementId);
  if (!element) return;
  
  try {
    const canvas = await html2canvas(element, {
      scale: 3,
      useCORS: true,
      backgroundColor: null,
      logging: false,
    });
    
    const imgData = canvas.toDataURL('image/png');
    
    const iframe = document.createElement('iframe');
    iframe.style.position = 'fixed';
    iframe.style.right = '0';
    iframe.style.bottom = '0';
    iframe.style.width = '0';
    iframe.style.height = '0';
    iframe.style.border = '0';
    document.body.appendChild(iframe);
    
    const doc = iframe.contentWindow?.document || iframe.contentDocument;
    if (!doc) return;
    
    doc.open();
    doc.write(`
      <html>
        <head>
          <title>Cetak ID Card</title>
          <style>
            @page {
              size: auto;
              margin: 0;
            }
            body {
              margin: 0;
              display: flex;
              align-items: center;
              justify-content: center;
              height: 100vh;
              background-color: white;
            }
            img {
              max-width: 100%;
              max-height: 100%;
              object-fit: contain;
            }
          </style>
        </head>
        <body>
          <img src="\${imgData}" onload="window.print()" />
          <script>
            window.onafterprint = function() {
              window.parent.document.body.removeChild(window.frameElement);
            }
          </script>
        </body>
      </html>
    `);
    doc.close();
  } catch (err) {
    console.error("Print failed:", err);
    window.print();
  }
};

const DEFAULT_CERTS: { [id: number]: string } = {
  1: "Sertifikasi Kompetensi Spesialis Oftalmologi",
  2: "Sertifikasi Kursus FESS (Endoskopi Sinus)",
  3: "Pelatihan USG Obstetri Ginekologi Madya",
  5: "Sertifikasi Asesor Kompetensi Keperawatan Jantung",
  8: "Pelatihan Akreditasi Rumah Sakit & Case Manager",
  9: "Sertifikasi Keperawatan Gawat Darurat (BTCLS)",
  12: "Sertifikasi Pemimpin Redaksi Jurnal Kesehatan",
  15: "Pelatihan Pencegahan Pengendalian Infeksi (PPI) RS",
  18: "Sertifikasi Advanced Cardiac Life Support (ACLS)",
  21: "Pelatihan Triase Bencana & Manajemen IGD",
  24: "Sertifikasi Terapi Hemodialisis Ginjal Level 1",
  27: "Pelatihan ICU Komprehensif Dokter Jaga",
  31: "Sertifikasi Penanganan Kemoterapi Onkologi",
  101: "Sertifikasi Kompetensi Keperawatan ICU Dasar",
  104: "Pelatihan Resusitasi Jantung Paru (RJP)",
  105: "Sertifikasi ACLS PERKI Kalimantan Utara 2024",
};

const AUGMENTED_DEFAULT_EMPLOYEES: Employee[] = [
  ...INITIAL_EMPLOYEES.map(emp => ({
    ...emp,
    jenisKepegawaian: 'PNS' as const,
    keterangan: DEFAULT_CERTS[emp.id] || emp.keterangan || '-'
  })),
  ...MOCK_P3K_BLUD_ITEMS.map(emp => ({
    ...emp,
    keterangan: DEFAULT_CERTS[emp.id] || emp.keterangan || '-'
  }))
];

export default function App() {
  // --- STATE ---
  // --- 3D ID Card Tilt Motion State ---
  const idCardX = useMotionValue(0.5);
  const idCardY = useMotionValue(0.5);

  const idCardRotateX = useSpring(
    useTransform(idCardY, (v) => (v - 0.5) * -24),
    { stiffness: 120, damping: 18 }
  );
  const idCardRotateY = useSpring(
    useTransform(idCardX, (v) => (v - 0.5) * 24),
    { stiffness: 120, damping: 18 }
  );

  const idCardGlareBg = useTransform(
    [idCardX, idCardY],
    (values) => {
      const [cx, cy] = values as [number, number];
      return `radial-gradient(circle at ${cx * 100}% ${cy * 100}%, rgba(255, 255, 255, 0.25) 0%, rgba(255, 255, 255, 0) 60%)`;
    }
  );

  const handleIdCardMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    
    idCardX.set(mouseX / width);
    idCardY.set(mouseY / height);
  };

  const handleIdCardMouseLeave = () => {
    idCardX.set(0.5);
    idCardY.set(0.5);
  };

  const [currentTime, setCurrentTime] = useState<Date>(new Date());
  
  // Interactive Calendar State (Birthday & TMT)
  const [calendarMonth, setCalendarMonth] = useState<number>(new Date().getMonth());
  const [calendarYear, setCalendarYear] = useState<number>(new Date().getFullYear());
  const [selectedCalendarDay, setSelectedCalendarDay] = useState<number | null>(new Date().getDate());

  const parseDateParts = (dateStr: string) => {
    if (!dateStr || typeof dateStr !== 'string') return null;
    const parts = dateStr.split('/');
    if (parts.length !== 3) return null;
    const day = parseInt(parts[0], 10);
    const month = parseInt(parts[1], 10) - 1; // 0-indexed month
    const year = parseInt(parts[2], 10);
    if (isNaN(day) || isNaN(month) || isNaN(year)) return null;
    return { day, month, year };
  };

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatIndonesianDateTime = (date: Date) => {
    const days = ['Minggu', 'Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu'];
    const months = [
      'Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni', 
      'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'
    ];
    
    const dayName = days[date.getDay()];
    const day = date.getDate();
    const monthName = months[date.getMonth()];
    const year = date.getFullYear();
    
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const seconds = String(date.getSeconds()).padStart(2, '0');
    
    return {
      dateString: `${dayName}, ${day} ${monthName} ${year}`,
      timeString: `${hours}:${minutes}:${seconds}`
    };
  };

  const formattedTime = formatIndonesianDateTime(currentTime);

  const [employees, setEmployees] = useState<Employee[]>(() => {
    const saved = localStorage.getItem('rsud_employees');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        return parsed.map((e: any) => ({
          ...e,
          jenisKepegawaian: e.jenisKepegawaian || 'PNS'
        })) as Employee[];
      } catch (e) {
        console.error("Gagal memuat dari localStorage, menggunakan data awal.");
      }
    }
    return AUGMENTED_DEFAULT_EMPLOYEES;
  });

  const [activeTab, setActiveTab] = useState<ActiveTab>('dashboard');
  const [searchTerm, setSearchTerm] = useState('');
  const [pensionSearchTerm, setPensionSearchTerm] = useState('');
  const [certSearchTerm, setCertSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  // Multi-Filter State
  const [selectedFolderType, setSelectedFolderType] = useState<'ALL' | 'PNS' | 'P3K' | 'BLUD'>('ALL');
  const [filterGender, setFilterGender] = useState<string>('ALL');
  const [filterGolongan, setFilterGolongan] = useState<string>('ALL');
  const [filterRumpun, setFilterRumpun] = useState<string>('ALL');
  const [filterBidang, setFilterBidang] = useState<string>('ALL');
  const [filterStatus, setFilterStatus] = useState<string>('ALL');

  // Selected Employee (for detailed Profile card & badge drawer)
  const [selectedEmpId, setSelectedEmpId] = useState<number | null>(employees[0]?.id || null);

  // UI Modal/Form States
  const [isAdding, setIsAdding] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [checkedEmpIds, setCheckedEmpIds] = useState<number[]>([]);
  const [excelUploadTargetType, setExcelUploadTargetType] = useState<'AUTO' | 'PNS' | 'P3K' | 'BLUD'>('AUTO');

  // Excel Import States
  const [isExcelModalOpen, setIsExcelModalOpen] = useState(false);
  const [previewEmployees, setPreviewEmployees] = useState<Employee[]>([]);
  const [excelFileName, setExcelFileName] = useState('');
  const [excelParseError, setExcelParseError] = useState<string | null>(null);

  // Custom Confirmation Modal State for iframe-safe prompts
  const [confirmModal, setConfirmModal] = useState<{
    isOpen: boolean;
    title: string;
    description: string;
    onConfirm: () => void;
    variant: 'danger' | 'warning' | 'info';
  }>({
    isOpen: false,
    title: '',
    description: '',
    onConfirm: () => {},
    variant: 'info'
  });

  // New Employee Form State
  const [newEmp, setNewEmp] = useState<Partial<Employee>>({
    nama: '',
    nip: '',
    gender: 'L',
    tempatLahir: '',
    tanggalLahir: '',
    usiaTahun: 40,
    usiaBulan: 0,
    tmtCpns: '',
    golongan: 'III/c',
    pangkat: 'Penata',
    jabatanTerakhir: 'Perawat Ahli Pertama',
    rumpunJabatan: 'Jabatan Fungsional Tertentu',
    pendidikanTerakhir: 'Keperawatan Ners',
    tingkatPendidikanTerakhir: 'S1 Profesi',
    unitRuangan: 'Instalasi Gawat Darurat (IGD)',
    bidang: 'Bidang Pelayanan Keperawatan',
    statusKepegawaian: 'Aktif',
    jenisKepegawaian: 'PNS',
    keterangan: '-'
  });

  // Edit Employee Form State
  const [editEmpState, setEditEmpState] = useState<Partial<Employee>>({});

  // AI Assistant States
  const [aiQuery, setAiQuery] = useState('');
  const [aiResponse, setAiResponse] = useState('');
  const [aiLoading, setAiLoading] = useState(false);
  const [aiError, setAiResponseError] = useState('');
  const [isAiConfigured, setIsAiConfigured] = useState<boolean | null>(null);
  const [selectedLetterEmpId, setSelectedLetterEmpId] = useState<string>('');
  const [letterType, setLetterType] = useState<'SK' | 'Tugas' | 'Peringatan'>('SK');
  const [letterContext, setLetterContext] = useState('');
  const [isCopied, setIsCopied] = useState(false);
  const [suggestedPrompts] = useState([
    "Daftarkan 3 dokter spesialis anak di rumah sakit ini beserta NIP mereka.",
    "Analisis statistik pensiun PNS: berapa banyak yang pensiun dalam 2 tahun ke depan jika usia pensiun staff non-medik adalah 58 tahun dan dokter 60 tahun?",
    "Berikan analisis beban kerja untuk Bidang Pelayanan Keperawatan dan kebutuhan diklat pengembangan staf penata madya.",
    "Tampilkan tabel ringkasan perbandingan rumpun jabatan struktural vs rumpun fungsional tertentu."
  ]);

  // Alert State for actions
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'info' | 'error' } | null>(null);

  // --- GEMINI STATUS CHECKER ---
  useEffect(() => {
    fetch("/api/gemini/status")
      .then(res => res.json())
      .then(data => {
        setIsAiConfigured(!!data.configured);
      })
      .catch(err => {
        console.error("Gagal memeriksa status AI:", err);
        setIsAiConfigured(false);
      });
  }, []);

  // --- PERSISTENCE ---
  useEffect(() => {
    localStorage.setItem('rsud_employees', JSON.stringify(employees));
  }, [employees]);

  // Toast auto-clear
  useEffect(() => {
    if (toast) {
      const timer = setTimeout(() => {
        setToast(null);
      }, 4000);
      return () => clearTimeout(timer);
    }
  }, [toast]);

  const showToast = (message: string, type: 'success' | 'info' | 'error' = 'success') => {
    setToast({ message, type });
  };

  // --- LOGIC CALCULATIONS & DYNAMIC MEMOIZATION ---
  const selectedEmployee = useMemo(() => {
    return employees.find(e => e.id === selectedEmpId) || null;
  }, [employees, selectedEmpId]);

  // Derived filter options for dropdowns
  const uniqueGolongans = useMemo(() => {
    return Array.from(new Set(employees.map(e => e.golongan))).sort();
  }, [employees]);

  const uniqueRumpuns = useMemo(() => {
    return Array.from(new Set(employees.map(e => e.rumpunJabatan))).sort();
  }, [employees]);

  const uniqueBidangs = useMemo(() => {
    return Array.from(new Set(employees.map(e => e.bidang))).sort();
  }, [employees]);

  // Filtering Logic
  const filteredEmployees = useMemo(() => {
    return employees.filter(emp => {
      const matchSearch = 
        emp.nama.toLowerCase().includes(searchTerm.toLowerCase()) || 
        emp.nip.includes(searchTerm) ||
        emp.jabatanTerakhir.toLowerCase().includes(searchTerm.toLowerCase()) ||
        emp.unitRuangan.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchGender = filterGender === 'ALL' || emp.gender === filterGender;
      const matchGolongan = filterGolongan === 'ALL' || emp.golongan === filterGolongan;
      const matchRumpun = filterRumpun === 'ALL' || emp.rumpunJabatan === filterRumpun;
      const matchBidang = filterBidang === 'ALL' || emp.bidang === filterBidang;
      const matchStatus = filterStatus === 'ALL' || emp.statusKepegawaian === filterStatus;
      
      const empType = emp.jenisKepegawaian || 'PNS';
      const matchFolder = selectedFolderType === 'ALL' || empType === selectedFolderType;

      return matchSearch && matchGender && matchGolongan && matchRumpun && matchBidang && matchStatus && matchFolder;
    });
  }, [employees, searchTerm, filterGender, filterGolongan, filterRumpun, filterBidang, filterStatus, selectedFolderType]);

  // Paginated List
  const paginatedEmployees = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return filteredEmployees.slice(startIndex, startIndex + itemsPerPage);
  }, [filteredEmployees, currentPage]);

  const totalPages = Math.ceil(filteredEmployees.length / itemsPerPage);

  // Reset page when filter changes
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, filterGender, filterGolongan, filterRumpun, filterBidang, filterStatus, selectedFolderType]);

  // Stats Calculations
  const stats = useMemo(() => {
    const total = employees.length;
    const active = employees.filter(e => e.statusKepegawaian === 'Aktif').length;
    const cuti = employees.filter(e => e.statusKepegawaian === 'Cuti').length;
    const tugasBelajar = employees.filter(e => e.statusKepegawaian === 'Tugas Belajar').length;
    
    const countL = employees.filter(e => e.gender === 'L').length;
    const countP = employees.filter(e => e.gender === 'P').length;
    const percentL = total > 0 ? Math.round((countL / total) * 100) : 0;
    const percentP = total > 0 ? Math.round((countP / total) * 100) : 0;

    const totalAge = employees.reduce((sum, e) => sum + e.usiaTahun, 0);
    const avgAge = total > 0 ? Math.round((totalAge / total) * 10) / 10 : 0;

    const countPNS = employees.filter(e => (e.jenisKepegawaian || 'PNS') === 'PNS').length;
    const countP3K = employees.filter(e => e.jenisKepegawaian === 'P3K').length;
    const countBLUD = employees.filter(e => e.jenisKepegawaian === 'BLUD').length;

    return { 
      total, 
      active, 
      cuti, 
      tugasBelajar, 
      countL, 
      countP, 
      percentL, 
      percentP, 
      avgAge, 
      countPNS, 
      countP3K, 
      countBLUD 
    };
  }, [employees]);

  // Absent / Non-active today details (Cuti & Tugas Belajar)
  const absentEmployees = useMemo(() => {
    return employees.filter(e => e.statusKepegawaian === 'Cuti' || e.statusKepegawaian === 'Tugas Belajar');
  }, [employees]);

  // Pension Planning (Age threshold >= 57 in Indonesia civil service PNS approaching pension)
  const pensionEmployees = useMemo(() => {
    return filteredEmployees.map(emp => {
      // Typically retirement age is 58 for admin/non-medis, 60 for nurses/midwives/madya/BLUD, 65 for specialized doctors
      let retirementAge = 58;
      if (emp.jenisKepegawaian === 'BLUD') {
        retirementAge = 60;
      } else {
        const isDoctor = emp.nama.toLowerCase().includes('dr.') || emp.nama.toLowerCase().includes('drg.');
        const isNurseOrMidwife = emp.nama.toLowerCase().includes('ns.') || emp.pendidikanTerakhir.toLowerCase().includes('kebidanan') || emp.pendidikanTerakhir.toLowerCase().includes('keperawatan');
        
        if (isDoctor) {
          retirementAge = emp.golongan.startsWith('IV') ? 65 : 60;
        } else if (isNurseOrMidwife) {
          retirementAge = 60;
        }
      }

      const yearsToRetire = retirementAge - emp.usiaTahun;
      const progressPercent = Math.min(100, Math.max(0, (emp.usiaTahun / retirementAge) * 100));

      return {
        ...emp,
        retirementAge,
        yearsToRetire,
        progressPercent
      };
    }).sort((a, b) => a.yearsToRetire - b.yearsToRetire);
  }, [filteredEmployees]);

  // Approaching pension directly (Remaining years <= 3)
  const criticalRetirements = useMemo(() => {
    return pensionEmployees.filter(e => e.yearsToRetire <= 3 && e.yearsToRetire >= -2);
  }, [pensionEmployees]);

  // Direct search filter for pensions
  const finalPensionEmployees = useMemo(() => {
    if (!pensionSearchTerm.trim()) return pensionEmployees;
    const term = pensionSearchTerm.toLowerCase();
    return pensionEmployees.filter(emp => 
      emp.nama.toLowerCase().includes(term) ||
      emp.nip.includes(term) ||
      emp.jabatanTerakhir.toLowerCase().includes(term) ||
      emp.unitRuangan.toLowerCase().includes(term)
    );
  }, [pensionEmployees, pensionSearchTerm]);

  // Pension stats counting specifically per personnel category
  const pensionStats = useMemo(() => {
    const allRetirements = employees.map(emp => {
      let retirementAge = 58;
      if (emp.jenisKepegawaian === 'BLUD') {
        retirementAge = 60;
      } else {
        const isDoctor = emp.nama.toLowerCase().includes('dr.') || emp.nama.toLowerCase().includes('drg.');
        const isNurseOrMidwife = emp.nama.toLowerCase().includes('ns.') || emp.pendidikanTerakhir.toLowerCase().includes('kebidanan') || emp.pendidikanTerakhir.toLowerCase().includes('keperawatan');
        
        if (isDoctor) {
          retirementAge = emp.golongan.startsWith('IV') ? 65 : 60;
        } else if (isNurseOrMidwife) {
          retirementAge = 60;
        }
      }

      const yearsToRetire = retirementAge - emp.usiaTahun;
      return {
        ...emp,
        yearsToRetire
      };
    });

    const total = allRetirements.filter(e => e.yearsToRetire <= 3 && e.yearsToRetire >= -2).length;
    const countPNS = allRetirements.filter(e => (e.jenisKepegawaian || 'PNS') === 'PNS' && e.yearsToRetire <= 3 && e.yearsToRetire >= -2).length;
    const countP3K = allRetirements.filter(e => e.jenisKepegawaian === 'P3K' && e.yearsToRetire <= 3 && e.yearsToRetire >= -2).length;
    const countBLUD = allRetirements.filter(e => e.jenisKepegawaian === 'BLUD' && e.yearsToRetire <= 3 && e.yearsToRetire >= -2).length;

    return {
      total,
      countPNS,
      countP3K,
      countBLUD
    };
  }, [employees]);

  // --- RECHARTS DATA FORMATTING ---
  const chartAgeData = useMemo(() => {
    const categories = {
      '<35 th': 0,
      '35-44 th': 0,
      '45-54 th (Dewasa)': 0,
      '55-59 th': 0,
      '>60 th': 0,
    };

    employees.forEach(emp => {
      if (emp.usiaTahun < 35) categories['<35 th']++;
      else if (emp.usiaTahun >= 35 && emp.usiaTahun < 45) categories['35-44 th']++;
      else if (emp.usiaTahun >= 45 && emp.usiaTahun < 55) categories['45-54 th (Dewasa)']++;
      else if (emp.usiaTahun >= 55 && emp.usiaTahun < 60) categories['55-59 th']++;
      else categories['>60 th']++;
    });

    return Object.entries(categories).map(([name, count]) => ({ name, jumlah: count }));
  }, [employees]);

  const chartGolonganData = useMemo(() => {
    const groups: { [key: string]: number } = {
      'Golongan IV (Pembina)': 0,
      'Golongan III (Penata)': 0,
      'Golongan II (Pengatur)': 0,
    };

    employees.forEach(e => {
      if (e.golongan.startsWith('IV')) groups['Golongan IV (Pembina)']++;
      else if (e.golongan.startsWith('III')) groups['Golongan III (Penata)']++;
      else if (e.golongan.startsWith('II')) groups['Golongan II (Pengatur)']++;
    });

    return Object.entries(groups).map(([name, value]) => ({ name, value }));
  }, [employees]);

  const chartRumpunData = useMemo(() => {
    const rumpuns: { [key: string]: number } = {};
    employees.forEach(emp => {
      const shortName = emp.rumpunJabatan.replace('Jabatan ', '');
      rumpuns[shortName] = (rumpuns[shortName] || 0) + 1;
    });
    return Object.entries(rumpuns).map(([name, count]) => ({ name, value: count }));
  }, [employees]);

  const certStats = useMemo(() => {
    let withCert = 0;
    employees.forEach(emp => {
      const ket = emp.keterangan ? emp.keterangan.trim() : '';
      const isNotCert = !ket || ket === '-' || ket === '' || ket === 'Cuti Besar' || ket === 'Tugas Belajar' || ket === 'Kontrak BLUD Mandiri RSUD' || ket === 'Diterima Seleksi PPPK Kesehatan 2023';
      if (!isNotCert) {
        withCert++;
      }
    });

    const total = employees.length;
    const withoutCert = total - withCert;
    const percentage = total > 0 ? Math.round((withCert / total) * 100) : 0;

    return { withCert, withoutCert, percentage };
  }, [employees]);

  const certEmployees = useMemo(() => {
    const term = certSearchTerm.toLowerCase().trim();
    return employees
      .map(emp => {
        const ket = emp.keterangan ? emp.keterangan.trim() : '';
        const isNotCert = !ket || ket === '-' || ket === '' || ket === 'Cuti Besar' || ket === 'Tugas Belajar' || ket === 'Kontrak BLUD Mandiri RSUD' || ket === 'Diterima Seleksi PPPK Kesehatan 2023';
        return {
          emp,
          hasCert: !isNotCert,
          certName: !isNotCert ? ket : null
        };
      })
      .filter(item => {
        if (!item.hasCert) return false;
        if (!term) return true;
        return (
          item.emp.nama.toLowerCase().includes(term) ||
          item.certName!.toLowerCase().includes(term) ||
          item.emp.jabatanTerakhir.toLowerCase().includes(term) ||
          item.emp.unitRuangan.toLowerCase().includes(term)
        );
      });
  }, [employees, certSearchTerm]);

  // colors for pie chart
  const PIE_COLORS = ['#2563eb', '#1e3a8a', '#3b82f6', '#60a5fa', '#475569', '#6366f1'];

  // --- ACTIONS (CRUD) ---
  const handleAddNew = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newEmp.nama || !newEmp.nip) {
      showToast("Nama dan NIP wajib diisi!", "error");
      return;
    }
    
    // NIP validation: 18 digits in Indonesia (restrict only for PNS)
    const empType = newEmp.jenisKepegawaian || 'PNS';
    if (empType === 'PNS' && (newEmp.nip.length !== 18 || isNaN(Number(newEmp.nip)))) {
      showToast("Format NIP PNS salah! Harus berisi 18 angka.", "error");
      return;
    }

    // Check unique NIP
    if (employees.some(emp => emp.nip === newEmp.nip)) {
      showToast("Pegawai dengan NIP tersebut sudah terdaftar!", "error");
      return;
    }

    const nId = employees.length > 0 ? Math.max(...employees.map(e => e.id)) + 1 : 1;
    const addedEmployee: Employee = {
      ...(newEmp as Employee),
      jenisKepegawaian: empType as 'PNS' | 'P3K' | 'BLUD',
      id: nId
    };

    setEmployees(prev => [addedEmployee, ...prev]);
    setSelectedEmpId(nId);
    setIsAdding(false);
    showToast(`Pegawai ${newEmp.nama} berhasil didaftarkan!`, "success");

    // Reset Form
    setNewEmp({
      nama: '',
      nip: '',
      gender: 'L',
      tempatLahir: '',
      tanggalLahir: '',
      usiaTahun: 40,
      usiaBulan: 0,
      tmtCpns: '',
      golongan: 'III/c',
      pangkat: 'Penata',
      jabatanTerakhir: 'Perawat Ahli Pertama',
      rumpunJabatan: 'Jabatan Fungsional Tertentu',
      pendidikanTerakhir: 'Keperawatan Ners',
      tingkatPendidikanTerakhir: 'S1 Profesi',
      unitRuangan: 'Instalasi Gawat Darurat (IGD)',
      bidang: 'Bidang Pelayanan Keperawatan',
      statusKepegawaian: 'Aktif',
      jenisKepegawaian: 'PNS',
      keterangan: '-'
    });
  };

  const handleInjectDemoData = () => {
    const firstNamesL = ["Ahmad", "Budi", "Candra", "Dedi", "Eko", "Fahri", "Gunawan", "Hendra", "Irfan", "Joko", "Kurniawan", "Lukman", "Mulyadi", "Nugroho", "Oki", "Prabowo", "Rian", "Sandi", "Taufik", "Wahyu", "Yudi"];
    const firstNamesP = ["Ani", "Beti", "Citra", "Dewi", "Evi", "Fitri", "Gita", "Hesti", "Indah", "Julia", "Kartika", "Lestari", "Mega", "Novi", "Olivia", "Putri", "Rina", "Sari", "Tari", "Wulan", "Yanti"];
    const lastNames = ["Santoso", "Wijaya", "Susanto", "Pratama", "Hidayat", "Saputra", "Wibowo", "Kusuma", "Setiawan", "Budiman", "Siregar", "Lubis", "Nasution", "Situmorang", "Wahyudi", "Gunawan", "Arifin", "Harahap", "Sitorus", "Dahlan"];
    
    const tempatLahirList = ["Tarakan", "Samarinda", "Bulungan", "Nunukan", "Malinau", "Tanjung Selor", "Balikpapan"];
    
    const unitRuanganList = [
      "Ruangan ICU", 
      "Instalasi Gawat Darurat (IGD)", 
      "Ruangan Mawar", 
      "Ruangan Melati", 
      "Ruangan Dahlia", 
      "Klinik Anak", 
      "Klinik Bedah",
      "Bagian Administrasi",
      "Instalasi Farmasi",
      "Klinik Penyakit Dalam"
    ];

    const bidangList = [
      "Bidang Pelayanan Medik",
      "Bidang Pelayanan Keperawatan",
      "Bidang Pelayanan Penunjang",
      "Bagian Sekretariat",
      "Bagian Keuangan"
    ];

    const demoEmployees: Employee[] = [];
    
    for (let i = 1; i <= 50; i++) {
      const isL = i % 2 === 0;
      const firstName = isL 
        ? firstNamesL[i % firstNamesL.length] 
        : firstNamesP[i % firstNamesP.length];
      const lastName = lastNames[(i * 3) % lastNames.length];
      
      // Determine role, title, and rumpun
      let nama = `${firstName} ${lastName}`;
      let jabatanTerakhir = "Apoteker";
      let rumpunJabatan = "Jabatan Fungsional Tertentu";
      let tingkatPendidikanTerakhir = "S1";
      let pendidikanTerakhir = "Farmasi";
      let bidang = bidangList[i % bidangList.length];
      let unitRuangan = unitRuanganList[i % unitRuanganList.length];
      const jenisKepegawaian = i % 3 === 0 ? 'PNS' : i % 3 === 1 ? 'P3K' : 'BLUD';
      
      const roleSel = i % 5;
      if (roleSel === 0) {
        nama = `dr. ${firstName} ${lastName}, Sp.B`;
        jabatanTerakhir = "Dokter Spesialis Bedah";
        rumpunJabatan = "Jabatan Fungsional Tertentu";
        tingkatPendidikanTerakhir = "S2";
        pendidikanTerakhir = "Spesialis Bedah";
        bidang = "Bidang Pelayanan Medik";
      } else if (roleSel === 1) {
        nama = `${firstName} ${lastName}, S.Kep., Ns.`;
        jabatanTerakhir = "Perawat Ahli Pertama";
        rumpunJabatan = "Jabatan Fungsional Tertentu";
        tingkatPendidikanTerakhir = "S1";
        pendidikanTerakhir = "Ners Keperawatan";
        bidang = "Bidang Pelayanan Keperawatan";
      } else if (roleSel === 2) {
        nama = `${firstName} ${lastName}, A.Md.Keb.`;
        jabatanTerakhir = "Bidan Mahir";
        rumpunJabatan = "Jabatan Fungsional Tertentu";
        tingkatPendidikanTerakhir = "DIII";
        pendidikanTerakhir = "Kebidanan";
        bidang = "Bidang Pelayanan Keperawatan";
      } else if (roleSel === 3) {
        nama = `Suhadi ${lastName}, S.E.`;
        jabatanTerakhir = "Kepala Sub Bagian Kepegawaian";
        rumpunJabatan = "Jabatan Struktural";
        tingkatPendidikanTerakhir = "S1";
        pendidikanTerakhir = "Manajemen Ekonomi";
        bidang = "Bagian Sekretariat";
        unitRuangan = "Bagian Kepegawaian";
      } else {
        nama = `${firstName} ${lastName}`;
        jabatanTerakhir = "Staf Administrasi Umum";
        rumpunJabatan = "Jabatan Fungsional Umum/ Pelaksana";
        tingkatPendidikanTerakhir = "SMA/SLTA";
        pendidikanTerakhir = "SLTA Umum";
        bidang = "Bagian Sekretariat";
        unitRuangan = "Tata Usaha";
      }

      // Age random 25-62
      const age = 25 + (i * 7) % 38; // yields nice spread of ages
      const birthYear = 2026 - age;
      const birthMonth = 1 + (i % 12);
      const birthDay = 1 + (i % 28);
      const tanggalLahir = `${birthDay.toString().padStart(2, '0')}/${birthMonth.toString().padStart(2, '0')}/${birthYear}`;
      
      const entryAge = 23 + (i % 5);
      const serviceYears = age - entryAge > 2 ? age - entryAge : 2;
      const startYear = birthYear + entryAge;
      const tmtCpns = `01/03/${startYear}`;
      
      const gender = isL ? 'L' : 'P';
      const tempatLahir = tempatLahirList[i % tempatLahirList.length];
      
      // Golongan & Pangkat mapping based on age and jenis
      let golongan = "III/a";
      let pangkat = "Penata Muda";
      if (jenisKepegawaian === 'PNS') {
        if (age >= 50) {
          golongan = "IV/b";
          pangkat = "Pembina Tingkat I";
        } else if (age >= 40) {
          golongan = "III/c";
          pangkat = "Penata";
        } else if (age >= 30) {
          golongan = "III/b";
          pangkat = "Penata Muda Tingkat I";
        } else {
          golongan = "III/a";
          pangkat = "Penata Muda";
        }
      } else if (jenisKepegawaian === 'P3K') {
        golongan = "Golongan IX";
        pangkat = "Penata Muda (P3K)";
      } else {
        golongan = "BLUD Kontrak";
        pangkat = "Tenaga Kontrak BLUD";
      }

      const statusKepegawaian = i === 12 || i === 34 ? 'Cuti' : i === 22 ? 'Tugas Belajar' : 'Aktif';

      demoEmployees.push({
        id: 202600 + i,
        nama,
        nip: jenisKepegawaian === 'BLUD' 
          ? `6503.BLUD.${1000 + i}` 
          : `${birthYear}${(birthMonth).toString().padStart(2, '0')}${(birthDay).toString().padStart(2, '0')}${startYear}03${isL ? '1' : '2'}00${i}`,
        gender,
        tempatLahir,
        tanggalLahir,
        usiaTahun: age,
        usiaBulan: i % 12,
        tmtCpns,
        golongan,
        pangkat,
        jabatanTerakhir,
        rumpunJabatan,
        pendidikanTerakhir,
        tingkatPendidikanTerakhir,
        unitRuangan,
        bidang,
        statusKepegawaian,
        jenisKepegawaian,
        keterangan: statusKepegawaian === 'Aktif' ? 'Dermaga Kesehatan RSUD' : statusKepegawaian === 'Cuti' ? 'Cuti tahunan disetujui' : 'Tugas belajar S2'
      });
    }

    localStorage.setItem('rsud_employees', JSON.stringify(demoEmployees));
    setEmployees(demoEmployees);
    setSelectedEmpId(demoEmployees[0]?.id || null);
    showToast("Berhasil mengisi database kepegawaian dengan 50 Data Demo fiktif!", "success");
  };

  const handleResetToPDF = () => {
    localStorage.setItem('rsud_employees', JSON.stringify(AUGMENTED_DEFAULT_EMPLOYEES));
    setEmployees(AUGMENTED_DEFAULT_EMPLOYEES);
    setSelectedEmpId(AUGMENTED_DEFAULT_EMPLOYEES[0]?.id || null);
    showToast("Berhasil menyelaraskan data fungsional asli (PNS, PPPK/P3K, dan BLUD)!", "success");
  };

  const handleDownloadTemplate = () => {
    try {
      const templateData = [
        {
          "Nama Lengkap": "Ns. Heri Siswanto, S.Kep.",
          "NIP / No Kontrak": "198504122023211003",
          "L/P (Gender)": "L",
          "Tempat Lahir": "Surabaya",
          "Tanggal Lahir (DD/MM/YYYY)": "12/04/1985",
          "Golongan": "IX",
          "Pangkat": "Penata Muda",
          "Jabatan Terakhir": "Perawat Ahli Pertama (PPPK)",
          "Rumpun Jabatan": "Jabatan Fungsional Tertentu",
          "Pendidikan Terakhir": "Keperawatan Ners",
          "Tingkat Pendidikan": "S1 Profesi",
          "Unit/Ruangan": "Ruangan ICU",
          "Bidang": "Bidang Pelayanan Keperawatan",
          "Status Kepegawaian (Aktif/Cuti)": "Aktif",
          "Jenis Kepegawaian (PNS/P3K/BLUD)": "P3K",
          "Keterangan": "Diterima Seleksi PPPK Kesehatan"
        },
        {
          "Nama Lengkap": "drg. Silvia Anggraeni",
          "NIP / No Kontrak": "199008242022212015",
          "L/P (Gender)": "P",
          "Tempat Lahir": "Malang",
          "Tanggal Lahir (DD/MM/YYYY)": "24/08/1990",
          "Golongan": "X",
          "Pangkat": "Penata Muda",
          "Jabatan Terakhir": "Dokter Gigi Ahli Pertama (PPPK)",
          "Rumpun Jabatan": "Jabatan Fungsional Tertentu",
          "Pendidikan Terakhir": "Pendidikan Dokter Gigi",
          "Tingkat Pendidikan": "S2",
          "Unit/Ruangan": "Klinik Gigi & Mulut",
          "Bidang": "Bidang Pelayanan Medik",
          "Status Kepegawaian (Aktif/Cuti)": "Aktif",
          "Jenis Kepegawaian (PNS/P3K/BLUD)": "P3K",
          "Keterangan": "-"
        },
        {
          "Nama Lengkap": "Siti Rahmah, S.Kep.",
          "NIP / No Kontrak": "BLUD-202104005",
          "L/P (Gender)": "P",
          "Tempat Lahir": "Samarinda",
          "Tanggal Lahir (DD/MM/YYYY)": "15/10/1995",
          "Golongan": "Non-ASN",
          "Pangkat": "Staff BLUD",
          "Jabatan Terakhir": "Perawat Klinik (BLUD)",
          "Rumpun Jabatan": "Jabatan Fungsional Umum/ Pelaksana",
          "Pendidikan Terakhir": "S1 Keperawatan",
          "Tingkat Pendidikan": "S1",
          "Unit/Ruangan": "Ruangan Mawar",
          "Bidang": "Bidang Pelayanan Keperawatan",
          "Status Kepegawaian (Aktif/Cuti)": "Aktif",
          "Jenis Kepegawaian (PNS/P3K/BLUD)": "BLUD",
          "Keterangan": "Kontrak BLUD Mandiri RSUD"
        }
      ];

      const worksheet = XLSX.utils.json_to_sheet(templateData);
      const workbook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(workbook, worksheet, "Template Data Pegawai");
      
      const maxColWidths = [
        { wch: 30 }, // Nama
        { wch: 22 }, // NIP
        { wch: 15 }, // Gender
        { wch: 18 }, // Tempat lahir
        { wch: 25 }, // Tanggal lahir
        { wch: 12 }, // Golongan
        { wch: 18 }, // Pangkat
        { wch: 30 }, // Jabatan
        { wch: 28 }, // Rumpun
        { wch: 22 }, // Pendidikan
        { wch: 18 }, // Tingkat Pendidikan
        { wch: 20 }, // Unit
        { wch: 28 }, // Bidang
        { wch: 25 }, // Status
        { wch: 28 }, // Jenis
        { wch: 30 }  // Keterangan
      ];
      worksheet['!cols'] = maxColWidths;

      XLSX.writeFile(workbook, "template_pegawai_rsud.xlsx");
      showToast("Template Excel berhasil diunduh!", "success");
    } catch (err: any) {
      console.error(err);
      showToast("Gagal mengunduh template: " + err.message, "error");
    }
  };

  const parseExcelDate = (val: any): { dateStr: string; ageY: number; ageM: number } => {
    let dateObj: Date | null = null;
    
    if (typeof val === 'number') {
      dateObj = new Date((val - 25569) * 86400 * 1000);
    } else if (typeof val === 'string' && val.trim() !== '') {
      const cleanVal = val.trim();
      const parts = cleanVal.split(/[-/.]/);
      if (parts.length === 3) {
        const p0 = parseInt(parts[0], 10);
        const p1 = parseInt(parts[1], 10);
        const p2 = parseInt(parts[2], 10);
        if (p2 > 1000) {
          dateObj = new Date(p2, p1 - 1, p0);
        } else if (p0 > 1000) {
          dateObj = new Date(p0, p1 - 1, p2);
        }
      } else {
        const parsed = Date.parse(cleanVal);
        if (!isNaN(parsed)) {
          dateObj = new Date(parsed);
        }
      }
    }

    if (dateObj && !isNaN(dateObj.getTime())) {
      const d = String(dateObj.getDate()).padStart(2, '0');
      const m = String(dateObj.getMonth() + 1).padStart(2, '0');
      const y = dateObj.getFullYear();
      const dateStr = `${d}/${m}/${y}`;
      
      const now = new Date();
      let ageY = now.getFullYear() - y;
      let ageM = now.getMonth() - dateObj.getMonth();
      if (ageM < 0 || (ageM === 0 && now.getDate() < dateObj.getDate())) {
        ageY--;
        ageM = 12 + ageM;
      }
      return { 
        dateStr, 
        ageY: Math.max(0, ageY), 
        ageM: Math.max(0, ageM) 
      };
    }
    
    return { dateStr: '01/01/1990', ageY: 36, ageM: 0 };
  };

  const handleExcelUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setExcelFileName(file.name);
    setExcelParseError(null);
    setPreviewEmployees([]);

    const reader = new FileReader();
    reader.onload = (evt) => {
      try {
        const bstr = evt.target?.result;
        if (!bstr) {
          setExcelParseError("Gagal membaca hasil binary file.");
          return;
        }
        const workbook = XLSX.read(bstr, { type: 'binary' });
        const firstSheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[firstSheetName];
        
        const rawRows = XLSX.utils.sheet_to_json<any>(worksheet, { raw: true });
        
        if (!rawRows || rawRows.length === 0) {
          setExcelParseError("File Excel kosong / tidak ditemukan baris data.");
          return;
        }

        const findValueByKeys = (row: any, searchKeys: string[], defaultValue: string = ''): string => {
          const rowKeys = Object.keys(row);
          for (const key of searchKeys) {
            const foundKey = rowKeys.find(rk => rk.toLowerCase().replace(/[^a-z0-9]/g, '').includes(key.toLowerCase().replace(/[^a-z0-9]/g, '')));
            if (foundKey && row[foundKey] !== undefined && row[foundKey] !== null) {
              return String(row[foundKey]).trim();
            }
          }
          return defaultValue;
        };

        const currentMaxId = employees.length > 0 ? Math.max(...employees.map(emp => emp.id)) : 100;
        
        const mappedList: Employee[] = rawRows.map((row, idx) => {
          // 1. Identify Kepegawaian type first so we can use it to drive specific column mappings
          let jenisKepegawaian: Employee['jenisKepegawaian'] = 'PNS';
          if (excelUploadTargetType !== 'AUTO') {
            jenisKepegawaian = excelUploadTargetType;
          } else {
            const rawJenis = findValueByKeys(row, ["jenis", "tipe", "kategori"], "");
            if (rawJenis.toUpperCase().includes('P3K') || rawJenis.toUpperCase().includes('PPPK')) {
              jenisKepegawaian = 'P3K';
            } else if (rawJenis.toUpperCase().includes('BLUD') || rawJenis.toLowerCase().includes('kontrak') || Object.keys(row).some(k => k.toLowerCase().includes('nrptt'))) {
              jenisKepegawaian = 'BLUD';
            } else {
              jenisKepegawaian = 'PNS';
            }
          }

          // 2. Identify Name and NIP / NRPTT
          const nama = findValueByKeys(row, ["nama", "name", "pegawai", "lengkap"]);
          const nip = findValueByKeys(row, ["nrptt", "nip", "induk", "kontrak", "nipkontrak", "nomorinduk", "id"]);
          
          if (!nama || !nip) {
            return null;
          }

          // 3. Identify Gender
          const rawGender = findValueByKeys(row, ["gender", "kelamin", "jk", "sex", "lp", "jenis kelamin", "l/p"]);
          let gender: 'L' | 'P' = 'L';
          if (rawGender.toUpperCase().startsWith('P') || rawGender.toLowerCase().includes('wanita') || rawGender.toLowerCase().includes('perempuan') || rawGender.toLowerCase().startsWith('w')) {
            gender = 'P';
          }

          // 4. Identify Tempat Lahir & Tanggal Lahir (with age recalculations)
          const tempatLahir = findValueByKeys(row, ["tempat", "lahir", "tempatahirkota", "tempat lahir"], "Tarakan");
          
          const tglKey = Object.keys(row).find(k => k.toLowerCase().includes('tanggal') || k.toLowerCase().includes('tgl') || k.toLowerCase().includes('birth') || k.toLowerCase().includes('lahir'));
          const rawTglLahir = tglKey ? row[tglKey] : '';
          const dateResult = parseExcelDate(rawTglLahir);

          // Get explicit age columns if they exist (e.g. "USIA TAHUN", "USIA BULAN" from image)
          const rawUsiaTahun = findValueByKeys(row, ["usia tahun", "usia_tahun", "usia(tahun)", "usiatahun", "thn"]);
          const rawUsiaBulan = findValueByKeys(row, ["usia bulan", "usia_bulan", "usia(bulan)", "usiabulan", "bln"]);
          
          let finalUsiaTahun = dateResult.ageY;
          if (rawUsiaTahun) {
            const parsedAge = parseInt(rawUsiaTahun.replace(/[^0-9]/g, ''), 10);
            if (!isNaN(parsedAge)) {
              finalUsiaTahun = parsedAge;
            }
          }
          
          let finalUsiaBulan = dateResult.ageM;
          if (rawUsiaBulan) {
            const parsedMonth = parseInt(rawUsiaBulan.replace(/[^0-9]/g, ''), 10);
            if (!isNaN(parsedMonth)) {
              finalUsiaBulan = parsedMonth;
            }
          }

          // 5. Setup basic attributes with customized fallbacks for BLUD
          const golongan = findValueByKeys(row, ["golongan", "gol", "ruang", "golruang"], jenisKepegawaian === 'BLUD' ? '-' : "III/a");
          const pangkat = findValueByKeys(row, ["pangkat", "grade"], jenisKepegawaian === 'BLUD' ? 'Pegawai BLUD' : "Penata Muda");
          const jabatanTerakhir = findValueByKeys(row, ["jabatan terakhir", "jabatan", "posisi"], jenisKepegawaian === 'BLUD' ? 'Tenaga Medis / Keperawatan BLUD' : "Dokter Pertama");
          const rumpunJabatan = findValueByKeys(row, ["rumpun", "rumpunjabatan"], jenisKepegawaian === 'BLUD' ? 'Tenaga Kontrak BLUD' : "Jabatan Fungsional Tertentu");
          
          // 6. Support automatic inference of educational backgrounds based on title
          let pendidikanTerakhir = findValueByKeys(row, ["pendidikan", "jurusan", "studi"], "");
          let tingkatPendidikanTerakhir = findValueByKeys(row, ["tingkat", "jenjang", "tingkat_pendidikan", "tingkatpendidikan"], "");

          if (!pendidikanTerakhir || !tingkatPendidikanTerakhir) {
            const nameLower = nama.toLowerCase();
            const jabLower = jabatanTerakhir.toLowerCase();
            
            if (nameLower.includes('sp.') || nameLower.includes('spesialis') || jabLower.includes('spesialis')) {
              if (!pendidikanTerakhir) pendidikanTerakhir = 'Kedokteran Spesialis';
              if (!tingkatPendidikanTerakhir) tingkatPendidikanTerakhir = 'Sp-1';
            } else if (nameLower.includes('dr.') || nameLower.includes('drg.') || nameLower.includes('dokter') || jabLower.includes('dokter')) {
              if (!pendidikanTerakhir) pendidikanTerakhir = 'Kedokteran';
              if (!tingkatPendidikanTerakhir) tingkatPendidikanTerakhir = 'S1 Profesi';
            } else if (nameLower.includes('s.kep') || nameLower.includes('ns.') || nameLower.includes('ners') || jabLower.includes('perawat')) {
              if (!pendidikanTerakhir) pendidikanTerakhir = 'Keperawatan';
              if (!tingkatPendidikanTerakhir) tingkatPendidikanTerakhir = 'S1 Profesi';
            } else if (nameLower.includes('a.md.kep') || nameLower.includes('a.md.keb') || nameLower.includes('amd.')) {
              if (!pendidikanTerakhir) pendidikanTerakhir = nameLower.includes('keb') || jabLower.includes('bidan') ? 'Kebidanan' : 'Keperawatan';
              if (!tingkatPendidikanTerakhir) tingkatPendidikanTerakhir = 'D3';
            } else {
              if (!pendidikanTerakhir) pendidikanTerakhir = jenisKepegawaian === 'BLUD' ? 'Kesehatan / Umum' : 'Kedokteran';
              if (!tingkatPendidikanTerakhir) tingkatPendidikanTerakhir = 'S1';
            }
          }

          const unitRuangan = findValueByKeys(row, ["unit", "ruangan", "ruang", "unitruangan", "unit kerja", "unitkerja"], "Instalasi Gawat Darurat (IGD)");
          const bidang = findValueByKeys(row, ["bidang", "dept", "bagian"], "Bidang Pelayanan Medik");
          
          const rawStatus = findValueByKeys(row, ["status"], "Aktif");
          let statusKepegawaian: Employee['statusKepegawaian'] = 'Aktif';
          if (rawStatus.toLowerCase().includes('cuti')) statusKepegawaian = 'Cuti';
          else if (rawStatus.toLowerCase().includes('belajar')) statusKepegawaian = 'Tugas Belajar';
          else if (rawStatus.toLowerCase().includes('tidak')) statusKepegawaian = 'Tidak Aktif Sementara';

          // 7. Parse TMT / TAHUN PENGANGKATAN
          const rawTmt = findValueByKeys(row, ["tmt", "cpns", "pengangkatan", "tahun pengangkatan", "tahunpengangkatan"], "01/01/2020");
          let formattedTmt = "01/01/2020";
          if (rawTmt) {
            const parsedTmt = parseExcelDate(rawTmt);
            if (parsedTmt && parsedTmt.dateStr !== '01/01/1990') {
               formattedTmt = parsedTmt.dateStr;
            } else {
               formattedTmt = rawTmt;
            }
          }

          const keterangan = findValueByKeys(row, ["keterangan", "ket", "notes"], "-");

          return {
            id: currentMaxId + 1 + idx,
            nama,
            nip,
            gender,
            tempatLahir,
            tanggalLahir: dateResult.dateStr,
            usiaTahun: finalUsiaTahun,
            usiaBulan: finalUsiaBulan,
            tmtCpns: formattedTmt,
            golongan,
            pangkat,
            jabatanTerakhir,
            rumpunJabatan,
            pendidikanTerakhir,
            tingkatPendidikanTerakhir,
            unitRuangan,
            bidang,
            statusKepegawaian,
            jenisKepegawaian,
            keterangan
          };
        }).filter(item => item !== null) as Employee[];

        if (mappedList.length === 0) {
          setExcelParseError("Gagal mencocokkan kolom Nama dan NIP pegawai di berkas Excel.");
        } else {
          setPreviewEmployees(mappedList);
        }
      } catch (err: any) {
        console.error(err);
        setExcelParseError("Kasalahan saat memproses excel: " + err.message);
      }
    };

    reader.onerror = () => {
      setExcelParseError("Gagal membaca file dari penyimpanan lokal.");
    };

    reader.readAsBinaryString(file);
  };

  const handleCommitExcelImport = () => {
    if (previewEmployees.length === 0) return;

    const existingNips = new Set(employees.map(e => e.nip));
    const finalAdded: Employee[] = [];
    let duplicatesSkipped = 0;

    previewEmployees.forEach(emp => {
      if (existingNips.has(emp.nip)) {
        duplicatesSkipped++;
      } else {
        finalAdded.push(emp);
      }
    });

    if (finalAdded.length === 0) {
      showToast(`Seluruh (${duplicatesSkipped}) data pegawai di Excel sudah ada dalam sistem!`, "info");
      setIsExcelModalOpen(false);
      setPreviewEmployees([]);
      setExcelFileName('');
      return;
    }

    const updatedEmployees = [...finalAdded, ...employees];
    setEmployees(updatedEmployees);
    localStorage.setItem('rsud_employees', JSON.stringify(updatedEmployees));
    setSelectedEmpId(finalAdded[0].id);

    if (duplicatesSkipped > 0) {
      showToast(`Impor Berhasil: ${finalAdded.length} masuk baru, ${duplicatesSkipped} baris diabaikan karena NIP sama.`, "success");
    } else {
      showToast(`Sukses mengimpor ${finalAdded.length} data pegawai baru langsung dari Excel!`, "success");
    }

    setIsExcelModalOpen(false);
    setPreviewEmployees([]);
    setExcelFileName('');
  };

  const startEdit = (emp: Employee) => {
    setEditingId(emp.id);
    setEditEmpState({ ...emp });
  };

  const handleSaveEdit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editEmpState.nama || !editEmpState.nip) {
      showToast("Nama dan NIP wajib diisi!", "error");
      return;
    }

    const empTypeEdit = editEmpState.jenisKepegawaian || 'PNS';
    if (empTypeEdit === 'PNS' && (editEmpState.nip?.length !== 18 || isNaN(Number(editEmpState.nip)))) {
      showToast("Format NIP PNS salah! Harus berisi 18 angka.", "error");
      return;
    }

    // Check unique NIP excluding themselves
    if (employees.some(emp => emp.nip === editEmpState.nip && emp.id !== editingId)) {
      showToast("NIP sudah digunakan oleh pegawai lain!", "error");
      return;
    }

    setEmployees(prev => prev.map(emp => emp.id === editingId ? { ...emp, ...editEmpState } as Employee : emp));
    showToast(`Data ${editEmpState.nama} berhasil diperbarui!`, "success");
    setEditingId(null);
  };

  const handleDelete = (id: number, nama: string) => {
    setEmployees(prev => {
      const filtered = prev.filter(emp => emp.id !== id);
      if (selectedEmpId === id) {
        setSelectedEmpId(filtered[0]?.id || null);
      }
      return filtered;
    });
    setCheckedEmpIds(prev => prev.filter(checkedId => checkedId !== id));
    showToast(`Data pegawai ${nama} berhasil dihapus secara langsung!`, "info");
  };

  const handleDeleteChecked = () => {
    if (checkedEmpIds.length === 0) return;
    const count = checkedEmpIds.length;
    setEmployees(prev => {
      const filtered = prev.filter(emp => !checkedEmpIds.includes(emp.id));
      if (selectedEmpId && checkedEmpIds.includes(selectedEmpId)) {
        setSelectedEmpId(filtered[0]?.id || null);
      }
      return filtered;
    });
    setCheckedEmpIds([]);
    showToast(`Berhasil menghapus ${count} data pegawai yang diconteng secara langsung!`, "info");
  };

  const handleDeleteAllInFolder = () => {
    const folderName = selectedFolderType === 'ALL' ? 'Semua Berkas' : `Berkas ${selectedFolderType}`;
    const targetEmployees = employees.filter(emp => {
      const empType = emp.jenisKepegawaian || 'PNS';
      return selectedFolderType === 'ALL' || empType === selectedFolderType;
    });

    const count = targetEmployees.length;
    if (count === 0) {
      showToast(`Tidak ada data pegawai yang dapat dihapus di dalam folder ${folderName}!`, "error");
      return;
    }

    setConfirmModal({
      isOpen: true,
      title: 'Kosongkan Folder Kepegawaian',
      description: `Apakah Anda yakin ingin menghapus SELURUH pegawai (${count} orang) yang berada di dalam folder "${folderName}"? Tindakan ini bersifat permanen dan tidak dapat dibatalkan.`,
      variant: 'danger',
      onConfirm: () => {
        const targetIds = new Set(targetEmployees.map(emp => emp.id));
        setEmployees(prev => {
          const filtered = prev.filter(emp => !targetIds.has(emp.id));
          if (selectedEmpId && targetIds.has(selectedEmpId)) {
            setSelectedEmpId(filtered[0]?.id || null);
          }
          return filtered;
        });
        setCheckedEmpIds(prev => prev.filter(id => !targetIds.has(id)));
        showToast(`Seluruh pegawai (${count} orang) di folder "${folderName}" berhasil dihapus!`, "info");
        setConfirmModal(prev => ({ ...prev, isOpen: false }));
      }
    });
  };

  const handleBackupExportJSON = () => {
    try {
      const dataStr = JSON.stringify(employees, null, 2);
      const dataUri = 'data:application/json;charset=utf-8,' + encodeURIComponent(dataStr);
      
      const exportFileDefaultName = `backup_pegawai_rsud_${new Date().toISOString().split('T')[0]}.json`;
      
      const linkElement = document.createElement('a');
      linkElement.setAttribute('href', dataUri);
      linkElement.setAttribute('download', exportFileDefaultName);
      document.body.appendChild(linkElement);
      linkElement.click();
      document.body.removeChild(linkElement);
      
      showToast("Cadangan database pegawai berhasil diunduh!", "success");
    } catch (err) {
      showToast("Gagal melakukan ekspor data JSON!", "error");
    }
  };

  const handleBackupImportJSON = (event: React.ChangeEvent<HTMLInputElement>) => {
    const fileReader = new FileReader();
    const file = event.target.files?.[0];
    if (!file) return;

    fileReader.onload = (e) => {
      try {
        const result = e.target?.result as string;
        const parsed = JSON.parse(result);

        if (!Array.isArray(parsed)) {
          showToast("Format cadangan tidak valid (harus berupa list/array pegawai)!", "error");
          return;
        }

        const isValid = parsed.length === 0 || (
          parsed[0] && typeof parsed[0] === 'object' && ('nama' in parsed[0] || 'nip' in parsed[0])
        );

        if (!isValid) {
          showToast("Format data di dalam berkas cadangan JSON tidak cocok dengan struktur pegawai!", "error");
          return;
        }

        setConfirmModal({
          isOpen: true,
          title: 'Pulihkan Database Pegawai',
          description: `Apakah Anda yakin ingin memulihkan ${parsed.length} data pegawai dari berkas cadangan? Pengoperasian ini akan MENGGANTI seluruh database pegawai saat ini secara instan.`,
          variant: 'warning',
          onConfirm: () => {
            setEmployees(parsed);
            if (parsed.length > 0) {
              setSelectedEmpId(parsed[0].id || null);
            } else {
              setSelectedEmpId(null);
            }
            setCheckedEmpIds([]);
            showToast("Berhasil memulihkan seluruh database pegawai dari cadangan manual!", "success");
            setConfirmModal(prev => ({ ...prev, isOpen: false }));
          }
        });
      } catch (err) {
        showToast("Gagal membaca berkas JSON. Berkas rusak atau tidak valid!", "error");
      }
    };
    fileReader.readAsText(file);
    event.target.value = '';
  };

  const handleExportCSV = () => {
    let csvContent = "data:text/csv;charset=utf-8,";
    csvContent += "NO,NAMA PEGAWAI,NIP,GENDER,TEMPAT LAHIR,TANGGAL LAHIR,GOLONGAN,PANGKAT,JABATAN TERAKHIR,UNIT RUANGAN,BIDANG,STATUS\n";
    
    filteredEmployees.forEach((emp, index) => {
      const row = [
        index + 1,
        `"${emp.nama}"`,
        `'${emp.nip}`, // format as string with single quote to preserve leading zero/formatting in Excel
        emp.gender,
        `"${emp.tempatLahir}"`,
        emp.tanggalLahir,
        emp.golongan,
        `"${emp.pangkat}"`,
        `"${emp.jabatanTerakhir}"`,
        `"${emp.unitRuangan}"`,
        `"${emp.bidang}"`,
        emp.statusKepegawaian
      ].join(",");
      csvContent += row + "\n";
    });

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `data_pegawai_rsud_filtered_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    showToast("Berhasil mengekspor data ke file CSV!", "success");
  };

  const handleExportPDF = () => {
    try {
      // Create landscape A4 PDF document
      const doc = new jsPDF({
        orientation: 'landscape',
        unit: 'mm',
        format: 'a4'
      });

      const pageHeight = 210;
      const pageWidth = 297;
      const margin = 15;
      const contentWidth = pageWidth - (margin * 2); // 267mm

      // Column widths mapping (totals 267)
      const colWidths = {
        no: 10,
        nama: 55,
        nip: 42,
        jenis: 20,
        jabatan: 55,
        unit: 65,
        status: 20
      };

      const getTruncatedText = (text: string, maxWidthMm: number, fontSize: number) => {
        doc.setFont('helvetica', 'normal');
        doc.setFontSize(fontSize);
        let str = text || '';
        if (doc.getTextWidth(str) <= maxWidthMm - 2) return str;
        while (str.length > 0 && doc.getTextWidth(str + '...') > maxWidthMm - 2) {
          str = str.slice(0, -1);
        }
        return str + '...';
      };

      const drawHeader = (pageNum: number) => {
        if (pageNum === 1) {
          // Centered Header
          doc.setFont('helvetica', 'bold');
          doc.setFontSize(11);
          doc.setTextColor(51, 65, 85); // slate-700
          doc.text("PEMERINTAH PROVINSI KALIMANTAN UTARA", pageWidth / 2, 14, { align: 'center' });
          
          doc.setFont('helvetica', 'bold');
          doc.setFontSize(16);
          doc.setTextColor(30, 41, 59); // deep navy
          doc.text("RSUD dr. H. JUSUF SK", pageWidth / 2, 21, { align: 'center' });
          
          doc.setFont('helvetica', 'normal');
          doc.setFontSize(8.5);
          doc.setTextColor(100, 116, 139); // slate-500
          doc.text("Jl. dr. H. Jusuf SK No. 2, Tarakan, Kalimantan Utara 77114", pageWidth / 2, 26, { align: 'center' });
          doc.text("Email: kontak@rsudjusufsk.go.id | Telp: (0551) 21166 | Fax: (0551) 21167", pageWidth / 2, 30, { align: 'center' });

          // Double Line under Kop
          doc.setDrawColor(30, 41, 59);
          doc.setLineWidth(0.8);
          doc.line(margin, 34, pageWidth - margin, 34);
          doc.setLineWidth(0.2);
          doc.line(margin, 35.2, pageWidth - margin, 35.2);

          // Document Title
          doc.setFont('helvetica', 'bold');
          doc.setFontSize(12);
          doc.setTextColor(15, 23, 42); // slate-900
          doc.text("LAPORAN DATA PEGAWAI & ROSTER STAFF", margin, 44);

          // Filters and Date Subtitle
          doc.setFont('helvetica', 'normal');
          doc.setFontSize(8);
          doc.setTextColor(100, 116, 139);
          
          let folderName = 'Semua Berkas';
          if (selectedFolderType === 'PNS') folderName = 'Berkas PNS';
          if (selectedFolderType === 'P3K') folderName = 'Berkas PPPK / P3K';
          if (selectedFolderType === 'BLUD') folderName = 'Berkas BLUD Mandiri';

          const formattedNow = new Date().toLocaleDateString('id-ID', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric'
          });

          doc.text(`Kriteria Folder: ${folderName} (${filteredEmployees.length} Pegawai)`, margin, 49);
          doc.text(`Tanggal Ekspor: ${formattedNow}`, pageWidth - margin, 49, { align: 'right' });
        } else {
          doc.setFont('helvetica', 'bold');
          doc.setFontSize(9);
          doc.setTextColor(100, 116, 139);
          doc.text("RSUD dr. H. JUSUF SK - Roster Staff Report", margin, 12);
          
          doc.setFont('helvetica', 'normal');
          doc.setFontSize(8);
          doc.text(`Halaman ${pageNum}`, pageWidth - margin, 12, { align: 'right' });

          doc.setDrawColor(226, 232, 240); // slate-200
          doc.setLineWidth(0.3);
          doc.line(margin, 14.5, pageWidth - margin, 14.5);
        }
      };

      const drawTableHeader = (y: number) => {
        doc.setFillColor(30, 41, 59); // deep navy
        doc.rect(margin, y, contentWidth, 8.5, 'F');

        doc.setFont('helvetica', 'bold');
        doc.setFontSize(8);
        doc.setTextColor(255, 255, 255);

        let curX = margin;
        
        doc.text("NO", curX + 2, y + 5.5);
        curX += colWidths.no;
        doc.text("NAMA LENGKAP", curX + 3, y + 5.5);
        curX += colWidths.nama;
        doc.text("NIP / KODE PEG.", curX + 3, y + 5.5);
        curX += colWidths.nip;
        doc.text("JENIS", curX + 3, y + 5.5);
        curX += colWidths.jenis;
        doc.text("JABATAN TERAKHIR", curX + 3, y + 5.5);
        curX += colWidths.jabatan;
        doc.text("UNIT / RUANGAN", curX + 3, y + 5.5);
        curX += colWidths.unit;
        doc.text("STATUS", curX + 3, y + 5.5);
      };

      const drawFooter = (pageNum: number, totalPages: number) => {
        const y = pageHeight - 12;
        doc.setDrawColor(241, 245, 249); // slate-100
        doc.setLineWidth(0.3);
        doc.line(margin, y, pageWidth - margin, y);

        doc.setFont('helvetica', 'normal');
        doc.setFontSize(7.5);
        doc.setTextColor(148, 163, 184); // slate-400
        doc.text("Dokumen ini digenerasikan secara otomatis oleh SI-RSUD dr.H.Jusuf.SK Management System", margin, y + 5);
        doc.text(`Halaman ${pageNum} dari ${totalPages}`, pageWidth - margin, y + 5, { align: 'right' });
      };

      const rowHeight = 7.5;
      const maxPageY = 190;
      
      const pagesData: Employee[][] = [[]];
      let pageIndex = 0;
      let tempY = 55 + 8.5; // Starts at table header

      filteredEmployees.forEach((emp) => {
        if (tempY + rowHeight > maxPageY) {
          pageIndex++;
          pagesData[pageIndex] = [];
          tempY = 20 + 8.5; // Subsequent pages table
        }
        pagesData[pageIndex].push(emp);
        tempY += rowHeight;
      });

      const totalPagesCount = pagesData.length;

      pagesData.forEach((pageRows, index) => {
        const currentPageNum = index + 1;
        if (currentPageNum > 1) {
          doc.addPage();
        }

        drawHeader(currentPageNum);
        
        let tableHeaderY = currentPageNum === 1 ? 55 : 20;
        drawTableHeader(tableHeaderY);

        let rowY = tableHeaderY + 8.5;

        pageRows.forEach((emp, rIndex) => {
          const globalIndex = pagesData.slice(0, index).reduce((acc, currentList) => acc + currentList.length, 0) + rIndex + 1;

          if (globalIndex % 2 === 0) {
            doc.setFillColor(248, 250, 252); // slate-50
          } else {
            doc.setFillColor(255, 255, 255);
          }
          doc.rect(margin, rowY, contentWidth, rowHeight, 'F');

          doc.setDrawColor(241, 245, 249);
          doc.setLineWidth(0.1);
          doc.line(margin, rowY + rowHeight, pageWidth - margin, rowY + rowHeight);

          doc.setFont('helvetica', 'normal');
          doc.setFontSize(7.5);
          doc.setTextColor(51, 65, 85);

          let curX = margin;

          doc.text(String(globalIndex), curX + 2, rowY + 4.8);
          curX += colWidths.no;

          doc.setFont('helvetica', 'bold');
          doc.setTextColor(30, 41, 59);
          doc.text(getTruncatedText(emp.nama, colWidths.nama, 7.5), curX + 3, rowY + 4.8);
          curX += colWidths.nama;

          doc.setFont('helvetica', 'normal');
          doc.setTextColor(71, 85, 105);
          doc.text(emp.nip, curX + 3, rowY + 4.8);
          curX += colWidths.nip;

          doc.setFont('helvetica', 'bold');
          let jbgTypeColor = [71, 85, 105];
          if (emp.jenisKepegawaian === 'PNS') jbgTypeColor = [37, 99, 235];
          if (emp.jenisKepegawaian === 'P3K') jbgTypeColor = [13, 148, 136];
          
          doc.setTextColor(jbgTypeColor[0], jbgTypeColor[1], jbgTypeColor[2]);
          doc.text(emp.jenisKepegawaian || 'PNS', curX + 3, rowY + 4.8);
          curX += colWidths.jenis;

          doc.setFont('helvetica', 'normal');
          doc.setTextColor(71, 85, 105);
          doc.text(getTruncatedText(emp.jabatanTerakhir, colWidths.jabatan, 7.5), curX + 3, rowY + 4.8);
          curX += colWidths.jabatan;

          doc.text(getTruncatedText(emp.unitRuangan, colWidths.unit, 7.5), curX + 3, rowY + 4.8);
          curX += colWidths.unit;

          let statusText = emp.statusKepegawaian || 'Aktif';
          if (statusText === 'Aktif') {
            doc.setFont('helvetica', 'bold');
            doc.setTextColor(22, 163, 74);
          } else if (statusText === 'Cuti') {
            doc.setFont('helvetica', 'bold');
            doc.setTextColor(217, 119, 6);
          } else {
            doc.setFont('helvetica', 'bold');
            doc.setTextColor(79, 70, 229);
          }
          doc.text(statusText, curX + 3, rowY + 4.8);

          rowY += rowHeight;
        });

        doc.setDrawColor(203, 213, 225);
        doc.setLineWidth(0.2);
        doc.rect(margin, tableHeaderY, contentWidth, rowY - tableHeaderY);

        drawFooter(currentPageNum, totalPagesCount);
      });

      doc.save(`Roster_Pegawai_RSUD_dr_H_Jusuf_SK_${new Date().toISOString().split('T')[0]}.pdf`);
      showToast("Berhasil mencetak seluruh data pegawai dengan Kop Surat ke file PDF!", "success");
    } catch (error) {
      console.error("Gagal cetak PDF data pegawai:", error);
      showToast("Gagal menghasilkan dokumen PDF data pegawai", "error");
    }
  };

  // --- COMPILATION AID METHODS ---
  const handleCopyToClipboard = (text: string) => {
    if (!text) return;
    navigator.clipboard.writeText(text);
    setIsCopied(true);
    showToast("Draf berhasil disalin ke clipboard!", "success");
    setTimeout(() => setIsCopied(false), 2000);
  };

  const handleDownloadLetterAsTxt = (text: string) => {
    if (!text) return;
    const element = document.createElement("a");
    const file = new Blob([text], {type: 'text/plain'});
    element.href = URL.createObjectURL(file);
    element.download = `Draf_Surat_${letterType}_${new Date().toISOString().split('T')[0]}.txt`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
    showToast("Draf surat berhasil diunduh sebagai berkas teks!", "success");
  };

  const handleGenerateLetter = () => {
    const selectedEmp = employees.find(e => e.id === selectedLetterEmpId);
    if (!selectedEmp) {
      showToast("Silakan pilih pegawai terlebih dahulu!", "error");
      return;
    }
    
    const employeeDataText = `
- Nama: ${selectedEmp.nama}
- NIP: ${selectedEmp.nip || '---'}
- Pangkat/Golongan: ${selectedEmp.pangkat || '---'} (${selectedEmp.golongan || '---'})
- Jabatan: ${selectedEmp.jabatanTerakhir || '---'}
- Unit Kerja / Ruangan: ${selectedEmp.unitRuangan || '---'}
`;

    const inputContext = letterContext ? letterContext : "(Tidak ada instruksi tambahan dari admin)";
    const letterName = letterType === 'SK' ? 'Surat Keputusan (SK) Direktur' : letterType === 'Tugas' ? 'Surat Tugas' : 'Surat Peringatan';

    const formattedPrompt = `Anda adalah Sekretaris Tata Usaha RSUD dr.H.Jusuf.SK yang ahli dalam membuat dokumen birokrasi pemerintahan/rumah sakit.

Buat draf resmi untuk: ${letterName}.

Data Pegawai yang Dituju:
${employeeDataText}

Konteks/Instruksi Tambahan dari Admin:
"${inputContext}"

Instruksi Format Surat:
1. Gunakan bahasa Indonesia formal dan baku sesuai standar tata naskah dinas.
2. Susun bagian pembuka (Menimbang, Mengingat) jika itu berupa SK, atau langsung isi surat jika Surat Tugas.
3. Masukkan poin-poin penugasan/keputusan dengan jelas.
4. Akhiri dengan penutup, tempat (Tarakan), tanggal hari ini, dan ruang untuk tanda tangan Direktur RSUD dr.H.Jusuf.SK.
5. Keluarkan hanya teks draf suratnya saja tanpa obrolan basa-basi.`;

    handleAIConsultation(formattedPrompt);
  };

  const handleAnalyzeNursePatientRatio = () => {
    const perawatByRoom: { [room: string]: number } = {};
    employees.forEach(emp => {
      const isPerawat = emp.jabatanTerakhir?.toLowerCase().includes("perawat") || emp.bidang?.toLowerCase().includes("keperawatan");
      if (isPerawat) {
        const r = emp.unitRuangan || "Umum / Poliklinik";
        perawatByRoom[r] = (perawatByRoom[r] || 0) + 1;
      }
    });

    const roomsList = ["Ruangan ICU", "Instalasi Gawat Darurat (IGD)", "Ruangan Mawar", "Ruangan Melati", "Ruangan Dahlia", "Klinik Anak", "Klinik Bedah"];
    const wardData = roomsList.map(room => {
      const count = perawatByRoom[room] ?? (room.includes("ICU") ? 3 : room.includes("IGD") ? 5 : 4);
      let patientCount = 15;
      if (room.includes("ICU")) patientCount = 6;
      else if (room.includes("IGD")) patientCount = 22;
      else if (room.includes("Melati")) patientCount = 28;
      else if (room.includes("Dahlia")) patientCount = 18;
      return {
        nama_ruangan: room,
        jumlah_perawat_bertugas: count,
        jumlah_pasien: patientCount
      };
    });

    const formattedPrompt = `Anda adalah Analis SDM Rumah Sakit dan ahli dalam manajemen bangsal. Saya akan memberikan data jumlah pasien dan jumlah perawat yang bertugas di masing-masing ruangan (bangsal) di RSUD dr.H.Jusuf.SK.

Tugas Anda:
1. Hitung rasio perawat terhadap pasien untuk setiap ruangan.
2. Evaluasi apakah rasio tersebut memenuhi standar ideal (Asumsi standar: ICU 1:1 atau 1:2, UGD 1:2, Rawat Inap Reguler 1:4 hingga 1:6).
3. Identifikasi ruangan mana yang berstatus "Kritis" (kekurangan perawat) dan ruangan mana yang "Aman" atau "Berlebih".
4. Berikan rekomendasi singkat pemindahan/perbantuan (mutasi sementara) perawat dari ruangan yang berlebih ke ruangan yang kritis.
5. Sajikan dalam format laporan teks yang rapi, gunakan bullet points atau tabel markdown.

Data Ruangan:
${JSON.stringify(wardData, null, 2)}`;

    handleAIConsultation(formattedPrompt);
  };

  const handleDetectShiftDisparities = () => {
    const shiftData = employees
      .filter(emp => emp.jabatanTerakhir?.toLowerCase().includes("perawat") || emp.bidang?.toLowerCase().includes("keperawatan"))
      .slice(0, 15)
      .map(emp => {
        const isSenior = emp.golongan?.startsWith("IV") || emp.golongan?.startsWith("III/c") || emp.golongan?.startsWith("III/d") || emp.jabatanTerakhir?.toLowerCase().includes("penyelia") || emp.usiaTahun > 40;
        const level = isSenior ? "Senior (Katim)" : "Junior";
        
        const shifts: string[] = [];
        for (let day = 1; day <= 7; day++) {
          if (emp.id % 5 === 0) {
            shifts.push(day >= 2 && day <= 5 ? "Malam" : "Off");
          } else if (emp.id % 4 === 0) {
            shifts.push(day <= 5 ? "Pagi" : "Sore");
          } else {
            const rand = (emp.id + day) % 4;
            shifts.push(rand === 0 ? "Pagi" : rand === 1 ? "Sore" : rand === 2 ? "Malam" : "Off");
          }
        }
        
        return {
          id: emp.id,
          nama: emp.nama,
          kompetensi: level,
          unit: emp.unitRuangan,
          jadwal_shift_senin_minggu: shifts
        };
      });

    const formattedPrompt = `Anda adalah Auditor Manajemen Jadwal Rumah Sakit. Berikut adalah data jadwal shift tenaga medis/perawat RSUD dr.H.Jusuf.SK untuk minggu ini.

Tugas Anda: Analisis jadwal ini dan deteksi ketimpangan atau pelanggaran aturan beban kerja. Carilah anomali berikut:
1. Kekurangan Kompetensi: Shift (terutama malam) yang diisi sepenuhnya oleh perawat Junior tanpa pendampingan perawat Senior/Ketua Tim (Katim).
2. Beban Kerja Berlebih: Pegawai yang mendapat jadwal shift malam (Night Shift) lebih dari 3 kali berturut-turut, atau pegawai yang tidak memiliki waktu libur (off) minimal 1 hari setelah shift malam.
3. Distribusi Tidak Merata: Ruangan dengan penumpukan staf di shift pagi, tetapi sangat kekurangan staf di shift malam.

Berikan laporan "Temuan Ketimpangan" beserta nama pegawai/ruangan yang terdampak, dan berikan "Saran Perbaikan Jadwal".

Data Jadwal Shift:
${JSON.stringify(shiftData, null, 2)}`;

    handleAIConsultation(formattedPrompt);
  };

  const handleShowRetirementProjection5Years = () => {
    const rawEmployeeDataForPension = employees.slice(0, 25).map(emp => ({
      nama: emp.nama,
      usia: emp.usiaTahun,
      tanggal_lahir: emp.tanggalLahir,
      jabatan: emp.jabatanTerakhir,
      rumpun: emp.rumpunJabatan,
      golongan: emp.golongan
    }));

    const formattedPrompt = `Anda adalah Perencana Strategis SDM RSUD. Saya akan memberikan daftar pegawai RSUD beserta usia, jabatan, dan rumpun profesinya (Medis/Non-Medis).
Batas usia pensiun adalah: 58 Tahun untuk struktural/staf non-medis, 60 Tahun untuk pegawai BLUD, dokter, perawat/fungsional tertentu, dan 65 Tahun untuk dokter spesialis senior golongan IV.

Tugas Anda:
1. Analisis siapa saja pegawai yang akan memasuki masa pensiun dalam waktu 1 hingga 5 tahun ke depan dari tahun 2026.
2. Kelompokkan jumlah pegawai yang pensiun berdasarkan tahun (2026, 2027, 2028, dst) dan berdasarkan rumpun (Medis vs Non-Medis).
3. Identifikasi "Posisi Kritis" (misal: jika ada Dokter Spesialis Bedah atau Kepala Ruangan yang akan pensiun dalam 2 tahun).
4. Buat laporan ringkasan eksekutifnya. (Jika sistem meminta data grafik, keluarkan output dalam format JSON array yang berisi tahun dan jumlah pensiun medis/non-medis agar bisa diproses oleh frontend chart).

Data Pegawai:
${JSON.stringify(rawEmployeeDataForPension, null, 2)}`;

    handleAIConsultation(formattedPrompt);
  };

  // --- GEMINI COMPILATION ASSISTANT INTERACTION ---
  const handleAIConsultation = async (customPrompt?: string) => {
    const promptToUse = customPrompt || aiQuery;
    if (!promptToUse.trim()) {
      showToast("Pertanyaan konsultasi tidak boleh kosong!", "error");
      return;
    }

    setAiLoading(true);
    setAiResponseError('');
    setAiResponse('');

    // To prevent token overflow but give maximum utility, we send a lightweight roster:
    const compressedRoster = employees.map(({ nama, nip, gender, usiaTahun, golongan, jabatanTerakhir, unitRuangan, bidang, statusKepegawaian }) => ({
      nama, nip, gender, usia: usiaTahun, golongan, jabatan: jabatanTerakhir, unit: unitRuangan, bidang, status: statusKepegawaian
    }));

    try {
      const res = await fetch("/api/gemini", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          prompt: promptToUse,
          employees: compressedRoster
        })
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || "Gagal memproses insight kepegawaian.");
      }

      setAiResponse(data.text);
      setAiQuery('');
      showToast("Rekomendasi AI Sinergi berhasil dibuat!", "success");
    } catch (err: any) {
      console.error(err);
      setAiResponseError(err.message || "Gagal menghubungkan ke server AI. Coba lagi.");
      showToast("Gagal melakukan analisis AI", "error");
    } finally {
      setAiLoading(false);
    }
  };

  // Run automatically on 'consultant' view setup first time if clean
  useEffect(() => {
    if (activeTab === 'consultant' && isAiConfigured === true && !aiResponse && !aiLoading) {
      handleAIConsultation("Analisislah profil kepegawaian RSUD dr. H. Jusuf SK saat ini secara makro. Sebutkan ringkasan jumlah staf, sebaran perawat vs dokter, status kepegawaian PNS vs Non-PNS, serta 3 poin rekomendasi strategis untuk Direktur.");
    }
  }, [activeTab, isAiConfigured]);

  return (
    <div id="si-rsud" className="h-screen w-screen bg-slate-50 flex overflow-hidden font-sans text-slate-900 antialiased">
      {/* Toast Alert */}
      <AnimatePresence>
        {toast && (
          <motion.div 
            initial={{ opacity: 0, y: -50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.95 }}
            className={`fixed top-4 right-4 z-50 px-5 py-4 rounded-xl shadow-xl flex items-center gap-3 border text-sm max-w-md ${
              toast.type === 'success' ? 'bg-emerald-50 text-emerald-800 border-emerald-200' :
              toast.type === 'info' ? 'bg-blue-50 text-blue-800 border-blue-200' :
              'bg-rose-50 text-rose-800 border-rose-200'
            }`}
          >
            {toast.type === 'success' && <CheckCircle className="w-5 h-5 text-emerald-600 shrink-0" />}
            {toast.type === 'info' && <AlertCircle className="w-5 h-5 text-blue-600 shrink-0" />}
            {toast.type === 'error' && <AlertCircle className="w-5 h-5 text-rose-600 shrink-0" />}
            <span className="font-semibold">{toast.message}</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* --- NAVIGATION SIDEBAR --- */}
      <aside className="no-print w-56 md:w-[230px] bg-slate-900 text-slate-300 flex flex-col border-r border-slate-800 shrink-0">
        <div className="px-6 py-5 border-b border-slate-800/60">
          <div>
            <h1 className="text-white font-extrabold tracking-tight text-sm md:text-base leading-tight">RSUD dr.H.Jusuf.SK</h1>
            <p className="text-[9px] text-slate-400 uppercase tracking-widest mt-1.5 font-mono">Management System</p>
          </div>
        </div>
        
        <nav className="mt-4 flex-1 px-4 space-y-1">
          <button
            onClick={() => setActiveTab('dashboard')}
            className={`w-full p-3 rounded-lg flex items-center gap-3 transition-colors text-xs font-medium text-left ${
              activeTab === 'dashboard' ? 'bg-blue-600/10 text-blue-400 font-bold' : 'text-slate-400 hover:bg-slate-800 hover:text-white'
            }`}
          >
            <Sliders className="w-4.5 h-4.5" />
            <span>Dashboard</span>
          </button>

          <button
            onClick={() => setActiveTab('directory')}
            className={`w-full p-3 rounded-lg flex items-center gap-3 transition-colors text-xs font-medium text-left ${
              activeTab === 'directory' ? 'bg-blue-600/10 text-blue-400 font-bold' : 'text-slate-400 hover:bg-slate-800 hover:text-white'
            }`}
          >
            <Users className="w-4.5 h-4.5" />
            <span>Data Pegawai</span>
          </button>

          <button
            onClick={() => setActiveTab('pensiun')}
            className={`w-full p-3 rounded-lg flex items-center gap-3 transition-colors text-xs font-medium text-left ${
              activeTab === 'pensiun' ? 'bg-blue-600/10 text-blue-400 font-bold' : 'text-slate-400 hover:bg-slate-800 hover:text-white'
            }`}
          >
            <CalendarClock className="w-4.5 h-4.5" />
            <span>Jadwal Shift & Pensiun</span>
          </button>

          <button
            onClick={() => setActiveTab('badge')}
            className={`w-full p-3 rounded-lg flex items-center gap-3 transition-colors text-xs font-medium text-left ${
              activeTab === 'badge' ? 'bg-blue-600/10 text-blue-400 font-bold' : 'text-slate-400 hover:bg-slate-800 hover:text-white'
            }`}
          >
            <IdCard className="w-4.5 h-4.5" />
            <span>Cetak Kartu Pegawai</span>
          </button>

          <button
            onClick={() => setActiveTab('consultant')}
            className={`w-full p-3 rounded-lg flex items-center gap-3 transition-colors text-xs font-medium text-left ${
              activeTab === 'consultant' ? 'bg-blue-600/10 text-blue-400 font-bold' : 'text-slate-400 hover:bg-slate-800 hover:text-white'
            }`}
          >
            <BrainCircuit className="w-4.5 h-4.5 text-blue-500 animate-pulse" />
            <span>Analitik SDM & SK</span>
          </button>
        </nav>

        <div className="p-4 border-t border-slate-800">
          <div className="bg-slate-800 p-4 rounded-xl">
            <p className="text-xs text-slate-400">System Version</p>
            <p className="text-sm font-mono text-blue-400">v4.2.1-stable</p>
          </div>
        </div>
      </aside>

      {/* --- MAIN VIEW --- */}
      <main className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="h-20 bg-white border-b border-slate-200 px-6 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-4">
            <h2 className="text-xl font-bold text-slate-800">
              {activeTab === 'dashboard' ? 'Ringkasan Kepegawaian' : 
               activeTab === 'directory' ? 'Data Roster Pegawai' :
               activeTab === 'pensiun' ? 'Perencanaan & Batas Pensiun' :
               activeTab === 'badge' ? 'ID Badge Generator' :
               'Konsultan AI Sinergi'}
            </h2>
            <div className="h-6 w-[1px] bg-slate-200"></div>
            
            <div className="flex items-center gap-3 bg-slate-50 border border-slate-100 shadow-2xs px-3.5 py-1.5 rounded-full select-none">
              <span className="flex h-2 w-2 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              <div className="flex items-center gap-2 font-mono text-[11px] font-semibold text-slate-600">
                <Clock className="w-3.5 h-3.5 text-blue-600 animate-pulse" />
                <span className="text-slate-800 font-bold tracking-tight font-sans">{formattedTime.dateString}</span>
                <span className="text-slate-300">|</span>
                <span className="bg-slate-950 text-emerald-400 px-2 py-0.5 rounded font-bold text-[11px] tabular-nums tracking-widest border border-slate-800 shadow-xs">{formattedTime.timeString}</span>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-6">
            <div className="text-xs text-slate-400 font-semibold">
              Total Pegawai: <strong className="text-blue-600 font-bold">{employees.length}</strong>
            </div>
            <div className="flex gap-2">
              <button 
                onClick={handleResetToPDF} 
                className="border border-blue-200 hover:bg-blue-55 text-blue-600 active:scale-95 transition px-4 py-2 rounded-lg text-xs font-bold flex items-center gap-2 bg-white shadow-sm"
                title="Memuat ulang 45 data pegawai PNS resmi sesuai PDF Dokter & Tenaga Kesehatan RSUD Dr. H. Jusuf SK"
              >
                <RefreshCw className="w-4 h-4" />
                <span>Reset Data PDF</span>
              </button>
              <button 
                onClick={() => setIsAdding(true)} 
                className="bg-blue-600 hover:bg-blue-700 active:scale-95 transition text-white px-4 py-2 rounded-lg text-xs font-bold flex items-center gap-2 shadow-sm"
              >
                <UserPlus className="w-4 h-4" />
                <span>Daftar Pegawai Baru</span>
              </button>
              <button 
                onClick={() => {
                  setExcelUploadTargetType('AUTO');
                  setIsExcelModalOpen(true);
                }} 
                className="bg-emerald-600 hover:bg-emerald-700 active:scale-95 transition text-white px-4 py-2 rounded-lg text-xs font-bold flex items-center gap-2 shadow-sm"
                title="Unggah dokumen Excel/Spreadsheet (.xlsx, .xls) untuk sinkronisasi otomatis"
              >
                <Upload className="w-4 h-4" />
                <span>Unggah Excel</span>
              </button>
              <button 
                onClick={handleInjectDemoData}
                className="bg-purple-600 hover:bg-purple-700 active:scale-95 transition text-white px-4 py-2 rounded-lg text-xs font-bold flex items-center gap-2 shadow-sm"
                title="Isi database dengan 50 data pegawai fiktif untuk demo gratis"
              >
                <Sparkles className="w-4 h-4" />
                <span>Isi Data Demo</span>
              </button>
            </div>
          </div>
        </header>

        {/* Content Container */}
        <div className="p-6 flex-1 overflow-y-auto flex flex-col gap-6">
          {/* TAB 1: DASHBOARD ANALITIK */}
          {activeTab === 'dashboard' && (
          <div className="flex flex-col gap-6 flex-1 overflow-y-auto">
            {/* KPI STATS CARDS */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              <div id="kpi-total" className="bg-white p-5 rounded-2xl shadow-xs border border-slate-100 flex items-center justify-between">
                <div>
                  <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Total Pegawai</p>
                  <p className="text-2xl font-black font-display text-slate-800 mt-1">{stats.total}</p>
                  <div className="text-slate-400 text-[10px] mt-1">Durable PNS database</div>
                </div>
                <div className="p-3 bg-blue-50 text-blue-600 rounded-xl">
                  <Users className="w-6 h-6" />
                </div>
              </div>

              <div id="kpi-active" className="bg-white p-5 rounded-2xl shadow-xs border border-slate-100 flex items-center justify-between">
                <div>
                  <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Pegawai Aktif</p>
                  <p className="text-2xl font-black font-display text-slate-800 mt-1">{stats.active}</p>
                  <div className="text-emerald-600 text-[10px] font-semibold mt-1">● {stats.total === 0 ? 0 : Math.round((stats.active/stats.total)*100)}% Melayani Medis</div>
                </div>
                <div className="p-3 bg-emerald-50 text-emerald-600 rounded-xl">
                  <UserCheck className="w-6 h-6" />
                </div>
              </div>

              <div id="kpi-pensiun" className="bg-white p-5 rounded-2xl shadow-xs border border-slate-100 flex items-center justify-between">
                <div>
                  <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Masa Pensiun &lt;3 Th</p>
                  <p className="text-2xl font-black font-display text-slate-800 mt-1">{criticalRetirements.length}</p>
                  <div className="text-amber-600 text-[10px] font-semibold mt-1">Butuh Suksesi Staf</div>
                </div>
                <div className="p-3 bg-amber-50 text-amber-600 rounded-xl">
                  <CalendarClock className="w-6 h-6" />
                </div>
              </div>

              <div id="kpi-demografi" className="bg-white p-5 rounded-2xl shadow-xs border border-slate-100 flex items-center justify-between">
                <div>
                  <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Rata-rata Usia</p>
                  <p className="text-2xl font-black font-display text-slate-800 mt-1">{stats.avgAge} <span className="text-xs font-normal text-slate-400">Tahun</span></p>
                  <div className="text-indigo-600 text-[10px] font-semibold mt-1">L: {stats.percentL}% | P: {stats.percentP}%</div>
                </div>
                <div className="p-3 bg-indigo-50 text-indigo-600 rounded-xl">
                  <Sliders className="w-6 h-6" />
                </div>
              </div>
            </div>

            {/* DEMOGRAPHICS & CHARTS PANEL */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              
              {/* CHART 1: AGE GROUP DISTRIBUTION */}
              <div id="card-age-chart" className="lg:col-span-2 bg-white p-6 rounded-2xl border border-slate-100 shadow-xs flex flex-col">
                <div className="flex justify-between items-center mb-4">
                  <div>
                    <h3 className="text-sm font-extrabold text-slate-800">Distribusi Kelompok Usia</h3>
                    <p className="text-xs text-slate-400">Analisis sebaran produktivitas sumber daya manusia</p>
                  </div>
                  <span className="text-xs font-semibold px-2 py-1 rounded-md bg-slate-100 text-slate-600">Recharts Grid</span>
                </div>
                <div className="flex-1 min-h-[300px] flex items-center justify-center">
                  {employees.length === 0 ? (
                    <div className="text-center p-6 flex flex-col items-center justify-center gap-2">
                      <HelpCircle className="w-8 h-8 text-slate-300 animate-pulse" />
                      <p className="text-xs font-semibold text-slate-400">Data belum tersedia. Silakan unggah data pegawai.</p>
                    </div>
                  ) : (
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={chartAgeData}>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} />
                        <XAxis dataKey="name" tick={{ fontSize: 10 }} />
                        <YAxis tick={{ fontSize: 10 }} />
                        <Tooltip />
                        <Bar dataKey="jumlah" fill="#2563eb" name="Jumlah Staff" radius={[4, 4, 0, 0]} />
                      </BarChart>
                    </ResponsiveContainer>
                  )}
                </div>
              </div>

              {/* STATS PANEL: GENDER & STATUS DISTRIBUTION */}
              <div id="card-department-chart" className="bg-white p-6 rounded-2xl border border-slate-100 shadow-xs flex flex-col justify-between">
                <div className="mb-4">
                  <h3 className="text-sm font-extrabold text-slate-800">Pembagian Rumpun Jabatan</h3>
                  <p className="text-xs text-slate-400">Pembagian tugas operasional RSUD</p>
                </div>

                <div className="h-[200px] relative flex justify-center items-center">
                  {employees.length === 0 ? (
                    <div className="text-center p-6 flex flex-col items-center justify-center gap-2">
                      <HelpCircle className="w-8 h-8 text-slate-300 animate-pulse" />
                      <p className="text-xs font-semibold text-slate-400">Data belum tersedia. Silakan unggah data pegawai.</p>
                    </div>
                  ) : (
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={chartRumpunData}
                          cx="50%"
                          cy="50%"
                          innerRadius={60}
                          outerRadius={80}
                          paddingAngle={5}
                          dataKey="value"
                        >
                          {chartRumpunData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={PIE_COLORS[index % PIE_COLORS.length]} />
                          ))}
                        </Pie>
                        <Tooltip />
                      </PieChart>
                    </ResponsiveContainer>
                  )}
                </div>

                {/* Legend list */}
                {employees.length > 0 && (
                  <div className="grid grid-cols-2 gap-2 mt-4 text-[10px] text-slate-500 font-semibold max-h-[100px] overflow-y-auto">
                    {chartRumpunData.map((entry, idx) => (
                      <div key={entry.name} className="flex items-center gap-1.5">
                        <span className="w-2.5 h-2.5 rounded-xs shrink-0" style={{ backgroundColor: PIE_COLORS[idx % PIE_COLORS.length] }}></span>
                        <span className="truncate">{entry.name}: {entry.value}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* PNS LEVEL CHART representation */}
              <div id="card-pns-level" className="bg-white p-6 rounded-2xl border border-slate-100 shadow-xs">
                <div className="mb-4">
                  <h3 className="text-sm font-extrabold text-slate-800">Komposisi Golongan PNS</h3>
                  <p className="text-xs text-slate-400">Analisis kepangkatan kualifikasi kedinasan</p>
                </div>
                <div className="flex flex-col gap-4 justify-center">
                  {employees.length === 0 ? (
                    <div className="text-center py-12 flex flex-col items-center justify-center gap-2">
                      <HelpCircle className="w-8 h-8 text-slate-300 animate-pulse" />
                      <p className="text-xs font-semibold text-slate-400">Data belum tersedia. Silakan unggah data pegawai.</p>
                    </div>
                  ) : (
                    chartGolonganData.map((gol, idx) => {
                      const percentage = Math.round((gol.value / stats.total) * 100) || 0;
                      return (
                        <div key={gol.name}>
                          <div className="flex justify-between text-xs font-bold text-slate-600 mb-1.5">
                            <span>{gol.name}</span>
                            <span>{gol.value} Pegawai ({percentage}%)</span>
                          </div>
                          <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                            <div 
                              className="bg-blue-600 h-full rounded-full transition-all duration-1000"
                              style={{ width: `${percentage}%` }}
                            ></div>
                          </div>
                        </div>
                      );
                    })
                  )}
                </div>
              </div>

              {/* CLINIC/UNIT CAPACITIES (KEHADIRAN HARI INI) */}
              <div id="card-clinics" className="bg-white p-6 rounded-2xl border border-slate-100 shadow-xs flex flex-col justify-between">
                <div>
                  <h3 className="text-sm font-extrabold text-slate-800">Kehadiran Hari Ini</h3>
                  <p className="text-xs text-slate-400">Pegawai yang sedang dinas aktif, cuti, atau tugas belajar</p>
                </div>
                
                <div className="flex justify-around items-center py-4 bg-slate-50/50 rounded-xl my-3 border border-slate-100">
                  <div className="text-center">
                    <span className="text-2xl font-black text-emerald-600">{stats.active}</span>
                    <p className="text-[9px] font-extrabold text-slate-400 uppercase tracking-wider mt-1">Aktif Melayani</p>
                  </div>
                  <div className="h-8 w-px bg-slate-200"></div>
                  <div className="text-center">
                    <span className="text-2xl font-black text-rose-500">{stats.cuti}</span>
                    <p className="text-[9px] font-extrabold text-slate-400 uppercase tracking-wider mt-1">Sedang Cuti</p>
                  </div>
                  <div className="h-8 w-px bg-slate-200"></div>
                  <div className="text-center">
                    <span className="text-2xl font-black text-indigo-500">{stats.tugasBelajar}</span>
                    <p className="text-[9px] font-extrabold text-slate-400 uppercase tracking-wider mt-1">Tugas Belajar</p>
                  </div>
                </div>

                {/* List detail of leave & study assignments */}
                <div className="flex-1 flex flex-col min-h-[160px] my-1">
                  <span className="text-[10px] font-extrabold text-slate-400 uppercase tracking-wider mb-2 block">Daftar Pegawai Non-Aktif Hari Ini</span>
                  {absentEmployees.length === 0 ? (
                    <div className="flex-1 flex flex-col items-center justify-center p-4 bg-slate-50/40 rounded-xl border border-dashed border-slate-200 text-center">
                      <CheckCircle className="w-5 h-5 text-emerald-500 mb-1" />
                      <p className="text-xs text-slate-700 font-bold">Semua Staf Hadir</p>
                      <p className="text-[9.5px] text-slate-400">Seluruh pegawai sedang berdinas aktif melayani hari ini.</p>
                    </div>
                  ) : (
                    <div className="space-y-2 max-h-[150px] overflow-y-auto pr-1">
                      {absentEmployees.map(emp => (
                        <div key={emp.id} className="flex items-center justify-between p-2 hover:bg-slate-50 rounded-lg border border-slate-50 transition-all text-xs">
                          <div className="flex items-center gap-2 min-w-0">
                            <div className={`w-7 h-7 rounded-md flex items-center justify-center font-bold text-[10px] shrink-0 select-none ${
                              emp.statusKepegawaian === 'Cuti' 
                                ? 'bg-rose-50 text-rose-700 border border-rose-100' 
                                : 'bg-indigo-50 text-indigo-700 border border-indigo-100'
                            }`}>
                              {emp.nama.replace('dr.', '').replace('Ns.', '').slice(0, 2).trim().toUpperCase()}
                            </div>
                            <div className="min-w-0">
                              <p className="font-bold text-slate-800 truncate" title={emp.nama}>{emp.nama}</p>
                              <p className="text-[9px] text-slate-450 truncate" title={emp.unitRuangan}>{emp.unitRuangan}</p>
                            </div>
                          </div>
                          <span className={`text-[9px] font-extrabold px-2 py-0.5 rounded-full select-none shrink-0 ${
                            emp.statusKepegawaian === 'Cuti'
                              ? 'bg-rose-100/70 text-rose-700 border border-rose-200/40'
                              : 'bg-indigo-100/70 text-indigo-700 border border-indigo-200/40'
                          }`}>
                            {emp.statusKepegawaian === 'Cuti' ? 'Cuti' : 'Tugas Belajar'}
                          </span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                <div className="bg-amber-50 p-2.5 rounded-xl border border-amber-200/80 text-[10px] text-amber-800 flex gap-1.5 items-center mt-2">
                  <AlertCircle className="w-3.5 h-3.5 shrink-0 text-amber-650" />
                  <span>Status otomatis terhubung dengan direktori kepegawaian RSUD.</span>
                </div>
              </div>

              {/* STATUS SERTIFIKASI & PELATIHAN TERAKHIR */}
              <div id="card-certifications" className="bg-white p-6 rounded-2xl border border-slate-100 shadow-xs flex flex-col justify-between">
                <div>
                  <h3 className="text-sm font-extrabold text-slate-800">Sertifikasi & Pelatihan Terakhir</h3>
                  <p className="text-xs text-slate-400">Pegawai dengan riwayat diklat atau sertifikasi pada sistem</p>
                </div>

                <div className="flex justify-around items-center py-4 bg-slate-50/50 rounded-xl my-3 border border-slate-100">
                  <div className="text-center">
                    <span className="text-2xl font-black text-blue-600">{certStats.withCert}</span>
                    <p className="text-[9px] font-extrabold text-slate-400 uppercase tracking-wider mt-1">Tersertifikasi</p>
                  </div>
                  <div className="h-8 w-px bg-slate-200"></div>
                  <div className="text-center">
                    <span className="text-2xl font-black text-slate-400">{certStats.withoutCert}</span>
                    <p className="text-[9px] font-extrabold text-slate-400 uppercase tracking-wider mt-1">Belum Tercatat</p>
                  </div>
                  <div className="h-8 w-px bg-slate-200"></div>
                  <div className="text-center">
                    <span className="text-2xl font-black text-indigo-500">{certStats.percentage}%</span>
                    <p className="text-[9px] font-extrabold text-slate-400 uppercase tracking-wider mt-1">Rasio Kesiapan</p>
                  </div>
                </div>

                {/* Search input inside card */}
                <div className="relative mb-2 shrink-0">
                  <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    placeholder="Cari sertifikasi atau staf..."
                    value={certSearchTerm}
                    onChange={(e) => setCertSearchTerm(e.target.value)}
                    className="w-full pl-8 pr-3 py-1.5 border border-slate-200 rounded-xl text-[11.5px] focus:outline-none focus:ring-1 focus:ring-blue-500 bg-slate-50"
                  />
                  {certSearchTerm && (
                    <button
                      onClick={() => setCertSearchTerm('')}
                      className="absolute right-2.5 top-1/2 -translate-y-1/2 font-bold text-[10px] text-slate-400 hover:text-slate-600"
                    >
                      ×
                    </button>
                  )}
                </div>

                {/* List detail of certifications */}
                <div className="flex-1 flex flex-col min-h-[160px] my-1">
                  <span className="text-[10px] font-extrabold text-slate-400 uppercase tracking-wider mb-2 block">Daftar Kualifikasi Staf</span>
                  {certEmployees.length === 0 ? (
                    <div className="flex-1 flex flex-col items-center justify-center p-4 bg-slate-50/40 rounded-xl border border-dashed border-slate-200 text-center">
                      <Inbox className="w-5 h-5 text-slate-300 mb-1" />
                      <p className="text-xs text-slate-600 font-bold">Tidak Ada Data</p>
                      <p className="text-[9.5px] text-slate-400">Tidak ada data pelatihan cocok dengan pencarian.</p>
                    </div>
                  ) : (
                    <div className="space-y-2 max-h-[150px] overflow-y-auto pr-1">
                      {certEmployees.map(({ emp, certName }) => (
                        <div key={emp.id} className="flex items-center justify-between p-2 hover:bg-slate-50 rounded-lg border border-slate-50 transition-all text-xs">
                          <div className="flex items-center gap-2 min-w-0 flex-1">
                            <div className="w-7 h-7 rounded-md flex items-center justify-center font-bold text-[10px] bg-blue-50 text-blue-700 border border-blue-100 shrink-0 select-none">
                              {emp.nama.replace('dr.', '').replace('Ns.', '').slice(0, 2).trim().toUpperCase()}
                            </div>
                            <div className="min-w-0 flex-1">
                              <p className="font-bold text-slate-800 truncate text-[11px]" title={emp.nama}>{emp.nama}</p>
                              <p className="text-[10px] text-blue-600 font-semibold truncate leading-tight mt-0.5" title={certName}>{certName}</p>
                            </div>
                          </div>
                          <span className="text-[9px] text-slate-400 shrink-0 bg-slate-100 px-1.5 py-0.5 rounded-sm ml-2 font-mono whitespace-nowrap" title={emp.unitRuangan}>
                            {emp.unitRuangan.length > 9 ? emp.unitRuangan.slice(0, 9) + '..' : emp.unitRuangan}
                          </span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                <div className="bg-blue-50 p-2.5 rounded-xl border border-blue-200/40 text-[10px] text-blue-800 flex gap-1.5 items-center mt-2 shrink-0">
                  <Award className="w-4 h-4 text-blue-600 shrink-0" />
                  <span>Tekan edit pegawai di tabel untuk memperbarui keterangan sertifikasi.</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: DIREKTORI PEGAWAI */}
        {activeTab === 'directory' && (
          <div className="flex-1 flex flex-col lg:flex-row gap-6 overflow-hidden">
            
            {/* FRONT DIRECTORY GRID PANEL */}
            <div className="flex-1 bg-white p-5 rounded-2xl border border-slate-100 shadow-xs flex flex-col gap-4 overflow-hidden">
              
              {/* DIRECTORY BAR (SEARCH & EXPORT) */}
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                  <h3 className="text-sm font-extrabold text-slate-800">Roster Staff RSUD</h3>
                  <p className="text-xs text-slate-400">database filterable fungsional pegawai</p>
                </div>
                
                {/* Search box */}
                <div className="flex flex-wrap items-center gap-2">
                  <div className="relative">
                    <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      placeholder="Cari Pegawai, NIP, Jabatan..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-9 pr-4 py-2 border border-slate-200 rounded-xl text-xs w-64 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-slate-55"
                    />
                  </div>
                  <button
                    onClick={handleExportCSV}
                    className="p-2 border border-slate-200 hover:bg-slate-50 transition text-slate-600 rounded-xl text-xs flex items-center gap-1.5"
                    title="Export filtered to CSV"
                  >
                    <FileSpreadsheet className="w-4 h-4 text-emerald-600" />
                    <span className="hidden sm:inline">Unduh Spreadsheet CSV</span>
                  </button>

                  <button
                    onClick={handleExportPDF}
                    className="p-2 border border-rose-200 bg-rose-50/40 hover:bg-rose-100/60 transition text-rose-750 font-bold rounded-xl text-xs flex items-center gap-1.5 cursor-pointer shadow-xs"
                    title="Cetak seluruh data berfilter ke PDF resmi dengan Kop Surat instansi"
                  >
                    <Printer className="w-4 h-4 text-rose-600" />
                    <span>Cetak PDF Laporan</span>
                  </button>

                  <button
                    onClick={handleBackupExportJSON}
                    className="p-2 border border-blue-200 bg-blue-50/40 hover:bg-blue-100/60 transition text-blue-750 font-bold rounded-xl text-xs flex items-center gap-1.5 cursor-pointer shadow-xs"
                    title="Ekspor seluruh database lengkap ke file .json untuk backup manual"
                  >
                    <Download className="w-4 h-4 text-blue-600" />
                    <span>Backup JSON</span>
                  </button>

                  <label
                    className="p-2 border border-slate-200 bg-white hover:bg-slate-50 hover:border-slate-300 transition text-slate-705 font-bold rounded-xl text-xs flex items-center gap-1.5 cursor-pointer shadow-xs"
                    title="Unggah file cadangan .json untuk memulihkan seluruh database"
                  >
                    <Upload className="w-4 h-4 text-indigo-600" />
                    <span>Pulihkan JSON</span>
                    <input 
                      type="file" 
                      accept=".json" 
                      onChange={handleBackupImportJSON} 
                      className="hidden" 
                    />
                  </label>
                  {checkedEmpIds.length > 0 && (
                    <button
                      onClick={handleDeleteChecked}
                      className="p-2 bg-rose-600 hover:bg-rose-750 active:scale-95 text-white font-bold transition-all rounded-xl text-xs flex items-center gap-1.5 shadow-sm"
                      title="Hapus Pegawai yang Diconteng"
                    >
                      <Trash2 className="w-4 h-4 text-white" />
                      <span>Hapus ({checkedEmpIds.length}) Diconteng</span>
                    </button>
                  )}
                  <button
                    onClick={handleDeleteAllInFolder}
                    className="p-2 border border-rose-200 bg-rose-50 hover:bg-rose-100 transition text-rose-750 rounded-xl text-xs flex items-center gap-1.5 font-bold shadow-xs cursor-pointer"
                    title={`Hapus semua pegawai dalam folder yang sedang aktif (${selectedFolderType === 'ALL' ? 'Semua Berkas' : selectedFolderType})`}
                  >
                    <Trash2 className="w-4 h-4 text-rose-600" />
                    <span>Kosongkan Folder ({
                      selectedFolderType === 'ALL' ? stats.total :
                      selectedFolderType === 'PNS' ? stats.countPNS :
                      selectedFolderType === 'P3K' ? stats.countP3K :
                      stats.countBLUD
                    })</span>
                  </button>
                </div>
              </div>

              {/* VISUAL FOLDERS SEPARATORS (PNS, P3K, BLUD) */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 p-0.5">
                {/* Folder ALL */}
                <div
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      setSelectedFolderType('ALL');
                    }
                  }}
                  onClick={() => setSelectedFolderType('ALL')}
                  className={`flex flex-col justify-between p-3.5 rounded-2xl border transition-all text-left relative cursor-pointer select-none outline-hidden min-h-[110px] ${
                    selectedFolderType === 'ALL'
                      ? 'bg-slate-900 text-white border-slate-900 shadow-md ring-2 ring-slate-300'
                      : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                  }`}
                >
                  <div className="flex items-center justify-between w-full">
                    <div className={`p-1.5 rounded-lg ${selectedFolderType === 'ALL' ? 'bg-slate-800 text-slate-200' : 'bg-slate-200/60 text-slate-650'}`}>
                      {selectedFolderType === 'ALL' ? <Folders className="w-4 h-4 animate-pulse" /> : <Folder className="w-4 h-4" />}
                    </div>
                    <span className={`font-mono text-[9px] font-extrabold px-2 py-0.5 rounded-full ${
                      selectedFolderType === 'ALL' ? 'bg-white/20 text-white' : 'bg-slate-200 text-slate-700'
                    }`}>
                      {stats.total}
                    </span>
                  </div>
                  <div className="mt-2.5">
                    <h4 className="text-[11px] font-black tracking-tight uppercase leading-none truncate">Semua Berkas</h4>
                    <p className="text-[9px] mt-1 opacity-70 truncate">Seluruh Pegawai</p>
                  </div>
                  <div className="mt-2 flex justify-end">
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        setExcelUploadTargetType('AUTO');
                        setIsExcelModalOpen(true);
                      }}
                      className={`py-0.5 px-2 rounded-lg border transition-all flex items-center gap-1 hover:scale-105 active:scale-95 text-[9px] font-bold shadow-xs cursor-pointer ${
                        selectedFolderType === 'ALL'
                          ? 'bg-white text-slate-900 border-white hover:bg-slate-100'
                          : 'bg-slate-800 text-white border-slate-700 hover:bg-slate-900'
                      }`}
                      title="Unggah Excel Umum (Deteksi otomatis)"
                    >
                      <Upload className="w-2.5 h-2.5" />
                      <span>Unggah</span>
                    </button>
                  </div>
                </div>

                {/* Folder PNS */}
                <div
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      setSelectedFolderType('PNS');
                    }
                  }}
                  onClick={() => setSelectedFolderType('PNS')}
                  className={`flex flex-col justify-between p-3.5 rounded-2xl border transition-all text-left relative cursor-pointer select-none outline-hidden min-h-[110px] ${
                    selectedFolderType === 'PNS'
                      ? 'bg-blue-600 text-white border-blue-600 shadow-md ring-2 ring-blue-300'
                      : 'bg-blue-50/40 text-blue-900 border-blue-100 hover:bg-blue-50/80'
                  }`}
                >
                  <div className="flex items-center justify-between w-full">
                    <div className={`p-1.5 rounded-lg ${selectedFolderType === 'PNS' ? 'bg-blue-800 text-blue-100' : 'bg-blue-100 text-blue-650'}`}>
                      {selectedFolderType === 'PNS' ? <FolderOpen className="w-4 h-4" /> : <Folder className="w-4 h-4" />}
                    </div>
                    <span className={`font-mono text-[9px] font-extrabold px-2 py-0.5 rounded-full ${
                      selectedFolderType === 'PNS' ? 'bg-white/20 text-white' : 'bg-blue-100 text-blue-850'
                    }`}>
                      {stats.countPNS}
                    </span>
                  </div>
                  <div className="mt-2.5">
                    <h4 className="text-[11px] font-black tracking-tight uppercase leading-none truncate">Berkas PNS</h4>
                    <p className="text-[9px] mt-1 opacity-70 truncate">Negeri Sipil</p>
                  </div>
                  <div className="mt-2 flex justify-end">
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        setExcelUploadTargetType('PNS');
                        setIsExcelModalOpen(true);
                      }}
                      className={`py-0.5 px-2 rounded-lg border transition-all flex items-center gap-1 hover:scale-105 active:scale-95 text-[9px] font-bold shadow-xs cursor-pointer ${
                        selectedFolderType === 'PNS'
                          ? 'bg-white text-blue-700 border-white hover:bg-slate-150'
                          : 'bg-blue-600 text-white border-blue-650 hover:bg-blue-700'
                      }`}
                      title="Unggah Excel Khusus PNS"
                    >
                      <Upload className="w-2.5 h-2.5" />
                      <span>Unggah</span>
                    </button>
                  </div>
                </div>

                {/* Folder P3K */}
                <div
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      setSelectedFolderType('P3K');
                    }
                  }}
                  onClick={() => setSelectedFolderType('P3K')}
                  className={`flex flex-col justify-between p-3.5 rounded-2xl border transition-all text-left relative cursor-pointer select-none outline-hidden min-h-[110px] ${
                    selectedFolderType === 'P3K'
                      ? 'bg-amber-600 text-white border-amber-600 shadow-md ring-2 ring-amber-300'
                      : 'bg-amber-50/40 text-amber-900 border-amber-100 hover:bg-amber-50/80'
                  }`}
                >
                  <div className="flex items-center justify-between w-full">
                    <div className={`p-1.5 rounded-lg ${selectedFolderType === 'P3K' ? 'bg-amber-800 text-amber-100' : 'bg-amber-100 text-amber-650'}`}>
                      {selectedFolderType === 'P3K' ? <FolderOpen className="w-4 h-4" /> : <Folder className="w-4 h-4" />}
                    </div>
                    <span className={`font-mono text-[9px] font-extrabold px-2 py-0.5 rounded-full ${
                      selectedFolderType === 'P3K' ? 'bg-white/20 text-white' : 'bg-amber-100 text-amber-850'
                    }`}>
                      {stats.countP3K}
                    </span>
                  </div>
                  <div className="mt-2.5">
                    <h4 className="text-[11px] font-black tracking-tight uppercase leading-none truncate">Berkas P3K</h4>
                    <p className="text-[9px] mt-1 opacity-70 truncate">Perjanjian Kerja</p>
                  </div>
                  <div className="mt-2 flex justify-end">
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        setExcelUploadTargetType('P3K');
                        setIsExcelModalOpen(true);
                      }}
                      className={`py-0.5 px-2 rounded-lg border transition-all flex items-center gap-1 hover:scale-105 active:scale-95 text-[9px] font-bold shadow-xs cursor-pointer ${
                        selectedFolderType === 'P3K'
                          ? 'bg-white text-amber-700 border-white hover:bg-slate-150'
                          : 'bg-amber-600 text-white border-amber-650 hover:bg-amber-700'
                      }`}
                      title="Unggah Excel Khusus PPPK/P3K"
                    >
                      <Upload className="w-2.5 h-2.5" />
                      <span>Unggah</span>
                    </button>
                  </div>
                </div>

                {/* Folder BLUD */}
                <div
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      setSelectedFolderType('BLUD');
                    }
                  }}
                  onClick={() => setSelectedFolderType('BLUD')}
                  className={`flex flex-col justify-between p-3.5 rounded-2xl border transition-all text-left relative cursor-pointer select-none outline-hidden min-h-[110px] ${
                    selectedFolderType === 'BLUD'
                      ? 'bg-emerald-600 text-white border-emerald-600 shadow-md ring-2 ring-emerald-350'
                      : 'bg-emerald-50/40 text-emerald-950 border-emerald-100 hover:bg-emerald-50/80'
                  }`}
                >
                  <div className="flex items-center justify-between w-full">
                    <div className={`p-1.5 rounded-lg ${selectedFolderType === 'BLUD' ? 'bg-emerald-800 text-emerald-100' : 'bg-emerald-100 text-emerald-650'}`}>
                      {selectedFolderType === 'BLUD' ? <FolderOpen className="w-4 h-4" /> : <Folder className="w-4 h-4" />}
                    </div>
                    <span className={`font-mono text-[9px] font-extrabold px-2 py-0.5 rounded-full ${
                      selectedFolderType === 'BLUD' ? 'bg-white/20 text-white' : 'bg-emerald-100 text-emerald-850'
                    }`}>
                      {stats.countBLUD}
                    </span>
                  </div>
                  <div className="mt-2.5">
                    <h4 className="text-[11px] font-black tracking-tight uppercase leading-none truncate">Berkas BLUD</h4>
                    <p className="text-[9px] mt-1 opacity-70 truncate">Layanan Daerah</p>
                  </div>
                  <div className="mt-2 flex justify-end">
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        setExcelUploadTargetType('BLUD');
                        setIsExcelModalOpen(true);
                      }}
                      className={`py-0.5 px-2 rounded-lg border transition-all flex items-center gap-1 hover:scale-105 active:scale-95 text-[9px] font-bold shadow-xs cursor-pointer ${
                        selectedFolderType === 'BLUD'
                          ? 'bg-white text-emerald-700 border-white hover:bg-slate-150'
                          : 'bg-emerald-600 text-white border-emerald-650 hover:bg-emerald-700'
                      }`}
                      title="Unggah Excel Khusus BLUD"
                    >
                      <Upload className="w-2.5 h-2.5" />
                      <span>Unggah</span>
                    </button>
                  </div>
                </div>
              </div>

              {/* FILTERS RAIL */}
              <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-100 grid grid-cols-2 md:grid-cols-5 gap-3.5">
                <div>
                  <label className="block text-[10px] font-bold text-slate-400 uppercase mb-1">Gender</label>
                  <select 
                    value={filterGender} 
                    onChange={(e) => setFilterGender(e.target.value)}
                    className="w-full bg-white border border-slate-200 rounded-lg text-xs py-1.5 px-2 focus:outline-blue-500"
                  >
                    <option value="ALL">Semua Gender</option>
                    <option value="L">Laki-Laki (L)</option>
                    <option value="P">Perempuan (P)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[10px] font-bold text-slate-400 uppercase mb-1">Golongan</label>
                  <select 
                    value={filterGolongan} 
                    onChange={(e) => setFilterGolongan(e.target.value)}
                    className="w-full bg-white border border-slate-200 rounded-lg text-xs py-1.5 px-2 focus:outline-blue-500"
                  >
                    <option value="ALL">Semua Golongan</option>
                    {uniqueGolongans.map(g => <option key={g} value={g}>{g}</option>)}
                  </select>
                </div>

                <div>
                  <label className="block text-[10px] font-bold text-slate-400 uppercase mb-1">Rumpun Jabatan</label>
                  <select 
                    value={filterRumpun} 
                    onChange={(e) => setFilterRumpun(e.target.value)}
                    className="w-full bg-white border border-slate-200 rounded-lg text-xs py-1.5 px-2 focus:outline-blue-500"
                  >
                    <option value="ALL">Semua Rumpun</option>
                    {uniqueRumpuns.map(r => <option key={r} value={r}>{r}</option>)}
                  </select>
                </div>

                <div>
                  <label className="block text-[10px] font-bold text-slate-400 uppercase mb-1">Bidang Kerja</label>
                  <select 
                    value={filterBidang} 
                    onChange={(e) => setFilterBidang(e.target.value)}
                    className="w-full bg-white border border-slate-200 rounded-lg text-xs py-1.5 px-2 focus:outline-blue-500"
                  >
                    <option value="ALL">Semua Bidang</option>
                    {uniqueBidangs.map(b => <option key={b} value={b}>{b}</option>)}
                  </select>
                </div>

                <div className="col-span-2 md:col-span-1">
                  <label className="block text-[10px] font-bold text-slate-400 uppercase mb-1">Status Kepegawaian</label>
                  <select 
                    value={filterStatus} 
                    onChange={(e) => setFilterStatus(e.target.value)}
                    className="w-full bg-white border border-slate-200 rounded-lg text-xs py-1.5 px-2 focus:outline-blue-500"
                  >
                    <option value="ALL">Semua Status</option>
                    <option value="Aktif">Aktif</option>
                    <option value="Cuti">Cuti</option>
                    <option value="Tugas Belajar">Tugas Belajar</option>
                  </select>
                </div>
              </div>

              {/* DATA GRAPH ROSTERGRID TABLE */}
              <div className="flex-1 overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-slate-50 border-b border-slate-100 text-[10px] font-extrabold uppercase text-slate-400 tracking-wider">
                      <th className="py-3 px-3 w-10">
                        <input 
                          type="checkbox"
                          checked={paginatedEmployees.length > 0 && paginatedEmployees.every(emp => checkedEmpIds.includes(emp.id))}
                          onChange={(e) => {
                            const checked = e.target.checked;
                            if (checked) {
                              const newChecked = [...checkedEmpIds];
                              paginatedEmployees.forEach(emp => {
                                if (!newChecked.includes(emp.id)) {
                                  newChecked.push(emp.id);
                                }
                              });
                              setCheckedEmpIds(newChecked);
                            } else {
                              const pageIds = paginatedEmployees.map(emp => emp.id);
                              setCheckedEmpIds(prev => prev.filter(id => !pageIds.includes(id)));
                            }
                          }}
                          className="w-4 h-4 text-blue-600 border-slate-300 rounded focus:ring-blue-500 cursor-pointer"
                        />
                      </th>
                      <th className="py-3 px-3">Pegawai</th>
                      <th className="py-3 px-2">
                        {selectedFolderType === 'BLUD' ? 'NRPTT / Gol' : 'NIP / Gol'}
                      </th>
                      <th className="py-3 px-2">Jabatan Terakhir</th>
                      <th className="py-3 px-2">Unit / Bidang</th>
                      <th className="py-3 px-2">Status</th>
                      <th className="py-3 px-3 text-right">Opsi</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-50">
                    {paginatedEmployees.length === 0 ? (
                      <tr>
                        <td colSpan={7} className="py-12 text-center text-xs text-slate-400 font-semibold font-display">
                          Nama / kriteria pegawai tidak ditemukan.
                        </td>
                      </tr>
                    ) : (
                      paginatedEmployees.map(emp => (
                        <tr 
                          key={emp.id} 
                          onClick={() => setSelectedEmpId(emp.id)}
                          className={`hover:bg-blue-50/30 cursor-pointer transition text-xs ${
                            selectedEmpId === emp.id ? 'bg-blue-50/50' : ''
                          } ${checkedEmpIds.includes(emp.id) ? 'bg-amber-50/20' : ''}`}
                        >
                          <td className="py-3.5 px-3 w-10" onClick={(e) => e.stopPropagation()}>
                            <input 
                              type="checkbox"
                              checked={checkedEmpIds.includes(emp.id)}
                              onChange={(e) => {
                                const checked = e.target.checked;
                                if (checked) {
                                  setCheckedEmpIds(prev => [...prev, emp.id]);
                                } else {
                                  setCheckedEmpIds(prev => prev.filter(id => id !== emp.id));
                                }
                              }}
                              className="w-4 h-4 text-blue-600 border-slate-300 rounded focus:ring-blue-500 cursor-pointer"
                            />
                          </td>
                          <td className="py-3.5 px-3">
                            <div className="flex items-center gap-3">
                              <div className="w-8 h-8 rounded-full bg-slate-100 text-slate-650 flex items-center justify-center font-extrabold font-display shrink-0 border border-slate-200">
                                {emp.nama.replace('dr.', '').replace('Ns.', '').replace('Apt.', '').trim().slice(0, 2).toUpperCase()}
                              </div>
                              <div>
                                <div className="flex items-center gap-1.5 flex-wrap">
                                  <p className="font-bold text-slate-800 leading-tight">{emp.nama}</p>
                                  <span className={`inline-block px-1.5 py-0.2 rounded text-[8px] font-black uppercase tracking-wider leading-none ${
                                    (emp.jenisKepegawaian || 'PNS') === 'PNS' ? 'bg-blue-50 text-blue-700 border border-blue-200' :
                                    (emp.jenisKepegawaian || 'PNS') === 'P3K' ? 'bg-amber-50 text-amber-700 border border-amber-200' :
                                    'bg-emerald-50 text-emerald-700 border border-emerald-250'
                                  }`}>
                                    {emp.jenisKepegawaian || 'PNS'}
                                  </span>
                                </div>
                                <p className="text-[10px] text-slate-400 mt-1">{emp.tempatLahir}, {emp.tanggalLahir} ({emp.usiaTahun} th)</p>
                              </div>
                            </div>
                          </td>
                          <td className="py-3.5 px-2">
                            <p className="font-mono text-[10px] font-semibold text-slate-800">{emp.nip}</p>
                            <span className="inline-block mt-0.5 px-2 py-0.5 bg-slate-100 border border-slate-200 rounded text-[9px] font-extrabold text-slate-600 font-mono">{emp.golongan}</span>
                          </td>
                          <td className="py-3.5 px-2">
                            <p className="font-semibold text-slate-700 leading-snug">{emp.jabatanTerakhir}</p>
                            <p className="text-[9px] text-slate-400 capitalize">{emp.rumpunJabatan.replace('Jabatan ', '')}</p>
                          </td>
                          <td className="py-3.5 px-2">
                            <p className="font-semibold text-slate-700 leading-snug">{emp.unitRuangan}</p>
                            <p className="text-[9px] text-slate-400">{emp.bidang}</p>
                          </td>
                          <td className="py-3.5 px-2">
                            <span className={`inline-block px-2.5 py-1 rounded-full text-[9px] font-extrabold ${
                              emp.statusKepegawaian === 'Aktif' ? 'bg-emerald-50 text-emerald-800 border border-emerald-250' :
                              emp.statusKepegawaian === 'Cuti' ? 'bg-amber-50 text-amber-800 border border-amber-250' :
                              'bg-indigo-50 text-indigo-850 border border-indigo-250'
                            }`}>
                              {emp.statusKepegawaian}
                            </span>
                          </td>
                          <td className="py-3.5 px-3 text-right no-print">
                            <div className="flex items-center justify-end gap-1" onClick={(e) => e.stopPropagation()}>
                              <button
                                onClick={() => startEdit(emp)}
                                className="p-1 px-1.5 hover:bg-slate-100 transition rounded text-slate-500 flex items-center gap-1.5 text-[10px] font-bold"
                                title="Edit Employee Profile"
                              >
                                <Edit className="w-3.5 h-3.5 text-blue-500" />
                              </button>
                              <button
                                onClick={() => handleDelete(emp.id, emp.nama)}
                                className="p-1 px-1.5 hover:bg-rose-50 transition rounded text-rose-500 flex items-center gap-1.5 text-[10px] font-bold"
                                title="Delete Employee"
                              >
                                <Trash2 className="w-3.5 h-3.5 text-rose-500" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>

              {/* PAGINATION MECHANISM */}
              <div className="flex items-center justify-between pt-3 border-t border-slate-100">
                <span className="text-[10px] text-slate-400 font-bold">
                  Menampilkan {filteredEmployees.length > 0 ? (currentPage - 1) * itemsPerPage + 1 : 0} - {Math.min(currentPage * itemsPerPage, filteredEmployees.length)} dari {filteredEmployees.length} pegawai
                </span>
                <div className="flex items-center gap-1">
                  <button
                    disabled={currentPage === 1}
                    onClick={() => setCurrentPage(p => p - 1)}
                    className="p-1.5 border border-slate-200 rounded-lg hover:bg-slate-50 disabled:opacity-40 disabled:hover:bg-white text-slate-650"
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </button>
                  <span className="text-[10px] font-bold text-slate-700 font-mono px-3">
                    Hal {currentPage} / {totalPages || 1}
                  </span>
                  <button
                    disabled={currentPage === totalPages || totalPages === 0}
                    onClick={() => setCurrentPage(p => p + 1)}
                    className="p-1.5 border border-slate-200 rounded-lg hover:bg-slate-50 disabled:opacity-40 disabled:hover:bg-white text-slate-650"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>

            {/* SIDE PROFILE DRAWER PANEL */}
            {selectedEmployee && (
              <div className="w-full lg:w-[310px] bg-white p-4.5 rounded-2xl border border-slate-100 shadow-xs flex flex-col justify-between shrink-0">
                <div className="flex flex-col gap-4">
                  <div className="flex justify-between items-center pb-3 border-b border-slate-100">
                    <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">Detil Pegawai Aktif</span>
                    <span className="text-[10px] font-bold text-slate-400 bg-slate-100 px-2 py-0.5 rounded font-mono">ID: #{selectedEmployee.id}</span>
                  </div>

                  {/* ID BADGE BADGE CARD SIMULATION */}
                  <div className="p-4 bg-gradient-to-br from-blue-700 to-slate-900 rounded-xl text-white shadow-md relative overflow-hidden">
                    <div className="absolute right-0 bottom-0 opacity-10 font-bold text-7xl select-none uppercase">RSUD</div>
                    <div className="flex justify-between items-start mb-4">
                      <div className="text-[10px] font-extrabold uppercase tracking-widest leading-none">ID CARD RSUD</div>
                      <span className="bg-white/20 text-[8px] tracking-wide px-2 py-0.5 rounded-full font-bold uppercase">
                        {selectedEmployee.jenisKepegawaian || 'PNS'}
                      </span>
                    </div>

                    <div className="flex gap-3 items-center">
                      <div className="w-12 h-12 bg-white rounded-xl shadow text-blue-900 font-black flex items-center justify-center text-lg uppercase">
                        {selectedEmployee.nama.replace('dr.', '').replace('Ns.', '').slice(0, 2).trim().toUpperCase()}
                      </div>
                      <div className="min-w-0">
                        <h4 className="font-extrabold text-[13px] tracking-tight truncate leading-tight">{selectedEmployee.nama}</h4>
                        <p className="font-mono text-[9px] text-blue-100">
                          {selectedEmployee.jenisKepegawaian === 'BLUD' ? 'NRPTT' : 'NIP'}: {selectedEmployee.nip}
                        </p>
                        <p className="text-[10px] font-semibold text-blue-200 mt-1 truncate">{selectedEmployee.jabatanTerakhir}</p>
                      </div>
                    </div>
                  </div>

                  {/* SPEC DETAILS SECTION */}
                  <div className="flex flex-col gap-3 font-semibold text-slate-700 text-xs">
                    <div className="flex justify-between py-1 bg-slate-50 px-2.5 rounded-lg">
                      <span className="text-slate-400">Status Dinas:</span>
                      <span className="text-slate-800 font-bold flex items-center gap-1">
                        <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-ping"></span>
                        {selectedEmployee.statusKepegawaian}
                      </span>
                    </div>

                    <div className="flex justify-between py-1 px-2.5">
                      <span className="text-slate-400">Pangkat Kedinasan:</span>
                      <span className="text-slate-850 font-bold font-display">{selectedEmployee.pangkat}</span>
                    </div>

                    <div className="flex justify-between py-1 bg-slate-50 px-2.5 rounded-lg">
                      <span className="text-slate-400">Golongan (Ruang):</span>
                      <span className="text-slate-850 font-bold font-mono text-blue-600">{selectedEmployee.golongan}</span>
                    </div>

                    <div className="flex justify-between py-1 px-2.5">
                      <span className="text-slate-400">Unit Fungsional:</span>
                      <span className="text-slate-850 font-bold truncate max-w-[150px]">{selectedEmployee.unitRuangan}</span>
                    </div>

                    <div className="flex justify-between py-1 bg-slate-50 px-2.5 rounded-lg">
                      <span className="text-slate-400">Grup Bidang:</span>
                      <span className="text-slate-850 font-bold truncate max-w-[150px]">{selectedEmployee.bidang}</span>
                    </div>

                    <div className="flex justify-between py-1 px-2.5">
                      <span className="text-slate-400">T.M.T CPNS Dinas:</span>
                      <span className="text-slate-850 font-mono font-bold">{selectedEmployee.tmtCpns}</span>
                    </div>

                    <div className="flex justify-between py-1 bg-slate-50 px-2.5 rounded-lg">
                      <span className="text-slate-400">Tingkat Pendidikan:</span>
                      <span className="text-slate-850 font-bold">{selectedEmployee.tingkatPendidikanTerakhir} - {selectedEmployee.pendidikanTerakhir}</span>
                    </div>

                    <div className="flex justify-between py-1 px-2.5">
                      <span className="text-slate-400">Keterangan Khusus:</span>
                      <span className="text-slate-400 italic text-[10px] truncate max-w-[150px]">{selectedEmployee.keterangan || "-"}</span>
                    </div>
                  </div>
                </div>

                <div className="pt-4 border-t border-slate-100 flex gap-2">
                  <button
                    onClick={() => {
                      setSelectedEmpId(selectedEmployee.id);
                      setActiveTab('badge');
                    }}
                    className="flex-1 p-2 bg-slate-100 hover:bg-slate-200 transition text-slate-700 font-bold text-xs rounded-xl flex items-center justify-center gap-1.5"
                  >
                    <IdCard className="w-4 h-4 text-slate-500" />
                    <span>Cetak ID Badge</span>
                  </button>
                  <button
                    onClick={() => {
                      const question = `Berikan ringkasan analisis performa, pangkat, serta kesiapan mutasi atau training pegawai dengan nama ${selectedEmployee.nama}.`;
                      setActiveTab('consultant');
                      setAiQuery(question);
                    }}
                    className="p-2 px-3 bg-blue-50 hover:bg-blue-100 border border-blue-200 transition text-blue-800 font-bold text-xs rounded-xl flex items-center justify-center gap-1.5"
                    title="Konsultasikan kompetensi staff via AI"
                  >
                    <Sparkles className="w-4 h-4 text-blue-600" />
                    <span>Tanya AI</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        )}

        {/* TAB 3: PERENCANAAN PENSIUN (KALKULATOR PEMASANGAN PENSIUN) */}
        {activeTab === 'pensiun' && (
          <div className="flex-1 flex flex-col gap-6 overflow-y-auto">
            {/* INTRO HERO */}
            <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-xs">
              <h3 className="text-base font-extrabold text-slate-850 mb-1 font-display">Kalkulator Perencanaan Pensiun Dinas RSUD</h3>
              <p className="text-xs text-slate-400">
                Menghitung batas usia pensiun (BUP) berdasarkan rumpun jabatan & status kepegawaian: staf umum dinas pensiun umur 58 tahun, perawat, fungsional madya, & pegawai BLUD di umur 60 tahun, serta dokter spesialis utama / ahli utama di umur 65 tahun.
              </p>
            </div>

            {/* VISUAL FOLDERS SEPARATORS (PNS, P3K, BLUD) FOR PENSION ACTIVE WORK DIRECTORY */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 p-0.5">
              {/* Folder ALL */}
              <div
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    setSelectedFolderType('ALL');
                  }
                }}
                onClick={() => setSelectedFolderType('ALL')}
                className={`flex flex-col justify-between p-3.5 rounded-2xl border transition-all text-left relative cursor-pointer select-none outline-hidden min-h-[110px] ${
                  selectedFolderType === 'ALL'
                    ? 'bg-slate-900 text-white border-slate-900 shadow-md ring-2 ring-slate-300'
                    : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                }`}
              >
                <div className="flex items-center justify-between w-full">
                  <div className={`p-1.5 rounded-lg ${selectedFolderType === 'ALL' ? 'bg-slate-800 text-slate-200' : 'bg-slate-200/60 text-slate-655'}`}>
                    {selectedFolderType === 'ALL' ? <Folders className="w-4 h-4 animate-pulse" /> : <Folder className="w-4 h-4" />}
                  </div>
                  <span className={`font-mono text-[9px] font-extrabold px-2 py-0.5 rounded-full ${
                    selectedFolderType === 'ALL' ? 'bg-white/20 text-white' : 'bg-slate-200 text-slate-700'
                  }`}>
                    {stats.total}
                  </span>
                </div>
                <div className="mt-2.5">
                  <h4 className="text-[11px] font-black tracking-tight uppercase leading-none truncate">Semua Berkas</h4>
                  <p className="text-[9px] mt-1 opacity-70 truncate font-semibold">Pensiun Kritis: {pensionStats.total}</p>
                </div>
              </div>

              {/* Folder PNS */}
              <div
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    setSelectedFolderType('PNS');
                  }
                }}
                onClick={() => setSelectedFolderType('PNS')}
                className={`flex flex-col justify-between p-3.5 rounded-2xl border transition-all text-left relative cursor-pointer select-none outline-hidden min-h-[110px] ${
                  selectedFolderType === 'PNS'
                    ? 'bg-blue-600 text-white border-blue-600 shadow-md ring-2 ring-blue-300'
                    : 'bg-blue-50/40 text-blue-900 border-blue-100 hover:bg-blue-50/80'
                }`}
              >
                <div className="flex items-center justify-between w-full">
                  <div className={`p-1.5 rounded-lg ${selectedFolderType === 'PNS' ? 'bg-blue-800 text-blue-100' : 'bg-blue-100 text-blue-650'}`}>
                    {selectedFolderType === 'PNS' ? <FolderOpen className="w-4 h-4" /> : <Folder className="w-4 h-4" />}
                  </div>
                  <span className={`font-mono text-[9px] font-extrabold px-2 py-0.5 rounded-full ${
                    selectedFolderType === 'PNS' ? 'bg-white/20 text-white' : 'bg-blue-100 text-blue-850'
                  }`}>
                    {stats.countPNS}
                  </span>
                </div>
                <div className="mt-2.5">
                  <h4 className="text-[11px] font-black tracking-tight uppercase leading-none truncate">Berkas PNS</h4>
                  <p className="text-[9px] mt-1 opacity-70 truncate font-semibold">Pensiun Kritis: {pensionStats.countPNS}</p>
                </div>
              </div>

              {/* Folder P3K */}
              <div
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    setSelectedFolderType('P3K');
                  }
                }}
                onClick={() => setSelectedFolderType('P3K')}
                className={`flex flex-col justify-between p-3.5 rounded-2xl border transition-all text-left relative cursor-pointer select-none outline-hidden min-h-[110px] ${
                  selectedFolderType === 'P3K'
                    ? 'bg-amber-600 text-white border-amber-600 shadow-md ring-2 ring-amber-300'
                    : 'bg-amber-50/40 text-amber-900 border-amber-100 hover:bg-amber-50/80'
                }`}
              >
                <div className="flex items-center justify-between w-full">
                  <div className={`p-1.5 rounded-lg ${selectedFolderType === 'P3K' ? 'bg-amber-800 text-amber-100' : 'bg-amber-100 text-amber-650'}`}>
                    {selectedFolderType === 'P3K' ? <FolderOpen className="w-4 h-4" /> : <Folder className="w-4 h-4" />}
                  </div>
                  <span className={`font-mono text-[9px] font-extrabold px-2 py-0.5 rounded-full ${
                    selectedFolderType === 'P3K' ? 'bg-white/20 text-white' : 'bg-amber-100 text-amber-850'
                  }`}>
                    {stats.countP3K}
                  </span>
                </div>
                <div className="mt-2.5">
                  <h4 className="text-[11px] font-black tracking-tight uppercase leading-none truncate">Berkas P3K</h4>
                  <p className="text-[9px] mt-1 opacity-70 truncate font-semibold">Pensiun Kritis: {pensionStats.countP3K}</p>
                </div>
              </div>

              {/* Folder BLUD */}
              <div
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    setSelectedFolderType('BLUD');
                  }
                }}
                onClick={() => setSelectedFolderType('BLUD')}
                className={`flex flex-col justify-between p-3.5 rounded-2xl border transition-all text-left relative cursor-pointer select-none outline-hidden min-h-[110px] ${
                  selectedFolderType === 'BLUD'
                    ? 'bg-emerald-600 text-white border-emerald-600 shadow-md ring-2 ring-emerald-350'
                    : 'bg-emerald-50/40 text-emerald-950 border-emerald-100 hover:bg-emerald-50/80'
                }`}
              >
                <div className="flex items-center justify-between w-full">
                  <div className={`p-1.5 rounded-lg ${selectedFolderType === 'BLUD' ? 'bg-emerald-800 text-emerald-100' : 'bg-emerald-100 text-emerald-650'}`}>
                    {selectedFolderType === 'BLUD' ? <FolderOpen className="w-4 h-4" /> : <Folder className="w-4 h-4" />}
                  </div>
                  <span className={`font-mono text-[9px] font-extrabold px-2 py-0.5 rounded-full ${
                    selectedFolderType === 'BLUD' ? 'bg-white/20 text-white' : 'bg-emerald-100 text-emerald-850'
                  }`}>
                    {stats.countBLUD}
                  </span>
                </div>
                <div className="mt-2.5">
                  <h4 className="text-[11px] font-black tracking-tight uppercase leading-none truncate">Berkas BLUD</h4>
                  <p className="text-[9px] mt-1 opacity-70 truncate font-semibold">Pensiun Kritis: {pensionStats.countBLUD}</p>
                </div>
              </div>
            </div>

            {/* GRID CONTAINER FOR PENSION AND CALENDAR */}
            <div className="grid grid-cols-1 xl:grid-cols-12 gap-6 items-start w-full">
              {/* RETIREMENTS LIST GRID */}
              <div id="card-pension-calculator" className="bg-white p-5 rounded-2xl border border-slate-100 shadow-xs flex flex-col xl:col-span-8">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-slate-100 mb-4">
                  <div className="flex flex-col gap-1">
                    <span className="text-xs font-extrabold text-slate-800">Daftar Pegawai Mendekati Masa Pensiun</span>
                    <p className="text-[10px] text-slate-400">Data terintegrasi dan tersinkronisasi otomatis</p>
                  </div>
                  <div className="flex flex-wrap items-center gap-2.5">
                    {/* Search Input for Pension */}
                    <div className="relative">
                      <Search className="w-3.5 h-3.5 absolute left-2.5 top-1/2 -translate-y-1/2 text-slate-400" />
                      <input
                        type="text"
                        placeholder="Cari nama, nip, fungsional..."
                        value={pensionSearchTerm}
                        onChange={(e) => setPensionSearchTerm(e.target.value)}
                        className="w-48 sm:w-56 bg-slate-50 border border-slate-200 focus:bg-white focus:ring-2 focus:ring-blue-100 focus:border-blue-400 rounded-xl pl-8 pr-7 py-1.5 text-[11px] text-slate-700 outline-hidden transition-all placeholder:text-slate-400"
                      />
                      {pensionSearchTerm && (
                        <button
                          onClick={() => setPensionSearchTerm('')}
                          className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 text-[10px] w-4 h-4 flex items-center justify-center rounded-full hover:bg-slate-200 transition-colors"
                        >
                          ✕
                        </button>
                      )}
                    </div>
                    <span className="text-[10px] font-bold text-rose-600 bg-rose-50 border border-rose-100 px-2.5 py-1.5 rounded-xl flex items-center gap-1.5">
                      <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                      Kritis (&lt; 3 Tahun): {criticalRetirements.length} Pegawai
                    </span>
                  </div>
                </div>

                <div className="overflow-x-auto flex-1 flex flex-col justify-start min-h-[350px]">
                  <AnimatePresence mode="wait">
                    {finalPensionEmployees.length > 0 ? (
                      <motion.div
                        key="pension-table"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.25, ease: "easeOut" }}
                        className="w-full flex-1"
                      >
                        <table className="w-full text-left border-collapse">
                          <thead>
                            <tr className="bg-slate-50 border-b border-slate-100 text-[10px] font-extrabold uppercase text-slate-400 tracking-wider">
                              <th className="py-3 px-3">Pegawai</th>
                              <th className="py-3 px-2">Jabatan Terakhir</th>
                              <th className="py-3 px-2">Kategori Pensiun</th>
                              <th className="py-3 px-2 text-center">Usia Saat Ini</th>
                              <th className="py-3 px-2 text-center">BUP (Batas Usia)</th>
                              <th className="py-3 px-2 text-center">Masa Kerja Tersisa</th>
                              <th className="py-3 px-3 text-right">Aksi Suksesi</th>
                            </tr>
                          </thead>
                          <motion.tbody 
                            className="divide-y divide-slate-50"
                            variants={{
                              hidden: { opacity: 0 },
                              show: {
                                opacity: 1,
                                transition: {
                                  staggerChildren: 0.05
                                }
                              }
                            }}
                            initial="hidden"
                            animate="show"
                          >
                            {finalPensionEmployees.slice(0, 15).map((emp) => {
                              const isCritical = emp.yearsToRetire <= 3;
                              return (
                                <motion.tr 
                                  key={emp.id} 
                                  onClick={() => setSelectedEmpId(emp.id)}
                                  variants={{
                                    hidden: { opacity: 0, y: 15 },
                                    show: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 100, damping: 15 } }
                                  }}
                                  className={`cursor-pointer hover:bg-slate-100/75 hover:-translate-y-[2px] hover:shadow-xs transition-all duration-300 transform-gpu ${
                                    selectedEmpId === emp.id ? 'bg-blue-50/70 border-l-4 border-l-blue-600' : isCritical ? 'bg-amber-50/20' : ''
                                  }`}
                                >
                                  <td className="py-4 px-3">
                                    <div className="flex items-center gap-3">
                                      <div className="w-8 h-8 rounded-full bg-slate-150 text-slate-655 flex items-center justify-center font-extrabold font-display border border-slate-200 shrink-0">
                                        {emp.nama.replace('dr.', '').replace('Ns.', '').slice(0, 2).trim().toUpperCase()}
                                      </div>
                                      <div>
                                        <p className="font-bold text-slate-800 leading-tight">{emp.nama}</p>
                                        <p className="text-[10px] font-mono text-slate-450 mt-0.5">
                                          {emp.jenisKepegawaian === 'BLUD' ? 'NRPTT' : 'NIP'}: {emp.nip}
                                        </p>
                                      </div>
                                    </div>
                                  </td>
                                  <td className="py-4 px-2">
                                    <p className="font-semibold text-slate-700 leading-snug">{emp.jabatanTerakhir}</p>
                                    <p className="text-[9px] text-slate-400 capitalize">{emp.unitRuangan}</p>
                                  </td>
                                  <td className="py-4 px-2">
                                    <span className="text-xs font-semibold text-slate-600">
                                      {emp.nama.toLowerCase().includes('dr.') ? 'Ahli Utama Medis' : emp.nama.toLowerCase().includes('ns.') ? 'Perawat Ahli' : 'Staf Administrasi'}
                                    </span>
                                  </td>
                                  <td className="py-4 px-2 text-center">
                                    <span className="font-bold font-mono text-slate-800">{emp.usiaTahun} Th</span>
                                  </td>
                                  <td className="py-4 px-2 text-center">
                                    <span className="font-bold font-mono text-blue-600">{emp.retirementAge} Th</span>
                                  </td>
                                  <td className="py-4 px-2 text-center">
                                    {emp.yearsToRetire <= 0 ? (
                                      <span className="bg-rose-50 border border-rose-200 text-rose-700 font-extrabold px-3 py-1 rounded-full text-[10px]">
                                        Lewat BUP ({Math.abs(emp.yearsToRetire)} Th LALU)
                                      </span>
                                    ) : emp.yearsToRetire <= 3 ? (
                                      <span className="bg-amber-100 border border-amber-300 text-amber-800 font-black px-3 py-1 rounded-full text-[10px] animate-pulse">
                                        Kritis ({emp.yearsToRetire} Th Tersisa)
                                      </span>
                                    ) : (
                                      <span className="bg-slate-100 border border-slate-200 text-slate-700 font-bold px-3 py-1 rounded-full text-[10px]">
                                        Aman ({emp.yearsToRetire} Th Lagi)
                                      </span>
                                    )}
                                  </td>
                                  <td className="py-4 px-3 text-right">
                                    <button
                                      onClick={() => {
                                        const q = `Tolong berikan rekomendasi suksesi dan pelatihan/mutasi khusus untuk ${emp.nama} (${emp.jabatanTerakhir}) yang akan pensiun dalam ${emp.yearsToRetire} tahun, kualifikasi pangkatnya ${emp.pangkat}`;
                                        setActiveTab('consultant');
                                        setAiQuery(q);
                                      }}
                                      className="px-3 py-1.5 bg-blue-50 hover:bg-blue-100 border border-blue-200 text-blue-800 font-bold text-[10px] rounded-lg transition-all"
                                    >
                                      Skenario Suksesi AI
                                    </button>
                                  </td>
                                </motion.tr>
                              );
                            })}
                          </motion.tbody>
                        </table>
                      </motion.div>
                    ) : (
                      <motion.div
                        key="pension-empty"
                        initial={{ opacity: 0, y: 15 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -15 }}
                        transition={{ duration: 0.3, ease: "easeOut" }}
                        className="flex-1 flex flex-col items-center justify-center p-12 text-center bg-slate-50/50 rounded-2xl border border-dashed border-slate-200 min-h-[300px]"
                      >
                        <div className="w-14 h-14 bg-slate-100 rounded-full flex items-center justify-center text-slate-400 mb-4 border border-slate-200">
                          <Inbox className="w-6 h-6 text-slate-400" />
                        </div>
                        <h4 className="text-xs font-black text-slate-800 font-display">Data Pensiun Tidak Ditemukan</h4>
                        <p className="text-[10px] text-slate-400 max-w-[280px] mt-1.5 leading-relaxed">
                          Tidak ada pegawai yang memenuhi kriteria pensiun di bawah penyaringan atau folder aktif saat ini.
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>

              {/* CALENDAR VIEW CARD */}
              <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-xs xl:col-span-4 flex flex-col gap-4">
                <div className="flex flex-col gap-1 pb-3 border-b border-slate-100">
                  <span className="text-xs font-extrabold text-slate-800 flex items-center gap-2">
                    <CalendarClock className="w-4 h-4 text-pink-500" />
                    Monitoring Hari Lahir &amp; TMT Kerja
                  </span>
                  <p className="text-[10px] text-slate-400">Kalender interaktif ulang tahun &amp; masa kerja pegawai</p>
                </div>

                {/* Calendar Navigation and Month selection */}
                <div className="flex items-center justify-between gap-2.5">
                  <button
                    onClick={() => {
                      if (calendarMonth === 0) {
                        setCalendarMonth(11);
                        setCalendarYear(prev => prev - 1);
                      } else {
                        setCalendarMonth(prev => prev - 1);
                      }
                      setSelectedCalendarDay(null);
                    }}
                    className="p-1 px-1.5 hover:bg-slate-100 border border-slate-100 rounded-lg text-slate-500 transition cursor-pointer"
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </button>

                  <div className="flex items-center gap-1">
                    <select
                      value={calendarMonth}
                      onChange={(e) => {
                        setCalendarMonth(parseInt(e.target.value, 10));
                        setSelectedCalendarDay(null);
                      }}
                      className="bg-transparent border-0 font-bold text-xs text-slate-800 pr-1 py-1 focus:ring-0 cursor-pointer text-center outline-hidden"
                    >
                      {['Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni', 'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'].map((m, idx) => (
                        <option key={m} value={idx}>{m}</option>
                      ))}
                    </select>
                    <select
                      value={calendarYear}
                      onChange={(e) => {
                        setCalendarYear(parseInt(e.target.value, 10));
                        setSelectedCalendarDay(null);
                      }}
                      className="bg-transparent border-0 font-bold text-xs text-slate-800 py-1 focus:ring-0 cursor-pointer text-center outline-hidden"
                    >
                      {Array.from({ length: 31 }, (_, i) => 2015 + i).map(y => (
                        <option key={y} value={y}>{y}</option>
                      ))}
                    </select>
                  </div>

                  <button
                    onClick={() => {
                      if (calendarMonth === 11) {
                        setCalendarMonth(0);
                        setCalendarYear(prev => prev + 1);
                      } else {
                        setCalendarMonth(prev => prev + 1);
                      }
                      setSelectedCalendarDay(null);
                    }}
                    className="p-1 px-1.5 hover:bg-slate-100 border border-slate-100 rounded-lg text-slate-500 transition cursor-pointer"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>

                {/* Legend */}
                <div className="flex items-center gap-4 text-[9px] font-extrabold justify-center text-slate-500 py-1 border-y border-slate-50/60 bg-slate-50/40 rounded-lg select-none">
                  <div className="flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-pink-500"></span>
                    <span>Ulang Tahun (🎂)</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-teal-500"></span>
                    <span>TMT Kerja/CPNS (💼)</span>
                  </div>
                </div>

                {/* Calendar Days of Week Header */}
                <div className="grid grid-cols-7 gap-1 text-[9.5px] font-extrabold text-slate-400 text-center select-none pt-1">
                  {['Min', 'Sen', 'Sel', 'Rab', 'Kam', 'Jum', 'Sab'].map(dayName => (
                    <div key={dayName} className={dayName === 'Min' ? 'text-rose-500' : ''}>
                      {dayName}
                    </div>
                  ))}
                </div>

                {/* Grid container helper */}
                <div className="grid grid-cols-7 gap-1">
                  {(() => {
                    const firstDayIndex = new Date(calendarYear, calendarMonth, 1).getDay();
                    const totalDays = new Date(calendarYear, calendarMonth + 1, 0).getDate();
                    const prevTotalDays = new Date(calendarYear, calendarMonth, 0).getDate();
                    
                    const daysGrid = [];
                    // Previous month pad
                    for (let i = firstDayIndex - 1; i >= 0; i--) {
                      daysGrid.push({
                        day: prevTotalDays - i,
                        isCurrentMonth: false,
                        month: calendarMonth === 0 ? 11 : calendarMonth - 1,
                        year: calendarMonth === 0 ? calendarYear - 1 : calendarYear,
                      });
                    }
                    // Current month
                    for (let i = 1; i <= totalDays; i++) {
                      daysGrid.push({
                        day: i,
                        isCurrentMonth: true,
                        month: calendarMonth,
                        year: calendarYear,
                      });
                    }
                    // Next month pad
                    const remaining = 42 - daysGrid.length;
                    for (let i = 1; i <= remaining; i++) {
                      daysGrid.push({
                        day: i,
                        isCurrentMonth: false,
                        month: calendarMonth === 11 ? 0 : calendarMonth + 1,
                        year: calendarMonth === 11 ? calendarYear + 1 : calendarYear,
                      });
                    }

                    return daysGrid.map((item, idx) => {
                      const dayBirthdays = employees.filter(emp => {
                        const parts = parseDateParts(emp.tanggalLahir);
                        return parts && parts.day === item.day && parts.month === item.month;
                      });

                      const dayTmts = employees.filter(emp => {
                        const parts = parseDateParts(emp.tmtCpns);
                        return parts && parts.day === item.day && parts.month === item.month;
                      });

                      const hasBirthday = dayBirthdays.length > 0;
                      const hasTmt = dayTmts.length > 0;
                      const isSelected = selectedCalendarDay === item.day && item.isCurrentMonth;
                      
                      const isToday = new Date().getDate() === item.day && 
                                      new Date().getMonth() === item.month && 
                                      new Date().getFullYear() === item.year;

                      return (
                        <button
                          key={idx}
                          role="gridcell"
                          onClick={() => {
                            if (item.isCurrentMonth) {
                              setSelectedCalendarDay(item.day);
                            } else {
                              setCalendarMonth(item.month);
                              setCalendarYear(item.year);
                              setSelectedCalendarDay(item.day);
                            }
                          }}
                          className={`h-8.5 rounded-lg flex flex-col justify-between p-1 transition relative cursor-pointer group hover:bg-slate-100 ${
                            !item.isCurrentMonth ? 'text-slate-350 opacity-40' : 'text-slate-800'
                          } ${isSelected ? 'bg-blue-600 text-white font-extrabold shadow-sm scale-105 border border-blue-500/50' : 'hover:bg-slate-50 border border-transparent'} ${
                            isToday && !isSelected ? 'ring-1.5 ring-slate-900 border border-slate-900 bg-slate-50/50' : ''
                          }`}
                        >
                          <span className={`text-[10px] self-start leading-none font-semibold ${isSelected ? 'text-white' : ''}`}>
                            {item.day}
                          </span>
                          
                          {/* Mini event indicators */}
                          <div className="flex gap-0.5 justify-center w-full mt-0.5 min-h-[4px]">
                            {hasBirthday && (
                              <span className={`w-1 h-1 rounded-full ${isSelected ? 'bg-white' : 'bg-pink-500 group-hover:scale-130 transition-transform'}`}></span>
                            )}
                            {hasTmt && (
                              <span className={`w-1 h-1 rounded-full ${isSelected ? 'bg-white' : 'bg-teal-500 group-hover:scale-130 transition-transform'}`}></span>
                            )}
                          </div>
                        </button>
                      );
                    });
                  })()}
                </div>

                {/* EVENTS LIST SELECTION / OVERVIEW UNDER KALENDER */}
                <div className="mt-2.5 pt-3.5 border-t border-slate-100 flex-1 flex flex-col gap-2 min-h-[160px]">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-black text-slate-500 uppercase tracking-wider">
                      {selectedCalendarDay 
                        ? `Detail Tanggal ${selectedCalendarDay} ${['Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni', 'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'][calendarMonth]}`
                        : `Acara Bulan ${['Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni', 'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'][calendarMonth]}`
                      }
                    </span>
                    {selectedCalendarDay && (
                      <button
                        onClick={() => setSelectedCalendarDay(null)}
                        className="text-[9px] font-extrabold text-blue-600 hover:text-blue-800 transition cursor-pointer"
                      >
                        Lihat Bulanan
                      </button>
                    )}
                  </div>

                  <div className="space-y-1.5 max-h-[190px] overflow-y-auto pr-1">
                    {(() => {
                      const renderEventsList = (filterDay: number | null) => {
                        let matches: { emp: Employee; type: 'BIRTHDAY' | 'TMT'; value: number; originalDate: string }[] = [];

                        employees.forEach(emp => {
                          const birth = parseDateParts(emp.tanggalLahir);
                          if (birth && birth.month === calendarMonth) {
                            if (filterDay === null || birth.day === filterDay) {
                              const ageInSelectedYear = calendarYear - birth.year;
                              matches.push({ emp, type: 'BIRTHDAY', value: ageInSelectedYear, originalDate: emp.tanggalLahir });
                            }
                          }

                          const tmt = parseDateParts(emp.tmtCpns);
                          if (tmt && tmt.month === calendarMonth) {
                            if (filterDay === null || tmt.day === filterDay) {
                              const tenureInSelectedYear = calendarYear - tmt.year;
                              matches.push({ emp, type: 'TMT', value: tenureInSelectedYear, originalDate: emp.tmtCpns });
                            }
                          }
                        });

                        // Sort by day, then by name
                        matches.sort((a, b) => {
                          const dayA = parseDateParts(a.originalDate)?.day || 0;
                          const dayB = parseDateParts(b.originalDate)?.day || 0;
                          if (dayA !== dayB) return dayA - dayB;
                          return a.emp.nama.localeCompare(b.emp.nama);
                        });

                        if (matches.length === 0) {
                          return (
                            <div className="flex flex-col items-center justify-center p-6 text-center bg-slate-50/40 rounded-xl border border-dashed border-slate-150 py-8">
                              <span className="text-sm">📅</span>
                              <p className="text-xs text-slate-705 font-bold mt-1">Tidak Ada Acara</p>
                              <p className="text-[10px] text-slate-400 max-w-[200px] mt-0.5 leading-relaxed">
                                {filterDay 
                                  ? "Tidak ada fungsional ulang tahun atau TMT CPNS di tanggal terpilih." 
                                  : "Tidak ada event ulang tahun atau TMT pegawai di bulan ini."
                                }
                              </p>
                            </div>
                          );
                        }

                        return matches.map((item, mIdx) => {
                          const eventDay = parseDateParts(item.originalDate)?.day || 0;
                          return (
                            <div
                              key={mIdx}
                              onClick={() => setSelectedEmpId(item.emp.id)}
                              className={`flex items-center justify-between p-2 rounded-xl border transition-all cursor-pointer hover:translate-x-1 duration-200 ${
                                selectedEmpId === item.emp.id 
                                  ? 'bg-blue-50/60 border-blue-200' 
                                  : 'bg-slate-50/45 hover:bg-slate-100/50 border-slate-100'
                              }`}
                            >
                              <div className="flex items-center gap-2 min-w-0">
                                <span className="font-bold text-[10.5px] text-slate-400 bg-white/95 px-1.5 py-0.5 rounded-md border border-slate-150 shrink-0 font-mono select-none w-7 text-center">
                                  {eventDay}
                                </span>
                                <div className="min-w-0">
                                  <p className="font-bold text-[11px] text-slate-800 truncate" title={item.emp.nama}>
                                    {item.emp.nama}
                                  </p>
                                  <p className="text-[9.5px] text-slate-400 font-medium truncate" title={`${item.emp.jabatanTerakhir} - ${item.emp.unitRuangan}`}>
                                    {item.emp.jabatanTerakhir} ({item.emp.unitRuangan})
                                  </p>
                                </div>
                              </div>

                              {item.type === 'BIRTHDAY' ? (
                                <span className="text-[9.5px] font-extrabold text-pink-700 bg-pink-50 border border-pink-100 px-2 py-0.5 rounded-full select-none shrink-0 flex items-center gap-1">
                                  🎂 Ultah {item.value} Th
                                </span>
                              ) : (
                                <span className="text-[9.5px] font-extrabold text-teal-700 bg-teal-50 border border-teal-100 px-2 py-0.5 rounded-full select-none shrink-0 flex items-center gap-1">
                                  💼 TMT {item.value} Th
                                </span>
                              )}
                            </div>
                          );
                        });
                      };

                      return renderEventsList(selectedCalendarDay);
                    })()}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 4: BADGE GENERATOR (CETAK KARTU PEGAWAI) */}
        {activeTab === 'badge' && (
          <div className="flex-1 flex flex-col md:flex-row gap-6 overflow-y-auto">
            {/* CONTROLS */}
            <div className="w-full md:w-80 bg-white p-5 rounded-2xl border border-slate-100 shadow-xs flex flex-col gap-4">
              <div>
                <h3 className="text-sm font-extrabold text-slate-800">Pengaturan Kartu</h3>
                <p className="text-xs text-slate-400">Pilih pegawai dan cetak ID card badge.</p>
              </div>

              <div>
                <label className="block text-[10px] font-bold text-slate-400 uppercase mb-1.5">Pilih Pegawai</label>
                <select
                  value={selectedEmpId || ''}
                  onChange={(e) => setSelectedEmpId(Number(e.target.value))}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl text-xs py-2 px-3 focus:outline-blue-500 font-semibold text-slate-700"
                >
                  {employees.map(emp => (
                    <option key={emp.id} value={emp.id}>{emp.nama}</option>
                  ))}
                </select>
              </div>

              <div className="bg-blue-50 p-4 rounded-xl border border-blue-100 text-xs text-blue-800">
                Kami mensimulasikan cetak ID Card fungsional dengan foto inisial otomatis, kode QR kedinasan, logo RSUD, dan verifikasi NIP asli.
              </div>

              <div className="flex flex-col gap-2 w-full mt-2">
                <button
                  onClick={() => window.print()}
                  className="w-full py-2.5 bg-slate-900 hover:bg-slate-800 transition text-white font-bold text-xs rounded-xl flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <Printer className="w-4 h-4" />
                  <span>Cetak Lembar Kartu (Ctrl+P)</span>
                </button>
                
                {selectedEmployee && (
                  <>
                    <button
                      onClick={() => exportIdCardToPdf('badge-id-card-view', `ID_Card_${selectedEmployee.nama.replace(/\s+/g, '_')}.pdf`)}
                      className="w-full py-2.5 bg-blue-600 hover:bg-blue-700 transition text-white font-bold text-xs rounded-xl flex items-center justify-center gap-1.5 shadow-sm cursor-pointer"
                    >
                      <Download className="w-4 h-4" />
                      <span>Unduh PDF ID Card</span>
                    </button>
                    
                    <button
                      onClick={() => printIdCard('badge-id-card-view')}
                      className="w-full py-2.5 bg-slate-100 hover:bg-slate-200 transition text-slate-700 border border-slate-200 font-bold text-xs rounded-xl flex items-center justify-center gap-1.5 cursor-pointer"
                    >
                      <Printer className="w-4 h-4 text-slate-500" />
                      <span>Cetak ID Card Spesifik</span>
                    </button>
                  </>
                )}
              </div>
            </div>

            {/* PRINT COMPONENT PREVIEW */}
            {selectedEmployee && (
              <div className="flex-1 flex items-center justify-center p-6 bg-slate-100 rounded-2xl border border-dashed border-slate-300" style={{ perspective: "1000px" }}>
                {/* Visual badge card */}
                <motion.div 
                  id="badge-id-card-view" 
                  className="print-card w-80 bg-white rounded-3xl shadow-[0_20px_35px_-10px_rgba(59,130,246,0.18),0_10px_20px_-12px_rgba(59,130,246,0.12)] overflow-hidden border border-slate-200/80 flex flex-col relative group cursor-pointer transition-shadow duration-300 hover:shadow-[0_30px_50px_-15px_rgba(59,130,246,0.3),0_15px_25px_-18px_rgba(59,130,246,0.2)]"
                  style={{ 
                    rotateX: idCardRotateX, 
                    rotateY: idCardRotateY, 
                    transformStyle: 'preserve-3d' 
                  }}
                  onMouseMove={handleIdCardMouseMove}
                  onMouseLeave={handleIdCardMouseLeave}
                  whileHover={{ scale: 1.04, translateY: -4 }}
                  transition={{ type: 'spring', stiffness: 120, damping: 18 }}
                >
                  {/* Glass glare shimmer reflection overlay */}
                  <motion.div 
                    className="absolute inset-0 pointer-events-none z-30 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    style={{ background: idCardGlareBg }}
                  />
                  
                  {/* Top Header card */}
                  <div className="bg-gradient-to-r from-blue-700 to-indigo-800 p-5 text-white text-center pb-8 sticky top-0" style={{ transform: 'translateZ(10px)', transformStyle: 'preserve-3d' }}>
                    <p className="text-[10px] font-extrabold uppercase tracking-widest leading-none text-blue-100">KARTU IDENTITAS KELUARGA</p>
                    <h3 className="text-base font-extrabold tracking-tight mt-1 font-display leading-tight">RSUD DR. H. JUSUF SK</h3>
                    <p className="text-[8px] text-blue-200 mt-1">Provinsi Kalimantan Utara</p>
                  </div>

                  {/* Photo Space overlapping */}
                  <div className="flex flex-col items-center -mt-6 z-10 px-6" style={{ transform: 'translateZ(25px)', transformStyle: 'preserve-3d' }}>
                    <div className="w-24 h-24 bg-white rounded-2xl shadow-md p-1.5 border border-slate-100 flex items-center justify-center">
                      <div className="w-full h-full bg-slate-900 rounded-xl text-blue-400 font-black flex items-center justify-center text-4xl uppercase">
                        {selectedEmployee.nama.replace('dr.', '').replace('Ns.', '').slice(0, 2).trim().toUpperCase()}
                      </div>
                    </div>

                    <h4 className="font-extrabold text-[15px] text-slate-850 tracking-tight mt-3 text-center leading-tight">
                      {selectedEmployee.nama}
                    </h4>
                    <p className="font-mono text-[10px] text-slate-450 mt-1">
                      {selectedEmployee.jenisKepegawaian === 'BLUD' ? 'NRPTT' : 'NIP'}: {selectedEmployee.nip}
                    </p>
                    
                    <span className="inline-block mt-2 px-3 py-1 bg-blue-50 border border-blue-200 rounded-full text-[9px] font-extrabold text-blue-850 font-display">
                      {selectedEmployee.jabatanTerakhir}
                    </span>
                  </div>

                  {/* Detail listing fields */}
                  <div className="p-5 flex flex-col gap-2 mt-4 text-[10px] text-slate-600 font-semibold border-t border-slate-100 bg-slate-50" style={{ transform: 'translateZ(15px)' }}>
                    <div className="flex justify-between">
                      <span className="text-slate-400">Grup Bidang:</span>
                      <strong className="text-slate-800">{selectedEmployee.bidang}</strong>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">Unit Penempatan:</span>
                      <strong className="text-slate-800">{selectedEmployee.unitRuangan}</strong>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">Pangkat &amp; Golongan:</span>
                      <strong className="text-slate-850 font-mono text-blue-600">{selectedEmployee.pangkat} ({selectedEmployee.golongan})</strong>
                    </div>
                  </div>

                  {/* Bottom Footer block bar code sim */}
                  <div className="bg-slate-900 py-3.5 px-6 flex justify-between items-center text-[8px] font-mono text-slate-500 text-center uppercase tracking-widest border-t border-slate-800" style={{ transform: 'translateZ(8px)' }}>
                    <div>
                      <span>STATUS: {selectedEmployee.statusKepegawaian} | TIPE: {selectedEmployee.jenisKepegawaian || 'PNS'}</span>
                    </div>
                    {/* Fake Barcode */}
                    <div className="flex gap-[1.5px] items-center py-0.5 justify-end w-14 shrink-0 bg-white p-1 rounded-xs">
                      <span className="w-[1px] h-3 bg-black"></span>
                      <span className="w-[2px] h-3 bg-black"></span>
                      <span className="w-[1px] h-3 bg-black"></span>
                      <span className="w-[3px] h-3 bg-black"></span>
                      <span className="w-[1px] h-3 bg-black"></span>
                      <span className="w-[2px] h-3 bg-black"></span>
                    </div>
                  </div>
                </motion.div>
              </div>
            )}
          </div>
        )}
             {/* TAB 5: ANALITIK SDM & ASISTEN SURAT (REPLACED CONSULTANT VIEW) */}
        {activeTab === 'consultant' && (
          <div className="flex-1 flex flex-col lg:flex-row gap-6 overflow-hidden">
            
            {/* LEFT CONTROL PANEL */}
            <div className="w-full lg:w-[380px] shrink-0 flex flex-col gap-5 overflow-y-auto pr-1">
              
              {/* CARD 1: ANALITIK SDM */}
              <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-xs flex flex-col gap-4">
                <div>
                  <div className="flex items-center gap-1.5 text-blue-600">
                    <BrainCircuit className="w-4.5 h-4.5" />
                    <h3 className="text-sm font-extrabold text-slate-800">Analitik SDM Otomatis</h3>
                  </div>
                  <p className="text-[11px] text-slate-400 mt-0.5 leading-relaxed">
                    Satu klik untuk memantau indikator, rasio, dan tren kepegawaian RSUD secara dinamis menggunakan Gemini.
                  </p>
                </div>

                <div className="flex flex-col gap-2">
                  <button
                    onClick={handleAnalyzeNursePatientRatio}
                    disabled={aiLoading}
                    className="w-full p-3 bg-slate-50 border border-slate-200 hover:border-blue-300 hover:bg-blue-50/20 active:scale-[0.98] transition-all text-left rounded-xl flex items-start gap-2.5 disabled:opacity-50"
                  >
                    <Activity className="w-4 h-4 text-blue-500 shrink-0 mt-0.5" />
                    <div>
                      <h4 className="text-[11px] font-bold text-slate-700">Buat Laporan Rasio Perawat vs Pasien</h4>
                      <p className="text-[9.5px] text-slate-400 mt-0.5 leading-normal">Evaluasi kecukupan & analisis beban kerja perawat per ruangan.</p>
                    </div>
                  </button>

                  <button
                    onClick={handleShowRetirementProjection5Years}
                    disabled={aiLoading}
                    className="w-full p-3 bg-slate-50 border border-slate-200 hover:border-blue-300 hover:bg-blue-50/20 active:scale-[0.98] transition-all text-left rounded-xl flex items-start gap-2.5 disabled:opacity-50"
                  >
                    <CalendarClock className="w-4 h-4 text-blue-500 shrink-0 mt-0.5" />
                    <div>
                      <h4 className="text-[11px] font-bold text-slate-700">Tampilkan Grafik Pensiun 5 Tahun</h4>
                      <p className="text-[9.5px] text-slate-400 mt-0.5 leading-normal">Deteksi dini masa pensiun kritis berdasarkan rumpun medis & non-medis.</p>
                    </div>
                  </button>

                  <button
                    onClick={handleDetectShiftDisparities}
                    disabled={aiLoading}
                    className="w-full p-3 bg-slate-50 border border-slate-200 hover:border-blue-300 hover:bg-blue-50/20 active:scale-[0.98] transition-all text-left rounded-xl flex items-start gap-2.5 disabled:opacity-50"
                  >
                    <Sliders className="w-4 h-4 text-blue-500 shrink-0 mt-0.5" />
                    <div>
                      <h4 className="text-[11px] font-bold text-slate-700">Deteksi Ketimpangan Jadwal Shift</h4>
                      <p className="text-[9.5px] text-slate-400 mt-0.5 leading-normal">Audit disparitas sebaran tenaga fungsional & jam siaga pelayanan.</p>
                    </div>
                  </button>
                </div>
              </div>

              {/* CARD 2: ASISTEN PEMBUAT SURAT */}
              <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-xs flex flex-col gap-4">
                <div>
                  <div className="flex items-center gap-1.5 text-blue-600">
                    <FileText className="w-4.5 h-4.5" />
                    <h3 className="text-sm font-extrabold text-slate-800">Asisten Pembuat Surat</h3>
                  </div>
                  <p className="text-[11px] text-slate-400 mt-0.5 leading-relaxed">
                    Auto-generate draf SK, Surat Tugas, atau Surat Peringatan langsung berdasar data pegawai sesungguhnya.
                  </p>
                </div>

                <div className="flex flex-col gap-3">
                  {/* Dropdown Employee selection */}
                  <div>
                    <label className="block text-[9.5px] font-extrabold text-slate-400 uppercase tracking-widest mb-1.5">Pilih Pegawai Terkait:</label>
                    <select
                      value={selectedLetterEmpId}
                      onChange={(e) => setSelectedLetterEmpId(e.target.value)}
                      className="w-full text-[11px] font-semibold px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-100 focus:border-blue-400 text-slate-800"
                    >
                      <option value="">-- Hubungkan profil staf --</option>
                      {employees.map(emp => (
                        <option key={emp.id} value={emp.id}>
                          {emp.nama} ({emp.nip || 'Non-NIP'})
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Jenis Surat */}
                  <div>
                    <label className="block text-[9.5px] font-extrabold text-slate-400 uppercase tracking-widest mb-1.5">Jenis Dokumen Resmi:</label>
                    <div className="grid grid-cols-2 gap-2">
                      {[
                        { id: 'SK', label: 'SK Direktur' },
                        { id: 'Tugas', label: 'Surat Tugas' },
                        { id: 'Peringatan', label: 'Surat Peringatan' }
                      ].map(t => (
                        <button
                          key={t.id}
                          type="button"
                          onClick={() => setLetterType(t.id as any)}
                          className={`py-2 px-3 border rounded-xl text-[10.5px] font-extrabold text-center transition-all ${
                            letterType === t.id 
                              ? 'border-blue-500 bg-blue-50 text-blue-700 shadow-3xs' 
                              : 'border-slate-200 bg-slate-50 text-slate-500 hover:bg-slate-100'
                          }`}
                        >
                          {t.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Keterangan / substansi tambahan */}
                  <div>
                    <label className="block text-[9.5px] font-extrabold text-slate-400 uppercase tracking-widest mb-1.5">Substansi / Catatan Tambahan (Opsional):</label>
                    <textarea
                      rows={2}
                      value={letterContext}
                      onChange={(e) => setLetterContext(e.target.value)}
                      placeholder="Contoh: Dipindahkan ke unit ICU per tanggal 1 Juli / Mengikuti workshop manajemen limbah klinis"
                      className="w-full text-[11px] font-semibold px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-100 focus:border-blue-400 text-slate-800 placeholder:text-slate-400 resize-none leading-relaxed"
                    />
                  </div>

                  {/* Generate Trigger */}
                  <button
                    onClick={handleGenerateLetter}
                    disabled={aiLoading || !selectedLetterEmpId}
                    className="w-full py-2.5 bg-blue-600 hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed active:scale-[0.98] transition-all text-white font-extrabold text-xs rounded-xl flex items-center justify-center gap-1.5 mt-1"
                  >
                    <Sparkles className="w-4 h-4" />
                    <span>Generate Surat Dinas AI</span>
                  </button>
                </div>
              </div>
            </div>

            {/* RIGHT PANEL: OUTPUT PREVIEW AND DRAFT VIEW */}
            <div className="flex-1 bg-white p-5 rounded-2xl border border-slate-100 shadow-xs flex flex-col justify-between overflow-hidden">
              <div className="flex flex-col gap-4 flex-1 overflow-y-auto pr-1 pb-4">
                
                {/* Visual Header */}
                <div className="flex justify-between items-center pb-3 border-b border-slate-100 shrink-0">
                  <span className="text-xs font-extrabold text-slate-850 flex items-center gap-1.5">
                    <Sparkles className="w-4 h-4 text-blue-500 animate-pulse" />
                    SI-RSUD Laporan & Draf Surat Cerdas
                  </span>
                  
                  {/* Actions on response draft */}
                  {aiResponse && !aiLoading && (
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleCopyToClipboard(aiResponse)}
                        className="p-1 px-2 border border-slate-200 hover:border-slate-350 bg-slate-50 hover:bg-slate-100 text-slate-650 rounded-lg text-[10px] font-bold flex items-center gap-1 transition-all animate-fade-in"
                        title="Salin ke Clipboard"
                      >
                        {isCopied ? <CheckCircle className="w-3.5 h-3.5 text-emerald-600 animate-zoom-in" /> : <Copy className="w-3.5 h-3.5" />}
                        <span>{isCopied ? "Tersalin!" : "Salin Teks"}</span>
                      </button>
                      <button
                        onClick={() => handleDownloadLetterAsTxt(aiResponse)}
                        className="p-1 px-2 border border-slate-200 hover:border-slate-350 bg-slate-50 hover:bg-slate-100 text-slate-650 rounded-lg text-[10px] font-bold flex items-center gap-1 transition-all"
                        title="Unduh sebagai Berkas .TXT"
                      >
                        <Download className="w-3.5 h-3.5" />
                        <span>Unduh .TXT</span>
                      </button>
                    </div>
                  )}
                </div>

                {/* CENTRAL CONTAINER WITH CONDITIONAL WRAPPERS */}
                <div className="flex-1 flex flex-col justify-center">
                  {isAiConfigured === false ? (
                    <div className="text-center self-center py-6 max-w-sm bg-slate-50 p-6 rounded-2xl border border-slate-200 mx-auto">
                      <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center mx-auto mb-3 border border-blue-100">
                        <KeyRound className="w-6 h-6 animate-pulse" />
                      </div>
                      <h4 className="text-xs font-black text-slate-800">Sinergi AI Belum Dikonfigurasi</h4>
                      <p className="text-[10.5px] text-slate-500 mt-2 leading-relaxed">
                        Fitur asisten cerdas SI-RSUD memerlukan <strong>GEMINI_API_KEY</strong> untuk berjalan.
                      </p>
                      <div className="text-left mt-4 bg-white p-3.5 rounded-xl border border-slate-200/60 space-y-2 text-[10px] text-slate-600 leading-normal">
                        <p className="font-extrabold text-slate-700 uppercase tracking-wider text-[8.5px]">Langkah Konfigurasi:</p>
                        <div className="flex gap-2">
                          <span className="w-3.5 h-3.5 bg-blue-50 text-blue-700 rounded-full flex items-center justify-center font-bold text-[8.5px] shrink-0">1</span>
                          <span>Buka menu utama Pengembang AI Studio.</span>
                        </div>
                        <div className="flex gap-2">
                          <span className="w-3.5 h-3.5 bg-blue-50 text-blue-700 rounded-full flex items-center justify-center font-bold text-[8.5px] shrink-0">2</span>
                          <span>Pilih <strong>Settings &gt; Secrets</strong>.</span>
                        </div>
                        <div className="flex gap-2">
                          <span className="w-3.5 h-3.5 bg-blue-50 text-blue-700 rounded-full flex items-center justify-center font-bold text-[8.5px] shrink-0">3</span>
                          <span>Tambahkan secret baru bernama <code>GEMINI_API_KEY</code> &amp; simpan key Anda.</span>
                        </div>
                      </div>
                      <p className="text-[9.5px] text-slate-400 mt-3 italic leading-normal text-center">
                        *Lalu muat ulang halaman ini untuk mengaktifkan asisten cerdas secara otomatis.
                      </p>
                    </div>
                  ) : aiLoading || isAiConfigured === null ? (
                    <div className="flex flex-col items-center justify-center gap-3 text-center self-center py-12 mx-auto">
                      <RefreshCw className="w-12 h-12 text-blue-500 animate-spin" />
                      <div>
                        <p className="text-sm font-extrabold text-slate-705">AI Sedang Bekerja...</p>
                        <p className="text-xs text-slate-400 mt-1">Menyusun proyeksi tren, merumuskan analisis rasio, atau mendraf surat kedinasan formal.</p>
                      </div>
                    </div>
                  ) : aiError ? (
                    <div className="p-4 bg-rose-50 rounded-xl border border-rose-200 text-rose-800 text-xs self-center flex items-center gap-2 max-w-md mx-auto">
                      <AlertCircle className="w-5 h-5 shrink-0 text-rose-600" />
                      <div>
                        <p className="font-bold">Gagal Menyusun Insight:</p>
                        <p className="mt-1 leading-snug text-[10px]">{aiError}</p>
                      </div>
                    </div>
                  ) : aiResponse ? (
                    <div className="w-full flex flex-col gap-2.5">
                      
                      {/* Printable visual mock paper */}
                      <div className="w-full bg-white p-6 md:p-8 rounded-2xl border border-slate-200/95 shadow-sm text-xs leading-relaxed text-slate-800 font-mono select-text whitespace-pre-wrap max-h-[460px] overflow-y-auto relative subpixel-antialiased">
                        {/* Decorative background stripes simulating real letter sheets */}
                        <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-t-2xl"></div>
                        <span>{aiResponse}</span>
                      </div>
                      
                      <p className="text-[10px] text-slate-400 italic text-center leading-normal">
                        *Draf di atas siap disalin untuk dipindahkan ke sistem penomoran naskah dinas atau dicetak.
                      </p>
                    </div>
                  ) : (
                    <div className="text-center self-center py-12 text-slate-400 mx-auto">
                      <BrainCircuit className="w-16 h-16 xl:w-20 xl:h-24 mx-auto opacity-15 text-blue-600 animate-pulse" />
                      <p className="text-sm font-extrabold text-slate-600 mt-3 font-display">Sistem Siap Digunakan</p>
                      <p className="text-xs text-slate-400 mt-1 max-w-sm mx-auto leading-relaxed">
                        Pilih tombol "Analitik Otomatis" untuk melakukan tinjauan mikro, atau isi formulir di kiri untuk mulai merancang draf naskah dinas resmi staf kepegawaian RSUD.
                      </p>
                    </div>
                  )}
                </div>
              </div>

              {/* INPUT BOX AS BACKWARD FALLBACK */}
              <div className="no-print pt-3 border-t border-slate-100 shrink-0 flex gap-2">
                <input
                  type="text"
                  placeholder="Ketik instruksi kustom tambahan atau pertanyaan lain tentang pegawai..."
                  value={aiQuery}
                  onChange={(e) => setAiQuery(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') handleAIConsultation();
                  }}
                  disabled={aiLoading}
                  className="flex-1 px-4 py-3 border border-slate-200 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-400 bg-slate-50 disabled:opacity-50 text-slate-750 font-semibold"
                />
                <button
                  onClick={() => handleAIConsultation()}
                  disabled={aiLoading || !aiQuery.trim()}
                  className="px-5 bg-blue-600 hover:bg-blue-700 active:scale-95 transition text-white font-extrabold text-xs rounded-xl disabled:opacity-50 disabled:scale-100 flex items-center gap-1.5"
                >
                  <Sparkles className="w-4 h-4" />
                  <span>Kirim</span>
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </main>

      {/* --- ADD EMPLOYEE DIALOG MODAL --- */}
      <AnimatePresence>
        {isAdding && (
          <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
            <motion.div 
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-white rounded-3xl p-6 shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto flex flex-col gap-4 border border-slate-100"
            >
              <div className="flex justify-between items-center pb-3 border-b border-slate-100">
                <h3 className="text-sm font-extrabold text-slate-900 font-display flex items-center gap-2">
                  <UserPlus className="w-5 h-5 text-blue-600" />
                  Pendaftaran Pegawai RSUD Baru
                </h3>
                <button 
                  onClick={() => setIsAdding(false)} 
                  className="text-xs font-extrabold text-slate-400 hover:text-slate-650 cursor-pointer"
                >
                  Batal
                </button>
              </div>

              {/* Form Grid */}
              <form onSubmit={handleAddNew} className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                <div>
                  <label className="block font-bold text-slate-500 mb-1">Nama Lengkap (Beserta Gelar)</label>
                  <input
                    type="text"
                    required
                    placeholder="Contoh: dr. Ahmad Dani, Sp.A."
                    value={newEmp.nama}
                    onChange={(e) => setNewEmp(prev => ({ ...prev, nama: e.target.value }))}
                    className="w-full bg-slate-55 border border-slate-200 rounded-xl py-2 px-3 focus:outline-blue-500 font-semibold"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-500 mb-1">
                    {(newEmp.jenisKepegawaian || 'PNS') === 'BLUD' ? 'NRPTT (No. Registrasi Tenaga Kontrak)' : 'N.I.P / No. Kontrak'}
                  </label>
                  <input
                    type="text"
                    required
                    placeholder={(newEmp.jenisKepegawaian || 'PNS') === 'BLUD' ? 'Contoh: BLUD-2021003' : 'Contoh: 198006112009032002 atau BLUD-2021003'}
                    value={newEmp.nip}
                    onChange={(e) => setNewEmp(prev => ({ ...prev, nip: e.target.value }))}
                    className="w-full bg-slate-55 border border-slate-200 rounded-xl py-2 px-3 focus:outline-blue-500 font-mono font-semibold"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-500 mb-1">Jenis Kelamin</label>
                  <select
                    value={newEmp.gender}
                    onChange={(e) => setNewEmp(prev => ({ ...prev, gender: e.target.value as 'L' | 'P' }))}
                    className="w-full bg-slate-55 border border-slate-200 rounded-xl py-2 px-3 focus:outline-blue-500 font-semibold"
                  >
                    <option value="L">Laki-Laki (L)</option>
                    <option value="P">Perempuan (P)</option>
                  </select>
                </div>

                <div>
                  <label className="block font-bold text-slate-500 mb-1">Status Kepegawaian</label>
                  <select
                    value={newEmp.statusKepegawaian}
                    onChange={(e) => setNewEmp(prev => ({ ...prev, statusKepegawaian: e.target.value as any }))}
                    className="w-full bg-slate-55 border border-slate-200 rounded-xl py-2 px-3 focus:outline-blue-500 font-semibold"
                  >
                    <option value="Aktif">Aktif</option>
                    <option value="Cuti">Cuti</option>
                    <option value="Tugas Belajar">Tugas Belajar</option>
                  </select>
                </div>

                <div>
                  <label className="block font-bold text-slate-500 mb-1">Jenis Kepegawaian</label>
                  <select
                    value={newEmp.jenisKepegawaian || 'PNS'}
                    onChange={(e) => setNewEmp(prev => ({ ...prev, jenisKepegawaian: e.target.value as any }))}
                    className="w-full bg-slate-55 border border-slate-200 rounded-xl py-2 px-3 focus:outline-blue-500 font-semibold"
                  >
                    <option value="PNS">PNS (Pegawai Negeri Sipil)</option>
                    <option value="P3K">PPPK / P3K (Pegawai Pemerintah Perjanjian Kerja)</option>
                    <option value="BLUD">BLUD (Tenaga Kontrak Badan Layanan Daerah)</option>
                  </select>
                </div>

                <div>
                  <label className="block font-bold text-slate-500 mb-1">Tempat Lahir</label>
                  <input
                    type="text"
                    required
                    placeholder="Contoh: Balikpapan"
                    value={newEmp.tempatLahir}
                    onChange={(e) => setNewEmp(prev => ({ ...prev, tempatLahir: e.target.value }))}
                    className="w-full bg-slate-55 border border-slate-200 rounded-xl py-2 px-3 focus:outline-teal-500 font-semibold"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-500 mb-1">Tanggal Lahir (DD/MM/YYYY)</label>
                  <input
                    type="text"
                    required
                    placeholder="Contoh: 11/06/1980"
                    value={newEmp.tanggalLahir}
                    onChange={(e) => setNewEmp(prev => ({ ...prev, tanggalLahir: e.target.value }))}
                    className="w-full bg-slate-55 border border-slate-200 rounded-xl py-2 px-3 focus:outline-teal-500 font-semibold"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-500 mb-1">Golongan (Kedinasan)</label>
                  <input
                    type="text"
                    required
                    placeholder="Contoh: III/c atau IV/a"
                    value={newEmp.golongan}
                    onChange={(e) => setNewEmp(prev => ({ ...prev, golongan: e.target.value }))}
                    className="w-full bg-slate-55 border border-slate-200 rounded-xl py-2 px-3 focus:outline-teal-500 font-mono font-semibold"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-500 mb-1">Pangkat</label>
                  <input
                    type="text"
                    required
                    placeholder="Contoh: Pembina atau Penata"
                    value={newEmp.pangkat}
                    onChange={(e) => setNewEmp(prev => ({ ...prev, pangkat: e.target.value }))}
                    className="w-full bg-slate-55 border border-slate-200 rounded-xl py-2 px-3 focus:outline-teal-500 font-semibold"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-500 mb-1">Pendidikan Terakhir (Spesifik)</label>
                  <input
                    type="text"
                    required
                    placeholder="Contoh: Magister Manajemen / Keperawatan Ners"
                    value={newEmp.pendidikanTerakhir}
                    onChange={(e) => setNewEmp(prev => ({ ...prev, pendidikanTerakhir: e.target.value }))}
                    className="w-full bg-slate-55 border border-slate-200 rounded-xl py-2 px-3 focus:outline-teal-500 font-semibold"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-500 mb-1">Tingkat Pendidikan</label>
                  <select
                    value={newEmp.tingkatPendidikanTerakhir}
                    onChange={(e) => setNewEmp(prev => ({ ...prev, tingkatPendidikanTerakhir: e.target.value }))}
                    className="w-full bg-slate-55 border border-slate-200 rounded-xl py-2 px-3 focus:outline-teal-500 font-semibold"
                  >
                    <option value="S2 Profesi">S2 Profesi</option>
                    <option value="S2">S2</option>
                    <option value="S1 Profesi">S1 Profesi</option>
                    <option value="S1">S1</option>
                    <option value="DIV Profesi">DIV Profesi</option>
                    <option value="DIII">DIII</option>
                    <option value="SMA/SLTA">SMA/SLTA</option>
                  </select>
                </div>

                <div>
                  <label className="block font-bold text-slate-500 mb-1">Unit/Ruangan Penempatan</label>
                  <input
                    type="text"
                    required
                    placeholder="Contoh: Klinik Kandungan"
                    value={newEmp.unitRuangan}
                    onChange={(e) => setNewEmp(prev => ({ ...prev, unitRuangan: e.target.value }))}
                    className="w-full bg-slate-55 border border-slate-200 rounded-xl py-2 px-3 focus:outline-teal-500 font-semibold"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-500 mb-1">Grup Bidang Kerja</label>
                  <input
                    type="text"
                    required
                    placeholder="Contoh: Bidang Pelayanan Medik"
                    value={newEmp.bidang}
                    onChange={(e) => setNewEmp(prev => ({ ...prev, bidang: e.target.value }))}
                    className="w-full bg-slate-55 border border-slate-200 rounded-xl py-2 px-3 focus:outline-teal-500 font-semibold"
                  />
                </div>

                <div className="col-span-1 md:col-span-2">
                  <label className="block font-bold text-slate-500 mb-1">Pangkat Keterangan PNS/Catatan</label>
                  <input
                    type="text"
                    placeholder="Contoh: PNS Baru / Catatan Cuti"
                    value={newEmp.keterangan}
                    onChange={(e) => setNewEmp(prev => ({ ...prev, keterangan: e.target.value }))}
                    className="w-full bg-slate-55 border border-slate-200 rounded-xl py-2 px-3 focus:outline-teal-500 font-semibold"
                  />
                </div>

                <div className="col-span-1 md:col-span-2 pt-3 border-t border-slate-100 flex justify-end gap-2">
                  <button 
                    type="button" 
                    onClick={() => setIsAdding(false)} 
                    className="px-4 py-2 border border-slate-200 rounded-xl hover:bg-slate-50 hover:text-slate-700 font-semibold"
                  >
                    Batal
                  </button>
                  <button 
                    type="submit" 
                    className="px-5 py-2 bg-blue-600 hover:bg-blue-700 transition text-white font-bold rounded-xl"
                  >
                    Simpan Baru
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* --- EDIT EMPLOYEE STATE/MODAL --- */}
      <AnimatePresence>
        {editingId !== null && (
          <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
            <motion.div 
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-white rounded-3xl p-6 shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto flex flex-col gap-4 border border-slate-100"
            >
              <div className="flex justify-between items-center pb-3 border-b border-slate-100">
                <h3 className="text-sm font-extrabold text-slate-900 font-display flex items-center gap-2">
                  <Edit className="w-5 h-5 text-blue-600" />
                  Mengubah Data Pegawai RSUD
                </h3>
                <button 
                  onClick={() => setEditingId(null)} 
                  className="text-xs font-extrabold text-slate-400 hover:text-slate-650 cursor-pointer"
                >
                  Batal
                </button>
              </div>

              {/* Form Grid */}
              <form onSubmit={handleSaveEdit} className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                <div>
                  <label className="block font-bold text-slate-500 mb-1">Nama Lengkap</label>
                  <input
                    type="text"
                    required
                    value={editEmpState.nama || ''}
                    onChange={(e) => setEditEmpState(prev => ({ ...prev, nama: e.target.value }))}
                    className="w-full bg-slate-55 border border-slate-200 rounded-xl py-2 px-3 focus:outline-teal-500 font-semibold"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-500 mb-1">
                    {(editEmpState.jenisKepegawaian || 'PNS') === 'BLUD' ? 'NRPTT (No. Registrasi Tenaga Kontrak)' : 'N.I.P (18 Angka)'}
                  </label>
                  <input
                    type="text"
                    required
                    maxLength={(editEmpState.jenisKepegawaian || 'PNS') === 'PNS' ? 18 : 30}
                    value={editEmpState.nip || ''}
                    onChange={(e) => setEditEmpState(prev => ({ ...prev, nip: e.target.value }))}
                    className="w-full bg-slate-55 border border-slate-200 rounded-xl py-2 px-3 focus:outline-teal-500 font-mono font-semibold"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-500 mb-1">Jenis Kelamin</label>
                  <select
                    value={editEmpState.gender || 'L'}
                    onChange={(e) => setEditEmpState(prev => ({ ...prev, gender: e.target.value as any }))}
                    className="w-full bg-slate-55 border border-slate-200 rounded-xl py-2 px-3 focus:outline-blue-500 font-semibold"
                  >
                    <option value="L">Laki-Laki (L)</option>
                    <option value="P">Perempuan (P)</option>
                  </select>
                </div>

                <div>
                  <label className="block font-bold text-slate-500 mb-1">Status Kepegawaian</label>
                  <select
                    value={editEmpState.statusKepegawaian || 'Aktif'}
                    onChange={(e) => setEditEmpState(prev => ({ ...prev, statusKepegawaian: e.target.value as any }))}
                    className="w-full bg-slate-55 border border-slate-200 rounded-xl py-2 px-3 focus:outline-blue-500 font-semibold"
                  >
                    <option value="Aktif">Aktif</option>
                    <option value="Cuti">Cuti</option>
                    <option value="Tugas Belajar">Tugas Belajar</option>
                  </select>
                </div>

                <div>
                  <label className="block font-bold text-slate-500 mb-1">Jenis Kepegawaian</label>
                  <select
                    value={editEmpState.jenisKepegawaian || 'PNS'}
                    onChange={(e) => setEditEmpState(prev => ({ ...prev, jenisKepegawaian: e.target.value as any }))}
                    className="w-full bg-slate-55 border border-slate-200 rounded-xl py-2 px-3 focus:outline-blue-500 font-semibold"
                  >
                    <option value="PNS">PNS (Pegawai Negeri Sipil)</option>
                    <option value="P3K">PPPK / P3K (Pegawai Pemerintah Perjanjian Kerja)</option>
                    <option value="BLUD">BLUD (Tenaga Kontrak Badan Layanan Daerah)</option>
                  </select>
                </div>

                <div>
                  <label className="block font-bold text-slate-500 mb-1">Tempat Lahir</label>
                  <input
                    type="text"
                    required
                    value={editEmpState.tempatLahir || ''}
                    onChange={(e) => setEditEmpState(prev => ({ ...prev, tempatLahir: e.target.value }))}
                    className="w-full bg-slate-55 border border-slate-200 rounded-xl py-2 px-3 focus:outline-teal-500 font-semibold"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-500 mb-1">Tanggal Lahir</label>
                  <input
                    type="text"
                    required
                    value={editEmpState.tanggalLahir || ''}
                    onChange={(e) => setEditEmpState(prev => ({ ...prev, tanggalLahir: e.target.value }))}
                    className="w-full bg-slate-55 border border-slate-200 rounded-xl py-2 px-3 focus:outline-teal-500 font-semibold"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-500 mb-1">Golongan</label>
                  <input
                    type="text"
                    required
                    value={editEmpState.golongan || ''}
                    onChange={(e) => setEditEmpState(prev => ({ ...prev, golongan: e.target.value }))}
                    className="w-full bg-slate-55 border border-slate-200 rounded-xl py-2 px-3 focus:outline-teal-500 font-mono font-semibold"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-500 mb-1">Pangkat</label>
                  <input
                    type="text"
                    required
                    value={editEmpState.pangkat || ''}
                    onChange={(e) => setEditEmpState(prev => ({ ...prev, pangkat: e.target.value }))}
                    className="w-full bg-slate-55 border border-slate-200 rounded-xl py-2 px-3 focus:outline-teal-500 font-semibold"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-500 mb-1">Unit Penempatan</label>
                  <input
                    type="text"
                    required
                    value={editEmpState.unitRuangan || ''}
                    onChange={(e) => setEditEmpState(prev => ({ ...prev, unitRuangan: e.target.value }))}
                    className="w-full bg-slate-55 border border-slate-200 rounded-xl py-2 px-3 focus:outline-teal-500 font-semibold"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-500 mb-1">Grup Bidang Kerja</label>
                  <input
                    type="text"
                    required
                    value={editEmpState.bidang || ''}
                    onChange={(e) => setEditEmpState(prev => ({ ...prev, bidang: e.target.value }))}
                    className="w-full bg-slate-55 border border-slate-200 rounded-xl py-2 px-3 focus:outline-teal-500 font-semibold"
                  />
                </div>

                <div className="col-span-1 md:col-span-2">
                  <label className="block font-bold text-slate-500 mb-1">Riwayat Sertifikasi, Pelatihan terakhir / Catatan penting</label>
                  <input
                    type="text"
                    placeholder="Contoh: Sertifikasi ACLS (2024) / Pelatihan ICU Dasar"
                    value={editEmpState.keterangan || ''}
                    onChange={(e) => setEditEmpState(prev => ({ ...prev, keterangan: e.target.value }))}
                    className="w-full bg-slate-55 border border-slate-200 rounded-xl py-2 px-3 focus:outline-teal-500 font-semibold"
                  />
                </div>

                <div className="col-span-1 md:col-span-2 pt-3 border-t border-slate-100 flex justify-end gap-2">
                  <button 
                    type="button" 
                    onClick={() => setEditingId(null)} 
                    className="px-4 py-2 border border-slate-200 rounded-xl hover:bg-slate-50 font-semibold text-slate-700"
                  >
                    Batal
                  </button>
                  <button 
                    type="submit" 
                    className="px-5 py-2 bg-blue-600 hover:bg-blue-700 transition text-white font-bold rounded-xl"
                  >
                    Simpan Perubahan
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* --- EXCEL IMPORT DIALOG MODAL --- */}
      <AnimatePresence>
        {isExcelModalOpen && (
          <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
            <motion.div 
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-white rounded-3xl p-6 shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto flex flex-col gap-5 border border-slate-100/80"
            >
              <div className="flex justify-between items-start pb-3 border-b border-slate-100">
                <div className="flex flex-col text-left">
                  <h3 className="text-sm font-extrabold text-slate-900 font-display flex items-center gap-2">
                    <FileSpreadsheet className="w-5 h-5 text-emerald-600" />
                    <span>Unggah & Sinkronisasi Excel Otomatis</span>
                  </h3>
                  <div className="mt-1 flex items-center gap-1.5 flex-wrap">
                    <span className="text-[10px] text-slate-400 font-extrabold uppercase tracking-wider">Target Folder Kepegawaian:</span>
                    <span className={`text-[9px] font-black uppercase px-2 py-0.5 rounded-lg border shadow-xs ${
                      excelUploadTargetType === 'PNS' ? 'bg-blue-50 text-blue-700 border-blue-200' :
                      excelUploadTargetType === 'P3K' ? 'bg-amber-50 text-amber-700 border-amber-200' :
                      excelUploadTargetType === 'BLUD' ? 'bg-emerald-50 text-emerald-700 border-emerald-250' :
                      'bg-slate-100 text-slate-705 border-slate-300'
                    }`}>
                      {excelUploadTargetType === 'AUTO' ? 'Deteksi Otomatis' : `Khusus Sektor ${excelUploadTargetType}`}
                    </span>
                  </div>
                </div>
                <button 
                  onClick={() => {
                    setIsExcelModalOpen(false);
                    setPreviewEmployees([]);
                    setExcelFileName('');
                    setExcelParseError(null);
                  }} 
                  className="bg-slate-100 hover:bg-slate-200 text-slate-400 hover:text-slate-600 p-2 rounded-full transition-colors shrink-0"
                >
                  <span className="text-sm font-bold block px-1">✕</span>
                </button>
              </div>

              {/* Upload Target Folder Switcher Inside Modal */}
              <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-100 text-left">
                <label className="block text-[9px] font-extrabold text-slate-400 uppercase tracking-wider mb-2">Lokasi Berkas Sasaran (Silakan pilih):</label>
                <div className="grid grid-cols-4 gap-1.5">
                  <button
                    type="button"
                    onClick={() => setExcelUploadTargetType('AUTO')}
                    className={`py-1.5 px-2 rounded-xl border text-[10px] font-extrabold text-center transition-all cursor-pointer ${
                      excelUploadTargetType === 'AUTO'
                        ? 'bg-slate-950 text-white border-slate-950 shadow-sm'
                        : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-100'
                    }`}
                  >
                    Atur Otomatis
                  </button>
                  <button
                    type="button"
                    onClick={() => setExcelUploadTargetType('PNS')}
                    className={`py-1.5 px-2 rounded-xl border text-[10px] font-extrabold text-center transition-all cursor-pointer ${
                      excelUploadTargetType === 'PNS'
                        ? 'bg-blue-600 text-white border-blue-600 shadow-sm'
                        : 'bg-white text-blue-600 border-blue-200 hover:bg-blue-50/50'
                    }`}
                  >
                    PNS
                  </button>
                  <button
                    type="button"
                    onClick={() => setExcelUploadTargetType('P3K')}
                    className={`py-1.5 px-2 rounded-xl border text-[10px] font-extrabold text-center transition-all cursor-pointer ${
                      excelUploadTargetType === 'P3K'
                        ? 'bg-amber-600 text-white border-amber-600 shadow-sm'
                        : 'bg-white text-amber-600 border-amber-200 hover:bg-amber-50/50'
                    }`}
                  >
                    PPPK / P3K
                  </button>
                  <button
                    type="button"
                    onClick={() => setExcelUploadTargetType('BLUD')}
                    className={`py-1.5 px-2 rounded-xl border text-[10px] font-extrabold text-center transition-all cursor-pointer ${
                      excelUploadTargetType === 'BLUD'
                        ? 'bg-emerald-600 text-white border-emerald-600 shadow-sm'
                        : 'bg-white text-emerald-600 border-emerald-200 hover:bg-emerald-50/50'
                    }`}
                  >
                    BLUD
                  </button>
                </div>
              </div>

              {/* Upload Zone */}
              {!excelFileName ? (
                <div className="flex flex-col gap-4">
                  <div className="border-2 border-dashed border-slate-200 hover:border-emerald-500 rounded-2xl p-8 flex flex-col items-center justify-center gap-3 transition-colors bg-slate-50/50 hover:bg-emerald-50/5 relative group">
                    <input
                      type="file"
                      accept=".xlsx, .xls, .csv"
                      onChange={handleExcelUpload}
                      className="absolute inset-0 opacity-0 cursor-pointer z-10"
                    />
                    <div className="p-4 bg-emerald-100 rounded-2xl text-emerald-600 group-hover:scale-110 transition-transform">
                      <Upload className="w-7 h-7" />
                    </div>
                    <div className="text-center">
                      <p className="font-bold text-slate-800 text-xs">Pilih atau seret berkas Buku Kerja Excel Anda ke sini</p>
                      <p className="text-[10px] text-slate-400 mt-1">Mendukung format .xlsx, .xls, atau .csv</p>
                    </div>
                  </div>

                  <div className="bg-slate-50 p-4 rounded-xl border border-slate-100 flex flex-col md:flex-row gap-4 items-center justify-between">
                    <div className="text-left">
                      <h4 className="font-bold text-slate-700 text-xs">Belum memiliki pola kolom standar?</h4>
                      <p className="text-[10px] text-slate-400 mt-0.5 max-w-sm">
                        Unduh template fungsional standar dengan format kolom teroptimasi (PNS, PPPK/P3K, BLUD) agar langsung terpetakan sempurna.
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={handleDownloadTemplate}
                      className="whitespace-nowrap flex items-center gap-1.5 bg-emerald-50 hover:bg-emerald-100 text-emerald-700 font-bold text-xs py-2 px-3.5 rounded-lg border border-emerald-200 transition-colors cursor-pointer"
                    >
                      <Download className="w-4 h-4" />
                      Unduh Template Excel
                    </button>
                  </div>
                </div>
              ) : (
                <div className="flex flex-col gap-4 text-left">
                  {/* File status */}
                  <div className="bg-slate-50 border border-slate-100 p-3.5 rounded-xl flex items-center justify-between">
                    <div className="flex items-center gap-2.5">
                      <div className="p-2 bg-emerald-100 rounded-lg text-emerald-600">
                        <FileSpreadsheet className="w-5 h-5" />
                      </div>
                      <div>
                        <p className="font-bold text-slate-800 text-xs truncate max-w-xs md:max-w-md">{excelFileName}</p>
                        <p className="text-[10px] text-emerald-600 font-semibold mt-0.5">
                          {previewEmployees.length > 0 ? `Siap disinkronkan: ${previewEmployees.length} baris pegawai terdeteksi` : 'Sedang menganalisis struktur data...'}
                        </p>
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={() => {
                        setExcelFileName('');
                        setPreviewEmployees([]);
                        setExcelParseError(null);
                      }}
                      className="text-red-500 text-xs hover:underline font-bold"
                    >
                      Batal / Hapus
                    </button>
                  </div>

                  {/* Parse Error UI */}
                  {excelParseError && (
                    <div className="bg-red-50 border border-red-150 p-4 rounded-xl text-red-600 text-xs flex items-start gap-2.5">
                      <AlertCircle className="w-5 h-5 shrink-0 mt-0.5" />
                      <div>
                        <h4 className="font-bold text-red-800">Gagal Memetakan Kolom</h4>
                        <p className="mt-1 text-red-700 leading-relaxed">{excelParseError}</p>
                        <p className="mt-2 text-[10px] text-red-500">
                          Solusi: Harap pastikan dokumen Excel memiliki baris tajuk (headers) yang mencakup setidaknya judul kolom "Nama" atau "NIP" / "No. Kontrak". Anda juga bisa mengunduh Template Excel di atas untuk format yang teruji.
                        </p>
                      </div>
                    </div>
                  )}

                  {/* Preview Table */}
                  {previewEmployees.length > 0 && (
                    <div className="flex flex-col gap-2.5">
                      <div className="flex justify-between items-center">
                        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Hasil Analisis Otomatis (Maksimal 5 Pegawai Pertama)</span>
                        <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 border border-emerald-100 px-2 py-0.5 rounded-full uppercase tracking-widest font-mono">
                          Format Sesuai
                        </span>
                      </div>
                      
                      <div className="border border-slate-150 rounded-2xl overflow-hidden bg-white max-h-[190px] overflow-y-auto shadow-inner">
                        <table className="w-full text-left border-collapse">
                          <thead className="bg-slate-50 text-[10px] font-extrabold text-slate-550 uppercase font-mono border-b border-slate-150">
                            <tr>
                              <th className="p-3 pl-4">No.</th>
                              <th className="p-3">Nama Lengkap & Jenis</th>
                              <th className="p-3">
                                {excelUploadTargetType === 'BLUD' ? 'NRPTT' : 'NIP / No Kontrak'}
                              </th>
                              <th className="p-3">Unit Kerja</th>
                              <th className="p-3">Tempat, Tgl Lahir / Usia</th>
                            </tr>
                          </thead>
                          <tbody className="text-xs divide-y divide-slate-100">
                            {previewEmployees.slice(0, 5).map((row, index) => (
                              <tr key={index} className="hover:bg-slate-50/50">
                                <td className="p-3 pl-4 font-mono text-slate-400">{index + 1}</td>
                                <td className="p-3">
                                  <div className="font-extrabold text-slate-900 leading-tight">{row.nama}</div>
                                  <span className={`inline-block text-[8px] font-black uppercase px-2 py-0.5 rounded-md mt-1 border ${
                                    row.jenisKepegawaian === 'PNS' ? 'bg-blue-50 text-blue-700 border-blue-200' :
                                    row.jenisKepegawaian === 'P3K' ? 'bg-amber-50 text-amber-700 border-amber-200' :
                                    'bg-emerald-50 text-emerald-700 border-emerald-200'
                                  }`}>
                                    {row.jenisKepegawaian}
                                  </span>
                                </td>
                                <td className="p-3 font-mono text-slate-500 font-medium">{row.nip}</td>
                                <td className="p-3 text-slate-600">{row.unitRuangan}</td>
                                <td className="p-3">
                                  <div className="text-slate-800 font-medium">{row.tempatLahir}, {row.tanggalLahir}</div>
                                  <div className="text-[9px] text-slate-400 font-mono mt-0.5">{row.usiaTahun} Thn, {row.usiaBulan} bln</div>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                      <p className="text-[10px] italic text-slate-400 block text-right mt-1">...terdeteksi total {previewEmployees.length} pegawai dari berkas.</p>
                    </div>
                  )}

                  {/* Actions Row */}
                  <div className="pt-3 border-t border-slate-100 flex justify-end gap-2">
                    <button 
                      type="button" 
                      onClick={() => {
                        setExcelFileName('');
                        setPreviewEmployees([]);
                        setExcelParseError(null);
                      }} 
                      className="px-4 py-2 border border-slate-200 rounded-xl hover:bg-slate-50 font-bold text-xs text-slate-650 transition-colors"
                    >
                      Unggah File Lain
                    </button>
                    <button 
                      type="button" 
                      onClick={handleCommitExcelImport}
                      disabled={previewEmployees.length === 0}
                      className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 disabled:opacity-50 disabled:bg-slate-300 font-bold text-xs text-white rounded-xl flex items-center gap-1.5 transition-colors shadow-sm cursor-pointer"
                    >
                      <CheckCircle className="w-4 h-4" />
                      <span>Sinkronisasikan {previewEmployees.length} Pegawai</span>
                    </button>
                  </div>
                </div>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* --- CUSTOM CONFIRMATION OVERLAY MODAL --- */}
      <AnimatePresence>
        {confirmModal.isOpen && (
          <div className="fixed inset-0 z-50 bg-slate-900/65 backdrop-blur-xs flex items-center justify-center p-4">
            <motion.div 
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-white rounded-3xl p-6 shadow-2xl max-w-sm w-full border border-slate-100/85 flex flex-col gap-5 text-center items-center relative overflow-hidden text-left"
            >
              {/* Header Icon Indicator */}
              <div className={`w-14 h-14 rounded-full flex items-center justify-center border ${
                confirmModal.variant === 'danger' ? 'bg-rose-50 text-rose-600 border-rose-200' :
                confirmModal.variant === 'warning' ? 'bg-amber-50 text-amber-600 border-amber-200' :
                'bg-blue-50 text-blue-600 border-blue-200'
              }`}>
                {confirmModal.variant === 'danger' ? (
                  <Trash2 className="w-6 h-6" />
                ) : confirmModal.variant === 'warning' ? (
                  <AlertTriangle className="w-6 h-6" />
                ) : (
                  <AlertCircle className="w-6 h-6" />
                )}
              </div>

              {/* Title & Description */}
              <div className="flex flex-col gap-1.5 text-center">
                <h4 className="text-sm font-black text-slate-900 font-display">
                  {confirmModal.title}
                </h4>
                <p className="text-[11px] text-slate-500 leading-relaxed">
                  {confirmModal.description}
                </p>
              </div>

              {/* Action Buttons */}
              <div className="grid grid-cols-2 gap-3 w-full pt-1">
                <button
                  type="button"
                  onClick={() => setConfirmModal(prev => ({ ...prev, isOpen: false }))}
                  className="w-full py-2.5 border border-slate-200 rounded-2xl hover:bg-slate-50 font-bold text-xs text-slate-500 transition-colors cursor-pointer"
                >
                  Batal
                </button>
                <button
                  type="button"
                  onClick={confirmModal.onConfirm}
                  className={`w-full py-2.5 font-bold text-xs text-white rounded-2xl transition-all shadow-sm active:scale-95 cursor-pointer ${
                    confirmModal.variant === 'danger' ? 'bg-rose-600 hover:bg-rose-700' :
                    confirmModal.variant === 'warning' ? 'bg-amber-500 hover:bg-amber-650' :
                    'bg-blue-600 hover:bg-blue-700'
                  }`}
                >
                  Ya, Lanjutkan
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
}

