import React from 'react';
import { Toaster } from 'react-hot-toast';
import Header from './Header';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div>
      <Header />
      <Toaster position="top-center" reverseOrder={false} />
      <main className="p-4">
        {children}
      </main>
    </div>
  );
};

export default Layout;
