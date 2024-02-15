let card_list = document.getElementById("card_list");
let search_input = document.getElementById("search_input");

function cardBox(name, img) {
  return `
        <div class="col-lg-4">
            <div class="card mb-3" >
                <img src="${img}" style="height: 300px;object-fit: contain;" class="card-img-top" alt="${name}">
                <div class="card-body">
                    <h5 class="card-title">${name}</h5>
                   
                </div>
            
            </div>
        </div>
    `;
}

async function getGiphy() {
  // let queryURL = "https://api.giphy.com/v1/gifs/trending?api_key=KaX8Rftb0KSJ86vNZIpB8lzvv0wsfkVT";
  try {
    //? 200-400 Status + JS code
    const response = await fetch(
      "https:/api.giphy.com/v1/gifs/trending?api_key=UtBPxvqH669fWoNZCLrqKV4kCnNm36Nz",
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    const data = await response.json();

    return data.data;
  } catch (err) {
    console.log("err", err);
  }
}



async  function getDatas(){
    let data_list  = await getGiphy()
    let data_inner = data_list.map((data,index)=>{
        return cardBox(data.title,data.images.preview_gif?.url)
    }).join("")
    card_list.innerHTML = data_inner
}

search_input.addEventListener("keyup",function (){
    let val = search_input.value;
    searchGiphy(val)
})
async function searchGiphy(value){
    value = value.toLowerCase()
    let data_list  = await getGiphy()
    let filter_giphy = data_list.filter((item)=>{
        let gif = item.title.toLowerCase()
        if(gif.includes(value)){
            return gif
        }
    })
    let giphy_list  = filter_giphy.map((data)=>{
        return cardBox(data.title,data.images.preview_gif?.url)
    }).join("")
    card_list.innerHTML = giphy_list
}

getDatas();
