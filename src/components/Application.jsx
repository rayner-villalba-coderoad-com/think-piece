import React, { Component } from 'react';
import  { firestore } from '../firebase';

import Posts from './Posts';
import { collectIdsAndDocs } from '../utilities';

class Application extends Component {
  state = {
    posts: [
      // {
      //   id: '1',
      //   title: 'A Very Hot Take',
      //   content:
      //     'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Perferendis suscipit repellendus modi unde cumque, fugit in ad necessitatibus eos sed quasi et! Commodi repudiandae tempora ipsum fugiat. Quam, officia excepturi!',
      //   user: {
      //     uid: '123',
      //     displayName: 'Bill Murray',
      //     email: 'billmurray@mailinator.com',
      //     photoURL: 'https://www.fillmurray.com/300/300',
      //   },
      //   stars: 1,
      //   comments: 47,
      // },
      // {
      //   id: '2',
      //   title: 'The Sauciest of Opinions',
      //   content:
      //     'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Perferendis suscipit repellendus modi unde cumque, fugit in ad necessitatibus eos sed quasi et! Commodi repudiandae tempora ipsum fugiat. Quam, officia excepturi!',
      //   user: {
      //     uid: '456',
      //     displayName: 'Mill Burray',
      //     email: 'notbillmurray@mailinator.com',
      //     photoURL: 'https://www.fillmurray.com/400/400',
      //   },
      //   stars: 3,
      //   comments: 0,
      // },
    ],
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

  handleCreate = async post => {
    const { posts } = this.state;
    // add method return document reference
    const docRef = await firestore.collection('posts').add(post);
    const doc = await docRef.get();

    const newPost = collectIdsAndDocs(doc);
    this.setState({ posts: [newPost, ...posts] });
  };

  handleRemove = async id => {
    const allPosts = this.state.posts;
     
    //Delete from firebase the document
    await firestore.doc(`posts/${id}`).delete();

    const posts = allPosts.filter(post => post.id !== id);

    this.setState({ posts });
  }

  render() {
    const { posts } = this.state;

    return (
      <main className="Application">
        <h1>Rayner Posts</h1>
        <Posts posts={posts} onCreate={this.handleCreate} onRemove={this.handleRemove} />
      </main>
    );
  }
}

export default Application;
