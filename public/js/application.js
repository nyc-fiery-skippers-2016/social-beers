$(document).ready(function() {
  var opts = {
    lines: 11,
    length: 34,
    width: 14,
    radius: 42,
    scale: 1,
    corners: 1,
    color: '#000',
    opacity: 0.25,
    rotate: 0,
    direction: 1,
    speed: 1,
    trail: 54,
    fps: 20,
    zIndex: 2e9,
    className: 'spinner',
    top: '50%',
    left: '50%',
    shadow: false,
    hwaccel: false,
    position: 'absolute'
  };

  var getName = function( obj ) {
    return obj.name;
  };

  var getLocation = function( obj ) {
    return obj.location.address[0];
  };

  var getForm = function( link, path ) {
    $.ajax({
      type: 'GET',
      url: link
    }).done( function( response ) {
        $( path ).append( response )
    });
  };

  var checkForClass = function( element, classString ) {
    return $( element ).hasClass( classString );
  }


  $( 'div#search-home div#search-container' ).on( 'submit', function( e ) {
    e.preventDefault();
    var target = e.target;
    var type = target.method;
    var url = target.action;
    var data = $( target ).serialize();

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
    // spinner.stop();
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

    var spinArea = document.getElementById('tweets-container');
    var spinner = new Spinner(opts).spin(spinArea);
    $.ajax({
      ajaxStart: function() { $body.addClass("loading");},
      type: 'POST',
      url: url,
      data: data
    }).done( function( response ) {
      $( 'ul.tweets-list' ).empty();

      for ( var tweet in response ) {
        html = "<a class=" + "twitter-timeline" + " data-widget-id=" + "733668591241986048" + " data-screen-name=" + response.screen_name +"></a>"
        $( 'div#tweets-container' ).empty();
        $( 'div#tweets-container' ).append( html );
        twttr.widgets.load(
          document.getElementsByClassName('twitter-timeline')
        );
      };
    });
  });

  $( 'div.user-lr' ).on( 'click', 'a', function( e ) {
    e.preventDefault();
    var target = e.target;
    var url = $( target ).attr( 'href' );

    if ( checkForClass( target, 'login-link' ) === true ) {
      if ( checkForClass( $( '#ajax-form' ).children(), 'login-form' ) === true ) {
        $( '.register-form' ).hide();
        $( '.login-form' ).toggle();
      } else {
        $( '.register-form' ).hide();
        $( '#ajax-form' ).append( getForm( url, "#ajax-form" ) );
      }
    } else if ( checkForClass( target, 'register-link' ) === true ) {
      if ( checkForClass( $( '#ajax-form' ).children(), 'register-form' ) === true ) {
        $( '.login-form' ).hide();
        $( '.register-form' ).toggle();
      } else {
        $( '.login-form' ).hide();
        $( '#ajax-form' ).append( getForm( url, "#ajax-form" ) );
      };
    };
  });

  $( '#ajax-form' ).on( 'submit', '.login-form', function( e ) {
    e.preventDefault();
    var target = e.target;
    var type = target.method;
    var url = target.action;
    var data = $( target ).serialize();

    $.ajax({
      type: type,
      url: url,
      data: data
    }).done( function( response ) {
      $( 'div.user-lr' ).hide();
      $( '#ajax-form' ).hide();
      $( 'div.corner-li' ).append( response );
      $( 'div.corner-li' ).append( "<a class=" + "logout-button" + " href=" + "/logout" + ">Logout</a>" );
    });
  });
});
