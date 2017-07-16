 //Listen for form submit
 document.getElementById('myForm').addEventListener('submit', saveBookmark);
 //Save bookmark
 function saveBookmark(e){
   // Get values
   var siteName = document.getElementById('siteName').value;

   var siteUrl = document.getElementById('siteUrl').value;
   
    if(!siteUrl || !siteName){
    	alert("Please fill in the form");
    	return false;
    }

   var bookmark = {
   	name : siteName,
   	url: siteUrl
   }

   // Local storage- Test if bookmarks is null
   if(localStorage.getItem('bookmarks') === null){
   	//Initialise new array
   	var bookmarks = [];
   	//add to array
   	bookmarks.push(bookmark);
   	//Set to Local storage
   	localStorage.setItem('bookmarks',JSON.stringify(bookmarks)); //Parse JSON to string
   } else {
   	//Get bookmarks from Local storage
   	var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
   	//Add bookmark to array 
   	bookmarks.push(bookmark);
   	// reset to Local storage
   	localStorage.setItem('bookmarks',JSON.stringify(bookmarks));
   }

     // Re-fetch  bookmarks
     fetchBookmarks();
 	//Prevent form from submitting
 	e.preventDefault();
 }
 //Delete 
 function deleteBookmark(url){
 	var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
 	//Loop through bookmarks
 	for ( var i=0; i< bookmarks.length;i++){
 		if(bookmarks[i].url = url){
 			//remove from array
 			bookmarks.splice(i,1);//Splice out one from current iteration
 		}
 	}
 	//reset
 	localStorage.setItem('bookmarks',JSON.stringify(bookmarks));
 	// re-fetch bookmarks
 	fetchBookmarks();
 }

 //Fetch bookmarks and Display
 function fetchBookmarks(){
 	var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
 	//get output Id
 	var bookmarksResults = document.getElementById('bookmarksResults');
 	bookmarksResults.innerHTML = '';
 	for( var i=0;i<bookmarks.length;i++){
 		var name = bookmarks[i].name;
 		var url = bookmarks[i].url;

 		bookmarksResults.innerHTML += '<div class="well">'+
 		                                '<h3>' + name +
 		                                 '<a id="button" class="btn btn-default" target="_blank" href="'+url+'">Visit</a>' +
 		                                 //Escape for quotes in URL
 		                                 '<a onclick="deleteBookmark(\''+url+'\')" class="btn btn-danger" href="#">Delete</a>' +
 		                                 '</h3>'
 		                                 '</div>';
 	}
 	}