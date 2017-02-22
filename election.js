$(document).ready(function() {

  $.ajax({
    url: 'https://bb-election-api.herokuapp.com/',
    method: 'GET',
    dataType: 'json'
  }).done(function(data){

    for (var i = 0; i < data.candidates.length; i++) {
      console.log(data.candidates[i].name);
      var list = $('<li>').html(data.candidates[i].name + "'s" + "  Votes: " + data.candidates[i].votes);
      var form = $('<form action="https://bb-election-api.herokuapp.com/vote" method="post">');
      var submit = $('<input>').attr({
        type: 'submit',
        name: data.candidates[i].name,
        class: 'submit-button',
        value: "Vote for: " + data.candidates[i].name
      });
      var hidden = $('<input>').attr({
        type: 'hidden',
        name: 'name',
        value: data.candidates[i].name
      });

      list.appendTo('#candidateList');
      form.appendTo(list);
      hidden.appendTo(form);
      submit.appendTo(form);
    };

    $('.submit-button').on('click', function(eventObject) {
      eventObject.preventDefault();
      console.log('Prevented Default');

    $.ajax({
      url: 'https://bb-election-api.herokuapp.com/vote',
      method: 'post',
      data: {"name": $(this).siblings('input[type=hidden]').val()}
    }).done(function(data) {
      location.reload();
    }).fail(function() {
      console.log('failed');
    });
  });
  });
});
