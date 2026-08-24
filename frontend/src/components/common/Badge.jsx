import clsx from 'clsx';
import { CheckCircle, AlertTriangle, XCircle, Info } from 'lucide-react';

export default function Badge({ type, children, className }) {
  const types = {
    verified: {
      bg: 'bg-nyaya-verified/10',
      text: 'text-nyaya-verified',
      border: 'border-nyaya-verified/20',
      icon: CheckCircle
    },
    warning: {
      bg: 'bg-nyaya-warning/10',
      text: 'text-nyaya-warning',
      border: 'border-nyaya-warning/20',
      icon: AlertTriangle
    },
    critical: {
      bg: 'bg-nyaya-critical/10',
      text: 'text-nyaya-critical',
      border: 'border-nyaya-critical/20',
      icon: XCircle
    },
    info: {
      bg: 'bg-nyaya-info/10',
      text: 'text-nyaya-info',
      border: 'border-nyaya-info/20',
      icon: Info
    },
    neutral: {
      bg: 'bg-nyaya-border/50',
      text: 'text-nyaya-secondary',
      border: 'border-nyaya-border',
      icon: null
    }
  };

  const style = types[type] || types.neutral;
  const Icon = style.icon;

  return (
    <span className={clsx(
      "inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-medium tracking-wide uppercase border",
      style.bg,
      style.text,
      style.border,
      className
    )}>
      {Icon && <Icon size={12} />}
      {children}
    </span>
  );
}
