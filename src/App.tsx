import React from 'react';
import Header from './components/common/Header';
import Footer from './components/common/Footer';
import DailyTraining from './components/DailyTraining';
import ProgressReport from './components/ProgressReport';
import WrongQuestionBook from './components/WrongQuestionBook';
import { TrainingProvider } from './contexts/TrainingContext';

const App: React.FC = () => {
  const [activeTab, setActiveTab] = React.useState<'training' | 'report' | 'wrongQuestions'>('training');

  return (
    <TrainingProvider>
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-grow container mx-auto px-4 py-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-center mb-2">每日微训练</h1>
            <p className="text-secondary text-center">5分钟碎片化练习，提升你的社交能力</p>
          </div>
          
          <div className="flex justify-center mb-8">
            <div className="bg-white p-1 rounded-full shadow-sm inline-flex">
              <button
                className={`px-6 py-2 rounded-full font-medium transition-all ${activeTab === 'training' ? 'bg-primary text-white' : 'text-secondary hover:text-primary'}`}
                onClick={() => setActiveTab('training')}
              >
                开始训练
              </button>
              <button
                className={`px-6 py-2 rounded-full font-medium transition-all ${activeTab === 'report' ? 'bg-primary text-white' : 'text-secondary hover:text-primary'}`}
                onClick={() => setActiveTab('report')}
              >
                进步报告
              </button>
              <button
                className={`px-6 py-2 rounded-full font-medium transition-all ${activeTab === 'wrongQuestions' ? 'bg-primary text-white' : 'text-secondary hover:text-primary'}`}
                onClick={() => setActiveTab('wrongQuestions')}
              >
                错题本
              </button>
            </div>
          </div>
          
          <div className="fade-in">
            {activeTab === 'training' && <DailyTraining />}
            {activeTab === 'report' && <ProgressReport />}
            {activeTab === 'wrongQuestions' && <WrongQuestionBook />}
          </div>
        </main>
        <Footer />
      </div>
    </TrainingProvider>
  );
};

export default App;
