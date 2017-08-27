const mongoose = require('mongoose');
const assert = require('assert');
const User = require('../src/user');
const Comment = require('../src/comment');
const BlogPost = require('../src/blogPost');

describe('Assocations', () => {
  let joe, blogPost, comment;

  beforeEach((done) => {
    joe = new User({ name: 'Joe' });
    blogPost = new BlogPost({ title: 'JS is Great', content: 'Yep it really is' });
    comment = new Comment({ content: 'Congrats on great post' });

    // thought we're actually pushing a model into joe.blogPosts, mongoose will recognize that we're trying to set up an association and just store the object.IdType as the blogPOst's id
    joe.blogPosts.push(blogPost);
    blogPost.comments.push(comment);
    comment.user = joe;

    // Promise.all is often used when setting up associations
    Promise.all([joe.save(), blogPost.save(), comment.save()])
      .then(() => done());
  });

  it('saves a relation between a user and a blogpost', (done) => {
    User.findOne({ name: 'Joe' })
      .populate('blogPosts')
      .then((user) => {
        assert(user.blogPosts[0].title === 'JS is Great');
        done();
      });
  });

  it('saves a full relation graph', (done) => {
    User.findOne({ name: 'Joe' })
      .populate({
        // path = property on user
        // model = model that the porperty should be
        path: 'blogPosts',
        populate: {
          path: 'comments',
          model: 'comment',
          populate: {
            path: 'user',
            model: 'user'
          }
        }
      })
      .then((user) => {
        const { blogPosts, name } = user;
        const { comments, title } = blogPosts[0];
        assert(name === 'Joe');
        assert(title === 'JS is Great');
        assert(comments[0].content === 'Congrats on great post');
        assert(comments[0].user.name === 'Joe');
        // console.log(user.blogPosts[0].comments[0])
        done();
      });
  });
});
