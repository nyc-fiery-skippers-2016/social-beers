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

// if($(this).css("background-color") == "rgb(255, 255, 255)")
    if ( $( 'table#breweries' ).css( 'margin-left' ) === '0px' ) {
      $("table#breweries").animate({'margin-left': '-=600'});
    }

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
                "<td class=" + "view-tweets" + ">" +
                "<a href='/tweets'>view tweets</a>" +
                "<td class="+ "location-td" + ">" +
                getLocation( object ) +
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
    var searchName = []

    name.split( ' ' ).forEach( function( word, idx, name ) {
      if ( word === 'Company' ) {
        searchName.push( 'Co' );
      } else {
        searchName.push( word )
      }
    });
    var data = "name=" + searchName.join( ' ' );

    $.ajax({
      type: 'POST',
      url: url,
      data: data
    }).done( function( response ) {
      $( 'ul.tweets-list' ).empty();

      for ( var tweet in response ) {
        debugger;
        html = "<a class=" + "twitter-timeline" + " data-widget-id=" + "733668591241986048" + " data-screen-name=" + response.screen_name +"></a>"
        $( 'div#tweets-container' ).empty();
        $( 'div#tweets-container' ).append( html );
        twttr.widgets.load(
          document.getElementsByClassName('twitter-timeline')
        );
      };
    });
  });
});
