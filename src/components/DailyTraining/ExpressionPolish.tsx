import React, { useState } from 'react';
import { Expression } from '../../contexts/TrainingContext';

interface ExpressionPolishProps {
  expression: Expression;
  onSubmit: (polished: string) => void;
}

const ExpressionPolish: React.FC<ExpressionPolishProps> = ({ expression, onSubmit }) => {
  const [polished, setPolished] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showExample, setShowExample] = useState(false);
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (polished.trim() && !isSubmitting) {
      setIsSubmitting(true);
      setTimeout(() => {
        onSubmit(polished.trim());
        setIsSubmitting(false);
      }, 500);
    }
  };
  
  return (
    <div>
      <h2 className="text-xl font-bold mb-4">2. 表达打磨</h2>
      
      <div className="mb-6">
        <div className="mb-4">
          <h3 className="text-sm font-medium text-secondary mb-2">生硬表达</h3>
          <div className="bg-light rounded-lg p-4 border-l-4 border-danger">
            <p className="text-dark">{expression.original}</p>
          </div>
        </div>
        
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="polished" className="block text-sm font-medium text-dark mb-2">
              优化后的表达
            </label>
            <textarea
              id="polished"
              className="textarea h-32"
              placeholder="请输入你优化后的表达..."
              value={polished}
              onChange={(e) => setPolished(e.target.value)}
              required
            ></textarea>
          </div>
          
          <div className="flex justify-between items-center mb-4">
            <button
              type="button"
              className="text-primary text-sm font-medium hover:underline"
              onClick={() => setShowExample(!showExample)}
            >
              {showExample ? '隐藏示例' : '查看参考示例'}
            </button>
            <span className="text-xs text-secondary">
              类别: {expression.category}
            </span>
          </div>
          
          {showExample && (
            <div className="mb-4 bg-success/5 rounded-lg p-4 border-l-4 border-success">
              <h4 className="text-sm font-medium text-success mb-2">参考示例</h4>
              <p className="text-dark">{expression.improved}</p>
            </div>
          )}
          
          <div className="flex justify-end">
            <button
              type="submit"
              className="btn btn-primary"
              disabled={isSubmitting || !polished.trim()}
            >
              {isSubmitting ? '提交中...' : '提交优化'}
            </button>
          </div>
        </form>
      </div>
      
      <div className="bg-light rounded-lg p-4 mt-6">
        <h4 className="text-sm font-semibold mb-2">💡 小贴士</h4>
        <p className="text-sm text-secondary">
          好的表达应该具体、有温度、能引起共鸣。尝试加入更多细节和情感元素，让对话更生动有趣。
        </p>
      </div>
    </div>
  );
};

export default ExpressionPolish;
