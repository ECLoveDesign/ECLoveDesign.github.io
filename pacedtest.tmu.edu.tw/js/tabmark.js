$(function(){
    // smooth scroll 
    $('a[href*=#]:not([href=#])not(.icon__link)').click(function() {
	$("#SUBMENU").hide(100);
      if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') && location.hostname == this.hostname) {
        var target = $(this.hash);
        target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
        if (target.length) {
          $('html,body').animate({
            scrollTop: target.offset().top
          }, 1500);
          return false;
        }
      }
    });

    // scroll change menu element
    $(window).scroll(function() {
      var windscroll = $(window).scrollTop();
      $('.menu_focus').each(function(i) {
          if (($(this).position().top-130) <= windscroll) {
              var menuIndex = '#'+$('a:eq(0)', $(this)).attr('id');
              $('#sidebar li a[class*=menu_tag]').removeClass('menu_tag');
              $('a[href^='+menuIndex+']').addClass('menu_tag');
          }
      });
    }).scroll();

    // 幫 #qaContent 的 ul 子元素加上 .accordionPart
    // 接著再找出 li 中的第一個 div 子元素加上 .qa_title
    // 並幫其加上 hover 及 click 事件
    // 同時把兄弟元素加上 .qa_content 並隱藏起來
    $('#qaContent ul').addClass('accordionPart').find('li div:nth-child(1)').addClass('qa_title').hover(function(){
      $(this).addClass('qa_title_on');
    }, function(){
      $(this).removeClass('qa_title_on');
    }).click(function(){
      // 當點到標題時，若答案是隱藏時則顯示它，同時隱藏其它已經展開的項目
      // 反之則隱藏
      var $qa_content = $(this).next('div.qa_content');
      if(!$qa_content.is(':visible')){
        $('#qaContent ul li div.qa_content:visible').slideUp();
      }
      $qa_content.slideToggle();
    }).siblings().addClass('qa_content').hide();
  });

$(function(){
		// 預設顯示第一個 Tab
		var _showTab = 0;
		var $defaultLi = $('ul.tabs li').eq(_showTab).addClass('active');
		$('.tab_content').eq($defaultLi.index()).siblings().hide();
		
		// 當 li 頁籤被點擊時...
		// 若要改成滑鼠移到 li 頁籤就切換時, 把 click 改成 mouseover
		$('ul.tabs li').mouseover(function() {
			// 找出 li 中的超連結 href(#id)
			var $this = $(this),
				_index = $this.index();
			// 把目前點擊到的 li 頁籤加上 .active
			// 並把兄弟元素中有 .active 的都移除 class
			$this.addClass('active').siblings('.active').removeClass('active');
			// 淡入相對應的內容並隱藏兄弟元素
			$('.tab_content').eq(_index).stop(false, true).fadeIn().siblings().hide();

			return false;
		}).find('a').focus(function(){
			this.blur();
		});
	});
	
	$(function(){
		// 預設顯示第一個 Tab
		
		let searchParams = new URLSearchParams(window.location.search);
		var _showTab = searchParams.get('st') == null ? 0 : searchParams.get('st');
		var $defaultLi = $('ul.tabs2 li').eq(_showTab).addClass('active');
		$('.tab_content2').eq($defaultLi.index()).siblings().hide();
		
		// 當 li 頁籤被點擊時...
		// 若要改成滑鼠移到 li 頁籤就切換時, 把 click 改成 mouseover
		$('ul.tabs2 li').mouseover(function() {
			// 找出 li 中的超連結 href(#id)
			var $this = $(this),
				_index = $this.index();
			// 把目前點擊到的 li 頁籤加上 .active
			// 並把兄弟元素中有 .active 的都移除 class
			$this.addClass('active').siblings('.active').removeClass('active');
			// 淡入相對應的內容並隱藏兄弟元素
			$('.tab_content2').eq(_index).stop(false, true).fadeIn().siblings().hide();

			return false;
		}).find('a').focus(function(){
			this.blur();
		});
	});
