const e=document.getElementById("search-form"),t=document.querySelector(".gallery"),n=document.querySelector(".load-more");let a=1,o="";async function c(){const e=`https://pixabay.com/api/?key=37006271-9ca9ec93e9cdea535f835c12a&q=${o}&image_type=photo&orientation=horizontal&safesearch=true&page=${a}&per_page=40`;try{const n=await fetch(e),o=await n.json();if(0===o.hits.length)return s("Sorry, there are no images matching your search query. Please try again."),void i();o.hits.forEach((e=>{!function(e){const n=document.createElement("div");n.classList.add("photo-card");const a=document.createElement("img");a.src=e.webformatURL,a.alt=e.tags,a.loading="lazy";const o=document.createElement("div");o.classList.add("info");const c=document.createElement("p");c.classList.add("info-item"),c.innerHTML=`<b>Likes:</b> ${e.likes}`;const i=document.createElement("p");i.classList.add("info-item"),i.innerHTML=`<b>Views:</b> ${e.views}`;const s=document.createElement("p");s.classList.add("info-item"),s.innerHTML=`<b>Comments:</b> ${e.comments}`;const r=document.createElement("p");r.classList.add("info-item"),r.innerHTML=`<b>Downloads:</b> ${e.downloads}`,o.appendChild(c),o.appendChild(i),o.appendChild(s),o.appendChild(r),n.appendChild(a),n.appendChild(o),t.appendChild(n)}(e)})),o.totalHits<=40*a&&(i(),s("We're sorry, but you've reached the end of search results."))}catch(e){console.error("Error:",e),s("An error occurred. Please try again later.")}}function i(){n.style.display="none"}function s(e){const t=document.createElement("div");t.classList.add("notification"),t.textContent=e,document.body.appendChild(t),setTimeout((()=>{t.remove()}),3e3)}e.addEventListener("submit",(async function(i){if(i.preventDefault(),o=e.elements.searchQuery.value.trim(),""===o)return;t.innerHTML="",a=1,await c(),n.style.display="block"})),n.addEventListener("click",(async function(){a++,await c()}));
//# sourceMappingURL=index.ff1d9d72.js.map
