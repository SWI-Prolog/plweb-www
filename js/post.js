/* Author: Wouter Beek

*/

function votes(form, updown)
{ var votes = parseInt(form.siblings("header")
		           .find(".post-vote-"+updown)
		           .children("img").attr("title"));
  if ( isNaN(votes) )
    votes = 0;

  return votes;
}


/* http_post(url, about, form, method)

@param url    is the url to post to (/news/)
@param about  is the annotated object or null
@param form   is the form for editing the post
@param method is the HTTP REST method to use
*/

function http_post(url, about, form, method)
{ var down   = votes(form, "down");
  var up     = votes(form, "up");
  var title1 = form.find(".title").val();
  var title2;

  if (title1 === undefined)
  { title2 = null;
  } else
  { title2 = title1;
  }

  $.ajax(url,
	 { "contentType": "application/json; charset=utf-8",
	   "data": JSON.stringify(
           { "content": form.find(".markItUpEditor").val(),
	     "meta": {
                "about": about,
                "importance": parseFloat(form.find(".importance").val()),
                "time": {
                  "freshness-lifetime":
		     parseInt(form.find(".freshness-lifetime").val(), 10),
                  "type": "time"
                },
                "type": "meta",
                "votes": {
                  "down": down,
                  "type": "votes",
                  "up": up
                }
              },
	     "title": title2,
	     "type": "post"
	   }),
	   "dataType": "json",
	   "success": function() {location.reload();},
	   "type": method
          });
}

function prepare_post(URL, About)
{ // Clicking this removes the UI for entering a new post.
  $("#add-post-cancel").click(function(e)
  { e.preventDefault();
    $("#add-post-links").css("display","none");
    $("#add-post-content").css("display","none");
    $("#add-post-link").css("display","block");
  });

  // Clicking this brings up the UI for entering a new post.
  $("#add-post-link").click(function(e)
  { e.preventDefault();
    $(this).css("display","none");
    $("#add-post-content").css("display","block");
    $("#add-post-links").css("display","block");
  });

  // Clicking this submits the current content as a new post.
  $("#add-post-submit").click(function(e)
  { e.preventDefault();
    http_post(URL, About, $("#add-post-content"), "POST");
  });

  // Clicking this removes the UI for editing an existing post.
  $(".edit-post-cancel").click(function(e)
  { e.preventDefault();
    var article = $(this).closest("article");
    article.children(".edit-post-links").css("display","none");
    article.children("form").css("display","none");
    article.children("header").css("display","block");
    article.children("section").css("display","block");
  });

  // Clicking this brings up the UI for editing an existing post.
  // Notice that this first hides the readable content element,
  //  and then shows the writable content element.
  $(".edit-post-link").click(function(e)
  { e.preventDefault();
    var article = $(this).closest("article");
    article.children("header").css("display","none");
    article.children("section").css("display","none");
    article.children("form").css("display","block");
    article.find("textarea").css("display","block");
    article.children(".edit-post-links").css("display","block");
  });

  // Clicking this submits the current changes to a post.
  $(".edit-post-submit").click(function(e)
  { e.preventDefault();
    var id = $(this).closest(".post").attr("id");
    http_post(
	URL+id,
	About,
	$(this).closest(".edit-post-links").siblings(".edit-post-content"),
	"PUT");
  });

  // Mark-it-up support for entering post content.
  $(".markItUp").markItUp(pldoc_settings);

  // Clicking this removes an existing post.
  $(".delete-post-link").click(function(e)
  { e.preventDefault();
    var id = $(this).parents(".post").attr("id");
    $.ajax(URL+id,
	   { "contentType": "application/json; charset=utf-8",
	     "dataType": "json",
	     "success": function() {location.reload();},
	     "type": "DELETE"
	   });
  });

  // Clicking this decreases the number of votes by one.
  $(".post-vote-down").click(function(e)
  { e.preventDefault();
    $(this)
       .children("img")
       .attr("title", parseInt($(this).children("img").attr("title")) + 1);

    http_post(URL+$(this).parents(".post").attr("id"),
	      About,
	      $(this).closest("header").siblings("form"),
	      "PUT"
	     );
  });

  // Clicking this increases the number of votes by one.
  $(".post-vote-up").click(function(e)
  { e.preventDefault();
    $(this)
	.children("img")
	.attr("title", parseInt($(this).children("img").attr("title")) + 1);

    http_post(URL+$(this).parents(".post").attr("id"),
	      About,
	      $(this).closest("header").siblings("form"),
	      "PUT");
  });
}
