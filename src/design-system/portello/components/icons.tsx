import type { CSSProperties, SVGProps } from "react";
import {
  Blocks,
  Boxes,
  ChevronDown,
  ChevronRight,
  CircleCheck,
  Coffee,
  Download,
  FileText,
  Folder,
  FolderOpen,
  GitBranch,
  MoreHorizontal,
  PanelBottom,
  Play,
  Plus,
  Search,
  Settings,
  Terminal,
  Trash2,
  X,
  type LucideIcon,
} from "lucide-react";

export type PortelloIconName =
  | "blocks"
  | "boxes"
  | "chevron-down"
  | "chevron-right"
  | "circle-check"
  | "coffee"
  | "download"
  | "file-text"
  | "folder"
  | "folder-open"
  | "git-branch"
  | "more-horizontal"
  | "panel-bottom"
  | "play"
  | "plus"
  | "search"
  | "settings"
  | "terminal"
  | "trash-2"
  | "x";

export type PortelloIcon = PortelloIconName | LucideIcon;

const icons: Record<PortelloIconName, LucideIcon> = {
  blocks: Blocks,
  boxes: Boxes,
  "chevron-down": ChevronDown,
  "chevron-right": ChevronRight,
  "circle-check": CircleCheck,
  coffee: Coffee,
  download: Download,
  "file-text": FileText,
  folder: Folder,
  "folder-open": FolderOpen,
  "git-branch": GitBranch,
  "more-horizontal": MoreHorizontal,
  "panel-bottom": PanelBottom,
  play: Play,
  plus: Plus,
  search: Search,
  settings: Settings,
  terminal: Terminal,
  "trash-2": Trash2,
  x: X,
};

interface PortelloIconViewProps extends Omit<SVGProps<SVGSVGElement>, "ref"> {
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
