import React from 'react';
import './review.less'

const Review = ({review}) => (
    <div className="review">
    <blockquote className="review__blockquote">
        <p className="review__blockquote_content">
            {review.text}
        </p>
        <footer className="review__blockquote_footer">— <cite>{review.author}</cite></footer>
    </blockquote>
    </div>
)

export default Review