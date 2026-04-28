import classNames from "classnames";
import { Link, To, useNavigate } from "react-router-dom";

import { NoUserAvatar, UserAvatar } from "@/components/Avatar";
import { IconPatch } from "@/components/buttons/IconPatch";
import { Icons } from "@/components/Icon";
import { ThemeToggle } from "@/components/layout/ThemeToggle";
import { LinksDropdown } from "@/components/LinksDropdown";
import { Lightbar } from "@/components/utils/Lightbar";
import { PirateTooltip } from "@/components/utils/PirateTooltip";
import { useAuth } from "@/hooks/auth/useAuth";
import { BlurEllipsis } from "@/pages/layouts/SubPageLayout";
import { conf } from "@/setup/config";
import { useBannerSize } from "@/stores/banner";

export interface NavigationProps {
  bg?: boolean;
  noLightbar?: boolean;
  doBackground?: boolean;
}

function DattaFlixLogo() {
  return (
    <span className="flex items-center gap-2 font-black tracking-tight">
      {/* Anchor icon */}
      <svg
        aria-hidden="true"
        width="26"
        height="26"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="text-[#F5C518] flex-shrink-0"
      >
        <circle cx="12" cy="5" r="2" />
        <line x1="12" y1="7" x2="12" y2="19" />
        <path d="M5 12H2a10 10 0 0 0 20 0h-3" />
      </svg>
      <span className="hidden sm:inline text-white text-lg leading-none">
        datta<span className="text-[#F5C518]">flix</span>
      </span>
    </span>
  );
}

export function Navigation(props: NavigationProps) {
  const bannerHeight = useBannerSize();
  const navigate = useNavigate();
  const { loggedIn } = useAuth();

  const handleClick = (path: To) => {
    window.scrollTo(0, 0);
    navigate(path);
  };

  return (
    <>
      {/* lightbar */}
      {!props.noLightbar ? (
        <div
          className="absolute inset-x-0 top-0 flex h-[88px] items-center justify-center"
          style={{ top: `${bannerHeight}px` }}
        >
          <div className="absolute inset-x-0 -mt-[22%] flex items-center sm:mt-0">
            <Lightbar />
          </div>
        </div>
      ) : null}

      {/* Background layer */}
      <div
        className="fixed z-[20] pointer-events-none left-0 right-0 top-0 min-h-[150px]"
        style={{ top: `${bannerHeight}px` }}
      >
        <div
          className={classNames(
            "fixed left-0 right-0 h-20 flex items-center",
            props.doBackground
              ? "bg-background-main border-b border-utils-divider border-opacity-50"
              : null,
          )}
        >
          {props.doBackground ? (
            <div className="absolute w-full h-full inset-0 overflow-hidden">
              <BlurEllipsis positionClass="absolute" />
            </div>
          ) : null}
          <div className="opacity-0 absolute inset-0 block h-20 pointer-events-auto" />
          <div
            className={`${
              props.bg ? "opacity-100" : "opacity-0"
            } absolute inset-0 block h-24 bg-background-main transition-opacity duration-300`}
          >
            <div className="absolute -bottom-24 h-24 w-full bg-gradient-to-b from-background-main to-transparent" />
          </div>
        </div>
      </div>

      {/* Nav content */}
      <div
        className="fixed pointer-events-none left-0 right-0 z-[60] top-0 min-h-[150px]"
        style={{ top: `${bannerHeight}px` }}
      >
        <div className="fixed left-0 right-0 flex items-center">
          <div className="px-6 py-5 relative z-[60] flex flex-1 items-center justify-between">
            {/* Left — Logo + nav links */}
            <div className="flex items-center gap-2 sm:gap-4 pointer-events-auto">
              {/* Logo */}
              <Link
                to="/"
                onClick={() => window.scrollTo(0, 0)}
                className="tabbable rounded-xl focus:outline-none focus-visible:ring-2 focus-visible:ring-[#F5C518]/60"
                aria-label="Datta-Flix home"
              >
                <div className="flex items-center gap-2 rounded-xl bg-white/5 backdrop-blur-md border border-white/10 px-3 py-2 hover:bg-white/10 transition-all duration-200 hover:scale-[1.03] active:scale-95">
                  <DattaFlixLogo />
                </div>
              </Link>

              {/* Nav links */}
              <nav
                className="hidden sm:flex items-center gap-1"
                aria-label="Main navigation"
              >
                <PirateTooltip
                  pirateLabel="The Harbor"
                  englishLabel="Home"
                  side="bottom"
                >
                  <Link
                    to="/"
                    onClick={() => window.scrollTo(0, 0)}
                    className="rounded-lg px-3 py-2 text-sm font-medium text-white/70 hover:text-white hover:bg-white/10 transition-all duration-150 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/40"
                  >
                    The Harbor
                  </Link>
                </PirateTooltip>

                <PirateTooltip
                  pirateLabel="Discover"
                  englishLabel="Browse trending"
                  side="bottom"
                >
                  <a
                    onClick={() => handleClick("/discover")}
                    className="cursor-pointer rounded-lg px-3 py-2 text-sm font-medium text-white/70 hover:text-white hover:bg-white/10 transition-all duration-150 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/40"
                  >
                    Discover
                  </a>
                </PirateTooltip>
              </nav>

              {/* Mobile: icon-only links */}
              <div className="flex sm:hidden items-center gap-1 pointer-events-auto">
                <PirateTooltip
                  pirateLabel="Discover"
                  englishLabel="Browse"
                  side="bottom"
                >
                  <a
                    onClick={() => handleClick("/discover")}
                    className="text-xl text-white/70 hover:text-white tabbable rounded-full cursor-pointer"
                    aria-label="Discover"
                  >
                    <IconPatch icon={Icons.RISING_STAR} clickable downsized />
                  </a>
                </PirateTooltip>
              </div>

              {/* Social links */}
              <div className="hidden md:flex items-center gap-1">
                {conf().DISCORD_LINK && (
                  <PirateTooltip
                    pirateLabel="Join the Crew"
                    englishLabel="Discord"
                    side="bottom"
                  >
                    <a
                      href={conf().DISCORD_LINK}
                      target="_blank"
                      rel="noreferrer"
                      className="text-xl text-white/60 hover:text-white tabbable rounded-full"
                      aria-label="Join our Discord"
                    >
                      <IconPatch icon={Icons.DISCORD} clickable downsized />
                    </a>
                  </PirateTooltip>
                )}
                {conf().GITHUB_LINK && (
                  <PirateTooltip
                    pirateLabel="The Blueprints"
                    englishLabel="GitHub source"
                    side="bottom"
                  >
                    <a
                      href={conf().GITHUB_LINK}
                      target="_blank"
                      rel="noreferrer"
                      className="text-xl text-white/60 hover:text-white tabbable rounded-full"
                      aria-label="View source on GitHub"
                    >
                      <IconPatch icon={Icons.GITHUB} clickable downsized />
                    </a>
                  </PirateTooltip>
                )}
              </div>
            </div>

            {/* Right — Theme toggle + user */}
            <div className="flex items-center gap-2 pointer-events-auto">
              <ThemeToggle />

              <div className="relative">
                <LinksDropdown>
                  {loggedIn ? <UserAvatar withName /> : <NoUserAvatar />}
                </LinksDropdown>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
