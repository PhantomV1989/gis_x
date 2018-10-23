// prepare and insert dmp tag - advance tag without ldap w
var zhead=document.getElementsByTagName('head')[0];

var zscript1 = document.createElement('script');
zscript1.src="//tags.crwdcntrl.net/c/6096/cc.js?ns=_cc6096";
zscript1.id="LOTCC_6096";
zhead.appendChild(zscript1);

(function () {
	load_dmp = function () {
		var zscript2 = document.createElement('script');
		var znode2c = document.createTextNode('_cc6096.bcp();');
		zscript2.appendChild(znode2c);
		zhead.appendChild(zscript2);
	}
	
	window.attachEvent ? window.attachEvent('onload', load_dmp) : window.addEventListener('load', load_dmp, false);
})();
