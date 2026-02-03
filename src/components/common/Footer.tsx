import React from 'react';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-dark text-white py-8 mt-12">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">微</span>
              </div>
              <span className="font-bold">每日微训练</span>
            </div>
            <p className="text-gray-400 text-sm mt-2">5分钟碎片化练习，提升社交能力</p>
          </div>
          <div className="text-center md:text-right">
            <p className="text-gray-400 text-sm">© {currentYear} 每日微训练. 保留所有权利.</p>
            <p className="text-gray-500 text-xs mt-1">通过 GitHub Pages 部署</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
