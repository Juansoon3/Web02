import React from 'react';

const Header: React.FC = () => {
  return (
    <header className="bg-white shadow-sm">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-xl">微</span>
          </div>
          <h2 className="text-xl font-bold text-dark">每日微训练</h2>
        </div>
        <nav>
          <ul className="flex space-x-6">
            <li>
              <a href="#" className="text-secondary hover:text-primary transition-colors">首页</a>
            </li>
            <li>
              <a href="#" className="text-secondary hover:text-primary transition-colors">关于</a>
            </li>
            <li>
              <a href="#" className="text-secondary hover:text-primary transition-colors">帮助</a>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
