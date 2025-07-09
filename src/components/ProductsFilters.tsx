import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent } from "@/components/ui/card";

interface ReviewFiltersProps {
  filters: {
    rating: string;
    numReviews: string;
    source: string;
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
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                  <SelectItem value="5">5</SelectItem>
                  <SelectItem value="4">4+</SelectItem>
                  <SelectItem value="3">3+</SelectItem>
                  <SelectItem value="2">2+</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="text-sm font-medium text-gray-700 mb-2 block">
                Количество отзывов
              </label>
              <Select value={filters.numReviews || "all"} onValueChange={(value) => updateFilter('numReviews', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Любое количество"/>
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Любое количество</SelectItem>
                  <SelectItem value="5">5+</SelectItem>
                  <SelectItem value="20">20+</SelectItem>
                  <SelectItem value="50">50+</SelectItem>
                </SelectContent>
              </Select>
            </div>


          </div>
        </CardContent>
      </Card>
  );
};

export default ReviewFilters;
