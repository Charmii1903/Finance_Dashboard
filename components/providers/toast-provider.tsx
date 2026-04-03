'use client';

import { Toaster } from 'sonner';

export function ToastProvider() {
  return (
    <Toaster
      position="top-right"
      richColors
      theme="system"
      expand={false}
      duration={3000}
      toastOptions={{
        classNameFunction: (toast) => {
          const baseClasses = 'flex gap-3 items-center px-4 py-3 rounded-lg shadow-lg font-medium text-sm';
          
          if (toast.type === 'success') {
            return `${baseClasses} bg-primary text-primary-foreground border border-primary/20`;
          }
          if (toast.type === 'error') {
            return `${baseClasses} bg-destructive text-destructive-foreground border border-destructive/20`;
          }
          if (toast.type === 'loading') {
            return `${baseClasses} bg-primary/80 text-primary-foreground border border-primary/20`;
          }
          return `${baseClasses} bg-card text-card-foreground border border-border`;
        },
      }}
      style={{
        '--sonner-success-text': 'hsl(var(--primary-foreground))',
        '--sonner-success-bg': 'hsl(var(--primary))',
        '--sonner-error-text': 'hsl(var(--destructive-foreground))',
        '--sonner-error-bg': 'hsl(var(--destructive))',
      } as React.CSSProperties}
    />
  );
}
