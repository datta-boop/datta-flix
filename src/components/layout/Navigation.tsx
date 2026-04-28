import classNames from "classnames";
import { Link, To, useNavigate } from "react-router-dom";

import { NoUserAvatar, UserAvatar } from "@/components/Avatar";
import { IconPatch } from "@/components/buttons/IconPatch";
import { Icons } from "@/components/Icon";
import { LinksDropdown } from "@/components/LinksDropdown";
import { useAuth } from "@/hooks/auth/useAuth";
import { conf } from "@/setup/config";
import { useBannerSize } from "@/stores/banner";

import { BrandPill } from "./BrandPill";

export interface NavigationProps {
  bg?: boolean;
  noLightbar?: boolean;
  doBackground?: boolean;
}

export function Navigation(props: NavigationProps) {
  const bannerHeight = useBannerSize();
  const navigate = useNavigate();
  const { loggedIn } = useAuth();
  const bg = props.bg || props.doBackground;

  const handleClick = (path: To) => {
    window.scrollTo(0, 0);
    navigate(path);
  };

  return (
    <>
      {/* Subtle gold shimmer line */}
      {!props.noLightbar && (
        <div
          className="absolute inset-x-0 top-0 pointer-events-none z-10"
          style={{ top: `${bannerHeight}px` }}
        >
          <div className="h-px w-full bg-gradient-to-r from-transparent via-[#D4A843]/30 to-transparent animate-gold-pulse" />
        </div>
      )}

      {/* Scroll background */}
      <div
        className="fixed z-[20] pointer-events-none left-0 right-0 top-0"
        style={{ top: `${bannerHeight}px` }}
      >
        <div
          className={classNames(
            "fixed left-0 right-0 h-20 transition-all duration-300",
            bg
              ? "bg-[#090D1C]/90 backdrop-blur-md border-b border-[#D4A843]/10"
              : "",
          )}
        />
      </div>

      {/* Nav items */}
      <div
        className="fixed pointer-events-none left-0 right-0 z-[60] top-0"
        style={{ top: `${bannerHeight}px` }}
      >
        <div className="fixed left-0 right-0 flex items-center h-20">
          <div className="px-4 sm:px-8 lg:px-12 w-full flex items-center justify-between pointer-events-auto">
            <div className="flex items-center gap-2 ssm:gap-3">
              <Link
                className="block tabbable rounded-full"
                to="/"
                onClick={() => window.scrollTo(0, 0)}
              >
                <BrandPill clickable header />
              </Link>
              <a
                href={conf().DISCORD_LINK}
                target="_blank"
                rel="noreferrer"
                className="text-warm-400 hover:text-[#D4A843] tabbable rounded-full transition-colors"
                aria-label="Discord"
              >
                <IconPatch icon={Icons.DISCORD} clickable downsized />
              </a>
              <a
                href={conf().GITHUB_LINK}
                target="_blank"
                rel="noreferrer"
                className="text-warm-400 hover:text-[#D4A843] tabbable rounded-full transition-colors"
                aria-label="GitHub"
              >
                <IconPatch icon={Icons.GITHUB} clickable downsized />
              </a>
              <button
                type="button"
                onClick={() => handleClick("/discover")}
                className="text-warm-400 hover:text-[#D4A843] tabbable rounded-full transition-colors"
                aria-label="Discover"
              >
                <IconPatch icon={Icons.RISING_STAR} clickable downsized />
              </button>
            </div>

            <div className="relative">
              <LinksDropdown>
                {loggedIn ? <UserAvatar withName /> : <NoUserAvatar />}
              </LinksDropdown>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
