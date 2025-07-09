import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart3, MessageSquare, TrendingUp, Package } from "lucide-react";
import barChartImg from '/src/assets/img.png'


const Header = ({text}) => {
    return (
        <header className="bg-white shadow-sm">
            <div className="container mx-auto px-4 py-6">
                <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                        <img src={barChartImg} alt="Logo" className="w-32 h-10"/>
                        <h1 className="text-xl font-bold" style={{color: '#735DFF'}}></h1>
                    </div>
                    <nav className="flex space-x-4">
                        <Link to="/dashboard">
                            <Button variant="ghost">Дашборд</Button>
                        </Link>
                        <Link to="/reviews">
                            <Button variant="ghost">Отзывы</Button>
                        </Link>
                        <Link to="/products">
                            <Button variant="ghost">Компании</Button>
                        </Link>
                    </nav>
                </div>
            </div>
        </header>
    );
};

export default Header;
