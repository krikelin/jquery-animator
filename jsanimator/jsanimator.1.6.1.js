/*
 * Copyright (C) 2011 Alexander Forselius
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
 /**
 @from http://stackoverflow.com/questions/754607/can-jquery-get-all-css-styles-associated-with-an-element
 */
 function css(a){
    var sheets = document.styleSheets, o = {};
    for(var i in sheets) {
        var rules = sheets[i].rules || sheets[i].cssRules;
        for(var r in rules) {
            if(a.is(rules[r].selectorText)) {
                o = $.extend(o, css2json(rules[r].style), css2json(a.attr('style')));
            }
        }
    }
    return o;
}
 /**
 @from http://stackoverflow.com/questions/754607/can-jquery-get-all-css-styles-associated-with-an-element
 */
function css2json(css){
	var s = {};
	if(!css) return s;
	if(css instanceof CSSStyleDeclaration) {
		for(var i in css) {
			if((css[i]).toLowerCase) {
				s[(css[i]).toLowerCase()] = (css[css[i]]);
			}
		}
	} else if(typeof css == "string") {
		css = css.split("; ");          
		for (var i in css) {
			var l = css[i].split(": ");
			s[l[0].toLowerCase()] = (l[1]);
		};
	}
	return s;
}
 var ACTION_RESIZE = 0;

 /**
 @name Scene
 @description A scene for the objects to live in 
 */
function Scene(keyframes, pace){
	/***
	 * The current keyframe on in a step
	 */
	this.current_keyframe = 0; 
	this.pace = pace;
	/**
	The count of keyframes. A keyframe is last in about 0,5 seconds
	and holds a certain event
	*/
	this.keyframes = keyframes; 

	/**
	@description Adds a object to the scene
	*/
	
	this.addObject = function(id){
		// Adds a object
		var object = new JAObject();
		object.id = id;

		object.style = css($(id)); // Set the start style
		this.objects.push(object);
	}
	this.addEvent = function(id,query, start, end){
		// Adds a object
		var evt = new JAEvent();
		evt.object_id = id;
		evt.start = start;
		evt.end = end;
		evt.query = query;
		this.events.push(evt);
		evt.end_state = query; // set end state
	
		// Assign the state to the query builder
		
		
	}
	this.objects = new Array();		// Objects, all is standard html elements
	this.events = new Array();		// Events, all is in defined event class
	
	/***
	@description Goes a keyframe further and executes the event 
	*/
	
	this.tick = function(){
		
		// Look for objects that are equal in the current keyframe,
		// and if a event matching the current keyframe is found, schedule it for animation
		for(var i=0; i < this.events.length; i++){
			for(var j =0; j < this.objects.length; j++){
				var event = this.events[i];
				var object = this.objects[j];
				console.log(event.object_id + " " + object.id + " " +  event.start + " " + this.current_keyframe + " ");
				console.log(event.object_id  == object.id);
				console.log(event.start == this.current_keyframe);
				// If a event is matching, kick it
				if((event.object_id == object.id )&& event.start == this.current_keyframe){
					console.log("Event started");
					// Animate the object
					$(event.object_id).animate(event.query, (event.end - event.start) * pace, function(now, fx){
						// Assign a new state
						//event.states[event.end] = $(event.objectID).css(); // The temporary bounds
						console.log("Animation ended");
					});
					
						
				}
			}
		}
		this.current_keyframe++; // Go one keyframe further
		
	}
	/***
	@description Resets the animation
	*/
	this.reset = function(){
		removeInterval(this.aggregator);
		this.current_keyframe = 0;
		// Reset all objects position
		for(var i=0; i < this.objects.length; i++){
			var object = this.objects[i];
			$(this.objects[i].id).css(object.style);
		}
	}
	this.play = function(){
		this.aggregator = setInterval(function(){ story.tick() },pace);
		
	}
	this.pause = function(){
		removeInterval(this.aggregator);
	}
	this.aggregator = null;
	
}
function JAObject(keyframes, id){
	this.start_bounds = ""; // Start bounds
	this.id = id;
	this.style = {};
}
/***
@name Event
@description Denotates a event in the animation that are scheduled on the keyframes property of the scene and delegates a jquery animation event.
*/
function JAEvent(id, query, start, end){
	
	
	this.start_state = {}; // Latest bounds
	this.end_state = {} // End state
	this.start = start;
	this.end = end;
	this.object_id =id;
	this.property = "";			// the jquery compliant property to act on
	this.query = {};
	

}