import Vue from 'vue'
import Vuex from 'vuex'
import axios from "axios"
Vue.use(Vuex)
import router from "../router/index"
export default new Vuex.Store({
  state: {		
	  		data:[		
	  			],
	  			events:[
	  			],
	  			toogle: true

 },

 getters:{
 	allData: function(state){
 			return state.data
 	},
 	allEvents: function(state){
 			return state.events
 	}
 },
 mutations: {

 	check: function(state){
 		state.toogle = !state.toogle
 	}

  },
  actions: {
  	checkme: function({commit}){
  		commit("check")
  	},
  	autoLogout({commit}){
  		setTimeout(()=>{
  			router.push("/login")
  		}, 3600000)
  	},
  	updateEvents({commit, state}, data){
  			axios.put("https://stardust-4e9ca.firebaseio.com/events/"+ data.id +".json/?auth="+localStorage.getItem("idToken"),
  		{
  			title: data.title,
  			about: data.about,
  			url: data.url
  		})
  		.then(request=>{

  		},err=>{
  			console.log(err)
  		})
  	},
  	deleteEvents({commit, state}, id){
  		axios.delete("https://stardust-4e9ca.firebaseio.com/events/"+ id +".json/?auth="+localStorage.getItem("idToken"))
  		.then(request=>{

  		},err=>{
  			console.log(err)
  		})	
  	},
  	postEvents({commit, state}, data){
		axios.post("https://stardust-4e9ca.firebaseio.com/events.json/?auth="+localStorage.getItem("idToken"), data)
		.then(request=>{
			console.log(request)
		},err=>{
			console.log(err)
		})
  	},
  	getEvents({commit, state}){
		axios.get("https://stardust-4e9ca.firebaseio.com/events.json/")
		.then(request=>{
			let li = []
			const events = request.data
			for(let a in events){
				const data = {
					id: a,
					title: events[a].title,
					about: events[a].about,
					url: events[a].url
				}
				console.log(data)
				li.push(data)
			}
			state.events = li
		},err=>{
			console.log(err)
		})
  	},

  	//
  	updateTeam({commit, state}, data){
  			axios.put("https://stardust-4e9ca.firebaseio.com/teams/"+ data.id +".json/?auth="+localStorage.getItem("idToken"),
  		{
  			name: data.name,
			designation: data.designation,
			url: data.url
  		})
  		.then(request=>{

  		},err=>{
  			console.log(err)
  		})
  	},
  	deleteTeam({commit, state}, id){
  		axios.delete("https://stardust-4e9ca.firebaseio.com/teams/"+ id +".json/?auth="+localStorage.getItem("idToken"))
  		.then(request=>{

  		},err=>{
  			console.log(err)
  		})	
  	},
  	postTeam({commit, state}, data){
		axios.post("https://stardust-4e9ca.firebaseio.com/teams.json/?auth="+localStorage.getItem("idToken"), data)
		.then(request=>{
			console.log(request)
		},err=>{
			console.log(err)
		})
  	},
  	getTeam({commit, state}){
		axios.get("https://stardust-4e9ca.firebaseio.com/teams.json/")
		.then(request=>{
			let li = []
			const teams = request.data
			for(let a in teams){
				const data = {
					id: a,
					name: teams[a].name,
					designation: teams[a].designation,
					url: teams[a].url
				}
				console.log(data)
				li.push(data)
			}
			state.data = li
		},err=>{
			console.log(err)
		})
  	},
  }
})