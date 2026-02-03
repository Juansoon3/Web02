import React, { useEffect, useState } from 'react';
import { useTraining } from '../../contexts/TrainingContext';
import ScenarioSimulation from './ScenarioSimulation';
import ExpressionPolish from './ExpressionPolish';
import TopicAccumulation from './TopicAccumulation';

const DailyTraining: React.FC = () => {
  const { 
    startDailyTraining, 
    currentTraining,
    submitScenarioResponse,
    submitExpressionPolish,
    markTopicMastered
  } = useTraining();
  
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [completed, setCompleted] = useState(false);
  // 移除未使用的responses状态变量
  
  useEffect(() => {
    startDailyTraining();
  }, [startDailyTraining]);
  
  const handleNextStep = () => {
    if (step < 3) {
      setStep(prev => prev + 1 as 1 | 2 | 3);
    } else {
      setCompleted(true);
    }
  };
  
  const handlePreviousStep = () => {
    if (step > 1) {
      setStep(prev => prev - 1 as 1 | 2 | 3);
    }
  };
  
  const handleScenarioSubmit = (response: string) => {
    setResponses(prev => ({ ...prev, scenario: response }));
    submitScenarioResponse(response);
    handleNextStep();
  };
  
  const handleExpressionSubmit = (polished: string) => {
    setResponses(prev => ({ ...prev, expression: polished }));
    submitExpressionPolish(polished);
    handleNextStep();
  };
  
  const handleTopicMastered = (topicId: string) => {
    markTopicMastered(topicId);
    handleNextStep();
  };
  
  if (!currentTraining.scenario || !currentTraining.expression || !currentTraining.topic) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <div className="text-center">
          <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-primary text-3xl">⏰</span>
          </div>
          <h3 className="text-xl font-semibold mb-2">每日训练已完成</h3>
          <p className="text-secondary">明天再来参加新的训练吧！</p>
        </div>
      </div>
    );
  }
  
  if (completed) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <div className="text-center">
          <div className="w-20 h-20 bg-success/10 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-success text-3xl">🎉</span>
          </div>
          <h3 className="text-xl font-semibold mb-2">训练完成！</h3>
          <p className="text-secondary mb-6">今日优化了1个干巴表达，掌握了1个话题</p>
          <button 
            className="btn btn-primary"
            onClick={() => window.location.reload()}
          >
            查看进步报告
          </button>
        </div>
      </div>
    );
  }
  
  return (
    <div className="max-w-3xl mx-auto">
      {/* 进度条 */}
      <div className="mb-8">
        <div className="flex justify-between mb-2">
          <span className="text-sm font-medium text-secondary">训练进度</span>
          <span className="text-sm font-medium text-primary">{step}/3</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2.5">
          <div 
            className="bg-primary h-2.5 rounded-full transition-all duration-500" 
            style={{ width: `${(step / 3) * 100}%` }}
          ></div>
        </div>
      </div>
      
      {/* 训练内容 */}
      <div className="card mb-8">
        {step === 1 && (
          <ScenarioSimulation 
            scenario={currentTraining.scenario}
            onSubmit={handleScenarioSubmit}
          />
        )}
        {step === 2 && (
          <ExpressionPolish 
            expression={currentTraining.expression}
            onSubmit={handleExpressionSubmit}
          />
        )}
        {step === 3 && (
          <TopicAccumulation 
            topic={currentTraining.topic}
            onMastered={handleTopicMastered}
          />
        )}
      </div>
      
      {/* 导航按钮 */}
      <div className="flex justify-between">
        <button
          className={`btn ${step > 1 ? 'btn-secondary' : 'btn-secondary opacity-50 cursor-not-allowed'}`}
          onClick={handlePreviousStep}
          disabled={step === 1}
        >
          上一步
        </button>
        <button
          className="btn btn-primary"
          onClick={handleNextStep}
        >
          {step < 3 ? '下一步' : '完成训练'}
        </button>
      </div>
    </div>
  );
};

export default DailyTraining;
