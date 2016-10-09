// import React, {
//   Component,
//   StyleSheet,
//   Text,
//   View
// } from 'react-native';

import React, {Component} from 'react';

import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  StyleSheet
} from 'react-native';


import { connect } from 'react-redux';

import Button from '../components/button';
import ddpClient from '../ddp';

import { changeSignInStatus } from '../reducers/app/actions';
import { addPost, setPosts } from '../reducers/post/actions';

export class SignOut extends Component {
  constructor(props) {
    super(props);

    this.state = {
      user: null,
      posts: {},
      title: ''
    }

    this.handleIncrement = this.handleIncrement.bind(this);
  }

  _userObserver = null;

  componentDidMount() {
    ddpClient.user()
      .then((user) => {
        this.setState({user})
      });
      this.makeSubscription();
      this.observePosts();
  }


  observePosts() {
    console.log('DATA OBSERVED')
    let observer = ddpClient.observe("posts"); // i think observer is out of the box
    observer.added = (id) => {
      // this.setState({posts: ddpClient.collections.posts})
      console.log('observer add')
      // this.props.dispatch(setPosts(ddpClient.collections.posts));
    }
    observer.changed = (id, oldFields, clearedFields, newFields) => {
      // this.setState({posts: ddpClient.collections.posts})
      console.log('observer changed',ddpClient.collections.posts)
      this.props.dispatch(setPosts(ddpClient.collections.posts));
    }
    observer.removed = (id, oldValue) => {
      // this.setState({posts: ddpClient.collections.posts})
      console.log('observer removed')
      this.props.dispatch(setPosts(ddpClient.collections.posts));
    }
  }

  makeSubscription() {
    ddpClient.subscribe("posts", [], () => {
      console.log('subscribe')
      // this.setState({posts: ddpClient.collections.posts || {} });
      this.props.dispatch(setPosts(ddpClient.collections.posts));
    });
  }

  handleIncrement() {
    // ddpClient.call('addPost');
    this.props.dispatch(addPost(this.state.title));

  }

  handleDecrement() {
    ddpClient.call('deletePost');
  }

  componentWillUnmount() {
    this._userObserver && this._userObserver.stop();
  }

  handleSignOut() {
    ddpClient.logout(() => {
      // this.props.changedSignedIn(false);
      this.props.dispatch(changeSignInStatus(false));
    });
  }

  render() {
    // let count = Object.keys(this.state.posts).length;
    // let count = this.props.count.count;
    // console.log('props',this.props);

    let posts = this.props.posts;
    let count = Object.keys(posts).length;
    // console.log('posts',posts);

    return (
      <View style={{paddingTop:50}}>
        <TextInput
          style={{height: 40, paddingLeft:10,borderColor:'#ccc',borderWidth:1}}
          onChangeText={(title) => this.setState({title})}
          value={this.state.name}
          placeholder={"Add a post"}
          ref="PostInput"
          enablesReturnKeyAutomatically={true}
          returnKeyType={'done'}
        />
        <Button text="Add Post" onPress={this.handleIncrement}/>
        <Text style={{fontSize:20}}>Posts: {count}</Text>
        {this.renderPosts(posts)}

        <Button text="Decrement" onPress={this.handleDecrement}/>

      <Button text="Sign Out" onPress={() => this.handleSignOut()}/>
      </View>
    );
  }
  renderPosts(posts) {
    var render = []
      for (var post in posts){
        // console.log('post found!',post)
        render.push(<Text key={post} style={{fontSize:12,borderWidth:1,borderColor:'#ccc'}}>{posts[post].title}</Text>)
      }
      return render;

  }


}

const mapStateToProps = (state) => {
  return {
    posts: state.posts
  }
}


export default connect(mapStateToProps)(SignOut);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  main: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10
  }
});
