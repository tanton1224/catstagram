// Your code here
window.onload = async () => {
  //main container
  const mainContainer = document.createElement('div');
  mainContainer.setAttribute('class', 'main-container');
  document.body.append(mainContainer);

  //themes
  const themeButton = document.createElement('button');
  themeButton.setAttribute('class', 'theme-button');
  themeButton.innerText = 'Dark Mode'
  mainContainer.append(themeButton);

  if (localStorage.getItem('theme')){
    document.body.setAttribute('class', `${localStorage.getItem('theme')}`)
    if (document.body.getAttribute('class') === 'light-mode') {
      themeButton.innerText = 'Dark Mode'
    } else if (document.body.getAttribute('class') === 'dark-mode') {
      themeButton.innerText = 'Light Mode'
    }
  } else {
    document.body.setAttribute('class', 'light-mode')
    localStorage.setItem('theme', 'light-mode')
  }

  function changeTheme(themeName) {
    document.body.className = `theme-${themeName}`
  }

  themeButton.addEventListener('click', toggleTheme)

  function toggleTheme() {
    // check class
    if (document.body.getAttribute('class') === 'light-mode') {
      document.body.classList.remove('light-mode');
      document.body.classList.add('dark-mode');
      localStorage.setItem('theme', 'dark-mode');
      themeButton.innerText = 'Light Mode'
    } else {
      document.body.classList.remove('dark-mode');
      document.body.classList.add('light-mode');
      localStorage.setItem('theme', 'light-mode');
      themeButton.innerText = 'Dark Mode'
    }
    // if dark mode switch to light mode class
    // or vice versa
  }


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
  const image = document.createElement("img")
  if(localStorage.getItem('cat-pic')){
    image.setAttribute("src", `${localStorage.getItem('cat-pic')}`) //if local storage has, then dont get a new pic
  } else { //else get new pic
    let res = await fetch("https://api.thecatapi.com/v1/images/search/");
    let data = await res.json();
    image.setAttribute("src", `${data[0].url}`)
    localStorage.setItem('cat-pic', `${data[0].url}`)
  }
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
  if (localStorage.getItem('up-score') && localStorage.getItem('down-score')){
    upScore = localStorage.getItem('up-score')
    downScore = localStorage.getItem('down-score')
  } else {
    localStorage.setItem('up-score', `${upScore}`)
    localStorage.setItem('down-score', `${downScore}`)
  }

  const likeCount = document.createElement('span')
  const dislikeCount = document.createElement('span')
  interactiveBar.append(like)
  interactiveBar.append(likeCount)
  likeCount.innerText = `Likes: ${localStorage.getItem('up-score')}`
  interactiveBar.append(dislike)
  interactiveBar.append(dislikeCount)
  dislikeCount.innerText = `Dislikes: ${localStorage.getItem('down-score')}`
  postDiv.append(interactiveBar)

  //upvote/downvote events
  const upvote = async () => {
    upScore ++;
    likeCount.innerText = `Likes: ${upScore}`;
    localStorage.setItem('up-score', `${upScore}`) //update the local storage
  }
  const downvote = async () => {
    downScore ++;
    dislikeCount.innerText = `Dislikes: ${downScore}`
    localStorage.setItem('down-score', `${downScore}`) //update the local storage
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

  if (localStorage.getItem('comments')){
    comments.innerHTML = localStorage.getItem('comments')
  }

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

    localStorage.setItem('comments', `${comments.innerHTML}`)
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
    comments.innerHTML = ''

    localStorage.setItem('cat-pic', `${newCatData[0].url}`)
    localStorage.setItem('up-score', `${upScore}`)
    localStorage.setItem('down-score', `${downScore}`)
    localStorage.setItem('comments', `${comments.innerHTML}`)
  }

  //storage (local)

  newCatButton.addEventListener('click', getNewCat)

}
