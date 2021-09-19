import { memo } from "react";

import PropTypes from 'prop-types';

import { Row, Col } from 'antd';

import { useHistory } from 'react-router-dom';

import { createMarkup } from '../../utils'

function Economy({ values }) {

    const history = useHistory();

    const renderImg = ({ image, description }) => <img src={image.url} alt={description} />;

    const renderDescription = (description) => <p dangerouslySetInnerHTML={createMarkup(description)} />

    const openPost = (id) => history.push(`/economy/${id}`);

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


    return (
        <Row gutter={[16, 16]}>
            {values?.map(renderPost)}
        </Row>
    )
}

Economy.defaultProps = {
    values: []
}

Economy.propTypes = {
    values: PropTypes.array.isRequired
}

export default memo(Economy);