
import { ButtonHTMLAttributes, ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface AnimatedButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?: 'default' | 'cosmic' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  icon?: ReactNode;
}

const AnimatedButton = ({
  children,
  className,
  variant = 'default',
  size = 'md',
  icon,
  ...props
}: AnimatedButtonProps) => {
  const variantClasses = {
    default: 'bg-nebula-600 hover:bg-nebula-700 text-white',
    cosmic: 'bg-gradient-to-r from-nebula-600 to-nebula-800 hover:from-nebula-700 hover:to-nebula-900 text-white',
    outline: 'bg-transparent border border-nebula-400 text-nebula-400 hover:bg-nebula-400/10'
  };
  
  const sizeClasses = {
    sm: 'py-2 px-4 text-sm',
    md: 'py-3 px-6 text-base',
    lg: 'py-4 px-8 text-lg'
  };
  
  return (
    <button
      className={cn(
        'relative inline-flex items-center justify-center overflow-hidden rounded-md font-medium transition-all duration-300',
        'before:absolute before:inset-0 before:z-0 before:opacity-0 before:transition-opacity hover:before:opacity-100',
        'before:bg-gradient-to-r before:from-nebula-500/20 before:via-transparent before:to-transparent',
        'shadow-lg hover:shadow-nebula-500/20 focus:outline-none focus:ring-2 focus:ring-nebula-500/50 focus:ring-offset-2 focus:ring-offset-cosmic-950',
        variantClasses[variant],
        sizeClasses[size],
        className
      )}
      {...props}
    >
      <span className="relative z-10 flex items-center gap-2">
        {icon && <span className="inline-flex">{icon}</span>}
        {children}
      </span>
    </button>
  );
};

export default AnimatedButton;
