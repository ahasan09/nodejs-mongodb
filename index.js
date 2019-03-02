const _ = require("lodash");

const result = _.map([1,2,3,5,8,7,45,2],(item)=>{
    return item+2;
});

console.log(result);