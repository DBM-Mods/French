module.exports = {

name: "Comment MOD",
section: "Other Stuff",
meta: {
    version: '2.1.7',
    preciseCheck: true,
    author: '[XinXyla - 172782058396057602]',
    authorUrl: 'https://github.com/DBM-Mods/Portugues',
    downloadURL: 'https://github.com/DBM-Mods/Portugues/archive/refs/heads/main.zip',
    },

subtitle: function(data) {
	return '<font color="' + data.color +'">' + data.comment + '</font>';
},

fields: ["comment", "save", "color"],

html: function(isEvent, data) {
	return `
  <div class="dbmmodsbr1 xinelaslink" data-url="https://github.com/DBM-Mods/French/archive/refs/heads/main.zip">Mettre à jour</div>
  <div class="dbmmodsbr2 xinelaslink" data-url="https://github.com/DBM-Mods/French">Github: Version 0.1</div>

	<div style="width: 100%; padding:10px 5px;height: calc(100vh - 180px);overflow:auto">

	<span class="dbminputlabel">Titre</span>
	<textarea id="comment" rows="3" placeholder="Insira o texto aqui..." style="width: 99%; font-family: monospace; white-space: nowrap;"></textarea>

	<br>

	<span class="dbminputlabel">Informations détaillées</span>
	<textarea id="save" rows="6" placeholder="Détailles de tes actions (pour les partager notamment)..." style="width: 99%; font-family: monospace; white-space: nowrap;"></textarea>


	<br>
	<div style="width: 24%">
	<span class="dbminputlabel">Couleur</span><br>
	<input type="color" class="round" id="color">
	</div>
		  
		  </div>
		    <style>
  xinspace{padding:5px 0px 0px 0px;display:block}
  .dbmmodsbr1{position:absolute;bottom:0px;border: 0px solid rgba(50,50,50,0.7);background:rgba(0,0,0,0.7);color:#999;padding:5px;left:0px;z-index:999999;cursor:pointer}
  .dbmmodsbr2{position:absolute;bottom:0px;border: 0px solid rgba(50,50,50,0.7);background:rgba(0,0,0,0.7);color:#999;padding:5px;right:0px;z-index:999999;cursor:pointer}
  </style>`;
	},
	
init: function() {
	const xinelaslinks = document.getElementsByClassName('xinelaslink');
    for (let x = 0; x < xinelaslinks.length; x++) {
      const xinelaslink = xinelaslinks[x];
      const url = xinelaslink.getAttribute('data-url');
      if (url) {
        xinelaslink.setAttribute('title', url);
        xinelaslink.addEventListener('click', (e) => {
          e.stopImmediatePropagation();
          console.log(`Launching URL: [${url}] in your default browser.`);
          require('child_process').execSync(`start ${url}`);
        });
      }
    }
},

action: function(cache) {
	this.callNextAction(cache);
},

mod: function(DBM) {
}

};
