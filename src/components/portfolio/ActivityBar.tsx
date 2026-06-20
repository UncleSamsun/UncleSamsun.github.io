import { PortelloIconView } from "@/design-system/portello/components";

export function ActivityBar() {
  return (
    <nav className="activity-bar" aria-label="Portfolio activity">
      <button className="activity-button is-active" type="button" aria-label="Explorer" title="Explorer">
        <PortelloIconView icon="file-text" size={20} />
      </button>
      <button className="activity-button" type="button" aria-label="Search" title="Search">
        <PortelloIconView icon="search" size={20} />
      </button>
      <button className="activity-button" type="button" aria-label="Source control" title="Source control">
        <PortelloIconView icon="git-branch" size={20} />
      </button>
      <div className="activity-spacer" />
      <button className="activity-button" type="button" aria-label="Settings" title="Settings">
        <PortelloIconView icon="settings" size={20} />
      </button>
    </nav>
  );
}
