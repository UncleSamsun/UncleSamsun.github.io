import { PortelloIconView } from "@/design-system/portello/components";

export function ActivityBar() {
  return (
    <nav className="activity-bar" aria-label="Portfolio activity">
      <button
        className="activity-button is-active"
        type="button"
        aria-label="Explorer"
        aria-current="page"
        title="Explorer"
        disabled
      >
        <PortelloIconView icon="file-text" size={20} />
      </button>
      <button className="activity-button" type="button" aria-label="Search" title="Search" disabled>
        <PortelloIconView icon="search" size={20} />
      </button>
      <button className="activity-button" type="button" aria-label="Source control" title="Source control" disabled>
        <PortelloIconView icon="git-branch" size={20} />
      </button>
      <div className="activity-spacer" />
      <button className="activity-button" type="button" aria-label="Settings" title="Settings" disabled>
        <PortelloIconView icon="settings" size={20} />
      </button>
    </nav>
  );
}
