import {useEffect, useState} from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, Search, Filter, Star, Calendar, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import ReviewsPagination from "@/components/ReviewsPagination";
import ReviewFilters from "@/components/ReviewFilters";
import Header from "@/components/Header.tsx";
import axios from "axios";

const url="https://feedlyai.ru"

const Reviews = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPage, setTotalPage] = useState(50);
  const [loading, setLoading] = useState(true)
  const [filters, setFilters] = useState({
    rating: "all",
    sentiment: "all",
    dateRange: "all",
    sortBy: "date_desc",
    source: "all",
    category: "all",
    product: "all",
    page: "1"
  });

  // Mock data - в реальном приложении будет загружаться с бекенда
  const [reviews, setReviews] = useState([

  ]);

  useEffect(() => {
    axios.get('http://localhost:8000/api/reviews', {
      params: filters})
        .then(response => {
            const data = response.data;
          // response.data — это уже разобранные данные JSON
          setReviews(data.reviews);
          setTotalPage(data.pages);
          setLoading(false);
        })
        .catch(error => {
          console.error('Ошибка:', error);
          setLoading(false);
        });
  }, [filters]);



  useEffect(() => {
    setFilters({...filters, page: String(currentPage)});
  }, [currentPage])

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
        <Star
            key={i}
            className={`h-4 w-4 ${
                i < rating ? 'text-yellow-400 fill-current' : 'text-gray-300'
            }`}
        />
    ));
  };

  const getSentimentColor = (sentiment: string) => {
    switch (sentiment) {
      case 'positive': return 'bg-green-100 text-green-800';
      case 'negative': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
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
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
        {/* Header */}
        <Header text="Статистика по товару"/>
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Search and Filters */}
          {
            loading
                ? <CardTitle>Загрузка...</CardTitle>
                : <div>
                <div className="mb-8 space-y-4">

                        <div className="flex flex-col sm:flex-row gap-4">
                    <div className="flex-1">
                      {/*<div className="relative">*/}
                      {/*  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4"/>*/}
                      {/*  <Input*/}
                      {/*      placeholder="Поиск по отзывам..."*/}
                      {/*      value={searchTerm}*/}
                      {/*      onChange={(e) => setSearchTerm(e.target.value)}*/}
                      {/*      className="pl-10"*/}
                      {/*  />*/}
                      {/*</div>*/}
                    </div>
                    {/*<Button variant="outline" className="flex items-center space-x-2">*/}
                    {/*  <Filter className="h-4 w-4"/>*/}
                    {/*  <span>Фильтры</span>*/}
                    {/*</Button>*/}
                  </div>

                  <ReviewFilters filters={filters} onFiltersChange={setFilters}/>
                </div>

                {/* Reviews List */}
                <div className="space-y-6 mb-8">
                  {reviews.map((review) => (
                      <Card key={review.uniq_id} className="hover:shadow-lg transition-shadow duration-300">
                        <CardHeader className="pb-4">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-4">
                              <div className="flex items-center space-x-2">
                                <User className="h-4 w-4 text-gray-400"/>
                                <span className="font-medium text-gray-900">{review.author}</span>
                              </div>
                              <div className="flex items-center space-x-1">
                                {renderStars(review.rating)}
                                <span className="text-sm text-gray-600 ml-2">{review.rating}/5</span>
                              </div>
                            </div>
                            <div className="flex items-center space-x-2">
                                <Badge className="bg-gray-100 text-gray-800">
                                    {review.category}
                                </Badge>
                                <Badge className="bg-gray-100 text-gray-800">
                                    {review.source}
                                </Badge>
                              <Badge className={getSentimentColor(review.sentiment)}>
                                {getSentimentText(review.sentiment)}
                              </Badge>
                              <div className="flex items-center text-sm text-gray-500">
                                <Calendar className="h-4 w-4 mr-1"/>
                                {new Date(review.date).toLocaleDateString('ru-RU')}
                              </div>
                            </div>
                          </div>
                          <div className="text-sm text-gray-600">
                            Продукт: <span className="font-medium">{review.product}</span>
                          </div>
                        </CardHeader>
                        <CardContent>
                          <p className="text-gray-800 mb-4">{review.text}</p>
                        </CardContent>
                      </Card>
                  ))}
                </div></div>
}
                <ReviewsPagination
                    currentPage={currentPage}
                    totalPages={totalPage}
                    onPageChange={setCurrentPage}
                />
              </main>


      </div>
  );
};

export default Reviews;