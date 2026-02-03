import React, { useState } from 'react';
import { Topic } from '../../contexts/TrainingContext';

interface TopicAccumulationProps {
  topic: Topic;
  onMastered: (topicId: string) => void;
}

const TopicAccumulation: React.FC<TopicAccumulationProps> = ({ topic, onMastered }) => {
  const [isMastering, setIsMastering] = useState(false);
  
  const handleMastered = () => {
    setIsMastering(true);
    setTimeout(() => {
      onMastered(topic.id);
      setIsMastering(false);
    }, 500);
  };
  
  return (
    <div>
      <h2 className="text-xl font-bold mb-4">3. 话题积累</h2>
      
      <div className="mb-6">
        <div className="flex justify-between items-center mb-2">
          <h3 className="text-lg font-semibold">{topic.title}</h3>
          <span className="px-3 py-1 rounded-full text-xs font-medium bg-primary/10 text-primary">
            {topic.category}
          </span>
        </div>
        
        <div className="bg-light rounded-lg p-4 mb-6">
          <p className="text-dark">{topic.content}</p>
        </div>
        
        <div className="mb-6">
          <h4 className="text-sm font-medium text-dark mb-2">话题扩展</h4>
          <ul className="space-y-2">
            <li className="flex items-start">
              <span className="text-primary mr-2">•</span>
              <span className="text-secondary text-sm">尝试在对话中自然引入这个话题</span>
            </li>
            <li className="flex items-start">
              <span className="text-primary mr-2">•</span>
              <span className="text-secondary text-sm">准备2-3个相关的具体例子</span>
            </li>
            <li className="flex items-start">
              <span className="text-primary mr-2">•</span>
              <span className="text-secondary text-sm">学会倾听并回应对方的相关经历</span>
            </li>
          </ul>
        </div>
        
        <div className="flex justify-end">
          <button
            className="btn btn-success"
            onClick={handleMastered}
            disabled={isMastering}
          >
            {isMastering ? '标记中...' : '标记为已掌握'}
          </button>
        </div>
      </div>
      
      <div className="bg-light rounded-lg p-4 mt-6">
        <h4 className="text-sm font-semibold mb-2">💡 小贴士</h4>
        <p className="text-sm text-secondary">
          积累话题的关键是理解话题的核心内容，并能够结合自己的经历进行分享，这样在对话中才能更自然地运用。
        </p>
      </div>
    </div>
  );
};

export default TopicAccumulation;
