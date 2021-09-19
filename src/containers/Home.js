import { memo, useEffect, useState } from 'react';

import { Row, Col, Typography, Spin } from 'antd';

import Economy from './components/Economy';
import Technology from './components/Technology';
import World from './components/World';

import './styles.css';

import Api from '../api';

function Home() {
    const [news, setNews] = useState([]);
    const [loading, setLoading] = useState(false);

    const handleNews = (articles) => {
        setLoading(false);
        setNews({
            world: articles[0]?.value.value,
            economy: articles[1]?.value.value,
            technology: articles[2]?.value.value,
        })
    }

    useEffect(() => {
        setLoading(true);
        Promise.allSettled([
            Api.getNews('world'),
            Api.getNews('economy'),
            Api.getNews('technology'),
        ]).then(handleNews)
    }, []);

    if (loading) return <div><Spin size="large" /></div>
    return (
        <>
            <Row gutter={[16, 16]}>
                <Col span={24} md={16}>
                    <Typography.Title level={1}>
                        World
                    </Typography.Title>
                    <World values={news?.world} />
                </Col>
                <Col span={24} md={8}>
                    <Typography.Title level={1}>
                        Economy
                    </Typography.Title>
                    <Economy values={news?.economy} />
                </Col>
            </Row>
            <hr />
            <Row gutter={[16, 16]}>
                <Col span={24} md={16}>
                    <Typography.Title level={1}>
                        Technology
                    </Typography.Title>
                    <Technology values={news?.technology} />
                </Col>
            </Row>
        </>
    )
}


export default memo(Home);