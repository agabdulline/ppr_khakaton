
import { Link } from "react-router-dom";
import { BarChart3, ArrowLeft, TrendingUp, MessageSquare, Star, Users, Icon, AlertCircle, Droplet  } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import SentimentChart from "@/components/SentimentChart";
import RatingChart from "@/components/RatingChart";
import TrendChart from "@/components/TrendChart";
import Header from "@/components/Header.tsx";
import { useEffect, useState } from 'react'
import axios from 'axios';
import PositiveChart from "@/components/PositiveChart.tsx";
import NegativeChart from "@/components/NegativeChart.tsx";
// import {a} from "vite/dist/node/types.d-aGj9QkWt";

const url="https://feedlyai.ru"

type Ratings = {
  [key: number]: number; // например: {1: 23, 2: 45, 3: 123, ...}
}

type Sentiment = {
  [key: number]: number; // например: {1: 23, 2: 45, 3: 123, ...}
}

type Data = {
  total: number
  month_total: number
  products: number
  mean_rating_month: number
  ratings: Ratings
  month_total_difference: number
  mean_rating_difference: number
  bad_percent_last_month: number
  bad_percent_difference: number
  sentiment: Sentiment
  neuro_themes: any
  neuro_factors: any
  neuro_sentiment: any
  positive: []
  negative: []
  positive_count: []
  negative_count: []
  // Добавь нужные поля
}

type StatItem = {
  title: string;
  value: string;
  change: string;
  icon: any;
};

type AiItem = {
  id: number;
  theme: string;
  sentiment: string;
  description: any;
};



const Dashboard = () => {
  const [data, setData] = useState<Data>({
    total: 0,
    month_total: 0,
    products: 0,
    mean_rating_month: 0,
    ratings: {},
    month_total_difference: 0,
    mean_rating_difference: 0,
    bad_percent_last_month: 0,
    bad_percent_difference: 0,
    sentiment: {},
    neuro_themes: [],
    neuro_factors: [],
    neuro_sentiment: [],
    positive: [],
    positive_count: [],
    negative: [],
    negative_count: [],
  });
  const [loading, setLoading] = useState(true)

  const [stats, setStats] = useState<StatItem[]>([
    { title: "Всего отзывов за месяц", value: "804", change: "+12%", icon: MessageSquare },
    { title: "Средний рейтинг", value: "4.2", change: "+0.3", icon: Star },
    { title: "Активных пользователей", value: "1,234", change: "+8%", icon: Users },
    { title: "Положительных", value: "68%", change: "+5%", icon: TrendingUp }
  ])

  const [aiInsights, setAiInsights] = useState<AiItem[]>([
    {
      id: 1,
      theme: "Качество продукта",
      sentiment: "positive",
      description: "Пользователи часто отмечают высокое качество материалов и сборки"
    },
    {
      id: 2,
      theme: "Скорость доставки",
      sentiment: "negative",
      description: "Многие жалуются на долгую доставку, особенно в регионы"
    },
    {
      id: 3,
      theme: "Служба поддержки",
      sentiment: "positive",
      description: "Клиенты хвалят быстрое и вежливое обслуживание"
    },
    {
      id: 4,
      theme: "Цена",
      sentiment: "neutral",
      description: "Мнения разделились: кто-то считает дорого, кто-то - оправданно"
    }
  ])

  useEffect(() => {
    axios.get('http://localhost:8000/api/dashboard')
        .then(response => {
          // response.data — это уже разобранные данные JSON
          console.log(response.data);
          setData(response.data);
          setLoading(false);
        })
        .catch(error => {
          console.error('Ошибка:', error);
          setLoading(false);
        });
  }, []);

  useEffect(() => {
    if (data.total) {
      setStats([
        { title: "Количество отзывов (3 мес.)", value: String(data.month_total), change: "+"+String(data.month_total_difference)+"%", icon: MessageSquare },
        { title: "Средний рейтинг (3 мес.)", value: String(data.mean_rating_month), change: "+"+String(data.mean_rating_difference), icon: Star },
        { title: "Доля негативных мнений (3 мес.)", value: String(data.bad_percent_last_month) + "%", change: ""+String(data.bad_percent_difference)+"%", icon: AlertCircle },
        { title: "Конкурентов проанализировано", value: String(data.products), change: "0", icon: Droplet }
      ])
      setAiInsights([
        {id: 1, theme: data.neuro_themes[0], sentiment: data.neuro_sentiment[0], description: data.neuro_factors[0]},
        {id: 2, theme: data.neuro_themes[1], sentiment: data.neuro_sentiment[1], description: data.neuro_factors[1]},
        {id: 3, theme: data.neuro_themes[2], sentiment: data.neuro_sentiment[2], description: data.neuro_factors[2]},
        {id: 4, theme: data.neuro_themes[3], sentiment: data.neuro_sentiment[3], description: data.neuro_factors[3]}
      ])
    }
  }, [data]);

  // Mock data - в реальном приложении будет загружаться с бекенда





  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Header */}
      <Header text="Дашборд аналитики"/>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow duration-300">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-gray-600">
                    {stat.title}
                  </CardTitle>
                  <stat.icon className="h-4 w-4 text-gray-400"/>
                </CardHeader>
                <CardContent>
                  {
                    loading
                        ? <CardTitle>Загрузка...</CardTitle>
                        : <div className="text-2xl font-bold text-gray-900">
                          {stat.value}
                        </div>
                  }
                  {
                      (index == 1 || index == 0 || index == 2) && <p className="text-xs text-green-600 flex items-center mt-1">
                        <TrendingUp className="h-3 w-3 mr-1"/>
                        {stat.change}
                      </p>
                  }
                  {/*{*/}
                  {/*    (index == 2) && <p className="text-xs text-red-500 flex items-center mt-1">*/}
                  {/*      <TrendingUp className="h-3 w-3 mr-1"/>*/}
                  {/*      {stat.change} с прошлого месяца*/}
                  {/*    </p>*/}
                  {/*}*/}
                </CardContent>
              </Card>
          ))}
        </div>

        {/* Charts Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          <Card className="hover:shadow-lg transition-shadow duration-300">
            <CardHeader>
              <CardTitle>Тренд отзывов</CardTitle>
              <CardDescription>Динамика количества отзывов за последние 3 месяца</CardDescription>
            </CardHeader>
            <CardContent>
              {
                loading
                    ? <CardTitle>Загрузка...</CardTitle>
                    : <TrendChart new_data={data}/>
              }

            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow duration-300">
            <CardHeader>
              <CardTitle>Распределение рейтингов</CardTitle>
              <CardDescription>Процентное соотношение оценок за 3 месяца</CardDescription>
            </CardHeader>
            <CardContent>
              {
                loading
                    ? <CardTitle>Загрузка...</CardTitle>
                    : <RatingChart new_data={data}/>
              }

            </CardContent>
          </Card>

          <Card className="lg:col-span-2 hover:shadow-lg transition-shadow duration-300">
            <CardHeader>
              <CardTitle>Анализ тональности</CardTitle>
              <CardDescription>Соотношение положительных, негативных и нейтральных отзывов</CardDescription>
            </CardHeader>
            <CardContent>
              {
                loading
                    ? <CardTitle>Загрузка...</CardTitle>
                    : <SentimentChart new_data={data}/>
              }

            </CardContent>
          </Card>
        </div>

        {/* AI Insights */}
        <Card className="hover:shadow-lg transition-shadow duration-300 mb-8">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <MessageSquare className="h-5 w-5 text-blue-600"/>
              <span>Ключевые тезисы (ИИ-анализ)</span>
            </CardTitle>
            <CardDescription>
              Основные темы, выделенные нейросетью из анализа отзывов
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {aiInsights.map((insight) => (
                  <div key={insight.id} className="p-4 border rounded-lg hover:bg-gray-50 transition-colors">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-semibold text-gray-900">{insight.theme}</h4>
                      <div className="flex items-center space-x-2">
                        <Badge
                            variant={
                              insight.sentiment === '0' ? 'default' :
                                  insight.sentiment === '2' ? 'destructive' : 'secondary'
                            }
                        >
                          {insight.sentiment === '0' ? 'Позитивно' :
                              insight.sentiment === '2' ? 'Негативно' : 'Нейтрально'}
                        </Badge>
                      </div>
                    </div>
                    <p className="text-gray-600 text-sm">{insight.description}</p>
                  </div>
              ))}
            </div>
          </CardContent>
        </Card>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          <Card className="hover:shadow-lg transition-shadow duration-300">
            <CardHeader>
              <CardTitle>Пользователям нравится</CardTitle>
              <CardDescription>Отмечено раз:</CardDescription>
            </CardHeader>
            <CardContent>
              {
                loading
                    ? <CardTitle>Загрузка...</CardTitle>
                    : <PositiveChart new_data={data}/>
              }

            </CardContent>
            <CardHeader>
              {
                data.positive.map((item, index) => (
                    <Link to={`/reviews/${data.positive_id[index]}`} className="block">
                <h4 className="font-semibold text-gray-900" key={index}>{data.positive_count[index]}: {item}</h4>
                </Link>

                ))
              }


            </CardHeader>
          </Card>

          <Card className="hover:shadow-lg transition-shadow duration-300">
            <CardHeader>
              <CardTitle>Пользователи жалуются</CardTitle>
              <CardDescription>Отмечено раз:</CardDescription>
            </CardHeader>
            <CardContent>
              {
                loading
                    ? <CardTitle>Загрузка...</CardTitle>
                    : <NegativeChart new_data={data}/>
              }

            </CardContent>
            <CardHeader>
              {
                data.negative.map((item, index) => (
                    <Link to={`/reviews/${data.negative_id[index]}`} className="block">
                      <h4 className="font-semibold text-gray-900" key={index}>{data.negative_count[index]}: {item}</h4>
                    </Link>
                ))
              }


            </CardHeader>
          </Card>
        </div>
      </main>
    </div>
);
};

export default Dashboard;
