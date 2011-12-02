	/*********************************************************************************************/	
	/*********************************************************************************************/
	Function.prototype.partial = function(){
	  var n,
	  aps = Array.prototype.slice,
	  orig_args = aps.call( arguments ),
	  __method = this;
	 
	  if ( arguments.length < 1 ) {
	    return this; // nothing to curry with - return function
	  }
	 
	  if ( typeof __method === 'number' ) {
	    n = __method;
	    __method = orig_args.shift();
	  } else {
	    n = __method.length;
	  }
	 
	  return function() {
	    var args = orig_args.concat( aps.call( arguments ) );
	    return args.length < n
	      ? __method
	      : __method.apply( this, args );
	  };
	};
	
	Function.prototype.bind = function( ){
		  var  aps = Array.prototype.slice,
		  args = aps.call( arguments ),
		  __method = this;
		  return function() {
		    return __method.apply( this, args.concat( aps.call( arguments ) ) );
		  };
		};
	
	/*********************************************************************************************/
	/*********************************************************************************************/


	Array.prototype.select= function(mensaje){
		var resp = new Array();
		var args = Array.prototype.slice.call(arguments, 1);
		
		for (var index = 0, len = this.length; index < len; ++index) {
			  var item = this[index];
			  if(item != null &&  mensaje.apply(item,args))
				  resp.push(item);
		}
		return resp;
	};
	
	Array.prototype.reject= function(mensaje){
		var resp = new Array();
		var args = Array.prototype.slice.call(arguments, 1);
		
		for (var index = 0, len = this.length; index < len; ++index) {
			  var item = this[index];
			  if(item == null || !mensaje.apply(item,args))
				  resp.push(item);
		}
		return resp;
	};
	
	Array.prototype.selectFirst= function(mensaje){
		var args = Array.prototype.slice.call(arguments, 1);
		for (var index = 0, len = this.length; index < len; ++index) {
			  var item = this[index];
			  if(item != null && mensaje.apply(item,args))
				  return item;
		}
	};
	
	Array.prototype.collect=function(mensaje){
		var resp = new Array();
		var args = Array.prototype.slice.call(arguments, 1);
		for (var index = 0, len = this.length; index < len; ++index) {
			  var item = this[index];
			  if(item == null)
				  continue;
			  
			  resp.push(mensaje.apply(item,args));
		}
		return resp;	
	};
	
	Array.prototype.at = function(pos){
		return this[pos];
	};
	
	Array.prototype.includes = Array.prototype.contains = function(toElem){
		for (var index = 0, len = this.length; index < len; ++index) {
			  if(this[index] == toElem)
				  return true;
		}
		return false;	
	};

	Boolean.prototype.ifTrue = function(fn){
		if(this == true){
			var args = Array.prototype.slice.call(arguments, 1);
			fn(args);
		};
		return this;
	};

	Boolean.prototype.ifFalse = function(fn){
		if(this == false){
			var args = Array.prototype.slice.call(arguments, 1);
			return fn(args);
		};
		return this;
	};
	
	/* Se podrá hacer esto en javascript?
	 Boolean.prototype.whileTrue = function(fn){
		var args = Array.prototype.slice.call(arguments, 1);
		while(this == true){
			fn(args);
			
		}
	};
	*/ 
	
	Number.prototype.timesRepeat = function(fn){
		var resp = [];
		for(var i = 0; i < this; i++){
			var args = Array.prototype.slice.call(arguments, 1);
			resp.push(fn.apply(this,args));
		}
	};
	
	Number.prototype.to = function(number, fn){
		var resp = [];
		for(var i = this; i < number; i++){
			var args = Array.prototype.slice.call(arguments, 2);
			resp.push(fn.apply(this,args));
		}
	};
	
	Array.prototype.ocurrencesOf = function(elem){
		var i = 0;
		for (var index = 0, len = this.length; index < len; ++index) {
			  if(this[index] == toElem)
				  i++;
		}
		return i;			
	};
	
	Array.prototype.foreach = function(fn,args){
		var args = Array.prototype.slice.call(arguments, 2);
		args.push(null);
		for (var index = 0, len = this.length; index < len; ++index) {
			args[0] = this[index];
			fn.apply(null, args);
		}
	};

	
	Array.prototype.detect= function(funcion1){
		var resp = {_IAmNone: true};
		for (var index = 0, len = this.length; index < len; ++index) {
			  var item = this[index];
			  if(funcion1(item) == true){
				  resp = item;
				  break;
			  }
		}
		
		resp["ifNone"] = function(fn2){
			if(this._IAmNone == true){
				fn2();
				return undefined;
			}
			return this;
		};
		
		return resp;
	};

	Array.prototype.inject = function(valor){
		this["into"] = function(fn){
			var resultadoParcial = valor;
			for (var index = 0, len = this.length; index < len; ++index) {
				resultadoParcial = fn(resultadoParcial, this[index]);
			};
			return resultadoParcial;
		};
		return this; 
	};
	
	Array.prototype.allSatisfy = function(expr){
		var args = Array.prototype.slice.call(arguments, 1);
		for (var index = 0, len = this.length; index < len; ++index) {
			  var item = this[index];
			  if(item == null)
				  continue;
			  
			  if(mensaje.apply(item,args) != true)
				  return false;
		}
		return true;
	};
	
	Array.prototype.allSatisfy = function(expr){
		var args = Array.prototype.slice.call(arguments, 1);
		for (var index = 0, len = this.length; index < len; ++index) {
			  var item = this[index];
			  if(item == null)
				  continue;
			  
			  if(mensaje.apply(item,args) == true)
				  return true;
		}
		return false;
	};
	
	Array.prototype.add = function(elem){
		this[this.length] = elem;
		return elem;
	};
	
	Array.prototype.last = function(){
		if(this.length > 0)
			return this[this.length -1];
		return undefined;
	};
	
	Array.prototype.first = function(){
		if(this.length > 0)
			return this[0];
		return undefined;
	};
	
	Array.prototype.beginsWith = function(otraCol){
		if(otraCol.length > this.length)
			return false;
		
		for (var index = 0, len = otracol.length; index < len; ++index) {
			  var item1 = otracol[index];
			  var item2 = this[index];
			  
			  if(item1 != item2)
				  return false;
		}
		return true;
	};
	
	Array.prototype.endsWith = function(otraCol){
		if(otraCol.length > this.length)
			return false;
		
		for (var indiceMayor = this.length-1, indiceMenor = otraCol.length -1; index < 0; --indiceMayor,--indiceMenor) {
			  var item1 = otracol[indiceMenot];
			  var item2 = this[indiceMayor];
			  
			  if(item1 != item2)
				  return false;
		}
		return true;
	};
	
	Array.prototype.copyFrom = function(ini){
		this["to"] = function(fin){
			var resp = [];
			for(var i = ini; i < fin +1; i++)
				resp.add(this[i]);
			return resp;
		};
		return this;
	};
	
function toArray(){
	  var aps = Array.prototype.slice,  // Cacheamos el método nativo.
	  args = aps.call( arguments );
	  return ( Object.prototype.toString.call( args ) );
}
	 


function test(){
	var MyClass = function(n,a){
		this.nombre =n;
		this.apellido = a;
		this.elApellidoEsMasLargo = function(){
			return this.apellido.length > this.nombre.length;
		};
		
		this.cambiarLetraApellido = function(posicion,letra){
			return this.apellido.substr(0,posicion) + letra + this.apellido.substr(posicion+1);
		};
		
		this.getNombreYApellido = function(){
			return this.nombre + " " + 	this.apellido;
		};
		this.retornoSiempreFalse = function(){
			return false;
		};
	};

	//$("body").load(init());
	
	miCollection = new Array();
	var godo = new MyClass("godo","teodorico");
	var foo = new MyClass("foo","bar");
	var elvio = new MyClass("elvio","lento");
	miCollection.push(foo);
	miCollection.push(elvio);
	miCollection.push(godo);
	miCollection.push(new MyClass("jaime","gillas"));
	miCollection.push(new MyClass("susana","torio"));
	miCollection.push(new MyClass("susana","nas"));
	
	
	nuevaCol = [foo,elvio,godo];
	miCollection.beginsWith(nuevaCol).ifTrue(function(){
		document.getElementById("hola").innerHTML += " OK! ";
	});
	
	document.getElementById("hola").innerHTML += "Personas en la lista:<ul>";
	miCollection.foreach(function(elem){
		document.getElementById("hola").innerHTML += "<li>" + elem.getNombreYApellido() + "</li>";
	});
	
	document.getElementById("hola").innerHTML += "</ul><br />";

	//document.getElementById("hola").innerHTML = miCollection.collect()
	a = new MyClass();
	
	
	miCollection.select(a.elApellidoEsMasLargo);
	miCollection.collect(a.getNombreYApellido);
	miCollection.collect(a.cambiarLetraApellido.partial(1),'S');
	miCollection.contains(godo);
	miCollection.contains(new MyClass("a","o"));
	
	
	miCollection2 = [1,2,3,4,5,6,7,8,9,10];
	document.getElementById("hola").innerHTML += "(55) Inject 0 into [1..10] = " + miCollection2.inject(0).into(function(contador,elem){
		return this; + elem;
	}) + "<br />";
	
	var y = miCollection.detect( function(elem){
				return elem.nombre == "godo";
			}).ifNone(
					function(){
						document.getElementById("hola").innerHTML += "Detect 1: ERROR <br />";
					});
	document.getElementById("hola").innerHTML += "Detect 1: " + y.nombre + "<br />";
	
	var x = miCollection.detect(function(elem){
				return elem.nombre == "wololo";
			}).ifNone(
					function(){
						document.getElementById("hola").innerHTML +="Detect 2 (ifNone): OK <br />";
					});
	document.getElementById("hola").innerHTML += "Detect 2 (return): " + (x == undefined? "OK" : "ERROR") + "<br />";
	
	var b = true;
	b.ifTrue(function(){
		document.getElementById("hola").innerHTML += "ifTrue: OK.<br/>";
	}).ifFalse(function(){
		document.getElementById("hola").innerHTML += "ifFalse: MAL.<br/>";
	});
	b.ifFalse(function(){
		document.getElementById("hola").innerHTML += "ifFalse: MAL.<br/>";
	});
	
	var c = false;
	c.ifTrue(function(){
		document.getElementById("hola").innerHTML += "ifTrue: MAL.<br/>";
	}).ifFalse(function(){
		document.getElementById("hola").innerHTML += "ifFalse: OK.<br/>";
	});
	c.ifFalse(function(){
		document.getElementById("hola").innerHTML += "ifFalse: OK.<br/>";
	});
};
	