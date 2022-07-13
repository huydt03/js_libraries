function EventHandle(target, events) {

	const NULL_NAME = '__';

	let fActions = {};

	target.handle = {
		add: keys=> {
			for(let i in keys){
				createHandle(keys[i])
			}
		},
		listen: (key, f)=> {
			createHandle(key);
			target[key] = f;
		}
	};

	// object handleItem
	function handleItem(key){
		return Object.freeze({
			fire: agrs=> {
				for(let k in fActions[key]){
					let fns = fActions[key][k];
					for(let i in fns){
						fns[i](agrs);
					}
				}
			},
			remove: fName=> {
				fName = fName || NULL_NAME;
				delete fActions[key][fName];
			},
			clear: ()=> {
				fActions[key] = {};
			}
		})
	}

	// create new handle
	function createHandle(key){
		Object.defineProperty(target, key, {
			set: function(f){
				if(typeof f === 'function'){
					let name = f.name || NULL_NAME;
					fActions[key] = fActions[key] || {}
					fActions[key][name] = fActions[key][name] || []
					fActions[key][name].push(f)
				}else
					throw 'handle is not a function'
			}
		});

		Object.defineProperty(target.handle, key, {
			get: function(){ return handleItem(key); },
		})
	}

	// init
	function init(){
		for(let i in events){
			let key = events[i];
			createHandle(key);
		}
	}
	init();

	return target;
}