import React, { Component } from 'react';

import Posts from './Posts';
import  { firestore } from '../firebase';
import { collectIdsAndDocs } from '../utilities';
class Application extends Component {
  state = {
    posts: [],
  };

  unsubscribe = null;

  componentDidMount = async () => {
    // const snapshot = await firestore.collection('posts').get();
    // const posts = snapshot.docs.map(collectIdsAndDocs);
    // this.setState({ posts });
    this.unsubscribe = firestore.collection('posts').onSnapshot(snapshot => {
      const posts = snapshot.docs.map(collectIdsAndDocs);
      this.setState({ posts });
    });
  };

  componentWillUnmount = () => {
    this.unsubscribe();
  }

  render() {
    const { posts } = this.state;

    return (
      <main className="Application">
        <h1>Think Piece</h1>
        <Posts posts={posts} />
      </main>
    );
  }
}

export default Application;
