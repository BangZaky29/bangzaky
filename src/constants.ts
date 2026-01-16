
import type {NavItem, PortfolioItem } from './types';

export const NAV_ITEMS: NavItem[] = [
  { label: 'Home', path: '/' },
  { label: 'Portfolio', path: '/portfolio' },
  { label: 'Marketplace', path: '/market' },
  { label: 'Dashboard', path: '/dashboard' },
  { label: 'About', path: '/about' },
  { label: 'Contact', path: '/contact' },
];

// Use ID "2" as default for demo purposes
export const DEMO_USER_ID = '2';

// --- PORTFOLIO DATA GENERATION ---
// Helper to create tall mock screenshot URLs (simulating a full page)
const getTallImage = (text: string, color = '132724') => 
  `https://placehold.co/600x1800/${color}/2dd4bf?text=${encodeURIComponent(text)}+Page+Preview\n(Scrolls+on+Hover)`;

export const PORTFOLIO_ITEMS: PortfolioItem[] = [
  // --- MANUAL HIGHLIGHTS ---
  {
    id: 'featured-1',
    title: 'Nuansa Solution',
    description: 'Wujudkan Kehadiran Digital Legal Bisnis Anda. Platform terpercaya untuk membangun website legal profesional.',
    url: 'https://nuansasolution.id/',
    tags: ['Business', 'Legal', 'Corporate'],
    imageUrl: getTallImage('Nuansa Solution Homepage')
  },
  {
    id: 'featured-2',
    title: 'BangZaky Personal',
    description: 'Transforming ideas into powerful digital experiences. Modern, responsive websites that drive business growth.',
    url: 'https://bangzaky.vercel.app/',
    tags: ['Portfolio', 'Personal Brand', 'Creative'],
    imageUrl: getTallImage('BangZaky Portfolio')
  },
  {
    id: 'featured-3',
    title: 'MBELL Makeup Artist',
    description: 'Makeup artist yang berdedikasi untuk menonjolkan kecantikan alami Anda. Spesialis pengantin dan acara spesial.',
    url: 'https://mbell.vercel.app/',
    tags: ['Beauty', 'Service', 'Portfolio'],
    imageUrl: getTallImage('MBELL Makeup')
  },
  {
    id: 'featured-4',
    title: 'Najmi Service',
    description: 'Solusi Service Elektronik & Listrik Profesional dan Terpercaya. Teknisi berpengalaman untuk semua kebutuhan.',
    url: 'https://najmiservice.netlify.app/',
    tags: ['Service', 'Electronics', 'Landing Page'],
    imageUrl: getTallImage('Najmi Service')
  },
  // --- GENERATOR SURAT (FROM SQL) ---
  {
    id: 'sql-1',
    title: 'Generator Surat Kuasa',
    description: 'Tools pembuatan surat kuasa otomatis standar legal.',
    url: 'https://nuansasolution.id/generator-surat/surat-kuasa',
    tags: ['Tool', 'Generator', 'Premium'],
    imageUrl: getTallImage('Surat Kuasa Tool', '0f1d1a')
  },
  {
    id: 'sql-2',
    title: 'Kalkulator PPh',
    description: 'Hitung pajak penghasilan anda dengan akurat dan cepat.',
    url: 'https://nuansasolution.id/generator-surat/calculator-PPH',
    tags: ['Tool', 'Calculator', 'Free'],
    imageUrl: getTallImage('Kalkulator PPh', '0f1d1a')
  },
  {
    id: 'sql-3',
    title: 'Kalkulator Pajak Properti',
    description: 'Estimasi pajak properti dan bangunan secara online.',
    url: 'https://nuansasolution.id/generator-surat/kalkulator-pajak-properti',
    tags: ['Tool', 'Calculator', 'Free'],
    imageUrl: getTallImage('Pajak Properti', '0f1d1a')
  },
  {
    id: 'sql-4',
    title: 'Gen. Surat Pernyataan',
    description: 'Buat surat pernyataan resmi berbagai keperluan.',
    url: 'https://nuansasolution.id/generator-surat/surat-pernyataan',
    tags: ['Tool', 'Generator', 'Premium'],
    imageUrl: getTallImage('Surat Pernyataan', '0f1d1a')
  },
  {
    id: 'sql-5',
    title: 'Gen. Surat Permohonan',
    description: 'Template surat permohonan dinas dan instansi.',
    url: 'https://nuansasolution.id/generator-surat/surat-permohonan',
    tags: ['Tool', 'Generator', 'Premium'],
    imageUrl: getTallImage('Surat Permohonan', '0f1d1a')
  },
  {
    id: 'sql-6',
    title: 'Gen. Surat Perintah Kerja',
    description: 'SPK Generator untuk kontraktor dan freelancer.',
    url: 'https://nuansasolution.id/generator-surat/surat-perintah-kerja',
    tags: ['Tool', 'Business', 'Premium'],
    imageUrl: getTallImage('SPK Generator', '0f1d1a')
  },
  {
    id: 'sql-7',
    title: 'Generator Surat Jalan',
    description: 'Kelola logistik dengan surat jalan otomatis.',
    url: 'https://nuansasolution.id/generator-surat/surat-jalan',
    tags: ['Tool', 'Logistics', 'Premium'],
    imageUrl: getTallImage('Surat Jalan', '0f1d1a')
  },
  {
    id: 'sql-8',
    title: 'Invoice Generator',
    description: 'Buat tagihan profesional dalam hitungan detik.',
    url: 'https://nuansasolution.id/generator-surat/invoice',
    tags: ['Tool', 'Finance', 'Premium'],
    imageUrl: getTallImage('Invoice Tool', '0f1d1a')
  },
  {
    id: 'sql-9',
    title: 'Gen. Surat Penawaran',
    description: 'Kirim penawaran harga yang menarik dan rapi.',
    url: 'https://nuansasolution.id/generator-surat/surat-penawaran',
    tags: ['Tool', 'Marketing', 'Premium'],
    imageUrl: getTallImage('Surat Penawaran', '0f1d1a')
  },
  {
    id: 'sql-10',
    title: 'Gen. Perjanjian Sewa',
    description: 'Draft perjanjian sewa menyewa properti/aset.',
    url: 'https://nuansasolution.id/generator-surat/generator-surat-perjanjian-sewa',
    tags: ['Tool', 'Legal', 'Premium'],
    imageUrl: getTallImage('Perjanjian Sewa', '0f1d1a')
  },
  {
    id: 'sql-11',
    title: 'Gen. Kontrak Sewa Kantor',
    description: 'Khusus untuk penyewaan ruang kantor dan ruko.',
    url: 'https://nuansasolution.id/generator-surat/generator-surat-pksk',
    tags: ['Tool', 'Legal', 'Premium'],
    imageUrl: getTallImage('Kontrak Kantor', '0f1d1a')
  },
  {
    id: 'sql-12',
    title: 'Generator Slip Gaji',
    description: 'Manajemen payroll sederhana untuk UKM.',
    url: 'https://nuansasolution.id/generator-surat/generator-slip-gaji',
    tags: ['Tool', 'HR', 'Premium'],
    imageUrl: getTallImage('Slip Gaji', '0f1d1a')
  },
  {
    id: 'sql-14',
    title: 'Gen. Perjanjian Jual Beli',
    description: 'Surat PJB aman dan terpercaya.',
    url: 'https://nuansasolution.id/generator-surat/generator-surat-pjb',
    tags: ['Tool', 'Legal', 'Premium'],
    imageUrl: getTallImage('Surat PJB', '0f1d1a')
  },
  {
    id: 'sql-15',
    title: 'Gen. Laporan Bisnis',
    description: 'Format laporan kinerja bisnis bulanan/tahunan.',
    url: 'https://nuansasolution.id/generator-surat/generator-surat-laporan-bisnis',
    tags: ['Tool', 'Business', 'Premium'],
    imageUrl: getTallImage('Laporan Bisnis', '0f1d1a')
  },
  {
    id: 'sql-16',
    title: 'Gen. Tanda Terima',
    description: 'Bukti serah terima barang atau dokumen.',
    url: 'https://nuansasolution.id/generator-surat/generator-surat-tanda-terima',
    tags: ['Tool', 'Logistics', 'Premium'],
    imageUrl: getTallImage('Tanda Terima', '0f1d1a')
  },
  {
    id: 'sql-17',
    title: 'Custom Letter',
    description: 'Buat format surat sesuai kebutuhan spesifik.',
    url: 'https://nuansasolution.id/generator-surat/custom-letter',
    tags: ['Tool', 'Custom', 'Premium'],
    imageUrl: getTallImage('Custom Letter', '0f1d1a')
  }
];