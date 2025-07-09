
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';

const RatingChart = ({new_data}) => {
  const data = [
    { name: new_data.negative_count[0], value: new_data.negative_count[0], color: '#ff0000' },
    { name: new_data.negative_count[1], value: new_data.negative_count[1], color: '#ff3333' },
    { name: new_data.negative_count[2], value: new_data.negative_count[2], color: '#ff6666' },
    { name: new_data.negative_count[3], value: new_data.negative_count[3], color: '#ff8080' },
    { name: new_data.negative_count[4], value: new_data.negative_count[4], color: '#ff9999' },
    { name: new_data.negative_count[5], value: new_data.negative_count[5], color: '#ffaaaa' },
    // { name: new_data.negative_count[6], value: new_data.negative_count[6], color: '#ff9999' },
    // { name: new_data.negative_count[7], value: new_data.negative_count[7], color: '#ffaaaa' },
    // { name: new_data.negative_count[8], value: new_data.negative_count[8], color: '#f0b5b5' },
    // { name: new_data.negative_count[9], value: new_data.negative_count[9], color: '#eac0c0' }
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
