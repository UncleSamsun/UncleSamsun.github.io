import { useEffect, useRef } from "react";
import { PortelloIconView } from "@/design-system/portello/components";
import { RichText } from "./RichText";

interface LightboxProps {
  src: string;
  title: string;
  caption?: string;
  onClose: () => void;
}

export function Lightbox({ src, title, caption, onClose }: LightboxProps) {
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    // Capture phase so this closes only the lightbox even when it is opened
    // on top of the project detail modal (which listens for Escape on bubble).
    const handleKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.stopPropagation();
        onClose();
      }
    };
    document.addEventListener("keydown", handleKey, true);

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();

    return () => {
      document.removeEventListener("keydown", handleKey, true);
      document.body.style.overflow = previousOverflow;
    };
  }, [onClose]);

  return (
    <div
      className="lightbox-overlay"
      role="dialog"
      aria-modal="true"
      aria-label={`${title} 확대 보기`}
      onClick={onClose}
    >
      <button ref={closeRef} type="button" className="lightbox-close" aria-label="닫기" onClick={onClose}>
        <PortelloIconView icon="x" size={20} />
      </button>
      <figure className="lightbox-figure" onClick={(event) => event.stopPropagation()}>
        <img className="lightbox-image" src={src} alt={title} />
        <figcaption className="lightbox-caption">
          <strong>{title}</strong>
          {caption ? (
            <span>
              <RichText text={caption} />
            </span>
          ) : null}
        </figcaption>
      </figure>
    </div>
  );
}
