$(document).ready(function(){

    /*$.when($.getJSON('./js/errors_en.json'), $.getJSON('./js/game_en.json'), $.getJSON('./js/messagesCore_ru.json'))
        .done(function (dataErrors, dataGame, dataCommon) {
            var messege = {};

            messege = $.extend(true, dataErrors[0], dataGame[0],  dataCommon[0]);

            console.log(messege);

        });*/

    /* -------------  Loader  -------------- */
    $(window).load(function () {
        $('.loader').delay(1000).fadeOut(600);
    });
    /* -------------  Loader END -------------- */


    /* -------------  Slider For Programs  -------------- */
    $('.bxslider').bxSlider({
        mode: 'horizontal',
        useCSS: false,
        //infiniteLoop: false,
        //hideControlOnEnd: true,
        easing: 'easeOutElastic',
        speed: 2000
    });
    /* -------------  Slider For Programs END -------------- */

    /* -------------  Main Vertical Slider for navigation -------------- */
    $('#pagepiling').pagepiling({
        menu: '#menu',
        anchors: ['main', 'calendar', 'grafik'],
        sectionsColor: ['#000', 'green', '#ee005a', '#39C', 'blue'],
        navigation: {
            'position': 'left',
            'tooltips': ['Винницкий Театр Огня','Календарь', 'График Работы']
        },
        afterRender: function () {
            $('#pp-nav').addClass('custom');
        },
        afterLoad: function (anchorLink, index) {
            //using index
            if (index == 0) {
                //$('.loader').hide(1000);
                //console.error("Section 3 ended loading");
            }

            //using anchorLink
            if (anchorLink == 'main') {
                //console.error("Section 2 ended loading");
            }
        }

    });
    /* -------------  Main Vertical Slider for navigation END -------------- */

    /* -------------  Calendar -------------- */
    function calendar() {
        var monthNames = ["Январь", "Февраль", "Март", "Апрель", "Май", "Июнь", "Июль", "Август", "Сентябрь", "Октябрь", "Ноябрь", "Декабрь"];

        var dayNames = ["Пн", "Вт", "Ср", "Чт", "Пт", "Сб", "Вс"];

        var events = [
            {
                date: "8/3/2013",
                title: 'Двойной заказ',
                link: '',
                linkTarget: '_blank',
                color: '',
                //content: 'Два заказа, один на выезде, другой в городе ',
                class: 'tripleOutdore',
                displayMonthController: true,
                displayYearController: true,
                nMonths: 6
            }
        ];

        $('#calendari_lateral1').bic_calendar({
            //list of events in array
            events: events,
            //enable select
            enableSelect: true,
            //enable multi-select
            multiSelect: false,            //set day names
            dayNames: dayNames,
            //set month names
            monthNames: monthNames,
            //show dayNames
            showDays: true,
            //show month controller
            displayMonthController: true,
            //show year controller
            displayYearController: false,
            //set ajax call
            reqAjax: {
                type: 'get',
                url: 'http://new.fierydream.com/js/someJSON/events.json'  // http://new.fierydream.com/js/someJSON/events.json    //http://bic.cat/bic_calendar/index.php
            }
        });
    }
    calendar();



    //$('.popover').on( "taphold",  showSecret() );

   /* $( "#foo" ).bind( "click", function() {
        alert( "The quick brown fox jumps over the lazy dog." );
    });*/

    /* -------------  Calendar END -------------- */

    /* -------------  Tabs -------------- */
    function tabs() {
        var tabsNum = $(".tabs a").length;
        var tabHash = document.location.hash;
        if (tabHash === "") {
            tabHash = "#tab0"
        }
        ;
        var currentTab = parseInt(tabHash.slice(4));
        $(".tabs a[href='" + tabHash + "']").addClass("on");

        $(".tabs a").click(function () {
            $(".tabs a").removeClass("on");
            $(this).addClass("on");
            $(this).blur(0);
            tabHash = $(this).attr("href");
            currentTab = parseInt(tabHash.slice(4));
            setTabs();
        });

        function setTabs() {
            $("div.tab").hide();
            $("#tabCont" + currentTab).show();
        };
        setTabs();

        $('ul.tabs li').css('cursor', 'pointer');
        $('ul.tabs.tabs1 li').click(function () {
            var thisClass = this.className.slice(0, 2);
            $('div.t1').hide();
            $('div.t2').hide();
            $('div.t3').hide();
            $('div.t4').hide();
            $('div.' + thisClass).show();
            $('ul.tabs.tabs1 li').removeClass('tab-current');
            $(this).addClass('tab-current');
        });

    }

    tabs();
    /* -------------  Tabs END -------------- */

    /* -------------  opening sidebar  -------------- */
    $('.mainCallButton, .kontakts ').click(function () {
        $('.callMe').toggleClass('touched');
    });
    /* -------------  opening sidebar END -------------- */


    /* -------------  Animations  -------------- */
    $('.social>li').mouseover(function(){
        $(this).toggleClass('swing animated');
        $(this).one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function(e){
            $(e.target).removeClass('swing animated');
        });

    });
    $('.kontakts').mouseover(function () {
        $("#phone").toggleClass('tada animated');
        $("#phone").one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function (e) {
            $(e.target).removeClass('tada animated');
        });

    });
    $('button').click(function () {
        $(this).html('Кнопа не работает :( ').css('background-color', 'grey');
    });
    setTimeout(function(){ $('.navHelp').addClass('animationHelp') }, 20000);


    /* -------------  Animations END -------------- */


    /* -------------  Date for modals     -------------- */
    $( "#customerDateFire" ).dateDropper({ animation: 'dropdown', format: 'd-m-y', lang:'ru' });
    $( "#anotherDaySun" ).dateDropper({ animation: 'dropdown', format: 'd,m,y', lang:'ru' });
    /* -------------  Date for modals END -------------- */


// temp for sunSet time calculations
    var vinnGeo = {'latitude':49.233705, 'longitude': 28.466359};
//  new Date(2015, 3/*Апрель*/, 25/*24е число*/ );
    var currentSunSet = SunCalc.getTimes(new Date(), vinnGeo['latitude'], vinnGeo['longitude']);
    $(".todaySun").html(currentSunSet.sunset.getHours() + ':' + currentSunSet.sunset.getMinutes());



    $('.dd_submit').click(function () {
        var anotherDate = $("#anotherDaySun").val().split(',');
        var anotherSunSet = SunCalc.getTimes(new Date(anotherDate[2], anotherDate[1]-1, parseFloat(anotherDate[0])+1 ), vinnGeo['latitude'], vinnGeo['longitude']);
        console.log(anotherSunSet.sunset.getHours() + ':' + anotherSunSet.sunset.getMinutes());
       var customMinut = anotherSunSet.sunset.getMinutes();
        if(customMinut < 9){
            customMinut = '0' + customMinut;
        }
        $(".anotherSunResult").html($("#anotherDaySun").val() + ' солнце зайдет в <span>' +anotherSunSet.sunset.getHours() + ':' + customMinut+ '</span>');

    });




    /*-------------------------------------------------*/

    $.ajax({
        type: 'get',
        url: 'http://new.fierydream.com/js/someJSON/grafik.json',
        crossDomain : true,
        dataType: 'json'
    }).done(function (data) {
        var i,j;
        for (i = 0; i < data.training.length; i++) {
            $('.tab1 > tbody ').append("<tr class='" + data.training[i]['status'] + "'><th>" + data.training[i]['month'] + "</th><th>" + data.training[i]['date'] + "</th><th>" + data.training[i]['time'] + "</th><th>" + data.training[i]['info'] + "</th> </tr>");
        }

        for (j = 0; j < data.work.length; j++) {
            var myTh = $('.tab2 > tbody ');
           myTh.append("<tr>  <th>" + data.work[j]['dateAndPlace'] + "</th><th> + </th><th> + </th><th> + </th><th> + </th> </tr>");

            var currentDateAndPlace = data.work[j]['dateAndPlace'];
            switch (data.work[j]['name']) {
                case "Миня":
                    $(".tab2  tr:last-child > th:nth-child(2)").html(data.work[j]['info']);

                    break;
                case "Taня":
                    $(".tab2  tr:last-child > th:nth-child(5)").html(data.work[j]['info']);
                    break;
                default:
                    console.log('вАще никого нет');
                    break;
            }

        }
        for (k = 0; k < data.punishment.length; k++) {
            $('.tab3 > tbody ').append("<tr class='" + data.punishment[k]['status'] + "'><th>" + data.punishment[k]['name'] + "</th><th>" + data.punishment[k]['date'] + "</th><th>" + data.punishment[k]['reason'] + "</th><th>" + data.punishment[k]['closed'] + "</th> </tr>");
        }




    });








});




