const apiKey='c8e39a82f1df4a07936813826211b20b';

const blogContainer = document.getElementById("blog-container");
 
/* To fetch article based on the query */
const searchField = document.getElementById('search-input');
/* when someone clicks on the data should be shown */
const searchButton = document.getElementById('search-button');

async function fetchRandomNews(){
    try{
        const apiUrl = `https://newsapi.org/v2/top-headlines?country=us&pageSize=10&apiKey=${apiKey}`;
        const response = await fetch(apiUrl);
        const data = await response.json();
        return data.articles;
    } catch(error){
        console.error("Error fetching random news",error);
        return [];
    }
}


searchButton.addEventListener("click", async () =>{
    /* if somebody clicks on the button we want to take value from the input */
    const query = searchField.value.trim();
    /* if the input field is not empty fetch the data*/
    if(query !==""){
        try{
            const articles = await fetchNewsQuery(query);
            displayBlogs(articles);
        }catch(error){
            console.log("Error fetching news by query",error);
        }
    }
})

async function fetchNewsQuery(query){
    try{
        const apiUrl = `https://newsapi.org/v2/everything?q=${query}&pageSize=10&apiKey=${apiKey}`;
        const response = await fetch(apiUrl);
        const data = await response.json();
        return data.articles;
    } catch(error){
        console.error("Error fetching random news",error);
        return []; 
}
}

function displayBlogs(articles){
    blogContainer.innerHTML = "";
    articles.forEach((article)=>{
        /* For each article we are creating a div */
        const blogCard = document.createElement("div");
        /* To add the class */
        blogCard.classList.add("blog-card");
        const img =document.createElement("img");
        /* this property is in news api documentation */
        img.src = article.urlToImage;
        img.alt = article.title;
        /* Creating the title */
        const title = document.createElement("h2");
        /* To decrease the length of the title */
        const truncatedTitle = 
        article.title.length > 30
        /* if article title is greater than 30 perform slice*/ 
        ? article.title.slice(0,30) + "...." 
        /*if the article title is less than 30 */
        :article.title;
        /* To pass our newly created variable to our blogCard*/
        title.textContent = truncatedTitle;
        /* Creating the paragraph */
        const description = document.createElement("p");
        const truncatedDes = 
        article.description.length > 120
        /* if article description is greater than 30 perform slice*/ 
        ? article.description.slice(0,120) + "...." 
        /*if the article description is less than 30 */
        :article.description;
        /* we have to pass this description */
        description.textContent = truncatedDes;
        /* To append the contents to our main tag */
        blogCard.appendChild(img);
        blogCard.appendChild(title);
        blogCard.appendChild(description);
        /* when someone clicks on the blogCard it should open in a new window */
        blogCard.addEventListener('click', () =>{
            /* we need the URL to read that blog */
            window.open(article.url, "_blank");
        })
        /* To append blogcard to our blogContainer */
        blogContainer.appendChild(blogCard);

    });
}

(async () =>{
    try{
        const articles = await fetchRandomNews();
        displayBlogs(articles);
    } catch(error){
        console.log("Error fetching random news",error);
    }
})();