"use client";
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  Search, 
  Network, 
  CheckCircle, 
  Briefcase, 
  History, 
  Info,
  Scale
} from 'lucide-react';
import clsx from 'clsx';

const navItems = [
  { href: '/', label: 'Research', icon: Search },
  { href: '/authority-map', label: 'Authority Map', icon: Network },
  { href: '/citation-checker', label: 'Citation Checker', icon: CheckCircle },
  { href: '/argument-builder', label: 'Argument Builder', icon: Briefcase },
  { href: '/history', label: 'History', icon: History },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <div className="w-64 bg-nyaya-surface border-r border-nyaya-border flex flex-col h-full flex-shrink-0">
      <div className="p-6">
        <Link href="/" className="flex items-center gap-3">
          <div className="w-8 h-8 rounded bg-nyaya-accent/10 flex items-center justify-center text-nyaya-accent">
            <Scale size={20} />
          </div>
          <div>
            <h1 className="text-sm font-bold tracking-widest text-nyaya-text">NYAYA</h1>
            <p className="text-[10px] tracking-[0.2em] text-nyaya-secondary uppercase">Intelligence</p>
          </div>
        </Link>
      </div>

      <nav className="flex-1 px-4 py-4 space-y-1">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href || (item.href !== '/' && pathname?.startsWith(item.href));
          
          return (
            <Link
              key={item.href}
              href={item.href}
              className={clsx(
                "flex items-center gap-3 px-3 py-2.5 rounded-md text-sm font-medium transition-colors",
                isActive 
                  ? "bg-nyaya-border/50 text-nyaya-accent" 
                  : "text-nyaya-secondary hover:text-nyaya-text hover:bg-nyaya-border/30"
              )}
            >
              <Icon size={18} className={isActive ? "text-nyaya-accent" : "text-nyaya-secondary"} />
              {item.label}
            </Link>
          );
        })}
      </nav>

      <div className="p-4 mt-auto border-t border-nyaya-border">
        <Link
          href="/about"
          className={clsx(
            "flex items-center gap-3 px-3 py-2.5 rounded-md text-sm font-medium transition-colors",
            pathname === '/about'
              ? "bg-nyaya-border/50 text-nyaya-accent" 
              : "text-nyaya-secondary hover:text-nyaya-text hover:bg-nyaya-border/30"
          )}
        >
          <Info size={18} />
          About / Engine
        </Link>
      </div>
    </div>
  );
}
