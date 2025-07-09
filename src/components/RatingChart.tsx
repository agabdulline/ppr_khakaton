
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';

const RatingChart = ({new_data}) => {
  const data = [
    { name: '5 звезд', value: new_data.ratings[5], color: '#67c667' },
    { name: '4 звезды', value: new_data.ratings[4], color: '#aec667' },
    { name: '3 звезды', value: new_data.ratings[3], color: '#e6e637' },
    { name: '2 звезды', value: new_data.ratings[2], color: '#ed8f33' },
    { name: '1 звезда', value: new_data.ratings[1], color: '#f64949' }
  ];

  return (
    <div className="h-80">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            outerRadius={100}
            fill="#8884d8"
            dataKey="value"
            label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
          </Pie>
          <Tooltip formatter={(value) => [`${value}`, 'Отзывов']} />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default RatingChart;
