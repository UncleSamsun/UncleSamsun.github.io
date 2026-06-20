import type { CSSProperties, SVGProps } from "react";
import {
  ArrowRight,
  Blocks,
  Boxes,
  Braces,
  ChevronDown,
  ChevronRight,
  CircleCheck,
  Coffee,
  Database,
  Download,
  File,
  FileText,
  Folder,
  FolderOpen,
  GitBranch,
  Globe,
  HardDrive,
  Image,
  Mail,
  MoreHorizontal,
  PanelBottom,
  Play,
  Plus,
  Search,
  Server,
  Settings,
  Shield,
  ShieldCheck,
  Terminal,
  TrendingUp,
  Trash2,
  Users,
  X,
  type LucideIcon,
} from "lucide-react";

export type PortelloIconName =
  | "arrow-right"
  | "blocks"
  | "boxes"
  | "braces"
  | "chevron-down"
  | "chevron-right"
  | "circle-check"
  | "coffee"
  | "database"
  | "download"
  | "file"
  | "file-text"
  | "folder"
  | "folder-open"
  | "git-branch"
  | "globe"
  | "hard-drive"
  | "image"
  | "mail"
  | "more-horizontal"
  | "panel-bottom"
  | "play"
  | "plus"
  | "search"
  | "server"
  | "shield"
  | "shield-check"
  | "settings"
  | "terminal"
  | "trending-up"
  | "trash-2"
  | "users"
  | "x";

export type PortelloIcon = PortelloIconName | LucideIcon;

const icons: Record<PortelloIconName, LucideIcon> = {
  "arrow-right": ArrowRight,
  blocks: Blocks,
  boxes: Boxes,
  braces: Braces,
  "chevron-down": ChevronDown,
  "chevron-right": ChevronRight,
  "circle-check": CircleCheck,
  coffee: Coffee,
  database: Database,
  download: Download,
  file: File,
  "file-text": FileText,
  folder: Folder,
  "folder-open": FolderOpen,
  "git-branch": GitBranch,
  globe: Globe,
  "hard-drive": HardDrive,
  image: Image,
  mail: Mail,
  "more-horizontal": MoreHorizontal,
  "panel-bottom": PanelBottom,
  play: Play,
  plus: Plus,
  search: Search,
  server: Server,
  shield: Shield,
  "shield-check": ShieldCheck,
  settings: Settings,
  terminal: Terminal,
  "trending-up": TrendingUp,
  "trash-2": Trash2,
  users: Users,
  x: X,
};

export interface PortelloIconViewProps extends Omit<SVGProps<SVGSVGElement>, "ref"> {
  icon: PortelloIcon;
  size: CSSProperties["width"];
}

export function PortelloIconView({
  icon,
  size,
  style,
  ...rest
}: PortelloIconViewProps) {
  const Icon = typeof icon === "string" ? icons[icon] : icon;

  return (
    <Icon
      aria-hidden="true"
      focusable="false"
      strokeWidth={1.8}
      style={{ width: size, height: size, ...style }}
      {...rest}
    />
  );
}
