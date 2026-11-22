import type { Tab } from "../types";
import { useApp } from "../context/AppContext";
import { cn } from "../utils/cn";
import { useNavItems } from "./Navbar";

interface Props {
  tab: Tab;
  onTab: (t: Tab) => void;
}

export function BottomNav({ tab, onTab }: Props) {
  const { tr } = useApp();
  const items = useNavItems();
  return (
    <nav
      aria-label={tr("নিচের মেনু", "Bottom navigation")}
      className="fixed inset-x-0 bottom-0 z-40 border-t border-line bg-card/95 pb-[env(safe-area-inset-bottom)] backdrop-blur md:hidden"
    >
      <ul className="mx-auto grid h-16 max-w-md grid-cols-5">
        {items.map(({ id, label, icon: Icon }) => {
          const active = tab === id;
          return (
            <li key={id}>
              <button
                onClick={() => onTab(id)}
                aria-current={active ? "page" : undefined}
                className={cn("flex h-full w-full flex-col items-center justify-center gap-1 text-[11px] font-medium transition-colors", active ? "text-accent" : "text-muted")}
              >
                <span className={cn("grid h-7 w-12 place-items-center rounded-full transition-colors", active && "bg-accent-soft")}>
                  <Icon size={20} strokeWidth={active ? 2.4 : 2} />
                </span>
                {label}
              </button>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
