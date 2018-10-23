const axios = require('axios');

class PageInfo{
    constructor(link, data){
        this.link = link;
        this.data = data;
        this.getNestedLinks();
    }

    getNestedLinks(){
        this.nestedLinks = this.data.match(/href="[^"]+/g).map(x=>x.replace('href="','')).filter(this.onlyUnique);        
    }

    getPages(pageRegex){
        let pageLinks = this.nestedLinks.filter(x=>x.match(pageRegex)!=null);
        this.pageInfo = pageLinks.map(x=>[+(x.match(/[0-9]+/).pop()),x]);
        return this.pageInfo;        
    }

    onlyUnique(value, index, self) { 
        return self.indexOf(value) === index;
    }
}

let srxLink = 'https://www.srx.com.sg/singapore-property-listings/property-for-sale/residential?view=table';

axios.get(srxLink).then(p=>{
    let lC = new PageInfo(srxLink,p.data);
    lC.getPages('page=[0-9]+');
})

let b=5;