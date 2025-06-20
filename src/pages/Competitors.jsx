import {RatingChart} from "./components/RatingChart";
import React, {useEffect, useState} from "react";
import axios from "axios";

const comp = [
        {
            "name": "e1card",
            "rating": 3,
            "minus": [
                "1", "2", "3", "4", "5"
            ],
            "plus": [
                "1", "2", "3", "4", "5"
            ]
        },
        {
            "name": "Лукойл ликард",
            "rating": 3,
            "minus": [
                "1", "2", "3", "4", "5"
            ],
            "plus": [
                "1", "2", "3", "4", "5"
            ]
        },
        {
            "name": "Кардекс",
            "rating": 3,
            "minus": [
                "1", "2", "3", "4", "5"
            ],
            "plus": [
                "1", "2", "3", "4", "5"
            ]
        },
        {
            "name": "ОПТИ24",
            "rating": 3,
            "minus": [
                "1", "2", "3", "4", "5"
            ],
            "plus": [
                "1", "2", "3", "4", "5"
            ]
        },
        {
            "name": "Полный бак",
            "rating": 3,
            "minus": [
                "1", "2", "3", "4", "5"
            ],
            "plus": [
                "1", "2", "3", "4", "5"
            ]
        },
        {
            "name": "РН-карт",
            "rating": 3,
            "minus": [
                "1", "2", "3", "4", "5"
            ],
            "plus": [
                "1", "2", "3", "4", "5"
            ]
        }
    ]


const Competitors = () => {

    const [comp, setComp] = useState([]);
    const [loading, setLoading] = useState(true);



    useEffect(() => {
        // Запрос к FastAPI
        axios.get('http://127.0.0.1:8000/api/plus_minus_all')
            .then(response => {
                setComp(response.data);
                setLoading(false);
            })
            .catch(error => {
                console.error('Ошибка при загрузке данных:', error);
                setLoading(false);
            });
    }, []);

    if (loading) return <h1 className="card-title text-center">Загрузка...</h1>;

    return (
        <>
            <div className="container py-4">
                {
                    comp.map((item, index) => (
                        <div className="row mb-4">
                            <div className="col-12">
                                <div className="card shadow-sm">
                                    <div className="card-body">
                                        <h3 className="card-title text-center mb-5">{item.name} {Number(item.rating).toFixed(1)}★</h3>
                                        <div className="row d-flex justify-content-around">
                                            <div style={{width:'45%'}}>
                                                <h5 className="card-title text-center mb-3">Преимущества</h5>
                                                {
                                                    item.plus.map(pl => (
                                                        <p className="card-text">● {pl}</p>
                                                    ))
                                                }

                                            </div>
                                            <div style={{width:'45%'}}>
                                                <h5 className="card-title text-center mb-3">Недостатки</h5>
                                                {

                                                    item.minus.map(min => (
                                                        <p className="card-text">● {min}</p>
                                                    ))
                                                }
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))
                }
            </div>
        </>
    )
}

export default Competitors;