import React from 'react';
import { useTraining } from '../../contexts/TrainingContext';

const ProgressReport: React.FC = () => {
  const { generateProgressReport, trainingRecords } = useTraining();
  const { polishedExpressions, masteredTopics } = generateProgressReport();
  
  // 计算统计数据
  const totalTrainingDays = trainingRecords.length;
  const completedTrainingDays = trainingRecords.filter(record => record.completed).length;
  const totalPolishedExpressions = trainingRecords.reduce((sum, record) => sum + record.polishedExpressions, 0);
  const totalMasteredTopics = trainingRecords.reduce((sum, record) => sum + record.masteredTopics, 0);
  const completionRate = totalTrainingDays > 0 ? Math.round((completedTrainingDays / totalTrainingDays) * 100) : 0;
  
  // 获取最近7天的训练记录
  const getLast7DaysRecords = () => {
    const last7Days: { date: string; completed: boolean }[] = [];
    const today = new Date();
    
    for (let i = 6; i >= 0; i--) {
      const date = new Date(today);
      date.setDate(today.getDate() - i);
      const dateString = date.toISOString().split('T')[0];
      const record = trainingRecords.find(r => r.date === dateString);
      
      last7Days.push({
        date: dateString,
        completed: record?.completed || false
      });
    }
    
    return last7Days;
  };
  
  const last7DaysRecords = getLast7DaysRecords();
  
  // 格式化日期为星期
  const formatDateToWeekday = (dateString: string) => {
    const date = new Date(dateString);
    const weekdays = ['日', '一', '二', '三', '四', '五', '六'];
    return `周${weekdays[date.getDay()]}`;
  };
  
  return (
    <div className="max-w-3xl mx-auto">
      <h2 className="text-xl font-bold mb-6">进步报告</h2>
      
      {/* 今日进步 */}
      <div className="card mb-8">
        <h3 className="text-lg font-semibold mb-4">今日进步</h3>
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-light rounded-lg p-4 text-center">
            <div className="text-3xl font-bold text-primary mb-2">{polishedExpressions}</div>
            <div className="text-secondary text-sm">优化的表达</div>
          </div>
          <div className="bg-light rounded-lg p-4 text-center">
            <div className="text-3xl font-bold text-success mb-2">{masteredTopics}</div>
            <div className="text-secondary text-sm">掌握的话题</div>
          </div>
        </div>
      </div>
      
      {/* 总体统计 */}
      <div className="card mb-8">
        <h3 className="text-lg font-semibold mb-4">总体统计</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-light rounded-lg p-4 text-center">
            <div className="text-2xl font-bold text-primary mb-1">{totalTrainingDays}</div>
            <div className="text-secondary text-xs">训练天数</div>
          </div>
          <div className="bg-light rounded-lg p-4 text-center">
            <div className="text-2xl font-bold text-success mb-1">{completedTrainingDays}</div>
            <div className="text-secondary text-xs">完成天数</div>
          </div>
          <div className="bg-light rounded-lg p-4 text-center">
            <div className="text-2xl font-bold text-warning mb-1">{totalPolishedExpressions}</div>
            <div className="text-secondary text-xs">总优化表达</div>
          </div>
          <div className="bg-light rounded-lg p-4 text-center">
            <div className="text-2xl font-bold text-danger mb-1">{totalMasteredTopics}</div>
            <div className="text-secondary text-xs">总掌握话题</div>
          </div>
        </div>
        
        <div className="mt-6">
          <h4 className="text-sm font-medium text-dark mb-2">完成率</h4>
          <div className="w-full bg-light rounded-full h-4">
            <div 
              className="bg-primary h-4 rounded-full transition-all duration-500" 
              style={{ width: `${completionRate}%` }}
            ></div>
          </div>
          <div className="flex justify-between text-xs text-secondary mt-1">
            <span>0%</span>
            <span>{completionRate}%</span>
            <span>100%</span>
          </div>
        </div>
      </div>
      
      {/* 最近7天训练情况 */}
      <div className="card">
        <h3 className="text-lg font-semibold mb-4">最近7天训练情况</h3>
        <div className="flex justify-between items-end h-48">
          {last7DaysRecords.map((record, index) => (
            <div key={index} className="flex flex-col items-center flex-1">
              <div 
                className={`w-10 rounded-t-lg transition-all duration-300 ${record.completed ? 'bg-success' : 'bg-gray-200'}`}
                style={{ height: record.completed ? '80%' : '20%' }}
              ></div>
              <span className="mt-2 text-xs text-secondary">{formatDateToWeekday(record.date)}</span>
            </div>
          ))}
        </div>
      </div>
      
      {/* 鼓励信息 */}
      <div className="mt-8 text-center">
        <div className="bg-primary/5 rounded-lg p-4 inline-block">
          <p className="text-primary font-medium">
            {completionRate >= 80 ? '太棒了！你已经养成了良好的训练习惯！' : 
             completionRate >= 50 ? '继续加油！你正在稳步提升！' : 
             '开始你的训练之旅吧，每天进步一点点！'}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ProgressReport;
