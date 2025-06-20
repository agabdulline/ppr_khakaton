import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, LineElement, PointElement, LinearScale, CategoryScale, Tooltip, Legend } from 'chart.js';
import { useEffect, useState } from 'react';
import jsonData from '../../files/petrol_reviews.json';

ChartJS.register(LineElement, PointElement, LinearScale, CategoryScale, Tooltip, Legend);

function groupByMonth(data) {
    const months = {};
    data.forEach(item => {
        const date = new Date(item.date * 1000);
        const key = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
        if (!months[key]) months[key] = [];
        months[key].push(item.rating);
    });

    const result = Object.entries(months).map(([month, ratings]) => {
        const avg = ratings.reduce((a, b) => a + b, 0) / ratings.length;
        return { month, avg: parseFloat(avg.toFixed(2)) };
    });

    return result.sort((a, b) => a.month.localeCompare(b.month));
}

function groupBySourceAndQuarter(data) {
    const grouped = {};

    data.forEach(item => {
        if (!item.date || !item.rating) return;

        const timestamp = Number(item.date);
        if (isNaN(timestamp)) return;

        const date = new Date(timestamp * 1000);
        const year = date.getFullYear();
        const month = date.getMonth(); // 0–11
        if (isNaN(year) || isNaN(month)) return;

        const quarter = Math.floor(month / 3) + 1;
        const quarterKey = `${year}-Q${quarter}`;
        const source = item.source || 'Неизвестный источник';

        if (!grouped[source]) grouped[source] = {};
        if (!grouped[source][quarterKey]) grouped[source][quarterKey] = [];

        grouped[source][quarterKey].push(item.rating);
    });

    const allQuarters = new Set();
    Object.values(grouped).forEach(sourceData => {
        Object.keys(sourceData).forEach(q => allQuarters.add(q));
    });

    const sortedQuarters = Array.from(allQuarters).sort();

    const datasets = Object.entries(grouped).map(([source, quarterRatings]) => {
        const data = sortedQuarters.map(q => {
            const ratings = quarterRatings[q];
            if (!ratings) return null;
            const avg = ratings.reduce((a, b) => a + b, 0) / ratings.length;
            return parseFloat(avg.toFixed(2));
        });

        return {
            label: source,
            data,
            fill: false,
            tension: 0.3,
            borderColor: getRandomColor(),
        };
    });

    return {
        labels: sortedQuarters,
        datasets,
    };
}


function getRandomColor() {
    const r = Math.floor(Math.random() * 200);
    const g = Math.floor(Math.random() * 200);
    const b = Math.floor(Math.random() * 200);
    return `rgb(${r}, ${g}, ${b})`;
}

export const RatingChart = () => {
    const [chartData, setChartData] = useState({
        labels:[],
        datasets:[]
    });

    useEffect(() => {
        const monthly = groupByMonth(jsonData);
        setChartData({
            labels: monthly.map(item => item.month),
            datasets: [
                {
                    label: 'Средняя оценка',
                    data: monthly.map(item => item.avg),
                    fill: false,
                    borderColor: 'rgb(75, 192, 192)',
                    tension: 0.2
                }
            ]
        });
    }, []);


    return (
        <div className="container mt-5">
            {chartData.labels.length > 0 && (
                <Line data={chartData} />
            )}
        </div>
    );
}
