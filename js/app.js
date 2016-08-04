$(document).ready(function () {
  var $source1 = $('#source1');
  var $source1 = $('#source2');
  var $feedContent = $('#feedContent');

  // Ships and Seas Tumblr
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
        console.log('tumblrLink:', tumblrLink);
        var linkUrl = $(this).find("link_url").text();
        var link = "<a href='" + linkUrl + "' target='_blank'>Read More<a>";
        $feedContent.append('<article class="col s4 card-panel post"><h1 class="postTitle truncate">'+title+'</h1><p class="postDescription">'+description+linkUrl+'</p>'+'<p>'+tumblrLink+'</p>'+'</article>');
      });
    }
  });

  // Wikinews
  // SOURCE: https://en.wikinews.org/w/index.php?title=Special:NewsFeed&feed=atom&categories=Published&notcategories=No%20publish%7CArchived%7CAutoArchived%7Cdisputed&namespace=0&count=30&hourcount=124&ordermethod=categoryadd&stablepages=only

 });
