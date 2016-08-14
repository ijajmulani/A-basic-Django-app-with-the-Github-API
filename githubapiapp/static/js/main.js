$(function () {
  function hideSearchArea(){
    var mouse_inside_search = false;
    $('.search-box').hover(function(){ 
      mouse_inside_search = true; 
    }, function(){ 
      mouse_inside_search = false; 
    });
    if(! mouse_inside_search){
      $('#searchSuggestions').addClass('hide');
      $('.js-search-box').removeClass('search-box-open');
      $('.js-search-input').removeClass('search-input');
    }
  }

  //Hide Search Area when clicked outside
  $("body").mouseup(function(){ 
    hideSearchArea();
  });
  
  //Search item navigation
  $('.search-box').on('focus', 'li', function() {
    var $this = $(this);
    $this.addClass('hover-search-item').siblings().removeClass('hover-search-item');
  }).on('keydown', 'li', function(e) {
    e.preventDefault();
    var charCode = String.fromCharCode(e.which).toLowerCase(),
      $input = $('#searchInput'),
      $this = $(this);
    if (e.keyCode === 40) {
      $this.next().focus();
    } else if (e.keyCode === 38) {
      $this.prev().focus();
    } else if (e.keyCode === 13) {
      $this.find('a')[0].click();
    } else {
      $input.val($input.val() + charCode).focus();
    }
  });

  $('#searchInput').on('keydown', function(e) {
    if (e.keyCode === 40) {
      $('.search-list-item').first().focus();
      return false;
    } else if (e.keyCode === 38) {
      $('.search-list-item').last().focus();
      return false;
    } 
  });

  // Search on input
  $('#searchInput').on('keyup', function() {
    var $search = $(this),
        key = $search.val();

    if (key.length >= 3 ) {
      $.ajax({
        url: '/search_repos',
        type: 'get',
        data: {
          key: key
        },
        success: function (data) {
          var $searchSuggestions = $('#searchSuggestions');

          if (data) {
            $searchSuggestions.html(data).removeClass('hide');
            $('.js-search-box').addClass('search-box-open');
            $('.js-search-input').addClass('search-input');
          }
        }
      });
    }
  });

  $('html').on('click', '.js-search', function(e) {
    e.preventDefault();
    var $searchBox = $(this),
        key = $(this).closest('.js-search-list-item').data('fullName');

    $('.js-repo-name').text(key);

    $.ajax({
      url: '/search_issues',
      type: 'get',
      data: {
        key: key
      },
      success: function (data) {
        var $issuesTable = $('.js-issues-table');
        $issuesTable.html(data);
      }
    });
  });

  $('.js-issues-table').on('click', 'js-repo-title', function(e) {
    e.preventDefault();
    var $this = $(this),
        url = $this.find('a').data('url');
  });
});
