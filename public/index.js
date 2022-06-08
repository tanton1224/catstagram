// Your code here
window.onload = async () => {
  //main container
  const mainContainer = document.createElement('div');
  mainContainer.setAttribute('class', 'main-container')
  document.body.append(mainContainer);
  //title
  const title = document.createElement("h1")
  title.innerText = "Catstagram"
  mainContainer.append(title);

  //post
  let postDiv = document.createElement("div")
  postDiv.setAttribute("class", "post")
  mainContainer.append(postDiv);

  //post-title
  const catName = document.createElement("h2")
  catName.setAttribute("class", "post-title")
  catName.innerText = "Kitten pic"
  postDiv.append(catName)

  //pic-div
  let picDiv = document.createElement("div")
  picDiv.setAttribute("class", "picDiv")
  postDiv.append(picDiv)

  //post-image
  let res = await fetch("https://api.thecatapi.com/v1/images/search/");
  let data = await res.json();
  const image = document.createElement("img")
  image.setAttribute("src", `${data[0].url}`)
  image.setAttribute("class", 'cat-picture')
  picDiv.append(image)

  //post-likes and dislikes
  const interactiveBar = document.createElement('div')
  interactiveBar.setAttribute('class', "interactiveBar")
  const like = document.createElement('button')
  const dislike = document.createElement('button')

  like.innerText = `👍`
  dislike.innerText = `👎`

  let upScore = 0;
  let downScore = 0;
  const likeCount = document.createElement('span')
  const dislikeCount = document.createElement('span')
  interactiveBar.append(like)
  interactiveBar.append(likeCount)
  likeCount.innerText = `Likes: ${upScore}`
  interactiveBar.append(dislike)
  interactiveBar.append(dislikeCount)
  dislikeCount.innerText = `Dislikes: ${downScore}`
  postDiv.append(interactiveBar)

  //upvote/downvote events
  const upvote = async () => {
    upScore ++;
    likeCount.innerText = `Likes: ${upScore}`
  }
  const downvote = async () => {
    downScore ++;
    dislikeCount.innerText = `Dislikes: ${downScore}`
  }

  like.addEventListener('click', upvote)
  dislike.addEventListener('click', downvote)

  //comment section
  const commentSection = document.createElement('div')
  commentSection.setAttribute('class', 'commentSection')

  const comments = document.createElement('ul')
  comments.setAttribute("class", "comments")

  const commentsHeaderDiv = document.createElement('div')
  const commentsHeader = document.createElement('h3')
  commentsHeaderDiv.append(commentsHeader)
  commentsHeaderDiv.setAttribute('class', "comments-header-div")

  commentsHeader.innerText = "Comments"
  commentsHeader.setAttribute("class", "comments-header")


  commentSection.append(commentsHeaderDiv)
  commentSection.append(comments)
  postDiv.append(commentSection)

  //create new comment
  const newCommentBar = document.createElement('div')
  newCommentBar.setAttribute('class', 'comment-bar')
  const textArea = document.createElement('textarea')
  textArea.setAttribute('placeholder', "Add a comment...")
  const postButton = document.createElement('button')
  postButton.innerText = "POST"
  postButton.setAttribute('class', 'comment-post-button')

  newCommentBar.append(textArea)
  newCommentBar.append(postButton)
  postDiv.append(newCommentBar)

  const postComment = async () => {
    const comment = document.createElement('li')
    comment.setAttribute('class', 'comment')
    comment.innerText = textArea.value

    comments.append(comment)
    textArea.value = ''
  }

  postButton.addEventListener('click', postComment)

  //new Cat
  let newCatButton = document.createElement('button');
  newCatButton.setAttribute('class', 'newCatButton')
  newCatButton.innerText = 'Get New Cat'
  mainContainer.append(newCatButton)

  const getNewCat = async () => {
    let newCat = await fetch("https://api.thecatapi.com/v1/images/search/");
    let newCatData = await newCat.json();
    image.setAttribute('src', `${newCatData[0].url}`)
    upScore = 0;
    downScore = 0;
    likeCount.innerText = `Likes: ${upScore}`
    dislikeCount.innerText = `Dislikes: ${downScore}`
    commentSection.innerHTML = ''
  }

  newCatButton.addEventListener('click', getNewCat)

}
