document.addEventListener("DOMContentLoaded", (event) => {
  console.log('loaded')
	const images = document.querySelectorAll(".image-wrapper__picture");
  const links = document.querySelectorAll(".image-wrapper__link");
  
  images.forEach((img, index) => {
    links[index].addEventListener('mouseover', (e) => {
      console.log('show')
      img.classList.add("show");
    })
  
    links[index].addEventListener('mouseout', (e) => {
      console.log('hide')
      img.classList.remove("show");
    })
  })
});