import { memo } from "react";

const navigatorHasShare = navigator.share;

const URL = 'http://localhost:3000';

function Actions({ post, subject }) {
    const { id, title } = post;

    const shareInfo = () => {
        navigator.share({
            title: `PWA News - ${subject}`,
            text: title,
            url: URL
        })
    }

    const copyInfo = () => {
        navigator.clipboard.writeText(`${title} - Learn more about in ${URL}/${subject}/${id}`);
    }

    const renderActions = () => {
        const action = navigatorHasShare ? shareInfo : copyInfo

        return <button onClick={action}>Click here to share</button>
    }

    return (
        <div className="share">
            {renderActions()}
        </div>
    )
}


export default memo(Actions)