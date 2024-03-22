'use client';

interface ButtonProps {
  children: React.ReactNode;
  className?: string;
  appName: string;
}

export const Button = ({ children, className, appName }: ButtonProps) => (
  <button
    type="button"
    className={className}
    onClick={() => alert(`Hello from your ${appName} app!`)}
  >
    {children}
  </button>
);
