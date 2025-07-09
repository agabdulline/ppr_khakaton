
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const SentimentChart = ({new_data}) => {
  const data = [
    { name: 'Позитивные', value: new_data.sentiment[0], color: '#10B981' },
    { name: 'Нейтральные', value: new_data.sentiment[1], color: '#6B7280' },
    { name: 'Негативные', value: new_data.sentiment[2], color: '#EF4444' }
  ];

  return (
    <div className="h-80">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip 
            formatter={(value) => [`${value}`, 'Отзывов']}
            labelStyle={{ color: '#374151' }}
          />
          <Bar dataKey="value" fill="#3B82F6" radius={[4, 4, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default SentimentChart;
