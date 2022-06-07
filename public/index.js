// Your code here
window.onload = async () => {
  const title = document.createElement("h1")
  title.innerText = "Kitten Pic"


  let imageDiv = document.createElement("div")
  imageDiv.setAttribute("class", "post")
  let res = await fetch("https://api.thecatapi.com/v1/images/6pKEmaQ0X");
  let data = await res.json();
  let url = data.url;
  const image = document.createElement("img")
  image.setAttribute("src", url)
  imageDiv.append(image)

  document.body.append(title);
  document.body.append(imageDiv);

}
