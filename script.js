

const form = document.querySelector('.btn');
form.addEventListener('click', handleSubmit);

 async function handleSubmit(event){
     //get the value of the input field
    const inputValue = document.querySelector('.data').value;
    //remove white space from the input
    const searchQuery = inputValue.trim();
    //select the results dom element by putting iet in searchResults var..
    const searchResults = document.querySelector('.search-results');
    //clear the previous results
    searchResults.innerHTML = '';
    //select the dom element by query selector 
    const spinner = document.querySelector('.spinner');
    //remove the hidden class. That's will allow the searching annimation to take place
    spinner.classList.remove('hidden');
   try{
       //the search query is parse in searchWikipedia which returns the response object
       const results = await searchWikipedia(searchQuery);
       if(results.query.searchinfo.totalhits === 0){
           alert('No results found.Try different Keywords');
           return;
       }
       displayResults(results);
   }catch(err){
       console.log(err);
       alert('Failed to search wikipedia');
   }finally{
       spinner.classList.add('hidden');
   }

}
//searchWikipedia async function
async function  searchWikipedia(searchQuery){
    const url = `https://en.wikipedia.org/w/api.php?action=query&list=search&prop=info&inprop=url&utf8=&format=json&origin=*&srlimit=20&srsearch=${searchQuery}`;

    const response = await fetch(url);
    if(!response.ok){
        throw Error (response.statusText);
    }
    const jsonResponse = await response.json();
    return jsonResponse;
}

function displayResults(results){
    const searchResults = document.querySelector('.search-results');
   
    results.query.search.forEach(result => {
        const url = `https://en.wikipedia.org/?curid=${result.pageid}`;

        searchResults.insertAdjacentHTML(
            'beforeEnd',
            `<div class="card d-inline-flex m-3" style="width: 18rem;">
                <div class="card-body">
                    <h5 class="card-title ">
                        <a href="${url}">${result.title}</a>
                    </h5>
                    <p class="card-text">${result.snippet}</p>
                    <a href="${url}" class="btn btn-primary">See more</a>
                </div>
          </div>`
        )
    });
   
}