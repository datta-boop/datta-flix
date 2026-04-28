import classNames from "classnames";
import { ReactNode, useCallback, useId, useRef, useState } from "react";

interface PirateTooltipProps {
  /** The pirate-language label shown as visible text */
  pirateLabel: string;
  /** The English meaning shown in the tooltip on hover/focus */
  englishLabel: string;
  children?: ReactNode;
  className?: string;
  /** If true, renders only the tooltip wrapper around children (no visible label) */
  wrapOnly?: boolean;
  side?: "top" | "bottom" | "left" | "right";
}

/**
 * Accessible tooltip that shows pirate text visually and reveals
 * the English meaning on hover and keyboard focus.
 *
 * Uses aria-describedby so screen readers announce the English label.
 * Does NOT use the HTML title attribute.
 */
export function PirateTooltip({
  pirateLabel,
  englishLabel,
  children,
  className,
  wrapOnly = false,
  side = "bottom",
}: PirateTooltipProps) {
  const [visible, setVisible] = useState(false);
  const id = useId();
  const hideTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const show = useCallback(() => {
    if (hideTimer.current) clearTimeout(hideTimer.current);
    setVisible(true);
  }, []);

  const hide = useCallback(() => {
    hideTimer.current = setTimeout(() => setVisible(false), 80);
  }, []);

  const positionClasses: Record<string, string> = {
    top: "bottom-full left-1/2 -translate-x-1/2 mb-2",
    bottom: "top-full left-1/2 -translate-x-1/2 mt-2",
    left: "right-full top-1/2 -translate-y-1/2 mr-2",
    right: "left-full top-1/2 -translate-y-1/2 ml-2",
  };

  return (
    <span
      className={classNames("relative inline-flex items-center", className)}
      onMouseEnter={show}
      onMouseLeave={hide}
      onFocusCapture={show}
      onBlurCapture={hide}
    >
      {wrapOnly ? (
        <span aria-describedby={id}>{children}</span>
      ) : (
        <span
          aria-describedby={id}
          className="inline-flex items-center gap-1 cursor-default"
        >
          {children ?? pirateLabel}
        </span>
      )}

      {/* Tooltip bubble */}
      <span
        id={id}
        role="tooltip"
        aria-hidden={!visible}
        className={classNames(
          "pointer-events-none absolute z-[200] whitespace-nowrap rounded-lg px-3 py-1.5",
          "bg-[#0A0F1C]/95 text-white text-xs font-medium shadow-xl ring-1 ring-white/10",
          "backdrop-blur-md transition-all duration-150",
          positionClasses[side],
          visible
            ? "opacity-100 scale-100"
            : "opacity-0 scale-95 pointer-events-none",
        )}
      >
        <span className="text-[#F5C518] font-semibold mr-1">✦</span>
        {englishLabel}
      </span>
    </span>
  );
}

/**
 * Standalone tooltip wrapper — wraps any element and shows an English
 * tooltip on hover/focus. The trigger element is fully controlled by caller.
 */
export function TooltipWrapper({
  label,
  children,
  side = "bottom",
  className,
}: {
  label: string;
  children: ReactNode;
  side?: "top" | "bottom" | "left" | "right";
  className?: string;
}) {
  return (
    <PirateTooltip
      pirateLabel=""
      englishLabel={label}
      wrapOnly
      side={side}
      className={className}
    >
      {children}
    </PirateTooltip>
  );
}
