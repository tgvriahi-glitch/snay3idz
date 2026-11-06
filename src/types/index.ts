export interface CraftCategory {
  id: string;
  nameAr: string;
  nameFr: string;
  iconName: string;
  description: string;
  popularJobs: string[];
  bannerColor: string;
}

export interface Artisan {
  id: string;
  name: string;
  craftId: string;
  wilayaId: number;
  wilayaName: string;
  baladiya: string;
  phone: string;
  whatsapp: string;
  experienceYears: number;
  rating: number;
  reviewsCount: number;
  bio: string;
  priceEstimate: string;
  isAvailable: boolean;
  isEmergency24h: boolean;
  isVerified: boolean;
  avatarUrl?: string;
  workZone?: string;
  createdAt: string;
}

export interface Wilaya {
  id: number;
  code: string;
  nameAr: string;
  nameFr: string;
  keyBaladiyas?: string[];
}

export interface AppOwnerConfig {
  founderName: string;
  appName: string;
  instagramHandle: string;
  instagramUrl: string;
  whatsappNumber: string;
  whatsappDisplay: string;
  email: string;
  bioMessage: string;
}

export interface ClientReview {
  id: string;
  artisanId: string;
  authorName: string;
  rating: number;
  comment: string;
  date: string;
  wilaya: string;
}
