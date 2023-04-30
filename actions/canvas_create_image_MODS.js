module.exports = {
  name: 'Canvas Create Image MOD',
  section: 'Image Editing',
  meta: {
    version: '2.1.7',
    preciseCheck: true,
    author: '[XinXyla - 172782058396057602]',
    authorUrl: 'https://github.com/DBM-Mods/Portugues',
    downloadURL: 'https://github.com/DBM-Mods/Portugues/archive/refs/heads/main.zip',
  },

  subtitle (data) {
    return `${data.url}`
  },

  variableStorage (data, varType) {
    const type = parseInt(data.storage)
    if (type !== varType) return
    return ([data.varName, 'Image'])
  },

  fields: ['url', 'width', 'height', 'iffalse', 'iffalseVal', 'storage', 'varName'],

  html (isEvent, data) {
    return `
  <div class="dbmmodsbr1 xinelaslink" data-url="https://github.com/DBM-Mods/French/archive/refs/heads/main.zip">Mettre à jour</div>
  <div class="dbmmodsbr2 xinelaslink" data-url="https://github.com/DBM-Mods/French">Github: Version 0.2</div>

<div>
  <span class="dbminputlabel">Chemin du fichier local / URL</span><br>
  <input id="url" class="round" type="text" placeholder="resources/"><br>
</div>

<div>
  <div style="float: left; width: 46%;padding:0px 5px 0px 0px">
  <span class="dbminputlabel">Largeur (px ou %)</span><br>
    <input id="width" class="round" type="text" placeholder="Laisser vide = par défaut" value="100%"><br>
  </div>
  <div style="float: right; width: 50%;padding:0px">
  <span class="dbminputlabel">Hauteur (px ou %)</span><br>
    <input id="height" class="round" type="text" placeholder="Laisser vide = par défaut" value="100%"><br>
  </div>
</div>
<br>

<div style="padding-top: 8px;">
<div style="float: left; width: 45%">
<span class="dbminputlabel">Si le chargement de l'image échoue</span><br>
<select id="iffalse" class="round" onchange="glob.onComparisonChanged(this)">
<option value="0" selected>Continuer l'action</option>
<option value="1">Arrêter l'action</option>
<option value="2">Sauter à l'action suivantes</option>
<option value="3">Sauter les actions suivantes</option>
<option value="4">Aller à l'ancre d'action</option>
</select>
</div>

<div id="iffalseContainer" style="display: none; float: right; width: 50%;"><span id="xinelas" class="dbminputlabel">Para</span><br><input id="iffalseVal" class="round" name="actionxinxyla" type="text"></div>
</div>
<br><br><br><br><br><br>
<div>
  <div style="float: left; width: 45%;">
  <span class="dbminputlabel">Stocker dans</span><br>
    <select id="storage" class="round">
      ${data.variables[1]}
    </select>
  </div>
  <div id="varNameContainer" style="float: right; width: 50%;">
  <span class="dbminputlabel">Nom de la variable</span><br>
    <input id="varName" class="round" type="text"><br>
  </div>
</div>
  <style>
  xinspace{padding:5px 0px 0px 0px;display:block}
  .dbmmodsbr1{position:absolute;bottom:0px;border: 0px solid rgba(50,50,50,0.7);background:rgba(0,0,0,0.7);color:#999;padding:5px;left:0px;z-index:999999;cursor:pointer}
  .dbmmodsbr2{position:absolute;bottom:0px;border: 0px solid rgba(50,50,50,0.7);background:rgba(0,0,0,0.7);color:#999;padding:5px;right:0px;z-index:999999;cursor:pointer}
  </style>`;
  },

  init: function () {
    const { glob, document } = this;
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


    glob.onComparisonChanged = function (event) {
      if (event.value > "1") {
        document.getElementById("iffalseContainer").style.display = null;
      } else {
        document.getElementById("iffalseContainer").style.display = "none";
      }
      if (event.value == "2") {
      document.querySelector("[id='xinelas']").innerText = (`Numéro de l'action`);
    }
    if (event.value == "3") {
      document.querySelector("[id='xinelas']").innerText = (`Nombres d'actions à sauter`);
    }
    if (event.value == "4") {
      document.querySelector("[id='xinelas']").innerText = (`Nom de l'ancre`);
    }
  }

    glob.onComparisonChanged(document.getElementById("iffalse"));
},

  async action (cache) {
    const data = cache.actions[cache.index]
    const Canvas = require('canvas')
    try {
    await Canvas.loadImage(this.evalMessage(data.url, cache)).then((image) => {
      var scalex = this.evalMessage(data.width, cache)
      var scaley = this.evalMessage(data.height, cache)
      if(scalex == ''){scalex = "100%"}
      if(scaley == ''){scaley = "100%"}
      let imagew = image.width
      let imageh = image.height
      let scalew = 1
      let scaleh = 1
      scale(scalex, scaley)
      const canvas = Canvas.createCanvas(imagew, imageh)
      const ctx = canvas.getContext('2d')
      ctx.drawImage(image, 0, 0, imagew, imageh)
      const result = canvas.toDataURL('image/png').replace('image/png', 'image/octet-stream')
      const varName = this.evalMessage(data.varName, cache)
      const storage = parseInt(data.storage)
      this.storeValue(result, storage, varName, cache)
      this.callNextAction(cache)

      function scale (w, h) {
        if (w.endsWith('%')) {
          const percent = w.replace('%', '')
          scalew = parseInt(percent) / 100
        } else {
          scalew = parseInt(w) / imagew
        }
        if (h.endsWith('%')) {
          const percent = h.replace('%', '')
          scaleh = parseInt(percent) / 100
        } else {
          scaleh = parseInt(h) / imageh
        }
        imagew *= scalew
        imageh *= scaleh
      }

    })}
    catch (err) {this.executeResults(false, data, cache)}

  
  },

  mod () {}
}
