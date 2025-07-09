
import {useEffect, useState} from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Star, Package, Users } from "lucide-react";
import Header from "@/components/Header.tsx";
import axios from "axios";
import ReviewsPagination from "@/components/ReviewsPagination.tsx";
import {data} from "autoprefixer";
import ReviewFilters from "@/components/ReviewFilters.tsx";
import ProductsFilters from "@/components/ProductsFilters.tsx";
const url="https://feedlyai.ru"

interface Product {
  id: string;
  name: string;
  rating: number;
  reviewCount: number;
  price: number;
  image: string;
}

const Products = () => {
  const [loading, setLoading] = useState(true)
  const [products, setProducts] = useState<Product[]>([])
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPage, setTotalPage] = useState(50);
    const [filters, setFilters] = useState({
        rating: "all",
        numReviews: "all",
        source: "all",
    });

  useEffect(() => {
    axios.get('http://localhost:8000/api/products', {
        params: filters})
        .then(response => {
          // response.data — это уже разобранные данные JSON
           const data = response.data;
          console.log(data);
          setProducts(data.products);
          setTotalPage(data.pages);
          setLoading(false);
        })
        .catch(error => {
          console.error('Ошибка:', error);
          setLoading(false);
        });
  }, [filters]);

    useEffect(() => {
        setFilters({page: String(currentPage)});
    }, [currentPage])


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

  return (
    <div className="min-h-screen bg-gray-50">
      <Header text="Каталог товаров"/>
      <div className="container mx-auto px-4 py-8">
          <div className="mb-8 space-y-4">
              <ProductsFilters filters={filters} onFiltersChange={setFilters}/>
          </div>
        <div className="mb-8">
          <p className="text-gray-600">Выберите товар для просмотра детальной аналитики отзывов</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-8">
          {products.map((product) => (
            <Card key={product.id} className="hover:shadow-lg transition-shadow">
              <CardHeader className="pb-3">
                <div className="aspect-square bg-white rounded-lg mb-3 flex items-center justify-center overflow-hidden">
                  <img src={product.image} className="w-full h-full object-cover"/>
                </div>
                <CardTitle className="text-lg">{product.name}</CardTitle>
              </CardHeader>
              
              <CardContent className="pt-0">
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <div className="flex">
                      {renderStars(product.rating)}
                    </div>
                    <span className="text-sm text-gray-600">
                      {product.rating} ({product.reviewCount} отзывов)
                    </span>
                  </div>
                  

                  
                  <Link to={`/products/${product.id}`} className="block">
                    <Button className="w-full" variant="outline">
                      <Users className="w-4 h-4 mr-2" />
                      Аналитика отзывов
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Products;
