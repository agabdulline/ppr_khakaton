
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import {useEffect, useState} from "react";
import {MessageSquare, Star, TrendingUp, Users} from "lucide-react";
import axios from "axios";

type StatItem = {
  date: string;
  reviews: number;
};

const TrendChart = ({new_data}) => {
  const [loading, setLoading] = useState(true)
  const [stats, setStats] = useState<StatItem[]>([
    { date: '01.01', reviews: 45 },
    { date: '05.01', reviews: 52 },
    { date: '10.01', reviews: 48 },
    { date: '15.01', reviews: 61 },
    { date: '20.01', reviews: 55 },
    { date: '25.01', reviews: 67 },
    { date: '30.01', reviews: 73 }
  ])

  useEffect(() => {
    axios.get('http://localhost:8000/api/dates_chart')
        .then(response => {
          // response.data — это уже разобранные данные JSON
          console.log(response.data);
          setStats(response.data.reverse());
          setLoading(false);
        })
        .catch(error => {
          console.error('Ошибка:', error);
          setLoading(false);
        });
  }, []);

  return (
    <div className="h-80">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={stats} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip 
            formatter={(value) => [value, 'Количество отзывов']}
            labelStyle={{ color: '#374151' }}
          />
          <Line 
            type="monotone" 
            dataKey="reviews" 
            stroke="#3B82F6" 
            strokeWidth={3}
            dot={{ fill: '#3B82F6', strokeWidth: 2, r: 6 }}
            activeDot={{ r: 8 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default TrendChart;
