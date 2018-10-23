window.addEventListener('load',function(){
var id = '';
var price  = 0;
var page = 'other';

if(window.location.pathname =='/') 
{
	page  = 'home';
}
else if(jQuery('.listingDetail').length > 0)
{
	page  = 'offerdetail';
	id    = jQuery('.listingId').val();
	price = parseFloat(jQuery('#listingPrice').text().trim().replace(/[^0-9.]/g,''));
	
	if(price ==0 || price == undefined)
	{
		price =  0;
	}
}
else if(window.location.pathname.indexOf('/search/')!=-1 || window.location.href.indexOf('agent-listings')!=-1 || window.location.href.indexOf('property-listings')!=-1)
{
	page  = 'searchresults';
}
else 
{
	page  = 'other';
}

var google_tag_params ={
listing_id:id,
listing_pagetype:page,
listing_totalvalue:price
};
gtag('event', 'page_view', {'send_to': 'AW-1020826912',
                              'listing_id':google_tag_params.listing_id,
                              'listing_pagetype':google_tag_params.listing_pagetype,
                              'listing_totalvalue':google_tag_params.listing_totalvalue
                             });
});



window.addEventListener('load',function(){
jQuery('#listing-contact-submit').click(function(){ 
page  = 'conversion';
gtag('event', 'page_view', {'send_to': 'AW-1020826912',
							'listing_pagetype': page
                             });
});

jQuery('.featuredAgentContact').click(function(){ 
page  = 'conversionintent';
gtag('event', 'page_view', {'send_to': 'AW-1020826912',
							'listing_pagetype': page
                             });
});

 
  var x = 0;
  var myVar = setInterval(function(){
    if(x == 0){
      if(jQuery('#listing-contact-agent-success').is(":visible"))
      {
         gtag('event', 'page_view', {'send_to': 'AW-1020826912',
							'listing_pagetype': 'conversion'
                             });
        
        clearInterval(myVar);
        x = 1;
      }
    }
  }, 1000);
});
