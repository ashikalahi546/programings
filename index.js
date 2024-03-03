const discussCard = async (searching = "") => {
  const res = await fetch(
    `https://openapi.programming-hero.com/api/retro-forum/posts?category=${searching}`
  );
  const data = await res.json();
  const letsDiscuss = document.getElementById("lets-discuss-section");
  letsDiscuss.innerHTML = "";
  data.posts.forEach((items) => {
    console.log("data", data);

    const newDiv = document.createElement("div");
    newDiv.classList = `bg-[#12132D0D] px-6 py-8 rounded-2xl `;
    newDiv.innerHTML = ` 
    <div class="flex md:flex-row flex-col gap-4">
    <div class="size-16  bg-white relative">
    <img class="rounded-md" src="${items.image}" alt="">
      <div id = "active"
        class="size-3 bg-emerald-500 rounded-full absolute -top-1 -right-1"
      > </div>
    </div>
    <div class="flex flex-col gap-3 main-card">
      <div class="text-[#12132DCC] text-sm font-medium flex gap-2">
        <h3>#${items.category}</h3>
        <h4>Author : ${items.author.name}</h4>
      </div>
      <h3 class="text-xl font-bold">
       ${items.title}
      </h3>
      <p class="text-[#12132D99] text-base leading-7"> ${items.description}
      
      </p>
      <div class="border-y border-dashed "></div>

      <div class="flex sm:gap-48 gap-5 items-center card-option">
        <div class="flex items-center gap-5">
          <div class="flex items-center gap-2">
            <img src="image/Vector.png" alt="" />
            <p class="text-base text-[#12132D99]">${items.comment_count}</p>
          </div>
          <div class="flex items-center gap-2">
            <img src="image/tabler-icon-eye.png" alt="" />
            <p class="text-base text-[#12132D99]">${items.view_count}</p>
          </div>
          <div class="flex items-center gap-2">
            <img src="image/Group 18.png" alt="" />
            <p class="text-base text-[#12132D99]">${items.posted_time} min</p>
          </div>    
        </div>
      <div id ="email-container">
      <img id="emailHandlar" onclick='emailHandlar("${items.title} ashik ${items.view_count}")'
      class = "cursor-pointer email-icon"
      src="image/email 1.png" alt="" />
      </div>
     
      </div>
    </div>
  </div>
    
    `;
    letsDiscuss.appendChild(newDiv);
  });
  loadingSpinner(false);
};

// latest post

const latestPost = async () => {
  const res = await fetch(
    "https://openapi.programming-hero.com/api/retro-forum/latest-posts"
  );
  const data = await res.json();
  data.forEach((items) => {
    console.log(items);

    const latestPosts = document.getElementById("latest-posts-section");
    const newDiv = document.createElement("div");
    newDiv.classList = `shadow-md p-5 rounded-2xl border flex flex-col gap-4`;
    newDiv.innerHTML = ` 


<img class ="rounded-2xl" src="${items.cover_image}" alt="" />
            <div class="flex items-center gap-3">
              <img src="image/Frame.png" alt="" />
              <p class="text-[#12132D99]">${
                items.author.posted_date
                  ? items.author.posted_date
                  : "No Publish Date"
              }</p>
            </div>
            <h2 class="text-base font-bold">
             ${items.title}
            </h2>
            <p class="text-[#12132D99]">
             ${items.description}
            </p>
            <div class="flex items-center gap-4">
            <img class="rounded-full size-12" src="${
              items.profile_image
            }" alt="">
          
              <div>
                <h2 class="font-bold">${items.author.name}</h2>
                <p class="text-[#12132D99] text-sm">${
                  items.author.designation
                    ? items.author.designation
                    : "Unknown"
                }</p>
              </div>
            </div>`;
    latestPosts.appendChild(newDiv);
  });
};

const searchHandler = () => {
  loadingSpinner(true);
  const inputField = document.getElementById("input-field").value;

  if (inputField) {
    discussCard(inputField);
  } else {
    alert("please Enter a valid input");
  }
};

const loadingSpinner = (isLoading) => {
  const loading = document.getElementById("loading-spinner");
  if (isLoading) {
    loading.classList.remove("hidden");
  } else {
    loading.classList.add("hidden");
  }
};

const arr = [];
const emailHandlar = (data) => {
  const title = data.split("ashik ")[0];
  const views = data.split("ashik ")[1];
  arr.push({ title: title, views: views });
  console.log(arr);
  arr.forEach((element) => {
    // console.log(element);
    const count = document.getElementById("countNumber");
    const number = count.innerText;
    if (number) {
    } else {
    }

    const tittle = document.getElementById("title-discus");
    const newdivs = document.createElement("div");
    newdivs.classList = `bg-white shadow p-4 flex items-center xl:gap-5 gap-4 rounded-xl justify-between`;
    newdivs.innerHTML = `
      <h3 class="sm:text-base text-sm font-semibold">
     ${element.title}
    </h3>
    <div class="flex items-center gap-2">
      <img src="image/tabler-icon-eye.png" alt="" />
      <p class="text-base text-[#12132D99]">${element.views}</p>
    </div>`;
    tittle.appendChild(newdivs);
  });
};

discussCard();
latestPost();
