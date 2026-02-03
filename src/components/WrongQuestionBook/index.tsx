import React, { useState } from 'react';
import { useTraining, WrongQuestion } from '../../contexts/TrainingContext';

const WrongQuestionBook: React.FC = () => {
  const { wrongQuestions, addWrongQuestion } = useTraining();
  const [filterType, setFilterType] = useState<string>('all');
  
  // 错误类型列表
  const errorTypes = [
    { value: 'all', label: '全部类型' },
    { value: 'one-way-question', label: '单向提问' },
    { value: 'no-response', label: '不会接话' },
    { value: 'awkward-expression', label: '表达生硬' },
    { value: 'topic-switch', label: '话题转换生硬' },
    { value: 'listening', label: '倾听不足' }
  ];
  
  // 过滤错题
  const filteredQuestions = filterType === 'all' 
    ? wrongQuestions 
    : wrongQuestions.filter(q => q.type === filterType);
  
  // 按日期排序（最新的在前）
  const sortedQuestions = [...filteredQuestions].sort((a, b) => 
    new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );
  
  // 添加示例错题（用于演示）
  const addExampleWrongQuestion = () => {
    const exampleQuestion = {
      type: 'one-way-question',
      description: '提问后没有给对方足够的回应空间，导致对话无法深入',
      examples: [
        '你吃饭了吗？',
        '你喜欢看电影吗？',
        '你是做什么工作的？'
      ]
    };
    addWrongQuestion(exampleQuestion);
  };
  
  return (
    <div className="max-w-3xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold">错题本</h2>
        <button
          className="btn btn-secondary text-sm"
          onClick={addExampleWrongQuestion}
        >
          添加示例错题
        </button>
      </div>
      
      {/* 错误类型过滤器 */}
      <div className="flex flex-wrap gap-2 mb-6">
        {errorTypes.map(type => (
          <button
            key={type.value}
            className={`px-3 py-1 rounded-full text-xs font-medium transition-all ${filterType === type.value ? 'bg-primary text-white' : 'bg-light text-secondary hover:bg-primary/10'}`}
            onClick={() => setFilterType(type.value)}
          >
            {type.label}
          </button>
        ))}
      </div>
      
      {/* 错题列表 */}
      {sortedQuestions.length > 0 ? (
        <div className="space-y-4">
          {sortedQuestions.map(question => (
            <div key={question.id} className="card">
              <div className="flex justify-between items-start mb-3">
                <h3 className="text-sm font-semibold">
                  {errorTypes.find(type => type.value === question.type)?.label || question.type}
                </h3>
                <span className="text-xs text-gray-400">
                  {new Date(question.createdAt).toLocaleDateString('zh-CN')}
                </span>
              </div>
              
              <p className="text-secondary text-sm mb-3">{question.description}</p>
              
              {question.examples.length > 0 && (
                <div>
                  <h4 className="text-xs font-medium text-dark mb-2">示例：</h4>
                  <ul className="space-y-1">
                    {question.examples.map((example, index) => (
                      <li key={index} className="flex items-start">
                        <span className="text-danger mr-2">•</span>
                        <span className="text-sm text-secondary">{example}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          ))}
        </div>
      ) : (
        <div className="flex justify-center items-center min-h-[300px]">
          <div className="text-center">
            <div className="w-16 h-16 bg-light rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-secondary text-2xl">📝</span>
            </div>
            <h3 className="text-lg font-semibold mb-2">暂无错题记录</h3>
            <p className="text-secondary mb-4">训练过程中遇到的问题会自动记录在这里</p>
            <button
              className="btn btn-secondary"
              onClick={addExampleWrongQuestion}
            >
              添加示例错题
            </button>
          </div>
        </div>
      )}
      
      {/* 错题分析 */}
      {wrongQuestions.length > 0 && (
        <div className="card mt-8">
          <h3 className="text-lg font-semibold mb-4">错题分析</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <h4 className="text-sm font-medium text-secondary mb-2">错误类型分布</h4>
              <div className="space-y-2">
                {errorTypes.filter(type => type.value !== 'all').map(type => {
                  const count = wrongQuestions.filter(q => q.type === type.value).length;
                  const percentage = wrongQuestions.length > 0 
                    ? Math.round((count / wrongQuestions.length) * 100) 
                    : 0;
                  
                  return (
                    <div key={type.value} className="flex items-center">
                      <span className="text-xs text-secondary w-20">{type.label}</span>
                      <div className="flex-grow mx-2">
                        <div className="w-full bg-light rounded-full h-2">
                          <div 
                            className="bg-primary h-2 rounded-full transition-all duration-500" 
                            style={{ width: `${percentage}%` }}
                          ></div>
                        </div>
                      </div>
                      <span className="text-xs font-medium text-dark">{count}</span>
                    </div>
                  );
                })}
              </div>
            </div>
            
            <div>
              <h4 className="text-sm font-medium text-secondary mb-2">改进建议</h4>
              <ul className="space-y-2">
                <li className="flex items-start">
                  <span className="text-success mr-2">•</span>
                  <span className="text-secondary text-xs">针对高频错误类型进行专项训练</span>
                </li>
                <li className="flex items-start">
                  <span className="text-success mr-2">•</span>
                  <span className="text-secondary text-xs">学习相关的沟通技巧和表达方法</span>
                </li>
                <li className="flex items-start">
                  <span className="text-success mr-2">•</span>
                  <span className="text-secondary text-xs">在实际对话中注意避免类似错误</span>
                </li>
                <li className="flex items-start">
                  <span className="text-success mr-2">•</span>
                  <span className="text-secondary text-xs">定期回顾错题本，巩固改进效果</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default WrongQuestionBook;
