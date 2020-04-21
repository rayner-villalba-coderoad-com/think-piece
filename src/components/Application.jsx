import React, { Component } from 'react';
import  { firestore } from '../firebase';

import Posts from './Posts';
import { collectIdsAndDocs } from '../utilities';

class Application extends Component {
  state = {
    posts: [],
  };

  unsubscribe = null;

  componentDidMount = async () => {
    //firestore work with promises 
    // Old way to consume a promise
    // 1)
    /*const snapshot = firestore.collection('posts').get().then(snapshot => {
      //snapshot is an object that wrapper our data
      console.log( { snapshot });
    });*/

    // 2) 
    //const snapshot = await firestore.collection('posts').get();
    //console.log({ snapshot });

    // snapshot.forEach(doc => {
    //   const id = doc.id;
    //   const data = doc.data();
    //   console.log({ id, data });
    // });

    // 3) Get all documents 
    //const posts = snapshot.docs.map(collectIdsAndDocs);
    //console.log(posts);

    //this.setState({ posts });

    // 4) Subscrite and Listen all changes of the collection is not a promise is a callback
    // Be carefull to unsubscribe because it causes memory leaks. 
    // Test with two windows it is already updated simultaniously
    this.unsubscribe = firestore.collection('posts').onSnapshot(snapshot => {
      const posts = snapshot.docs.map(collectIdsAndDocs);
      this.setState({ posts });
    })
  }

  componentWillUnmount = () => {
    this.unsubscribe();
  }

  render() {
    const { posts } = this.state;

    return (
      <main className="Application">
        <h1>Rayner Posts</h1>
        <Posts posts={posts} />
      </main>
    );
  }
}

export default Application;
