import React, {useEffect, useState} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
// import reviews from '../files/petrol_reviews.json';
import axios from 'axios';


const Reviews = () => {
    const [reviews, setReviews] = useState([]);
    const [loading, setLoading] = useState(true);



    useEffect(() => {
        // Запрос к FastAPI
        axios.get('http://127.0.0.1:8000/api/all_reviews')
            .then(response => {
                setReviews(response.data);
                setLoading(false);
            })
            .catch(error => {
                console.error('Ошибка при загрузке данных:', error);
                setLoading(false);
            });
    }, []);

    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [sortBy, setSortBy] = useState('date');

    const filteredReviews = reviews
        .filter(review => {
            const reviewDate = new Date(review.date * 1000);
            const afterStart = startDate ? new Date(startDate) <= reviewDate : true;
            const beforeEnd = endDate ? reviewDate <= new Date(endDate) : true;
            return afterStart && beforeEnd;
        })
        .sort((a, b) => {
            if (sortBy === 'date_desc') {
                return b.date - a.date;
            } else if (sortBy === 'rating_desc') {
                return b.rating - a.rating;
            } else if (sortBy === 'date_asc') {
                return a.date - b.date;
            } else if (sortBy === 'rating_asc') {
                return a.rating - b.rating;
            }
            return 0;
        });


    if (loading) return <h1 className="card-title text-center">Загрузка...</h1>;

    return (
        <div className="container py-5">
            <h2 className="mb-4 text-center">Отзывы клиентов</h2>

            {/* Фильтрация и сортировка */}
            <div className="row g-3 mb-4">
                <div className="col-md-4">
                    <label className="form-label">Дата начала</label>
                    <input
                        type="date"
                        className="form-control"
                        value={startDate}
                        onChange={e => setStartDate(e.target.value)}
                    />
                </div>

                <div className="col-md-4">
                    <label className="form-label">Дата конца</label>
                    <input
                        type="date"
                        className="form-control"
                        value={endDate}
                        onChange={e => setEndDate(e.target.value)}
                    />
                </div>

                <div className="col-md-4">
                    <label className="form-label">Сортировать по</label>
                    <select
                        className="form-select"
                        value={sortBy}
                        onChange={e => setSortBy(e.target.value)}
                    >
                        <option value="date_desc">Дате (сначала новые)</option>
                        <option value="date_asc">Дате (сначала старые)</option>
                        <option value="rating_desc">Рейтингу (сначала лучшие)</option>
                        <option value="rating_asc">Рейтингу (сначала худшие)</option>
                    </select>
                </div>
            </div>

            {/* Список отзывов */}
            {filteredReviews.length === 0 ? (
                <p className="text-muted">Нет отзывов по выбранным критериям.</p>
            ) : (
                <div className="row g-3">
                    {filteredReviews.map(review => (
                        <div key={review.id} className="col-12">
                            <div className="card shadow-sm">
                                <div className="card-body">
                                        <h4 className="card-title">{review.name}</h4>
                                    <div className="d-flex align-content-center">
                                        <h4 className="card-title">{review.rating}</h4>
                                        <h5 className="card-title">⭐</h5>
                                    </div>

                                    <h6 className="card-subtitle mb-2 text-muted">
                                    {new Date(review.date * 1000).toLocaleDateString()} Источник: {review.source}
                                    </h6>
                                    <p className="card-text">{review.text}</p>
                                    {
                                        review.answers.length > 0 &&
                                        <div>
                                            <h5 className="card-title">Ответы:</h5>
                                            {review.answers.map((answer, i) =>
                                                <div className="mt-3 m-lg-3">
                                                    <h6 className="card-title">{answer.name}</h6>
                                                    <h7 className="card-subtitle mb-2 text-muted">{new Date(answer.date * 1000).toLocaleDateString()}</h7>
                                                    <p className="card-text">{answer.text}</p>
                                                </div>
                                            )}

                                        </div>
                                    }
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

export default Reviews