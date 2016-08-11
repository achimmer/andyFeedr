$(function() {
  var $source1Btn = $('#source1');
  var $source2Btn = $('#source2');
  var $feedContent = $('#feedContent');
  var $preLoader = $('#loading');
  var $sourceHeader = $('#source-header');

  // Button logic
  $source1Btn.on('click', function() {
    $feedContent.empty();
    $sourceHeader.text('Ships & Seas');
    source1Feed();
  });

  $source2Btn.on('click', function() {
    $feedContent.empty();
    $sourceHeader.text('WikiNews');
    source2Feed();
  });

  var changeHeader = function() {

  };

  // Ships and Seas Tumblr
  var source1Feed = function() {
    $.ajax({
      type: 'GET',
      url: 'https://accesscontrolalloworiginall.herokuapp.com/http://shipsandseasworldwide.tumblr.com/rss',
      dataType: 'xml',
      success: function (xml) {
        $(xml).find("item").each(function () {
          console.log(xml);
          var title = $(this).find("title").text();
          var description = $(this).find("description").text();
          var tumblrUrl = $(this).find("link").text();
          var tumblrLink = "<a href='" + tumblrUrl + "' target='_blank'>Read More<a>";
          var linkUrl = $(this).find("link_url").text();
          var link = "<a href='" + linkUrl + "' target='_blank'>Read More<a>";
          $feedContent.append('<article class="col s4 card-panel post"><h1 class="postTitle truncate">'+title+'</h1><p class="postDescription">'+description+linkUrl+'</p>'+'<p>'+tumblrLink+'</p>'+'</article>');
        });
        $preLoader.hide();
      },
      error: function() {
        $feedContent.append('<h2 class="center red-text">Content is not available.</h2>');
      }
    });
  };

  // WikiNews
  var source2Feed = function() {
    $.ajax({
      type: 'GET',
      url: 'https://accesscontrolalloworiginall.herokuapp.com/https://en.wikinews.org/w/index.php?title=Special:NewsFeed&feed=atom&categories=Published&notcategories=No%20publish%7CArchived%7CAutoArchived%7Cdisputed&namespace=0&count=30&hourcount=124&ordermethod=categoryadd&stablepages=only',
      dataType: 'xml',
      success: function (xml) {
        $(xml).find("entry").each(function () {
          console.log(xml);
          var title = $(this).find("title").text();
          var summary = $(this).find("summary").text();
          var wikiUrl = $(this).find("id").text();
          var wikiLink = "<a href='" + wikiUrl + "' target='_blank'>Read More<a>";
          $feedContent.append('<article class="col s4 card-panel post"><h1 class="postTitle truncate">'+title+'</h1><div class="postDescription">'+summary+'</div>'+'<p>'+wikiLink+'</p>'+'</article>');
        });
        $preLoader.hide();
      },
      error: function() {
        $feedContent.append('<h2 class="center red-text">Content is not available.</h2>');
      }
    });
  };

  source1Feed();

});
