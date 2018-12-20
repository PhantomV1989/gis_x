function checkAccount(email, password) {
	var returnApi = null;
    $.ajax({
    url: '/srx/user/checkAccount/user.srx',
    data:{"email": email,"password": password},
    async: false,
    success: function(result){
    	returnApi = result;
    }});
    
    return returnApi.success;
}


function validateLoginFormOnSubmit() {
	var email = $('#user-email').val();
	var password = $('#user-password').val();
	var submitForm = false;
	
	if (email == '' || password == '') {
		msg = 'Email and Password cannot be empty.';
		$('#error-message').html(msg);
		$('#error-message').show();
		event.preventDefault();
	} else {
		var url="/srx/user/checkAccount/user.srx";
		var msg = "";
		var checkAcct = checkAccount(email, password);
		
		if (checkAcct == true) {
			var currentUrl = window.location.pathname;
			
			if (currentUrl == '/mysg-home') {
				setCookie("loginMysg", "success");
			}
			return true;
		} else {
			msg = 'Incorrect Email or Password.';
			$('#error-message').html(msg);
			$('#error-message').show();
			event.preventDefault();
		}
	}
}

/*add close on back functionality to Custombox */
var openModalWithCustombox = function(target) {
	Custombox.open({
	       target: target,
	       effect: 'scale',
	       overlayOpacity: 0.7,
	       speed: 1000
	   });
	//var hash = $(target).attr('id');
	//window.location.hash = hash;
}

$(function(){
	global_PromisedCountryCode.then(function(data) {
		if (data.country.code !='CN')
		{
			var s = document.createElement("script");
			s.type = "text/javascript";
			s.async=true;
			if ($(window).width() > 768) 
			{
				s.src = "//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
			} 
			else 
			{
				s.src = "//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit2";
			}

			(document.getElementsByTagName("head")[0] || document.documentElement).appendChild(s);
		}
	});
	
	
	if (window.location.search.indexOf('lang=') > -1) {
	   showTranslate();
	   
	   var url_string = window.location.href;
	   var url = new URL(url_string);
	   var lang = url.searchParams.get("lang");
	   
	   if(lang != ""){
		   
		   var shortLang = "cn";
		   if(lang == "cn"){
			   shortLang = "/en/zh-CN";
		   }else if(lang == "tw"){
			   shortLang = "/en/zh-TW";
		   }else if(lang == "ta"){
			   shortLang = "/en/ta";
		   }else if(lang == "hi"){
			   shortLang = "/en/hi";
		   }else if(lang == "id"){
			   shortLang = "/en/id";
		   }else if(lang == "ja"){
			   shortLang = "/en/ja";
		   }else if(lang == "ms"){
			   shortLang = "/en/ms";
		   }
		   
		   setCookieGlobal("googtrans", shortLang);
	   }
	}
	
	$(".navbar-toggle").click(function(){
		if($(this).hasClass("collapsed")){
			$(".srxLogo").hide();
			$("#navbar .nav.pull-right").hide();
			$(this).closest(".navbarFloating").addClass("navbarUnfloat");
		}else{
			$(".srxLogo").show();
			$("#navbar .nav.pull-right").show();
			$(this).closest(".navbarFloating").removeClass("navbarUnfloat");
		}
	});
	
	$('.dropdown-submenu > a').on("click", function(e){
		$(".dropdown-submenu .dropdown-menu").hide();
		$(this).next('ul').toggle();
	    e.stopPropagation();
	    e.preventDefault();
	});
	
	$('.navbarSignIn').click(function(e){
		openModalWithCustombox('#header-login-popup');
		e.preventDefault();
	});
	
	$(".translate-div").click(function(e){
		showTranslate();
		e.preventDefault();
	});
	
	if(getCookie('googtrans')!=''){
		if(getCookie('googtrans') == "/en/en"){
			delete_cookie('googtrans');
		}else{
			showTranslate();
			
			if (history.pushState) {
				
				var shortLang = "cn";
				if(getCookie('googtrans') == "/en/zh-CN"){
					shortLang = "cn";
				}else if(getCookie('googtrans') == "/en/zh-TW"){
					shortLang = "tw";
				}else if(getCookie('googtrans') == "/en/ta"){
					shortLang = "ta";
				}else if(getCookie('googtrans') == "/en/hi"){
					shortLang = "hi";
				}else if(getCookie('googtrans') == "/en/id"){
					shortLang = "id";
				}else if(getCookie('googtrans') == "/en/ja"){
					shortLang = "ja";
				}else if(getCookie('googtrans') == "/en/ms"){
					shortLang = "ms";
				}
				
				var pageUrl = '?lang='+shortLang;
				window.history.pushState('', '', pageUrl);
			}
		}
	}
	
	setTimeout(function(){
		var a = document.querySelector("#google_translate_element select");
		if(a != null){
			a.addEventListener(
					'change',
					function() { trackChange(this.options[this.selectedIndex].text); },
					false
			);
		}
	},2000);
	
	
	if(getCookie('emailId') == '""'){
		delete_cookie('emailId');
		delete_cookie_domain("www.srx.com.sg", "emailId");
		
		delete_cookie('pass');
		delete_cookie_domain("www.srx.com.sg", "pass");
	}
	
	if(getCookie('SRXSLC') == '""'){
		delete_cookie('SRXSLC');
		delete_cookie_domain("www.srx.com.sg", "SRXSLC");
	}
	
	if(getCookie('startTime') == '""'){
		delete_cookie('startTime');
		delete_cookie_domain("www.srx.com.sg", "startTime");
	}
	
	if(getCookie('hash') == '""'){
		delete_cookie('hash');
		delete_cookie_domain("www.srx.com.sg", "hash");
	}
	
	//delete_cookie('optimizelyEndUserId');
	//delete_cookie_domain(".srx.com.sg", "optimizelyEndUserId");
	
	$(".navbarSignOut").click(function(){
		delete_cookie("trackerShareUrl");
		delete_cookie("shortlist");
		delete_cookie("inviteId");
		delete_cookie('googtrans');
		delete_cookie('emailId');
		delete_cookie('SRXSLC');
		delete_cookie('startTime');
		delete_cookie('hash');
		delete_cookie('pass');
		delete_cookie('loginMysg');
	});
	
	var userLoggedIn = ($('#userLoggedIn').val() == 'true');
	if(userLoggedIn){
		var refListingIds = new Array();
		//if($.cookie("shortlist") == undefined){
			$.ajax('/srx/shopcart/findItems/call.srx',
			{
				type: "GET",
				dataType: 'json',
				error: function(data){ handleError(data); },
				success: function(data) {
				
					if((data != null || data != undefined) && data.errorCode == undefined)
					{
						$.removeCookie('shortlist', { path: '/hdb' });
						
						var shortlistCookie = decodeURIComponent(getCookie("shortlist"));
						var shortlistCookie = "";
						
						var shortlistArray = [];
						for(var i = 0; i < data.items.length;i++)
						{
							if(data.items[i].refListing != null)
							{
								$(".listingEncryptedId").each(function(){
									var listingId = $(this).val();
									var $listing = $(this);
									if(data.items[i].encryptedRefId == listingId)
									{
//										$listing.parent().find('.addedFavorites').show();
//										$listing.parent().find('.notAddedFavorites').hide();
//										$listing.parent().append("<input type='hidden' class='listingShoppingCartId' value='"+data.items[i].id+"' />");
										$("#"+listingId).find(".shorlist").hide();
			    						$("#"+listingId).find(".shorlisted").show();
									}
								});
								
								shortlistArray.push(data.items[i].encryptedRefId);
							}
						}
						
						//
						var shortlistString = "";
						/*var breakCookie = shortlistCookie.split(";");*/
						var breakCookie = '';
						if(shortlistArray.length > 0){
							
							for(var j = 0; j < shortlistArray.length; j++) {
								var continueAdd = true;
								/*for(var i = 0; i < breakCookie.length; i++){
									if(breakCookie[i] == shortlistArray[j]){
										continueAdd = false;
										break;
									}
								}*/
								
								if(continueAdd){
									if(shortlistString == ""){
										shortlistString = shortlistArray[j];
									}else{
										shortlistString += ";"+shortlistArray[j];
									}
								}
							}
						}
						
						if(shortlistString != ""){
							if(shortlistCookie != ""){
								shortlistCookie += ";"+shortlistString
							}else{
								shortlistCookie = shortlistString;
							}
							
							$.cookie("shortlist", shortlistCookie, { expires: 1, path: '/' });
						}

						$(".shortlist-cart").html(data.count);
						$(".showCartCounter").html(data.count);
					}
				}
			});
		} else {
			var $addToFavourites = $('.addToFavourites');
			var currentShortlists = decodeURIComponent(getCookie("shortlist"));
			var breakShortlists = currentShortlists.split(";");
			if(breakShortlists.length > 0)
			{
				for (var i=0; i<=breakShortlists.length; i++) {
					var isValid = typeof(breakShortlists[i]);
					if (isValid != 'undefined') {
						//console.log("Encrypted ID: " + breakShortlists[i]);
						var shortlistedId = breakShortlists[i];
						$("#"+shortlistedId).find(".shorlisted").show();
						$("#"+shortlistedId).find(".shorlist").hide();
					}
					
				}
			}
		}
	//}
});

function trackChange(language){
	if(typeof _gaq !== 'undefined'){
		_gaq.push(['_trackEvent', 'SRX Language Translation', language]);
	}
}

function showTranslate(){
	if ($(window).width() > 768) {
	    $("#google_translate_element").addClass("show");
	}else{
		$("#google_translate_element2").addClass("show");
	}
	
	$(".translate-div").addClass("hide");
}

/*
 * Facebook Login
 */
var facebookAppIdTest = '1400608346863947';
var facebookAppIdLive = '1450004891884733';

window.fbAsyncInit = function() {
    FB.init({
      appId      : facebookAppIdLive,
      status     : true,
      xfbml      : true
    });
    
    FB.Event.subscribe('auth.authResponseChange', function(response) {
     	// Here we specify what we do with the response anytime this event occurs. 
     	if (response.status === 'connected') {
     		
     		facebookUserId = response.authResponse.userID;
       		facebookToken = response.authResponse.accessToken;
       		
     	} else if (response.status === 'not_authorized') {
       		FB.login();
     	} else {
       		FB.login();
     	}
   	});
  };
  global_PromisedCountryCode.then(function(data) {
		if (data.country.code !='CN')
		{
			  (function(d, s, id){
			  var js, fjs = d.getElementsByTagName(s)[0];
			  if (d.getElementById(id)) {return;}
			  js = d.createElement(s); js.id = id;
			  js.src = "//connect.facebook.net/en_US/all.js";
			  fjs.parentNode.insertBefore(js, fjs);
			  }(document, 'script', 'facebook-jssdk'));
		}
	});
 
function facebookLogin(){
	FB.login(function(response){
		if(response.authResponse){ 
			FB.api('/me?fields=id,email,name', function(response) {
				
				$.ajax('/srx/user/loginOnSrx/user.srx',
				{
					type: "POST",
					cache: false,
					dataType: 'json',
					data: {
						"name" : response.name, 
						"mobile" : '12345678', // CANNOT RETRIEVE MOBILE NUMBER FROM FACEBOOK ANYMORE
						"facebookId": response.id,
						"username": response.email
					},
					context: self,
					error: function(data){ handleError(data); },
					
					success: function(data) {
						if(data.error != "")
						{
							if(getCookie('save_dreamlist')!=''){
								saveDreamlist(JSON.parse(decodeURIComponent(getCookie('Save save_dreamlist'))));
							}else{
								//location.reload(true);
								window.location.href = "/";
							}
						}
						else{
							alert("Error authenticating user. Please try again.");
						}
					}
				});
				
			});
		}else{
			
		}
	}, {scope:'email'});
}

function saveDreamlist( data ){
	$.ajax({
		type: 'POST',
	  	url: '/dreamlist/save',	 
	  	data: data,
	  	success: function(data){
	  		if(data.error){
	  			console.log(data.error);
	  		}else{
	  			window.location.href = "/dreamlist";
	  		}
	  	},
	  	datatype: 'json' 
	});
}

var setCookie = function(name, cvalue){
	var date = new Date();
	var minutes = 30;
	
    date.setTime(date.getTime() + (minutes * 60 * 1000));
    var expires = "expires="+date.toUTCString();
    document.cookie = name + "=" + encodeURIComponent(cvalue) + "; " + expires+ "; path=/";
}

function getCookie(cname) {
	
	var name = cname + "=";
    var ca = document.cookie.split(';');
    for(var i=0; i<ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0)==' ') c = c.substring(1);
        if (c.indexOf(name) == 0) return c.substring(name.length,c.length);
    }
    return "";
}

window.setCookieGlobal = function(name, value){ 
	
	var date = new Date();
	var minutes = 30;
	
    date.setTime(date.getTime() + (minutes * 60 * 1000));
    var expires = "expires="+date.toUTCString();
    document.cookie = name + "=" + encodeURIComponent(value) + "; " + expires+ "; path=/";
}
var setCookieForDays = function(name,value,days){
	var expires = "";
	if(days>0){
		var date = new Date();
	    date.setTime(date.getTime() + (days* 24 * 60 * 60 * 1000));
	    expires = "expires="+date.toUTCString();
	}
	
    document.cookie = name + "=" + encodeURIComponent(value) + "; " + expires+ "; path=/";
}
window.getCookieGlobal = function(cname) {
	
	var name = cname + "=";
    var ca = document.cookie.split(';');
    for(var i=0; i<ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0)==' ') c = c.substring(1);
        if (c.indexOf(name) == 0) return c.substring(name.length,c.length);
    }
    return "";
}

var delete_cookie = function(name) {
    document.cookie = name + '=;path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT;';
    $.removeCookie(name, { path: '/' });
};

var delete_cookie_domain = function(domain, name) {
    document.cookie = name + '=; path=/; domain='+domain+'; expires=Thu, 01 Jan 1970 00:00:01 GMT';
};

var isIE = false;
var ua = window.navigator.userAgent;
var msie = ua.indexOf("MSIE ");

if(msie > 0 || !!navigator.userAgent.match(/Trident.*rv\:11\./))
{
	isIE = true;
}

$showElementMobileTablet = $('.srxLogo');

$(function(){
	
//	jQuery(document).ready(function($){
//		$.getJSON("https://freegeoip.net/json/", function(e) {
//			var countryCode = e.country_code;
//			var url = window.location.href;
//			
//		    if (countryCode == "CN") {
//		    	
//		    	if (url.indexOf("mysg-home") !== -1) {
//		    		var description = '新加坡一站式房产信息平台SRX Property旗下金融产品mySG Home，集提供实时房产估价、周边交易信息、价值被低估的房源，计算资本增值、租金回报率，解锁房产财富功能于一体。 ';
//		    		description += 'mySG Home也为屋主、租客提供申请房贷再融资、寄存、装修等服务。';
//		    		$("meta[name='description']").attr('content', description);
//		    	
//		    	} else if (url.indexOf("xvalue-pricing") !== -1) {
//		    		var description = '新加坡一站式房产信息平台SRX Property旗下估值产品X-估值(X-Value)，通过自动估价模型和海量交易数据的结合，为您免费提供公寓、有地别墅、政府组屋的实时估价。';
//		    		$("meta[name='description']").attr('content', description);
//		    	
//		    	} else if (url.indexOf("/property-for-sale/") !== -1) {
//		    		var description = '新加坡一站式房地产信息平台SRX Property提供高质量真实出售房源。为广大用户提供新房、二手房、公寓、有地别墅、政府组屋等全方位信息。';
//		    		$("meta[name='description']").attr('content', description);
//		    	
//		    	} else if (url.indexOf("/property-for-rent/") !== -1) {
//		    		var description = '新加坡一站式房地产信息平台SRX Property提供高质量真实出租房源。为广大用户提供公寓出租、组屋出租、有地别墅出租、合租等全方位信息。';
//		    		$("meta[name='description']").attr('content', description);
//		    	
//		    	} else if (url.indexOf("/condo") !== -1) {
//		    		var description = '新加坡一站式房地产信息平台SRX Property提供真实公寓房源，户型、价格、房源照片周边配套设施一览无余。';
//		    		$("meta[name='description']").attr('content', description);
//		    	
//		    	} else if (url.indexOf("/hdb") !== -1) {
//		    		var description = '新加坡一站式房地产信息平台SRX Property，提供最全面的组屋房源信息，让您任性找房。';
//		    		$("meta[name='description']").attr('content', description);
//		    	
//		    	} else if (url.indexOf("/srx-valuations") !== -1) {
//		    		var description = '新加坡一站式房产交易平台SRX Property旗下估价服务覆盖各类房产，为广大用户提供住宅、商铺、写字楼、工厂、酒店、开发地块等高效专业的估价服务。';
//		    		$("meta[name='description']").attr('content', description);
//
//		    	} else if (url.indexOf("/concierge") !== -1) {
//		    		var description = '新加坡一站式房产交易平台SRX Property旗下礼宾服务，汇聚新加坡顶尖房产经纪人，为广大用户提供免费专业购房租房指导。';
//		    		$("meta[name='description']").attr('content', description);
//		    	
//		    	} else {
//		    		var description = '新加坡唯一一站式房产信息平台SRX Property，提供实时估价、无人机航拍看房、360度全景看房、评估及礼宾服务，涵盖各类公寓、有地别墅及政府组屋房源，助您高效快捷找房。';
//		    		$("meta[name='description']").attr('content', description);
//		    	}
//   			} 
//		});
//	});
	
	$.removeCookie("ptSignedUp", { path: '/', domain: 'www.srx.com.sg' });
	document.cookie = 'ptSignedUp=; expires=Thu, 01-Jan-70 00:00:01 GMT;path=/';
	
	$.removeCookie("shownRenewalAlert", { path: '/', domain: 'www.srx.com.sg' });
	document.cookie = 'shownRenewalAlert=; expires=Thu, 01-Jan-70 00:00:01 GMT;path=/';
	
	/*
	 * Hide/Show elements on scroll
	 * */
	
	var $window = $(window);
	$stickyEl = $('#collapseSrxNav');

	if(isIE)
	{
		enquire.register("screen and (max-width:991px)", {
			match : function() {
				$('#collapseSrxNav').removeClass('collapse').addClass('ieShow');
			}
		});
	}
	
	if($stickyEl.length > 0)
	{
		if(!isIE)
		{  
	    	elTop = $stickyEl.offset().top;
	    	
	    	$window.scroll(function() {
				// Desktop	    		
				if(!/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
					$stickyEl.toggleClass('navbarFloatingBg', $window.scrollTop() > elTop);
					$(".srxLogo").toggleClass('small', $window.scrollTop() > elTop);
				}
			});
	    }
	}
});

var ua = navigator.userAgent.toLowerCase();
var osVer = ua.substring(35, 37);
var isAndroid = ua.indexOf("android") > -1;
//console.log(ua);
//console.log(osVer);
//console.log(window.document.referrer);
//console.log(isAndroid);

function detectMySg(){
    var di = document.getElementById("di");
    di.innerHTML = "app have not installed";
}
function newOpen(){
	var downloadUrl = "";
	var ptUserId    = "";
	var mobileUrl   = "";
	var financeUrl  = "mysghome://myhomefinance";
	var trackerUrl  = "mysghome://mypropertytracker";
	var financeUrlUni  = "https://www.srx.com.sg/myhomefinance";
	var trackerUrlUni  = "https://www.srx.com.sg/mypropertytracker";
	var urlReference = document.getElementById("urlReference").value;
	var di = document.getElementById("di");
    var ifc = document.getElementById("ifc");
	
	    
	if (urlReference == "trackerRegister") {
		ptUserId = document.getElementById("ptUserIdReference").value;
	} else {
		var isElemVisible = document.getElementById("hiddenPtUserId");
		if (isElemVisible != null) {
			ptUserId = document.getElementById("hiddenPtUserId").value;
		}
	}
	
	//console.log(osVer);
	if (osVer >= 9) {
		if (ptUserId != "") {
			if (urlReference == "trackerRegister" || urlReference == "tracker") {
				mobileUrl = trackerUrlUni + "?ptUserId=" + ptUserId;
			} else {
				mobileUrl = financeUrlUni + "?ptUserId=" + ptUserId;
			}
		} else {
			if (urlReference == "trackerRegister" || urlReference == "tracker") {
				mobileUrl = trackerUrlUni;
			} else {
				mobileUrl = financeUrlUni;
			}
		}
	} else {
		if (ptUserId != "") {
			if (urlReference == "trackerRegister" || urlReference == "tracker") {
				mobileUrl = trackerUrl + "?ptUserId=" + ptUserId;
			} else {
				mobileUrl = financeUrl + "?ptUserId=" + ptUserId;
			}
		} else {
			if (urlReference == "trackerRegister" || urlReference == "tracker") {
				mobileUrl = trackerUrl;
			} else {
				mobileUrl = financeUrl;
			}
		}
	}
	
	downloadUrl = "http://mysg-home.app.link/OBmSFXw4lN";
	window.location = downloadUrl;
//    if (isAndroid) {
//    	downloadUrl = "http://mysg-home.app.link/OBmSFXw4lN";
//    	ifc.innerHTML = "<iframe src='" + mobileUrl + "  ' onload='detectMySg()'></iframe>";
//    	setTimeout(function () { window.location = downloadUrl; }, 50);
//    } else {
//    	downloadUrl = "http://mysg-home.app.link/OBmSFXw4lN";
//    	setTimeout(function () {
//		  window.location = downloadUrl;
//		}, 1000);
//    	
//    	window.location = trackerUrl;
//    }
	
    return false;
}

function randomString(length) {
	var chars = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
    var result = '';
    for (var i = length; i > 0; --i) result += chars[Math.round(Math.random() * (chars.length - 1))];
    return result;
}
