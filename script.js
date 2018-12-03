var container = document.getElementById('content');
var container2 = document.getElementById('content2');

window.onload = function(){
    LoadNYTimes();
    LoadGuardian();
    //loadPage("main.html")
   document.getElementById("home").classList.add("active")
   document.getElementById("tab1").classList.remove("active")
}
document.getElementById("home").onclick = function() {
    //loadPage("main.html")
    container2.innerHTML = "";
    container.innerHTML = "";
    LoadNYTimes();
    LoadGuardian();
    this.classList.add("active")
    document.getElementById("tab1").classList.remove("active")
    document.getElementById("tab2").classList.remove("active")
  }

  document.getElementById("tab1").onclick = function() {
      loadPage("about.html");
      this.classList.add("active")
      document.getElementById("tab2").classList.remove("active")
      document.getElementById("home").classList.remove("active")
  }

  document.getElementById("tab2").onclick = function() {
    loadPage("contact.html")
    this.classList.add("active")
    document.getElementById("tab1").classList.remove("active")
    document.getElementById("home").classList.remove("active")

}   
    /////FORM VERIF ///////////
    function verifForm(){
        var email = document.getElementById("email").value, 
            name = document.getElementById("name").value, 
            message = document.getElementById("message").value; 
            var regEmail = new RegExp(/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/); 
            var regName = new RegExp(/^[a-zA-Zéè ,.'-]+$/u)

        
           if (!name || !(regName.test(name))) {
            document.getElementById("name").style.borderColor = "red";
            document.getElementById("erName").innerHTML = "Name should be at least 2 letters long, no numbers"

            } else if (!email || !(regEmail.test(email)) ) {
                document.getElementById("email").style.borderColor = "red";
                document.getElementById("erEmail").innerHTML = "email non-correct"
                //reinithialize field name, take off error decoration
                document.getElementById("erName").innerHTML="";
                document.getElementById("name").style.borderColor = "#ccc";

            } else if(!message){
                document.getElementById("message").style.borderColor = "red";
                document.getElementById("erText").innerHTML = "Message can't be empty"
                //reinithialize field email, take off error decoration
                document.getElementById("erEmail").innerHTML="";
                document.getElementById("email").style.borderColor = "#ccc";
            } else {
              
            loadPage("messageSent.html") 
        }
    }
      
  function loadPage(url){
    container2.innerHTML = "";
    container.innerHTML = "";
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) {
       container.innerHTML = this.responseText;
       if(url == 'contact.html')
        document.getElementById("submitBtn").onclick = function(e){ 
            e.preventDefault();          
            verifForm();
        }
      }
    };
    xhttp.open("GET",url, true);
    xhttp.send(); 
  }

  function LoadNYTimes(){
    var url = "https://api.nytimes.com/svc/search/v2/articlesearch.json";
    url += '?' + $.param({
    'api-key': "990......."
     });

    $.ajax({
    url: url,
    method: 'GET',
    }).done(function(result) {
    var articles = result.response.docs;
    //console.log(articles);
    container.innerHTML+='<h3 class="title">NY Times</h3>';
    for (var i=0; i<articles.length; i++){     
    container.innerHTML += ('<div style="border: solid 1px lightgrey; padding: 20px; box-shadow: 2px 2px 0 lightgrey; margin: 20px 20px;border-radius: 10px;"><h3>'+ articles[i].headline.main + '</h3>' +'<p>' +articles[i].abstract+ '</p>'+'<a href="'+ articles[i].web_url+'">Read More</a>')
    }
    }).fail(function(err) {
     throw err;
    });
  }

  function LoadGuardian(){
    var url = "https://content.guardianapis.com/search?q=guide&tag=travel/travel&show-tags=contributor&show-fields=headline,thumbnail,trailText";
         url += '&' + $.param({
         'api-key': "8420c......"
         });
    $.ajax({
        url: url,
        method: 'GET',
        }).done(function(result) {
        var articles = result.response.results;
        container2.innerHTML+='<h3 class="title">Guardian Travel</h3>';
        for (var i=0; i<articles.length; i++){
            var title = articles[i].webTitle;
            var abstract = articles[i].fields.trailText;
            var image = articles[i].fields.thumbnail;
            var website = articles[i].webUrl;
            container2.innerHTML += ('<div style="overflow: auto; border: solid 1px lightgrey; padding: 20px; box-shadow: 2px 2px 0 lightgrey; margin: 20px 20px;border-radius: 10px;"><h3>'+ title + '</h3>' +'<img style="float:left;width:170px; margin-right: 10px; border-radius:10px" src="' + image + '"</img>'+ '<p>' + abstract+ '</p>'+ '<a href="'+ website+'">Read More</a><br><br>')
        }
    }).fail(function(err) {
        throw err;
    });
  }

