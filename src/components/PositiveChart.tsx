
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';

const RatingChart = ({new_data}) => {
  const data = [
    { name: new_data.positive_count[0], value: new_data.positive_count[0], color: '#00ff00' },
    { name: new_data.positive_count[1], value: new_data.positive_count[1], color: '#33ff33' },
    { name: new_data.positive_count[2], value: new_data.positive_count[2], color: '#66ff66' },
    { name: new_data.positive_count[3], value: new_data.positive_count[3], color: '#80ff80' },
    { name: new_data.positive_count[4], value: new_data.positive_count[4], color: '#99ff99' },
    // { name: new_data.positive_count[5], value: new_data.positive_count[5], color: '#80ff80' },
    // { name: new_data.positive_count[6], value: new_data.positive_count[6], color: '#99ff99' },
    // { name: new_data.positive_count[7], value: new_data.positive_count[7], color: '#aaffaa' },
    // { name: new_data.positive_count[8], value: new_data.positive_count[8], color: '#b5f0b5' },
    // { name: new_data.positive_count[9], value: new_data.positive_count[9], color: '#c0eac0' }
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
            label={({ name, percent }) => `${name}`}
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
