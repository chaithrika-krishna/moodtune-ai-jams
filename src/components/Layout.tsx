import { ReactNode } from 'react';
import Navigation, { Sidebar } from './Navigation';

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Sidebar />
      <main className="md:ml-64 pb-16 md:pb-0">
        {children}
      </main>
      <Navigation />
    </div>
  );
};

export default Layout;