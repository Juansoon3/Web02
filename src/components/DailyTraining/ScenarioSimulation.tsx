import React, { useState } from 'react';
import { Scenario } from '../../contexts/TrainingContext';

interface ScenarioSimulationProps {
  scenario: Scenario;
  onSubmit: (response: string) => void;
}

const ScenarioSimulation: React.FC<ScenarioSimulationProps> = ({ scenario, onSubmit }) => {
  const [response, setResponse] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (response.trim() && !isSubmitting) {
      setIsSubmitting(true);
      setTimeout(() => {
        onSubmit(response.trim());
        setIsSubmitting(false);
      }, 500);
    }
  };
  
  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'easy': return 'bg-success/10 text-success';
      case 'medium': return 'bg-warning/10 text-warning';
      case 'hard': return 'bg-danger/10 text-danger';
      default: return 'bg-secondary/10 text-secondary';
    }
  };
  
  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">1. 场景模拟</h2>
        <span className={`px-3 py-1 rounded-full text-xs font-medium ${getDifficultyColor(scenario.difficulty)}`}>
          {scenario.difficulty === 'easy' ? '简单' : scenario.difficulty === 'medium' ? '中等' : '困难'}
        </span>
      </div>
      
      <div className="mb-6">
        <h3 className="text-lg font-semibold mb-2">{scenario.title}</h3>
        <p className="text-secondary mb-4">{scenario.description}</p>
        
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="response" className="block text-sm font-medium text-dark mb-2">
              你的应对方案
            </label>
            <textarea
              id="response"
              className="textarea h-32"
              placeholder="请输入你的应对方案..."
              value={response}
              onChange={(e) => setResponse(e.target.value)}
              required
            ></textarea>
          </div>
          
          <div className="flex justify-end">
            <button
              type="submit"
              className="btn btn-primary"
              disabled={isSubmitting || !response.trim()}
            >
              {isSubmitting ? '提交中...' : '提交方案'}
            </button>
          </div>
        </form>
      </div>
      
      <div className="bg-light rounded-lg p-4 mt-6">
        <h4 className="text-sm font-semibold mb-2">💡 小贴士</h4>
        <p className="text-sm text-secondary">
          在社交场景中，保持积极开放的态度，注意倾听对方的回应，并适时调整自己的表达。
        </p>
      </div>
    </div>
  );
};

export default ScenarioSimulation;
