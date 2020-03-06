function retrieveData() {
  var url = "https://en.wikipedia.org/w/api.php";
  var article;
  var params = {
      action: "parse",
      format: "json",
      page: $('#query').val()
  };
  url = url + "?origin=*";
  Object.keys(params).forEach(function(key){url += "&" + key + "=" + params[key];});

  fetch(url)
      .then(function(response) {
        return response.json();
      })
      .then(function(response) {
        article = response.parse;
        parseArticle(article);
      })
      .catch(function(error) {
        $('#wiki').html(`<p>No existe ningún artículo con el título ${params.page}</p>`);
        console.log(error);
      });
}

function parseArticle(article) {
  console.log(article);
  $('#wiki').html(article.text["*"]);
  $('#wiki a').click((e) => {
    e.preventDefault();
    console.log(e);
    /*$('#query').val(e.currentTarget.innerText);
    retrieveData();*/
  });
  $('#wiki img').each((k, v) => {
    $(v).attr('src', 'https:' + $(v).attr('src'));
  });
  $('#wiki .hatnote').append('<button onclick="removeAlert(this)">x</button>');
  $('h1').html($('#query').val()).css('text-transform', 'uppercase');
}

function removeAlert(dis) {
  $(dis).parent().slideUp('fast');
}
