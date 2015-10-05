/**
 * Created by pikachu on 01.09.2015.
 */
Array.clear = function(arr){
    arr.splice(0,arr.length);
};
if (!Array.prototype.clear){
    Array.prototype.clear = function(){
        this.splice(0,this.length);
    };
};
if (!Array.prototype.last){
    Array.prototype.last = function(){
        if(this.length==0) return null;
        return this[this.length - 1];
    };
};