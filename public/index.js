// Your code here
window.onload = async () => {
  const mainContainer = document.createElement('div');
  mainContainer.setAttribute('class', 'main-container')
  document.body.append(mainContainer);

  const title = document.createElement("h1")
  title.innerText = "Kitten Pic"


  let postDiv = document.createElement("div")
  postDiv.setAttribute("class", "post")

  let res = await fetch("https://api.thecatapi.com/v1/images/search/");
  let data = await res.json();

  const image = document.createElement("img")
  image.setAttribute("src", `${data[0].url}`)
  image.setAttribute("class", 'cat-picture')
  postDiv.append(image)

  mainContainer.append(title);
  mainContainer.append(postDiv);


  let newCatButton = document.createElement('button');
  newCatButton.innerText = 'Get New Cat'
  mainContainer.append(newCatButton)

  getNewCat = async () => {
    let newCat = await fetch("https://api.thecatapi.com/v1/images/search/");
    let newCatData = await newCat.json();
    image.setAttribute('src', `${newCatData[0].url}`)
  }


  newCatButton.addEventListener('click', getNewCat)

}
