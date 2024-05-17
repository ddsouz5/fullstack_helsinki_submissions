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

module.exports = {
  dummy,
  totalLikes
}
