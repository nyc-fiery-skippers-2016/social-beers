$(document).ready(function() {

  var getName = function( obj ) {
    return obj.name;
  };

  var getLocation = function( obj ) {
    return obj.location.address[0];
  }


  $( 'div#search-home div#search-container' ).on( 'submit', function( e ) {
    e.preventDefault();
    var target = e.target;
    var type = target.method;
    var url = target.action;
    var data = $( target ).serialize();

    $( '#results-container table' ).empty();

    $.ajax({
      type: type,
      url: url,
      data: data
    }).done( function( response ) {
      response.forEach( function( object, idx ) {
        var num = idx + 1
        html = "<tr id="+
                num +
                "><td class="+ "block" + ">" +
                getName( object ) +
                "</td>" +
                "<td class="+ "location-td" + ">" +
                getLocation( object ) +
                "<td class=" + "view-tweets" + ">" +
                "<a href='/tweets'>View Tweets</a>" +
                "</td></tr>";
        $( '#results-container table' ).append( html );
      });
      $("table#breweries").show().animate({'margin-left': '+=600'});
    });
  });

  $( 'div#results-container' ).on( 'click', 'a', function( e ) {
    e.preventDefault();
    var target = e.target;
    var url = $(target).attr('href');
    var name = $(target).parent().parent().find('.block').html();
    var data = "name=" + name

    $.ajax({
      type: 'POST',
      url: url,
      data: data
    }).done( function( response ) {
      $( 'ul.tweets-list' ).empty();

      for ( var tweet in response ) {
        $( 'ul.tweets-list' ).append( "<li>" + response[tweet] + "</li>" )
      };
    });
  });
});
