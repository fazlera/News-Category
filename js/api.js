let count = 0;

const loadData = async () => {
    const res = await fetch('https://openapi.programming-hero.com/api/news/categories ')
    const AllData = await res.json()
    const data    = AllData.data.news_category.slice(0,3)
    // console.log(data);
    const tabContainer= document.getElementById('tab-container')

    data.forEach(item => {
        // console.log(item);
        count = count + 1
        const div = document.createElement('div')
        div.innerHTML = `
        <a onclick="loadIdData('${item.category_id}')" class="text-2xl">${count} ${item.category_name} </a>
        
        `
        tabContainer.appendChild(div)
    });

}

    
const loadIdData =async (categoryId) =>{
   const res =await fetch(`https://openapi.programming-hero.com/api/news/category/${categoryId}`)
   const allData =await res.json()
    const data   = allData.data;
    console.log(data);
    const cardContainer = document.getElementById('card-container')
    cardContainer.innerHTML = ``;
    data.forEach((newsIdData) => {
        console.log(newsIdData);
        const div = document.createElement('div')
        div.innerHTML = `
        <div class="card  bg-base-100 shadow-xl">
        
        <figure><img src="${newsIdData.image_url}" alt="image_url" /></figure>
        <div class="card-body">
          <h2 class="card-title">${newsIdData.title.slice(0,40)}
            <div class="badge badge-secondary p-5">${newsIdData.rating.badge}</div>
          </h2>
          <p>${newsIdData.details.slice(0,50)}</p>
          <h4>Total Views: <span>${newsIdData.total_view ? newsIdData.total_view : 'No Views' }</span></h4>
         

          <div class="card-actions flex justify-between items-center">

          <div class="flex items-center gap-5">
          <img class="rounded-full w-12" src="${newsIdData.author.img}" alt="image_url" />
          <div><h6>${newsIdData.author.name}</h6>
          <h6>${newsIdData.author.published_date}</h6>
          </div>

          </div>
            <button onclick="modalShowDetails('${newsIdData._id}')" class="btn btn-primary ">Show More</button>
          </div>

        </div>
      </div>
        
        `
        cardContainer.appendChild(div)
        
    })
    // console.log(data);
}
 
// loadIdData()


const modalShowDetails =async (newsData) => {
  const res = await fetch(`https://openapi.programming-hero.com/api/news/${newsData}`);
  const allData = await res.json();
  const data = allData.data[0];
  console.log(data);
    
    const modalContainer = document.getElementById("modal-container")
    const modalDiv = document.createElement("div")
    modalDiv.innerHTML = `
   
    <dialog id="my_modal_1" class="modal">
      <form method="dialog" class="modal-box">
        <h3 class="font-bold text-lg"></h3>
        <p class="py-4">Press ESC key or click the button below to close</p>
        <div class="modal-action">
          <!-- if there is a button in form, it will close the modal -->
          <button class="btn">Close</button>
        </div>
      </form>
    </dialog>`
  
    modalContainer.appendChild(modalDiv);
    const modal = document.getElementById("my_modal_1")
    modal.showModal();
  
}

loadData()
loadIdData('01')

// <!-- Open the modal using ID.showModal() method -->
// <button class="btn" onclick="my_modal_1.showModal()">open modal</button>

// data.forEach((data) => {
//     const divContainer = document.createElement('div')
//     divContainer.innerHTML = `
//     <a class="tab">${data.name}</a> 
    
//     `
//     tabContainer.appendChild(divContainer)
// })