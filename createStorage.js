function createStorage(key){

	const store = JSON.parse(localStorage.getItem(key)) ?? {};

	const save = ()=> {
		localStorage.setItem(key, JSON.stringify(store))
	}

	const storage =  {
		get: key=> { 
			return store[key] 
		},

		set: (key, value)=> { 
			store[key] = value; 
			save(); 
		},

		remove: key=> { 
			delete store[key]; 
			save(); 
		},

		destroy: ()=> { 
			localStorage.removeItem(key) 
		},

		clear: ()=> { 
			store = {}; 
			save(); 
		}
	}

	const self = {};

	function init(){

		for(let k in storage){
			Object.defineProperty(self, k, {
				get: function(){ return storage[k] }
			})
		}

	}
	init();

	return self;
}
