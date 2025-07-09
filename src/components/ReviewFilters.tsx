import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent } from "@/components/ui/card";

interface ReviewFiltersProps {
  filters: {
    rating: string;
    sentiment: string;
    dateRange: string;
    sortBy: string;
    source: string;
    category: string;
    product: string;
  };
  onFiltersChange: (filters: any) => void;
}

const ReviewFilters = ({ filters, onFiltersChange }: ReviewFiltersProps) => {
  const updateFilter = (key: string, value: string) => {
    onFiltersChange({
      ...filters,
      [key]: value // сохраняем "all", "positive", "neutral", "negative"
    });
    console.log(filters);
  };

  return (
      <Card>
        <CardContent className="pt-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div>
              <label className="text-sm font-medium text-gray-700 mb-2 block">
                Рейтинг
              </label>
              <Select value={filters.rating || "all"} onValueChange={(value) => updateFilter('rating', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Любой рейтинг"/>
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Любой рейтинг</SelectItem>
                  <SelectItem value="5">5 звезд</SelectItem>
                  <SelectItem value="4">4 звезды</SelectItem>
                  <SelectItem value="3">3 звезды</SelectItem>
                  <SelectItem value="2">2 звезды</SelectItem>
                  <SelectItem value="1">1 звезда</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="text-sm font-medium text-gray-700 mb-2 block">
                Тональность
              </label>
              <Select value={filters.sentiment || "all"} onValueChange={(value) => updateFilter('sentiment', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Любая тональность"/>
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Любая тональность</SelectItem>
                  <SelectItem value="positive">Позитивные</SelectItem>
                  <SelectItem value="neutral">Нейтральные</SelectItem>
                  <SelectItem value="negative">Негативные</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="text-sm font-medium text-gray-700 mb-2 block">
                Площадка
              </label>
              <Select value={filters.source || "all"} onValueChange={(value) => updateFilter('source', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Любая площадка"/>
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Любая площадка</SelectItem>
                  <SelectItem value="yandex">Яндекс</SelectItem>
                  <SelectItem value="2gis">2гис</SelectItem>
                  <SelectItem value="rustore">Rustore</SelectItem>
                  <SelectItem value="otzovik">Отзовик</SelectItem>
                  <SelectItem value="yell">Yell</SelectItem>
                  <SelectItem value="playmarket">Playmarket</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="text-sm font-medium text-gray-700 mb-2 block">
                Категория
              </label>
              <Select value={filters.category || "all"} onValueChange={(value) => updateFilter('category', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Любая категория"/>
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Любая категория</SelectItem>
                  <SelectItem value="company">Компания</SelectItem>
                  <SelectItem value="card">Топливная карта</SelectItem>
                  <SelectItem value="app">Приложение</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="text-sm font-medium text-gray-700 mb-2 block">
                Компания
              </label>
              <Select value={filters.product || "all"} onValueChange={(value) => updateFilter('product', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Любая компания"/>
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Любая компания</SelectItem>
                  <SelectItem value="petrol">ППР</SelectItem>
                  <SelectItem value="opti24">ОПТИ24</SelectItem>
                  <SelectItem value="e1card">E1card</SelectItem>
                  <SelectItem value="likard">Ликард</SelectItem>
                  <SelectItem value="rn-kart">РН-карт</SelectItem>
                  <SelectItem value="polniy-bak">Полный бак</SelectItem>
                  <SelectItem value="kardeks">Кардекс</SelectItem>

                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="text-sm font-medium text-gray-700 mb-2 block">
                Период
              </label>
              <Select value={filters.dateRange || "all"} onValueChange={(value) => updateFilter('dateRange', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Любой период"/>
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Любой период</SelectItem>
                  <SelectItem value="7">За неделю</SelectItem>
                  <SelectItem value="30">За месяц</SelectItem>
                  <SelectItem value="90">За квартал</SelectItem>
                  <SelectItem value="365">За год</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="text-sm font-medium text-gray-700 mb-2 block">
                Сортировка
              </label>
              <Select value={filters.sortBy || "new"} onValueChange={(value) => updateFilter('sortBy', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Сортировка"/>
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="date_desc">Сначала новые</SelectItem>
                  <SelectItem value="date_asc">Сначала старые</SelectItem>
                  <SelectItem value="rating_desc">Сначала положительные</SelectItem>
                  <SelectItem value="rating_asc">Сначала отрицательные</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>
  );
};

export default ReviewFilters;
