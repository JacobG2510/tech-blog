const User = require('./User');
const BlogPost = require('./BlogPost');
const Comment = require('./Comment');

// Define associations between models if needed
User.hasMany(BlogPost, {
  foreignKey: 'user_id',
});

BlogPost.belongsTo(User, {
  foreignKey: 'user_id',
});

BlogPost.hasMany(Comment, {
  foreignKey: 'post_id',
});

Comment.belongsTo(BlogPost, {
  foreignKey: 'post_id',
});

User.hasMany(Comment, {
  foreignKey: 'user_id',
});

Comment.belongsTo(User, {
  foreignKey: 'user_id',
});

models.exports = { User, BlogPost, Comment };