const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogs) => {
  const reducer = (sum, item) => {
    return sum + item
  }
  
  const array = blogs.map(x => x['likes'])
  return array.length === 0
    ? 0
    : array.reduce(reducer, 0)
}

const favoriteBlog = (blogs) => {
  return blogs.reduce((max, blog) =>
    max.likes > blog.likes
      ? max
      : {
        title: blog.title,
        author: blog.author,
        likes: blog.likes
      }
  )
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog
}
