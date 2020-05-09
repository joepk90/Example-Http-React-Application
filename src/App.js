import React, { Component } from "react";
import { ToastContainer } from 'react-toastify';
import http from './services/httpService';
import config from './config.json'
import 'react-toastify/dist/ReactToastify.css'
import "./App.css";

class App extends Component {
  state = {
    posts: []
  };

  async componentDidMount() {
    const { data: posts } = await http.get(config.apiEndpoint + '/posts');

    this.setState({ posts });

  }

  handleAdd = async () => {
    const obj = { title: 'a', body: 'b' };

    const { data: post } = await http.post(config.apiEndpoint + '/posts', obj);

    const posts = [post, ...this.state.posts];

    this.setState({ posts });

  };

  handleUpdate = async post => {

    post.title = 'UPDATE';
    const { data } = await http.put(config.apiEndpoint + '/posts/' + post.id, post);
    // http.patch(config.apiEndpoint + '/' + post.id, { title: post.title }); // update specific part of the post object

    const posts = [...this.state.posts];

    const index = posts.indexOf(post);

    posts[index] = { ...post }

    this.setState({ posts });

  };

  handleDelete = async post => {

    const originalPosts = this.state.posts;

    const posts = this.state.posts.filter(p => p.id !== post.id)

    this.setState({ posts });

    try {
      await http.delete(config.apiEndpoint + '/posts/' + post.id);
    } catch (ex) {

      // ex.request
      // ex.response

      // expected (404: not found, 400: bad request) - CLIENT ERRORS
      // - display a specific error message

      if (ex.response && ex.response.status === 404) {
        alert('this post has already been deleted');
      }

      this.setState({ posts: originalPosts });

    }



  };

  render() {
    return (
      <React.Fragment>
        <ToastContainer />
        <button className="btn btn-primary" onClick={this.handleAdd}>
          Add
        </button>
        <table className="table">
          <thead>
            <tr>
              <th>Title</th>
              <th>Update</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {this.state.posts.map(post => (
              <tr key={post.id}>
                <td>{post.title}</td>
                <td>
                  <button
                    className="btn btn-info btn-sm"
                    onClick={() => this.handleUpdate(post)}
                  >
                    Update
                  </button>
                </td>
                <td>
                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() => this.handleDelete(post)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </React.Fragment>
    );
  }
}

export default App;
