$(function() {
  var $source1Btn = $('.source1');
  var $source2Btn = $('.source2');
  var $feedContent = $('#feedContent');
  var $modalContent = $('#modalContent');
  var $preLoader = $('#loading');
  var $sourceHeader = $('#source-header');

  // Button logic
  $source1Btn.on('click', function() {
    $preLoader.show();
    $feedContent.empty();
    $sourceHeader.text('Ships & Seas');
    source1Feed();
  });

  $source2Btn.on('click', function() {
    $preLoader.show();
    $feedContent.empty();
    $sourceHeader.text('WikiNews');
    source2Feed();
  });

  // $('.modal-trigger').leanModal();

  $feedContent.on('click', '.modal-trigger', function() {
    var postStuff = $(this).parent().parent();
    var title = postStuff.find('.postTitle').html();
    var summary = postStuff.find('.postDescription').html();
    $modalContent.find('.modal-content').append(title + summary);
    $modalContent.openModal();
  });

  // Ships and Seas Tumblr
  var source1Feed = function() {
    $.ajax({
      type: 'GET',
      url: 'https://accesscontrolalloworiginall.herokuapp.com/http://shipsandseasworldwide.tumblr.com/rss',
      dataType: 'xml',
      success: function (xml) {
        var html = '';
        $(xml).find("item").each(function () {
          var title = $(this).find("title").text();
          var description = $(this).find("description").text();
          var tumblrUrl = $(this).find("link").text();
          var tumblrLink = "<a href='" + tumblrUrl + "' target='_blank'>Read More<a>";
          var linkUrl = $(this).find("link_url").text();
          var link = "<a href='" + linkUrl + "' target='_blank'>Read More<a>";
          var feedContent1 = "<article class='col s12 m6 l4 card-panel post'><h1 class='postTitle truncate'>" + title + "</h1><p class='postDescription'>" + description + linkUrl + "</p>" + "<p>" + tumblrLink + "</p>" + "</article>";
          html += feedContent1;
        });
        $feedContent.append(feedContent1);
        $preLoader.hide();
      },
      error: function() {
        $feedContent.append('<h2 class="center red-text">Content is not available.</h2>');
      }
    });
  };

  // WikiNews
  var source2Feed = function() {
    $preLoader.show();
    $.ajax({
      type: 'GET',
      url: 'https://accesscontrolalloworiginall.herokuapp.com/https://en.wikinews.org/w/index.php?title=Special:NewsFeed&feed=atom&categories=Published&notcategories=No%20publish%7CArchived%7CAutoArchived%7Cdisputed&namespace=0&count=30&hourcount=124&ordermethod=categoryadd&stablepages=only',
      dataType: 'xml',
      success: function (xml) {
        $(xml).find("entry").each(function () {
          var $this = $(this)
          var title = $this.find("title").text();
          var summary = $this.find("summary").text();
          var wikiUrl = $this.find("id").text();
          var wikiLink = "<a href='" + wikiUrl + "' target='_blank'>Read More<a>";
          var feedContent2 = "<article class='col s12 m6 l4 card-panel post fixed-height'><div class='read-more-container'><button data-target='modal1' class='btn grey modal-trigger'>Read More</button></div><h1 class='postTitle truncate'>" + title + "</h1><div class='postDescription'>" + summary + "</div><p>"+ wikiLink + "</p></article>";
          html += feedContent2;
        });
        $feedContent.append(feedContent2);
        $preLoader.hide();
      },
      error: function() {
        $feedContent.append('<h2 class="center red-text">Content is not available.</h2>');
      }
    });
  };

  source1Feed();

});
