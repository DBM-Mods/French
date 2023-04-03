module.exports = {
  name: 'Find Category MOD',
  section: 'Channel Control',
  meta: {
    version: '2.1.7',
    preciseCheck: true,
    author: '[XinXyla - 172782058396057602]',
    authorUrl: 'https://github.com/DBM-Mods/Portugues',
    downloadURL: 'https://github.com/DBM-Mods/Portugues/archive/refs/heads/main.zip',
  },

  subtitle(data) {
    const info = ['Category ID', 'Category Name', 'Category Topic'];
    return `Find Category by ${info[parseInt(data.info, 10)]}`;
  },

  variableStorage(data, varType) {
    if (parseInt(data.storage, 10) !== varType) return;
    return [data.varName, 'Category'];
  },

  fields: ['info', 'find', 'storage', 'varName'],

  html(isEvent, data) {
    return `
	<div class="dbmmodsbr1 xinelaslink" data-url="https://github.com/TheKingOfCampers/French/archive/refs/heads/main.zip">
  Mettre à jour</div>
    <div class="dbmmodsbr2 xinelaslink" data-url="https://github.com/TheKingOfCampers/French">Github: Version 0.1</div>
	
<div>
  <div style="float: left; width: 40%;">
  <span class="dbminputlabel">Source</span><br>
    <select id="info" class="round">
      <option value="0" selected>ID de la catégorie</option>
      <option value="1">Nom de la catégorie</option>
    </select>
  </div>
  <div style="float: right; width: 55%;">
  <span class="dbminputlabel">Recherche</span><br>
    <input id="find" class="round" type="text">
  </div>
</div><br><br><br>
<div style="padding-top: 8px;">
  <div style="float: left; width: 35%;">
  <span class="dbminputlabel">Stocker dans</span><br>
    <select id="storage" class="round">
      ${data.variables[1]}
    </select>
  </div>
  <div id="varNameContainer" style="float: right; width: 60%;">
  <span class="dbminputlabel">Nom de la variable</span><br>
    <input id="varName" class="round" type="text">
  </div>
</div><br><br><br>

<style>
  /* Embed CSS code */
  .embed {
    position: relative;
  }
  .embedinfo {
    background: rgba(46,48,54,.45) fixed;
    border: 1px solid hsla(0,0%,80%,.3);
    padding: 10px;
    margin:0 4px 0 7px;
    border-radius: 0 3px 3px 0;
  }
  embedleftline {
    background-color: #eee;
    width: 4px;
    border-radius: 3px 0 0 3px;
    border: 0;
    height: 100%;
    margin-left: 4px;
    position: absolute;
  }
  span {
    font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
  }
  span.embed-auth {
    color: rgb(255, 255, 255);

  }
  span.embed-desc {
    color: rgb(128, 128, 128);
  }
  span.wrexlink {
    color: #99b3ff;
    text-decoration:underline;
    cursor:pointer;
  }
  span.wrexlink:hover {
    color:#4676b9;
  }
</style>

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

  async action(cache) {
    const { server } = cache;
    if (!server || !server.channels) return this.callNextAction(cache);
    const data = cache.actions[cache.index];
    const info = parseInt(data.info, 10);
    const find = this.evalMessage(data.find, cache);
    const channels = server.channels.cache.filter((s) => s.type === 'GUILD_CATEGORY');
    let result;

    switch (info) {
      case 0:
        result = channels.get(find);
        break;
      case 1:
        result = channels.find((e) => e.name === find);
        break;
      default:
        break;
    }

    if (result !== undefined) {
      const storage = parseInt(data.storage, 10);
      const varName = this.evalMessage(data.varName, cache);
      this.storeValue(result, storage, varName, cache);
    }
    this.callNextAction(cache);
  },

  mod() {},
};
