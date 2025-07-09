
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart3, MessageSquare, TrendingUp, Package } from "lucide-react";
import Header from "@/components/Header.tsx";

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header */}
      <Header text="Аналитика отзывов Borjomi"/>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-16 text-center">
        <h2 className="text-4xl font-bold text-gray-900 mb-6">
          Управляйте репутацией вашего бизнеса
        </h2>
        <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
          Анализируйте отзывы клиентов с помощью искусственного интеллекта, 
          отслеживайте тенденции и принимайте обоснованные решения.
        </p>
        <div className="flex justify-center space-x-4">
          <Link to="/dashboard">
            <Button size="lg" className="bg-blue-600 hover:bg-blue-700">
              Начать анализ
            </Button>
          </Link>
          <Link to="/products">
            <Button size="lg" variant="outline">
              Посмотреть товары
            </Button>
          </Link>
        </div>
      </section>

      {/* Features */}
      <section className="container mx-auto px-4 py-16">
        <div className="grid md:grid-cols-3 gap-8">
          <Card className="text-center hover:shadow-lg transition-shadow">
            <CardHeader>
              <BarChart3 className="w-12 h-12 text-blue-600 mx-auto mb-4" />
              <CardTitle>Аналитика в реальном времени</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>
                Отслеживайте настроения клиентов и тенденции рейтингов с помощью интерактивных графиков
              </CardDescription>
            </CardContent>
          </Card>

          <Card className="text-center hover:shadow-lg transition-shadow">
            <CardHeader>
              <MessageSquare className="w-12 h-12 text-green-600 mx-auto mb-4" />
              <CardTitle>ИИ-анализ отзывов</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>
                Автоматическая обработка и классификация отзывов с выделением ключевых тем
              </CardDescription>
            </CardContent>
          </Card>

          <Card className="text-center hover:shadow-lg transition-shadow">
            <CardHeader>
              <Package className="w-12 h-12 text-purple-600 mx-auto mb-4" />
              <CardTitle>Анализ по товарам</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>
                Детальная аналитика отзывов для каждого товара с возможностью сравнения
              </CardDescription>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-blue-600 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h3 className="text-3xl font-bold mb-4">
            Готовы улучшить качество ваших продуктов?
          </h3>
          <p className="text-xl mb-8 opacity-90">
            Начните анализировать отзывы уже сегодня
          </p>
          <Link to="/dashboard">
            <Button size="lg" variant="secondary">
              Перейти к дашборду
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Index;
