/* 
    Document   : metro-base
    Created on : 06-Apr-2013, 01:08:42
    Author     : Bent
*/

$(function(){
    
   "use strict"; // jshint ;_;
    
    // side-left setting
    var toggle_list = $('[data-toggle=dropdown-list]')
    
    toggle_list.click(function(e){
        e.preventDefault()
        
        var dropdown = $(this).offsetParent('.dropdown-list'),
        toggle_menu = dropdown.find('.dropdown-menu');
        
        toggle_menu.slideUp() // other dropdown-list
        
        var open = dropdown.hasClass('open');
        
        if(open == false){
            dropdown.addClass('open')
            
            toggle_menu.slideDown()
        }
        else{
            dropdown.removeClass('open')
            
            toggle_menu.slideUp()
        }
    })
    // endside-left setting
    
    
    // side-toggle setting
    $('.side-toggle').hover(function(e){
        
        if($(window).width() > 480){ // not visible on phone device and less
            $(this).animate( {
                right : '0px'
            }, 300, 'easeOutQuart' )

            var hst = $(this).height(),
            hstn = $('.side-toggle .nav').height(),
            mn = (hst - hstn) / 2;

            if(mn > 60){
                $('.side-toggle .nav').css({
                    'margin-top' : mn+'px'
                })
            }
            else{
                $('.side-toggle .nav').css({
                    'margin-top' : '42px'
                })
            }
        }
    }, function(){
        if($(window).width() > 480){
            $('.side-toggle').animate( {
                right : '-=78px'
            }, 50 )
        }
    });
    
    $('.side-toggle .nav li[data-toggle=sub-nav]').click(function(){
        var $this = $(this),
        sub_nav = $this.find('.sub-nav')
        
        sub_nav.animate( {
            right: '0px'
        }, 800, 'easeOutQuart' )
        
        return false
    }).mouseleave(function(){
        var $this = $(this),
        sub_nav = $this.find('.sub-nav');
        
        sub_nav.animate( {
            right: '-=280px'
        }, 50 )
    })
    // end side-toggle setting
    
    // side-left collapse
    var navbar_left = $('.btn-navbar').attr('data-target'),
    nl_content = $('.side-left').html();
    $(navbar_left).html(nl_content)
    $(navbar_left).find('li.dropdown-list')
        .removeClass('dropdown-list')
        .addClass('dropdown')
        .find('a[data-toggle=dropdown-list]')
        .attr('data-toggle', 'dropdown')
    $(navbar_left).find('li a .arrow')
        .removeClass('icomo-arrow-right')
        .addClass('icomo-arrow-down')
    // end side-left collapse
    
    
    // content
    /**
    $('[data-content=toggle-pane]').click(function(e){
        
        $('.toggle-page, .main-page').toggleClass('open', 300)
    })
    $('[data-content=widget]').click(function(e){
        e.preventDefault()
        
        $('.tile-group, .tile-group > .tile').fadeOut()
        $('.widget').fadeIn()
    })
    $('[data-content=tile]').click(function(e){
        e.preventDefault()
        
        $('.tile-group, .tile-group > .tile').fadeIn()
        $('.widget').fadeOut()
    })
    */
    // end content
    
    // widget
    $('[data-toggle=collapse-all-widgets]').click(function(e){
        e.preventDefault()
        var target = $('.widget').find('.widget-content'),
        icon = $('.widget-header [data-toggle=collapse] [class*=icomo]');
        
        $(icon).attr('class', 'icomo-plus')
        $(target).slideUp(300, 'easeOutQuad')
    })
    $('[data-toggle=expand-all-widgets]').click(function(e){
        e.preventDefault()
        var target = $('.widget').find('.widget-content'),
        icon = $('.widget-header [data-toggle=collapse] [class*=icomo]');
        
        $(icon).attr('class', 'icomo-minus')
        $(target).slideDown(300, 'easeOutQuad')
    })
    $('[data-toggle=toggle-all-widgets]').click(function(e){
        e.preventDefault()
        var target = $('.widget').find('.widget-content');
        
        $(target).slideToggle(300, 'easeOutQuad')
    })
    $('.widget > .widget-header').dblclick(function(e){
        e.preventDefault()
        var target = $(this).parent().find('.widget-content'),
        icon = $(this).parent().find('.widget-header [data-toggle=collapse] [class*=icomo]'),
        toggle_icon = $(icon).attr('data-toggle-icon');
        
        $(icon).toggleClass(toggle_icon)
        $(target).slideToggle(300, 'easeOutQuad')
    })
    // collapse on load
    $('.widget[data-collapse=true] .widget-content').slideUp()
    $('.widget[data-collapse=true] .widget-header [data-toggle=collapse] [class*=icomo]').attr('class', 'icomo-plus')
    
    // widget action
    $('.widget [data-toggle=close]').click(function(e){
        e.preventDefault()
        var target = $(this).attr('data-close');
        
        $(target).hide(300, 'easeOutQuad')
    })
    $('.widget [data-toggle=collapse]').click(function(e){
        e.preventDefault()
        var target = $(this).attr('data-collapse'),
        icon = $(this).find('[class*=icomo]'),
        toggle_icon = $(icon).attr('data-toggle-icon');
        
        $(icon).toggleClass(toggle_icon)
        
        $(target + ' .widget-content').slideToggle(300, 'easeOutQuad')
    })
    $('.widget [data-toggle=fullscreen]').click(function(e){
        e.preventDefault()
        var target = $(this).attr('data-fullscreen'),
        with_tile = $(target).hasClass('with-tile'),
        icon = $(this).find('[class*=icomo]'),
        toggle_icon = $(icon).attr('data-toggle-icon');
        
        $(icon).toggleClass(toggle_icon)
        
        $(target).toggleClass('fullscreen')
        if(with_tile == true){
            $(target).toggleClass('with-tile')
            $(target).hide()
        }
    })
    // end widget
    
    
    // appbar
    $('[data-toggle="appbar"]').click(function(e){
        e.preventDefault()
        
        var target = $(this).attr('data-target');
        
        if($(target).hasClass('open') == false){
            $('.appbar').removeClass('open');
            $(target).addClass('open')
        }
        else{
            if(!$(e.target).is('input') && !$(e.target).is('textarea') && !$(e.target).is('select') && !$(e.target).is('form')){
                $(target).removeClass('open')
            }
        }
    }).focus(function(e){
        e.preventDefault()
        
        var target = $(this).attr('data-target');
        
        if($(target).hasClass('open') == false){
            $('.appbar').removeClass('open');
            $(target).addClass('open')
        }
        else{
            if(!$(e.target).is('input') && !$(e.target).is('textarea') && !$(e.target).is('select') && !$(e.target).is('form')){
                $(target).removeClass('open')
            }
        }
    })
    $(document.body).click(function(e){
        var target = e.target;

        if (!$(target).is('.appbar') && !$(target).parents().is('.appbar') && !$(target).is('[data-toggle="appbar"]')) {
            $('.appbar').removeClass('open')
        }
    })
    // end appbar
    
    
    // splash, modify this template if you want (just make it simple)
    var splash_template = '<div class="splash">'
        +'    <div class="splash-inner">'
        +'        <i class="icomo-atom"></i>' // you can use image for logo like <img class="logo" src="your/logo/path" alt="" />
        +'        <p class="brand">Stilearn Metro</p>'
        +'        <p class="splash-text">Destination progress text</p>'
        +'        <div class="splash-loader">'
        +'            <img class="preload-large" src="img/preload-6-white.gif" alt="" />'
        +'        </div>'
        +'    </div>'
        +'</div>',
    
    splash_template_inline = '<div class="splash splash-inline">'
        +'    <div class="splash-inner">'
        +'        <div class="splash-loader">'
        +'          <img src="img/preload-5-white.gif" alt="" />'
        +'        </div>'
        +'    </div>'
        +'</div>',
    splash_call = $('body').attr('data-splash'),
    splash_type = $('body').attr('data-splash-type');
    
    if(splash_call == true || splash_call == 'true'){
        if(splash_type == 'inline'){
            $('body').append(splash_template_inline)
            $('body > *').css({
                'visibility' : 'visible'
            })
            $('.splash.splash-inline').fadeIn()
        }
        else{
            $('body').append(splash_template)
            $('.splash').fadeIn(function(){
                $(this).css({
                    'visibility' : 'visible'
                })
            });
        }
    }
    $(window).bind('load', function(){
        if(splash_type == 'inline'){
            $('.splash.splash-inline').fadeOut()
        }
        else{
            $('.splash').fadeOut(2000, function(){
                $('body > *').not('.splash').css({
                    'visibility' : 'visible'
                });
            });
        }
    });
    // end splash
    
    
    
    // ui elements
    // slider
    $('[data-ui="slider"]').each(function(){
        var $this = $(this),
        animate = ($this.attr('data-slider-animate') == undefined) ? false : $this.attr('data-slider-animate'),
        disabled = ($this.attr('data-slider-disabled') == undefined) ? false : Boolean($this.attr('data-slider-disabled')),
        max = ($this.attr('data-slider-max') == undefined) ? 100 : parseInt($this.attr('data-slider-max')),
        min = ($this.attr('data-slider-min') == undefined) ? 0 : parseInt($this.attr('data-slider-min')),
        orientation = ($this.attr('data-slider-orientation') == undefined) ? 'horizontal' : $this.attr('data-slider-orientation'),
        ranges = ($this.attr('data-slider-range') == undefined) ? false : ($this.attr('data-slider-range')),
        step = ($this.attr('data-slider-step') == undefined) ? 1 : parseInt($this.attr('data-slider-step')),
        value = ($this.attr('data-slider-value') == undefined) ? 0 : parseInt($this.attr('data-slider-value')),
        values = ($this.attr('data-slider-values') == undefined) ? null : $this.attr('data-slider-values').split(','),
        
        range = (ranges == 'true') ? Boolean(ranges) : ranges,
        
        slider_opt = {
            animate: animate,
            disabled: disabled,
            max: max,
            min: min,
            orientation: orientation,
            range: range,
            step : step,
            value: value,
            values: values
        }
        
        $this.slider(slider_opt)
    })
    // end ui elements
    
    
    
    // control for responsive
    $(window).resize(function(){
        if($(window).width() > 767){ /* Portrait tablet to landscape and desktop */
            $('.side-toggle').show() // show side-toggle
        }
        else if($(window).width() <= 767 && $(window).width() > 480){ /* Landscape phone to portrait tablet */
            $('.side-toggle').show() // show side-toggle
        }
        else if($(window).width() <= 480){ /* Landscape phones and down */
            $('.side-toggle').hide() // hide side-toggle
        }
    })
    // end control for responsive
    
    // tooltip helper
    $('[data-toggle=tooltip]').tooltip()	
    $('[data-toggle=tooltip-bottom]').tooltip({
        placement : 'bottom'
    })	
    $('[data-toggle=tooltip-right]').tooltip({
        placement : 'right'
    })
    $('[data-toggle=tooltip-left]').tooltip({
        placement : 'left'
    })	
    // end tooltip helper
    
    // popover helper
    $('[data-toggle=popover]').click(function(e){
        e.preventDefault();
    })
    $('[data-toggle=popover]').popover()	
    $('[data-toggle=popover-bottom]').popover({
        placement : 'bottom'
    })	
    $('[data-toggle=popover-right]').popover({
        placement : 'right'
    })
    $('[data-toggle=popover-left]').popover({
        placement : 'left'
    })
    // end popover helper
    
    
    // animate scroll, define class scroll will be activate this
    $("a[data-scroll=true]").click(function(e){
        e.preventDefault()
        $(document.body).animate({scrollTop: $(this.hash).offset().top}, 'slow')
    })
    // end animate scroll
    
    // helper
    // theme switcher demo
    $('.theme-switcher li a').click(function(e){
        e.preventDefault();
        var $this = $(this),
        target = $this.parent().parent().attr('data-target'),
        target_class = $this.parent().parent().attr('data-target-class'),
        theme = $this.attr('data-theme');

        $(target).attr('class', target_class).addClass(theme);;
    })
    $('.pie-donat-text').each(function(){
        var $this = $(this),
        center = ($this.parent().height()/2) - ($this.height()/2);
        $this.css({
            top : center
        })
    })
    $('.message-checked').bind('click', function(){
        $(this).parent().toggleClass('selected')
    })
    // end helper
    
    
    // required plugin
    // chart sparklines
    $('[data-chart=sparklines]').each(function(){
        var sparkline = $(this),
        data = $(sparkline).html(),
        dataArray = data.split(","),
        h = sparkline.attr('data-height'),
        c = sparkline.attr('data-color');

        var draw = function(){
            sparkline.sparkline(dataArray, {
                type : 'bar',
                height: h, 
                width: '100%',
                barColor: c, 
                barWidth: 5
            })
        }

        var redraw;

        // help for responsive
        $(window).resize(function(e) {
            clearTimeout(redraw);
            redraw = setTimeout(draw, 500);
        });

        draw();
    });
})