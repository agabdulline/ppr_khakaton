
import {useEffect, useState} from 'react';
import { useParams, Link } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Star, Package, TrendingUp, Users, MessageSquare } from "lucide-react";
import SentimentChart from '@/components/SentimentChart';
import RatingChart from '@/components/RatingChart';
import TrendChart from '@/components/TrendChart';
import Header from "@/components/Header.tsx";
import axios from "axios";
import {Badge} from "@/components/ui/badge.tsx";

const url="https://feedlyai.ru"

interface ProductReview {
  id: string;
  author: string;
  rating: number;
  text: string;
  date: string;
  sentiment: 'positive' | 'neutral' | 'negative';
}

interface ProductData {
  id: string;
  name: string;
  rating: number;
  reviewCount: number;
  price: number;
  image: string;
  reviews: [];
  mean_rating: number
  month_difference: number
  sentiment: any
  ratings: any
  link: string
}

interface ratings {
  1: number
  2: number
  3: number
  4: number
  5: number
}

const Product = () => {
  const { id } = useParams<{ id: string }>();
  const [loading, setLoading] = useState(true)

  const [aiInsights, setAiInsights] = useState<AiItem[]>([])
  
  const [product, setProduct] = useState<ProductData>({
    id: id || '1',
    name: '',
    rating: 0,
    reviewCount: 0,
    price: 0,
    image: '',
    reviews: [],
    mean_rating: 0,
    month_difference: 0,
    sentiment: {"0":0, "1": 0, "2": 0},
    ratings: {"0":0, "1": 0, "2": 0},
    link:''
  });

  const [reviews, setReviews] = useState<ProductReview[]>([
  ]);

  useEffect(() => {
    axios.get('http://localhost:8000/api/products/' + id)
        .then(response => {
          // response.data — это уже разобранные данные JSON
          console.log(response.data);
          setProduct(response.data);
          setReviews(response.data.reviews);
          if (response.data.neuro_factors.length == 4){
          setAiInsights([
            {id: 1, theme: response.data.neuro_factors[0], sentiment: response.data.neuro_sentiment[0], description: ""},
            {id: 2, theme: response.data.neuro_factors[1], sentiment: response.data.neuro_sentiment[1], description: ""},
            {id: 3, theme: response.data.neuro_factors[2], sentiment: response.data.neuro_sentiment[2], description: ""},
            {id: 4, theme: response.data.neuro_factors[3], sentiment: response.data.neuro_sentiment[3], description: ""}
          ])}
          setLoading(false);
        })
        .catch(error => {
          console.error('Ошибка:', error);
          setLoading(false);
        });
  }, []);



  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('ru-RU', {
      style: 'currency',
      currency: 'RUB'
    }).format(price);
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, index) => (
      <Star
        key={index}
        className={`w-4 h-4 ${
          index < Math.floor(rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'
        }`}
      />
    ));
  };

  const getSentimentColor = (sentiment: string) => {
    switch (sentiment) {
      case 'positive': return 'text-green-600 bg-green-50';
      case 'negative': return 'text-red-600 bg-red-50';
      default: return 'text-gray-600 bg-gray-50';
    }
  };

  const getSentimentText = (sentiment: string) => {
    switch (sentiment) {
      case 'positive': return 'Позитивный';
      case 'negative': return 'Негативный';
      default: return 'Нейтральный';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header text="Статистика по товару"/>
      <div className="container mx-auto px-4 py-8">
        <div className="mb-6">
          <Link to="/products">
            <Button variant="ghost" className="mb-4">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Назад к товарам
            </Button>
          </Link>
          {
            loading
              ? <CardTitle className="text-2xl">Загрузка...</CardTitle>
                :

          <div className="flex flex-col lg:flex-row gap-8 items-stretch">
            <div className="lg:w-1/3 h-full">
              <Card className="hover:shadow-lg transition-shadow duration-300">
                <CardHeader>
                  <div className="aspect-square bg-gray-100 rounded-lg mb-4 flex items-center justify-center overflow-hidden">
                    <img className="object-cover" src={product.image}/>
                  </div>
                  <CardTitle className="text-2xl"><a href={"https://ozon.ru" + product.link}>{product.name}</a></CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {product.rates?.map((review) => (
                        <div className="flex items-center gap-2">
                          <span className={`text-xs px-2 py-1 rounded-full ${getSentimentColor("neutral")}`}>
                          {review.category}
                        </span>
                          <div className="flex">
                            {renderStars(review.mean_score)}
                          </div>
                          <span className="text-lg font-semibold">
                        {review.mean_score}
                      </span>
                          <span className="text-gray-600">
                        ({review.count} отзывов)
                      </span>
                        </div>
                    ))}


                    {/*<div className="text-2xl font-bold text-green-600">*/}
                    {/*  {formatPrice(product.price)}*/}
                    {/*</div>*/}

                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="lg:w-2/3 h-full">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                <Card className="hover:shadow-lg transition-shadow duration-300">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg flex items-center gap-2">
                      <TrendingUp className="w-5 h-5 text-blue-600" />
                      Средний рейтинг
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-bold text-blue-600">{product.rating}</div>
                    <p className="text-sm text-gray-600">из 5 звезд</p>
                  </CardContent>
                </Card>
                
                <Card className="hover:shadow-lg transition-shadow duration-300">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg flex items-center gap-2">
                      <Users className="w-5 h-5 text-green-600" />
                      Всего отзывов
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-bold text-green-600">{product.reviewCount}</div>
                    <p className="text-sm text-gray-600">отзывов</p>
                  </CardContent>
                </Card>
                
                {/*<Card className="hover:shadow-lg transition-shadow duration-300">*/}
                {/*  <CardHeader className="pb-2">*/}
                {/*    <CardTitle className="text-lg flex items-center gap-2">*/}
                {/*      <MessageSquare className="w-5 h-5 text-purple-600" />*/}
                {/*      Активность*/}
                {/*    </CardTitle>*/}
                {/*  </CardHeader>*/}
                {/*  <CardContent>*/}
                {/*    <div className="text-3xl font-bold text-purple-600">+{product.month_difference}%</div>*/}
                {/*    <p className="text-sm text-gray-600">за месяц</p>*/}
                {/*  </CardContent>*/}
                {/*</Card>*/}
              </div>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card className="hover:shadow-lg transition-shadow duration-300">
                  <CardHeader>
                    <CardTitle>Анализ тональности</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <SentimentChart new_data={product}/>
                  </CardContent>
                </Card>
                
                <Card className="hover:shadow-lg transition-shadow duration-300">
                  <CardHeader>
                    <CardTitle>Распределение оценок</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <RatingChart new_data={product}/>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
          }
        </div>

        {
          aiInsights.length > 0 ? <Card className="hover:shadow-lg transition-shadow duration-300">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <MessageSquare className="h-5 w-5 text-blue-600" />
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
          </Card> : <div></div>
        }


        { loading ? <div></div>
            :
        <Card className="hover:shadow-lg transition-shadow duration-300 mt-8">
          <CardHeader>
            <CardTitle>Последние отзывы</CardTitle>
            <CardDescription>Отзывы покупателей о товаре</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {reviews.map((review) => (
                <div key={review.id} className="border-b pb-6 last:border-b-0">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <div className="flex items-center gap-3 mb-2">
                        <span className="font-semibold">{review.author}</span>
                        <div className="flex">
                          {renderStars(review.rating)}
                        </div>
                        <span className={`text-xs px-2 py-1 rounded-full ${getSentimentColor("neutral")}`}>
                          {review.source}
                        </span>
                        <span className={`text-xs px-2 py-1 rounded-full ${getSentimentColor("neutral")}`}>
                          {review.category}
                        </span>
                      </div>
                      <p className="text-gray-700 leading-relaxed">{review.text}</p>
                    </div>
                    <span className="text-sm text-gray-500">{review.date}</span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
        }
      </div>
    </div>
  );
};

export default Product;
