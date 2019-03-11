import React from 'react';
import { connect } from 'react-redux'

class PostList extends React.Component{
    state = {
        newPost: '',
        posts:[]
    }

    // componentDidMount(){
    //     //mount all posts here
    // }

    render(){
        return(
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Suscipit facere iure ad enim incidunt ipsum quis itaque quisquam veritatis. 
                Dolorem, velit repellat! Cupiditate quibusdam, quos consectetur corrupti repellendus debitis voluptates? #Football
            </p>
        )
    }
}

export default PostList;