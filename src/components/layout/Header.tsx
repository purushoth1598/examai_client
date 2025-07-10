// src/components/layout/Header.tsx

import { Button } from "@/components/ui/button";
import { Link, useLocation } from "react-router-dom";
import clsx from "clsx";

interface HeaderProps {
  showCTA?: boolean;
  showNav?: boolean;
}

export const Header = ({ showCTA = true, showNav = true }: HeaderProps) => {
  const location = useLocation();

  const navLinks = [
    { label: "Take Exam", path: "/examcategories" },
    { label: "Analytics", path: "/analytics" },
    { label: "Settings", path: "/settings" },
    { label: "Learn More", path: "/learn" },
  ];

  return (
    <header className="w-full px-6 py-4 bg-white/80 backdrop-blur-sm border-b border-gray-200/50 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-sm">AI</span>
          </div>
          <span className="text-xl font-bold text-gray-900">ExamAI</span>
        </Link>

        {/* Nav */}
        {showNav && (
          <nav className="hidden md:flex items-center space-x-8">
            {navLinks.map(({ label, path }) => (
              <Link
                key={label}
                to={path}
                className={clsx(
                  "text-gray-600 hover:text-gray-900 transition-colors",
                  location.pathname === path && "text-purple-600 font-semibold"
                )}
              >
                {label}
              </Link>
            ))}
          </nav>
        )}

        {/* CTA Button */}
        {showCTA && (
          <Button className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white px-6">
            Get Started
          </Button>
        )}
      </div>
    </header>
  );
};
