define(["require", "exports"], function (require, exports) {
    exports.__extends = this.__extends || function (child, parent) {
	    for (var property in parent){
	    	if (parent.hasOwnProperty(property)){
	    		child[property] = parent[property];
	    	} 
	    } 

	    function extender() {
	    	this.constructor = child;
	    }
	    
	    extender.prototype = parent.prototype;
	    child.prototype = new extender();
	};
});