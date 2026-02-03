import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

// 类型定义
export interface Scenario {
  id: string;
  title: string;
  description: string;
  difficulty: 'easy' | 'medium' | 'hard';
}

export interface Expression {
  id: string;
  original: string;
  improved: string;
  category: string;
}

export interface Topic {
  id: string;
  title: string;
  content: string;
  category: string;
}

export interface WrongQuestion {
  id: string;
  type: string;
  description: string;
  examples: string[];
  createdAt: string;
}

export interface TrainingRecord {
  date: string;
  completed: boolean;
  polishedExpressions: number;
  masteredTopics: number;
  scenariosCompleted: number;
}

export interface TrainingContextType {
  // 数据
  scenarios: Scenario[];
  expressions: Expression[];
  topics: Topic[];
  wrongQuestions: WrongQuestion[];
  trainingRecords: TrainingRecord[];
  
  // 状态
  currentTraining: {
    scenario: Scenario | null;
    expression: Expression | null;
    topic: Topic | null;
  };
  
  // 方法
  startDailyTraining: () => void;
  submitScenarioResponse: (response: string) => void;
  submitExpressionPolish: (polished: string) => void;
  markTopicMastered: (topicId: string) => void;
  addWrongQuestion: (question: Omit<WrongQuestion, 'id' | 'createdAt'>) => void;
  generateProgressReport: () => { polishedExpressions: number; masteredTopics: number };
  resetDailyTraining: () => void;
}

// 创建Context
const TrainingContext = createContext<TrainingContextType | undefined>(undefined);

// 模拟数据
const mockScenarios: Scenario[] = [
  {
    id: '1',
    title: '初次见面',
    description: '你在朋友聚会中遇到一个新朋友，如何开始对话？',
    difficulty: 'easy'
  },
  {
    id: '2',
    title: '职场沟通',
    description: '如何向同事提出建设性意见而不引起反感？',
    difficulty: 'medium'
  },
  {
    id: '3',
    title: '聚会冷场',
    description: '当聚会氛围变得尴尬冷场时，你如何活跃气氛？',
    difficulty: 'hard'
  }
];

const mockExpressions: Expression[] = [
  {
    id: '1',
    original: '你吃了吗？',
    improved: '最近怎么样？看你气色不错，是不是有什么好事？',
    category: '问候'
  },
  {
    id: '2',
    original: '我觉得挺好的',
    improved: '我觉得这个想法特别棒，尤其是在细节处理上很到位',
    category: '反馈'
  },
  {
    id: '3',
    original: '不知道',
    improved: '这个问题我还没仔细想过，你是怎么看的呢？',
    category: '回应'
  }
];

const mockTopics: Topic[] = [
  {
    id: '1',
    title: '美食推荐',
    content: '最近尝试了一家特别好吃的餐厅，他们的招牌菜是...',
    category: '生活'
  },
  {
    id: '2',
    title: '电影分享',
    content: '最近看了一部很棒的电影，剧情非常引人入胜...',
    category: '娱乐'
  },
  {
    id: '3',
    title: '旅行经历',
    content: '上次去旅行遇到了很多有趣的事情，比如...',
    category: '生活'
  }
];

// Provider组件
export const TrainingProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  // 状态
  const [scenarios] = useState<Scenario[]>(mockScenarios);
  const [expressions] = useState<Expression[]>(mockExpressions);
  const [topics] = useState<Topic[]>(mockTopics);
  const [wrongQuestions, setWrongQuestions] = useState<WrongQuestion[]>(() => {
    const saved = localStorage.getItem('wrongQuestions');
    return saved ? JSON.parse(saved) : [];
  });
  const [trainingRecords, setTrainingRecords] = useState<TrainingRecord[]>(() => {
    const saved = localStorage.getItem('trainingRecords');
    return saved ? JSON.parse(saved) : [];
  });
  
  const [currentTraining, setCurrentTraining] = useState<{
    scenario: Scenario | null;
    expression: Expression | null;
    topic: Topic | null;
  }>({
    scenario: null,
    expression: null,
    topic: null
  });
  
  // 本地存储同步
  useEffect(() => {
    localStorage.setItem('wrongQuestions', JSON.stringify(wrongQuestions));
  }, [wrongQuestions]);
  
  useEffect(() => {
    localStorage.setItem('trainingRecords', JSON.stringify(trainingRecords));
  }, [trainingRecords]);
  
  // 开始每日训练
  const startDailyTraining = () => {
    const today = new Date().toISOString().split('T')[0];
    const existingRecord = trainingRecords.find(record => record.date === today);
    
    if (!existingRecord) {
      // 随机选择今天的训练内容
      const randomScenario = scenarios[Math.floor(Math.random() * scenarios.length)];
      const randomExpression = expressions[Math.floor(Math.random() * expressions.length)];
      const randomTopic = topics[Math.floor(Math.random() * topics.length)];
      
      setCurrentTraining({
        scenario: randomScenario,
        expression: randomExpression,
        topic: randomTopic
      });
    }
  };
  
  // 提交场景回应
  const submitScenarioResponse = (response: string) => {
    // 这里可以添加AI评估逻辑
    console.log('Scenario response:', response);
  };
  
  // 提交表达打磨
  const submitExpressionPolish = (polished: string) => {
    // 这里可以添加AI评估逻辑
    console.log('Polished expression:', polished);
  };
  
  // 标记话题掌握
  const markTopicMastered = (topicId: string) => {
    // 这里可以添加掌握逻辑
    console.log('Topic mastered:', topicId);
  };
  
  // 添加错题
  const addWrongQuestion = (question: Omit<WrongQuestion, 'id' | 'createdAt'>) => {
    const newQuestion: WrongQuestion = {
      ...question,
      id: Date.now().toString(),
      createdAt: new Date().toISOString()
    };
    setWrongQuestions(prev => [...prev, newQuestion]);
  };
  
  // 生成进步报告
  const generateProgressReport = () => {
    const today = new Date().toISOString().split('T')[0];
    const todayRecord = trainingRecords.find(record => record.date === today);
    
    if (todayRecord) {
      return {
        polishedExpressions: todayRecord.polishedExpressions,
        masteredTopics: todayRecord.masteredTopics
      };
    }
    
    return { polishedExpressions: 0, masteredTopics: 0 };
  };
  
  // 重置每日训练
  const resetDailyTraining = () => {
    setCurrentTraining({
      scenario: null,
      expression: null,
      topic: null
    });
  };
  
  // 上下文值
  const contextValue: TrainingContextType = {
    scenarios,
    expressions,
    topics,
    wrongQuestions,
    trainingRecords,
    currentTraining,
    startDailyTraining,
    submitScenarioResponse,
    submitExpressionPolish,
    markTopicMastered,
    addWrongQuestion,
    generateProgressReport,
    resetDailyTraining
  };
  
  return (
    <TrainingContext.Provider value={contextValue}>
      {children}
    </TrainingContext.Provider>
  );
};

// 自定义Hook
export const useTraining = () => {
  const context = useContext(TrainingContext);
  if (context === undefined) {
    throw new Error('useTraining must be used within a TrainingProvider');
  }
  return context;
};
