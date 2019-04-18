(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{20:function(e,t,n){e.exports=n(30)},26:function(e,t,n){},30:function(e,t,n){"use strict";n.r(t);var a=n(0),o=n.n(a),r=n(14),c=n.n(r),i=n(18),s=n(17),l=n(5),m=n(6),p=n(8),u=n(7),d=n(9),f=n(33),h=(n(26),n(12)),v=n(31),b=n(32),E=n(34),N=function(e){function t(){var e,n;Object(l.a)(this,t);for(var a=arguments.length,o=new Array(a),r=0;r<a;r++)o[r]=arguments[r];return(n=Object(p.a)(this,(e=Object(u.a)(t)).call.apply(e,[this].concat(o)))).state={editContent:n.props.noteContent},n.onChange=function(e){n.setState({editContent:e.target.value})},n.onSaveNote=function(e){e.preventDefault(),n.props.saveNote(n.props.id,n.state.editContent),n.props.history.push("/")},n.onDeleteNote=function(){n.props.deleteNote(n.props.id),n.props.history.push("/")},n.animate=function(){var e=n.props.id;setTimeout(function(){try{document.querySelector("#"+e+".note").classList.add("animate")}catch(t){console.log(t)}},0)},n}return Object(d.a)(t,e),Object(m.a)(t,[{key:"render",value:function(){var e=this;return this.animate(),o.a.createElement(o.a.Fragment,null,o.a.createElement(v.a,{exact:!0,path:"/",render:function(){return o.a.createElement(o.a.Fragment,null,o.a.createElement("div",{id:e.props.id,className:"note"},o.a.createElement("div",{className:"container"},o.a.createElement("div",{className:"content"},e.props.noteContent),o.a.createElement("div",{className:"button-group"},o.a.createElement(b.a,{to:"".concat(e.props.id,"/edit")},"edit"),o.a.createElement(b.a,{to:"".concat(e.props.id,"/delete")},"delete")))))}}),o.a.createElement(v.a,{path:"/:id/edit",render:function(t){var n=Object(h.a)({},t);return o.a.createElement("div",{id:e.props.id,className:"note ".concat(n.match.params.id===e.props.id?"editing":"disabled")},o.a.createElement("div",{className:"container"},n.match.params.id===e.props.id?o.a.createElement(o.a.Fragment,null,o.a.createElement("form",{className:"content-form",onSubmit:e.onSaveNote},o.a.createElement("input",{className:"content",type:"text",value:e.state.editContent,onChange:e.onChange}),o.a.createElement("div",{className:"button-group"},o.a.createElement("span",{className:"micro-copy"},"editing:"),o.a.createElement("input",{type:"submit",value:"save"}),o.a.createElement(b.a,{to:"/"},"cancel")))):o.a.createElement(o.a.Fragment,null,o.a.createElement("div",{className:"content"},e.props.noteContent),o.a.createElement("div",{className:"button-group"}))))}}),o.a.createElement(v.a,{path:"/:id/delete",render:function(t){var n=Object(h.a)({},t);return o.a.createElement("div",{id:e.props.id,className:"note ".concat(n.match.params.id===e.props.id?"deleting":"disabled")},o.a.createElement("div",{className:"container"},o.a.createElement("div",{className:"content"},e.props.noteContent)," ",n.match.params.id===e.props.id?o.a.createElement("div",{className:"button-group"},o.a.createElement("span",{className:"micro-copy"},"delete?"),o.a.createElement("button",{onClick:e.onDeleteNote},"yes"),o.a.createElement(b.a,{to:"/"},"no")):o.a.createElement("div",{className:"button-group"})))}}))}}]),t}(a.Component),y=Object(E.a)(N),j=function(e){function t(){var e,n;Object(l.a)(this,t);for(var a=arguments.length,o=new Array(a),r=0;r<a;r++)o[r]=arguments[r];return(n=Object(p.a)(this,(e=Object(u.a)(t)).call.apply(e,[this].concat(o)))).handleSubmit=function(e){e.preventDefault(),n.props.addNote(e.target.elements.note.value),e.target.reset()},n}return Object(d.a)(t,e),Object(m.a)(t,[{key:"render",value:function(){return o.a.createElement("div",{className:"new-note-wrapper"},o.a.createElement("form",{className:"new-note-form",onSubmit:this.handleSubmit},o.a.createElement("input",{type:"text",name:"note",placeholder:"Type a new note",required:!0}),o.a.createElement("input",{type:"submit",value:"save note"})))}}]),t}(a.Component),g=function(e){function t(){var e,n;Object(l.a)(this,t);for(var a=arguments.length,o=new Array(a),r=0;r<a;r++)o[r]=arguments[r];return(n=Object(p.a)(this,(e=Object(u.a)(t)).call.apply(e,[this].concat(o)))).state={notes:[]},n.handleAddNote=function(e){var t=Date.now(),a={timeStamp:t,content:e};fetch("https://my-firebase-api-app.firebaseio.com/notes.json",{method:"POST",body:JSON.stringify(a)}).then(function(e){return e.json()}).then(function(a){n.setState(function(n){return{notes:[{id:a.name,attrs:{timeStamp:t,content:e}}].concat(Object(s.a)(n.notes))}})})},n.handleSaveNote=function(e,t){fetch("https://my-firebase-api-app.firebaseio.com/notes/"+e+"/.json",{body:'{"content": "'+t+'"}',headers:{"Content-Type":"application/x-www-form-urlencoded"},method:"PATCH"}).then(function(e){return e.json()}).then(function(){n.setState(function(n){return{notes:n.notes.map(function(n){return{id:n.id,attrs:{timeStamp:n.attrs.timeStamp,content:n.id===e?t:n.attrs.content}}})}})})},n.handleDeleteNote=function(e){fetch("https://my-firebase-api-app.firebaseio.com/notes/"+e+".json",{method:"DELETE"}).then(function(e){return e.json()}).then(function(){n.setState(function(t){return{notes:t.notes.filter(function(t){return t.id!==e})}})})},n}return Object(d.a)(t,e),Object(m.a)(t,[{key:"componentDidMount",value:function(){var e=this;fetch("https://my-firebase-api-app.firebaseio.com/notes.json").then(function(e){return e.json()}).then(function(t){if(t){var n=Object.entries(t).map(function(e){var t=Object(i.a)(e,2);return{id:t[0],attrs:t[1]}}).sort(function(e,t){return parseInt(t.attrs.timeStamp)-parseInt(e.attrs.timeStamp)});e.setState({notes:n})}})}},{key:"render",value:function(){var e=this;return o.a.createElement(f.a,null,o.a.createElement("div",{className:"app"},o.a.createElement(j,{addNote:this.handleAddNote}),this.state.notes.map(function(t){return o.a.createElement(y,{noteContent:t.attrs.content,key:t.id,id:t.id,saveNote:e.handleSaveNote,deleteNote:e.handleDeleteNote})})))}}]),t}(a.Component);c.a.render(o.a.createElement(g,null),document.getElementById("root"))}},[[20,1,2]]]);
//# sourceMappingURL=main.aa24d821.chunk.js.map