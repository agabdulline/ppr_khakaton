import {RatingChart} from "./components/RatingChart";
import React, {useEffect, useState} from "react";
import axios from "axios";
import gis2 from '../assets/2gis.png';
import yandex from '../assets/yandex.png';
import yell from '../assets/yell.png';
import playmarket from '../assets/googleplay.png';
import otzovik from '../assets/otzovik.png';
import rustore from '../assets/rustore.png';

const logos = {
    gis2,
    yandex,
    yell,
    playmarket,
    otzovik,
    rustore
}


const Analytics = () => {
    const [allPlus, setAllPlus] = useState({'plus':[], 'minus':[]});
    const [loadingAll, setLoadingAll] = useState(true);
    const [lastPlus, setLastPlus] = useState([]);
    const [loadingLast, setLoadingLast] = useState(true);

    useEffect(() => {
        // Запрос к FastAPI
        axios.get('http://127.0.0.1:8000/api/plus_minus_petrol')
            .then(response => {
                setAllPlus(response.data);
                setLoadingAll(false);
            })
            .catch(error => {
                console.error('Ошибка при загрузке данных:', error);
                setLoadingAll(false);
            });
    }, []);

    useEffect(() => {
        // Запрос к FastAPI
        axios.get('http://127.0.0.1:8000/api/3m_plus_minus_petrol')
            .then(response => {
                setLastPlus(response.data);
                setLoadingLast(false);
            })
            .catch(error => {
                console.error('Ошибка при загрузке данных:', error);
                setLoadingLast(false);
            });
    }, []);


    return (
        <div className="container py-4">
            <div className="row mb-4">
                <div className="col-12">
                    <div className="card shadow-sm">
                        <div className="card-body d-flex">
                            {
                                loadingAll
                                    ? <h3 className="card-title text-center">Загрузка...</h3>
                                    : <div className="col-12 d-flex align-content-center justify-content-around">
                                        {
                                            allPlus.rating.map(rate => (
                                                <div className="d-flex align-items-center">
                                                    {Object.keys(rate)[0]!='avg' && <img src={logos[Object.keys(rate)[0]]} alt={Object.keys(rate)[0]}
                                                     style={{width: '30px', marginRight: '10px'}}/>}
                                                    {Object.keys(rate)[0]!='avg' && <h4 className="mb-0">{Number(Object.values(rate)[0]).toFixed(1)}</h4>}
                                                </div>

                                            ))
                                        }
                                    </div>
                            }
                        </div>
                    </div>
                </div>
            </div>

            <div className="row mb-4">
                <div className="col-12">
                    <div className="card shadow-sm">
                        <div className="card-body">
                            <h3 className="card-title text-center mb-3">Рекомендации к улучшению</h3>
                            {
                                loadingLast
                                    ? <h3 className="card-title text-center">Загрузка...</h3>
                                    : <div>
                                        {
                                            lastPlus.advice.map(pl => (
                                                <div className="card-text d-flex align-items-center mb-3 justify-content-center">
                                                    <div className="card-text p-2">●</div>
                                                    <div className="card-text">{pl}</div>
                                                </div>
                                            ))
                                        }
                                    </div>
                            }
                        </div>
                    </div>
                </div>
            </div>
            <div className="row mb-4">
                <div className="col-md-6 mb-3 mb-md-0">
                <div className="card shadow-sm h-100">
                        <div className="card-body">
                            <h5 className="card-title text-center">Ключевые преимущества за 3 месяца</h5>
                            {
                                loadingLast
                                    ? <h3 className="card-title text-center">Загрузка...</h3>
                                    : <div>
                                        {
                                            lastPlus.plus.map(pl => (
                                                <div className="card-text d-flex align-items-center mb-3">
                                                    <div className="card-text p-3">●</div>
                                                    <div className="card-text">{pl}</div>
                                                </div>
                                            ))
                                        }
                                    </div>
                            }
                        </div>
                    </div>
                </div>

                <div className="col-md-6">
                    <div className="card shadow-sm h-100">
                        <div className="card-body">
                            <h5 className="card-title text-center">Ключевые недостатки за 3 месяца</h5>
                            {
                                loadingLast
                                    ? <h3 className="card-title text-center">Загрузка...</h3>
                                    : <div>
                                        {
                                            lastPlus.minus.map(pl => (
                                                <div className="card-text d-flex align-items-center mb-3">
                                                    <div className="card-text p-3">●</div>
                                                    <div className="card-text">{pl}</div>
                                                </div>
                                            ))
                                        }
                                    </div>
                            }
                        </div>
                    </div>
                </div>
            </div>

            <div className="row mb-4">
                <div className="col-md-6 mb-3 mb-md-0">
                    <div className="card shadow-sm h-100">
                        <div className="card-body">
                            <h5 className="card-title text-center mb-3">Ключевые преимущества</h5>
                            {
                                loadingAll
                                    ? <h3 className="card-title text-center">Загрузка...</h3>
                                    : <div>
                                        {
                                            allPlus.plus.map(pl => (
                                                <div className="card-text d-flex align-items-center mb-3">
                                                    <div className="card-text p-3">●</div>
                                                    <div className="card-text">{pl}</div>
                                                </div>
                                            ))
                                        }
                                    </div>
                            }
                        </div>
                    </div>
                </div>

                <div className="col-md-6">
                    <div className="card shadow-sm h-100">
                        <div className="card-body">
                            <h5 className="card-title text-center mb-3">Ключевые недостатки</h5>
                            {
                                loadingAll
                                    ? <h3 className="card-title text-center">Загрузка...</h3>
                                    : <div>
                                        {
                                            allPlus.minus.map(pl => (
                                                <div className="card-text d-flex align-items-center mb-3">
                                                    <div className="card-text p-3">●</div>
                                                    <div className="card-text">{pl}</div>
                                                </div>
                                            ))
                                        }
                                    </div>
                            }
                        </div>
                    </div>
                </div>
            </div>

            {/* Одна карточка на всю ширину */}
            <div className="row">
                <div className="col-12">
                    <div className="card shadow-sm">
                        <div className="card-body">
                            <h3 className="card-title text-center">Динамика средней оценки по месяцам</h3>
                            <RatingChart/>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Analytics