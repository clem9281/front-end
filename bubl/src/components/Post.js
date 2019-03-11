import React from "react";
import {connect} from "react-redux";

const Post = props => {
    return (
        <div className="post">
            <p className="post-content">Lorem ipsum dolor sit amet consectetur adipisicing elit. Suscipit facere iure ad enim incidunt ipsum quis itaque quisquam veritatis. Dolorem, velit repellat! Cupiditate quibusdam, quos consectetur corrupti repellendus debitis voluptates? #Football
            <span className="timestamp"> TimeStamp</span></p>
            <div className="icons">
            <i className="far fa-heart"></i>
            <i className="far fa-comments"></i>
            <p className="comment"><span className="comment-user">Person </span> Lorem ipsum dolor sit amet!</p>
            </div>
        </div>
    )
}

export default Post;