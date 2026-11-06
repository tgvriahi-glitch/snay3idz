import React from 'react';
import {
  Wrench,
  Zap,
  Fan,
  Paintbrush,
  Hammer,
  Layers,
  Key,
  Cpu,
  Car,
  Sparkles,
  ShieldCheck,
  Phone,
  MessageCircle,
  Clock,
  MapPin,
  CheckCircle2,
  AlertTriangle,
  Lock,
  Instagram,
  UserCheck,
  Star,
  Search,
  SlidersHorizontal,
  PlusCircle,
  Trash2,
  Edit3,
  ExternalLink,
  ChevronLeft,
  ChevronRight,
  Info,
  HelpCircle,
  Home,
  Check
} from 'lucide-react';

interface CraftIconProps {
  name: string;
  className?: string;
}

export const CraftIcon: React.FC<CraftIconProps> = ({ name, className = 'w-5 h-5' }) => {
  switch (name) {
    case 'Wrench':
      return <Wrench className={className} />;
    case 'Zap':
      return <Zap className={className} />;
    case 'Fan':
      return <Fan className={className} />;
    case 'Paintbrush':
      return <Paintbrush className={className} />;
    case 'Hammer':
      return <Hammer className={className} />;
    case 'Layers':
      return <Layers className={className} />;
    case 'Key':
      return <Key className={className} />;
    case 'Cpu':
      return <Cpu className={className} />;
    case 'Car':
      return <Car className={className} />;
    case 'Sparkles':
      return <Sparkles className={className} />;
    default:
      return <Wrench className={className} />;
  }
};

export {
  Wrench,
  Zap,
  Fan,
  Paintbrush,
  Hammer,
  Layers,
  Key,
  Cpu,
  Car,
  Sparkles,
  ShieldCheck,
  Phone,
  MessageCircle,
  Clock,
  MapPin,
  CheckCircle2,
  AlertTriangle,
  Lock,
  Instagram,
  UserCheck,
  Star,
  Search,
  SlidersHorizontal,
  PlusCircle,
  Trash2,
  Edit3,
  ExternalLink,
  ChevronLeft,
  ChevronRight,
  Info,
  HelpCircle,
  Home,
  Check
};
