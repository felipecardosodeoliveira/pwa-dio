import { memo, useEffect, useState, useCallback } from "react";

import { useHistory, useParams, Link } from 'react-router-dom';

import { Row, Col, Spin } from 'antd';

import api from "../api";

import Actions from './components/Actions'

import { createMarkup } from "../utils";

import './styles.css';

function Post() {
    const { id, subject } = useParams();
    const [post, setPost] = useState();
    const [news, setNews] = useState();
    const [loading, setLoading] = useState(false);

    const history = useHistory();

    const renderImg = ({ image, description }) => <img src={image.url} alt={description} />;

    const handleNews = useCallback((data) => {
        setLoading(false);
        setNews(data[0]?.value.value);
        setPost(data[1]);
    }, []);

    useEffect(() => {
        Promise.all([
            api.getNews(subject),
            api.getNewsById(subject, id)
        ]).then(handleNews)
        setLoading(true);
    }, [id, subject, handleNews]);

    const renderDescription = (description) => <p dangerouslySetInnerHTML={createMarkup(description)} />

    const openPost = (id) => history.push(`/${subject}/${id}`);

    const renderPost = (post) => {
        const { id, title, description, image } = post;

        return <Col span={12} key={`post-${id}`}>
            <article onClick={() => openPost(id)}>
                <p>
                    <strong dangerouslySetInnerHTML={createMarkup(title)} />
                </p>
                {image?.url ? renderImg({ image, description }) : renderDescription(description)}
            </article>
        </Col>
    }

    if (loading) return <div><Spin size="large" /></div>

    if (!post?.id) return null;

    const { title, image, description, body, datePublished } = post

    return (
        <div>
            <Link to="/">Back</Link>
            <Actions post={post} subject={subject} />
            <Row gutter={[16, 16]}>
                <Col span={24} md={16}>
                    <p>{datePublished}</p>
                    <h1 dangerouslySetInnerHTML={createMarkup(title)} />
                    {image && renderImg({ image, description })}
                    <p className="text" dangerouslySetInnerHTML={createMarkup(description)} />
                    <hr />
                    <p className="text" dangerouslySetInnerHTML={createMarkup(description)} />
                </Col>

                <Col span={24} md={8}>
                    <Row gutter={[16, 16]}>
                        {news?.value.map(renderPost)}
                    </Row>
                </Col>
            </Row>
        </div>
    )
}

export default memo(Post);