module.exports = {
  name: 'Canvas Edit Image Border MOD',
  section: 'Image Editing',
  meta: {
    version: '2.1.7',
    preciseCheck: true,
    author: '[XinXyla - 172782058396057602]',
    authorUrl: 'https://github.com/DBM-Mods/Portugues',
    downloadURL: 'https://github.com/DBM-Mods/Portugues/archive/refs/heads/main.zip',
  },

  subtitle (data) {
    const storeTypes = ['', 'Variable Temporaire', 'Variable Serveur', 'Variable Globale']
    return `${storeTypes[parseInt(data.storage)]} (${data.varName})`
  },

  fields: ['storage', 'varName', 'circleinfo', 'radius' , 'cor' , 'lados' , 'borda', 'shadowcor','blur','shadowh','shadowv','gradiente','tipocor'],

  html (isEvent, data) {
    return `
  <div class="dbmmodsbr1 xinelaslink" data-url="https://github.com/DBM-Mods/French/archive/refs/heads/main.zip">Mettre à jour</div>
  <div class="dbmmodsbr2 xinelaslink" data-url="https://github.com/DBM-Mods/French">Github: Version 0.4</div>

    <table style="width:100%;">
		<tr>
			<td>
				<span class="dbminputlabel">Image [Canvas]</span><br>
				<select id="storage" class="round" style="width: 90%" onchange="glob.refreshVariableList(this)">
					${data.variables[1]}
				</select>
			</td>
			<td>
				<span class="dbminputlabel">Nom de la variable</span><br>
				<input id="varName" class="round" type="text" list="variableList">
			</td>
		</tr>
	</table>
<br>

	<tab-system style="margin-top: 0">
		<tab label="Bordure" icon="align left">
				<div style="padding:8px">

    <span class="dbminputlabel">Type de Bordure</span><br>
    <select id="circleinfo" class="round" onchange="glob.onComparisonChanged(this)">
      <option value="0" selected>Coin arrondi</option>
      <option value="1">Circulaire</option>
      <option value="2">Pentagonale</option>
      <option value="3">Hexagonale</option>
      <option value="4">Nombre de côtés</option>
    </select>
    <div style="width: 100%;display:none;padding-top:12px" id="containerxin">
    <span class="dbminputlabel">Rayon du cercle (px)</span><br>
      <input id="radius" class="round" type="text" value="0">
    </div>
  
    <div style="width: 100%;display:none;padding-top:12px" id="containerxin3">
    <span class="dbminputlabel">Nombre de côtés</span><br>
      <input id="lados" class="round" type="text" value="6">
    </div>
</div>
  


</tab>

<tab label="Couleur" icon="flask">
		<div style="padding:8px">
			
    <span class="dbminputlabel">Type de Couleur</span>
			<select id="tipocor" class="round" onchange="glob.onChange0(this)">
				<option value="2">Aucune</option>
				<option value="0" selected>HEX ou RGBA</option>
				<option value="1">Dégradé de couleur</option>
		</select>

	
    <div style="width: 100%;padding-top:12px" id="containerxin2">

    <span class="dbminputlabel">Taille de bordure (px)</span><br>
      <input id="borda" name="actionxinxyla" class="round" value="0" type="text" placeholder="2">

    </div>
		<div id="gradient" style="padding-top:12px">
			<span class="dbminputlabel">Dégradé</span>
			<textarea id="gradiente" name="gradientes" rows="4" style="width: 100%; white-space: nowrap; resize:yes"></textarea>
		</div>

      <div style="width: 100%;padding-top:12px" id="containerxin4">
    <span class="dbminputlabel">Couleur de la bordure</span><br>
      <table style="width:100%"><tr><td style="width:100%"><input id="Bouton" value="FFFFFF" name="actionxinxyla" class="round" type="text" placeholder="Insira uma cor HEX ou RGBA"><td>
      <td style="width:40px;text-align:center;padding:4px"><a id="btr1" style="cursor:pointer" onclick="(function(){
        document.getElementById('Bouton').type = 'color'
        document.getElementById('btr1').style.display = 'none';
        document.getElementById('btr2').style.display = 'block';
        })()"><button class="tiny compact ui icon button">Bouton</button></a><a id="btr2" style="cursor:pointer;display:none" onclick="(function(){
          document.getElementById('Bouton').type = 'text';
          document.getElementById('btr1').style.display = 'block';
          document.getElementById('btr2').style.display = 'none';
          })()"><button class="tiny compact ui icon button">Texte</button></a><td></tr></table>

          
          </div>
	
	</div>
	</tab>

<tab label="Ombre" icon="cloud">
		<div style="padding:8px">
	<table style="width:100%"><tr>
	<td style="width:100px">
	<span class="dbminputlabel">Flou de l'ombre</span><br>
	<input id="blur" class="round" type="text" value="0" placeholder="Facultatif">
	</td>
	<td style="width:100px"><span class="dbminputlabel">Angle de l'ombre (X)</span><br>
	<input id="shadowh" class="round" type="text" value="0" placeholder="Facultatif"></td>
	<td style="width:100px"><span class="dbminputlabel">Angle de l'ombre (Y)</span><br>
	<input id="shadowv" class="round" type="text" value="0" placeholder="Facultatif"></td>
	</tr></table>

		
		<div id="corshadow" style="padding-top:15px">
		<span class="dbminputlabel">Couleur de l'ombre HEX / RGBA</span><br>
			<table style="width:100%"><tr><th><input value="#FFFFFF" id="shadowcor" name="actionxinxyla" class="round" type="text" placeholder="Insère un code HEX ou RGBA..."><th>
			<th style="width:40px;text-align:center;padding:4px"><a id="2btr1" style="cursor:pointer" onclick="(function(){
			document.getElementById('shadowcor').type = 'color'
			document.getElementById('2btr1').style.display = 'none';
			document.getElementById('2btr2').style.display = 'block';
			})()"><button class="tiny compact ui icon button">Boutton</button></a><a id="2btr2" style="cursor:pointer;display:none" onclick="(function(){
				document.getElementById('shadowcor').type = 'text';
				document.getElementById('2btr1').style.display = 'block';
				document.getElementById('2btr2').style.display = 'none';
				})()"><button class="tiny compact ui icon button">Texte</button></a><th></tr></table>

		
		</div>
		</div>	</div>
	</tab>
    </tab-system>
    
    <style>td{padding:2px}</style>

<style>
  xinspace{padding:5px 0px 0px 0px;display:block}
  .dbmmodsbr1{position:absolute;bottom:0px;border: 0px solid rgba(50,50,50,0.7);background:rgba(0,0,0,0.7);color:#999;padding:5px;left:0px;z-index:999999;cursor:pointer}
  .dbmmodsbr2{position:absolute;bottom:0px;border: 0px solid rgba(50,50,50,0.7);background:rgba(0,0,0,0.7);color:#999;padding:5px;right:0px;z-index:999999;cursor:pointer}
  </style>`;
  },

  init () {
    const { glob, document } = this
  
      glob.onComparisonChanged = function (event) {
        if (event.value === "0") {
          document.getElementById("containerxin").style.display = null;
          document.getElementById("containerxin3").style.display = "none"; 
        }
        if (event.value === "1" || event.value === "2" || event.value === "3") {
          document.getElementById("containerxin").style.display = "none"; 
        }
        if (event.value === "4") {
          document.getElementById("containerxin3").style.display = null;
          document.getElementById("containerxin").style.display = "none";
        }
      }

      glob.onChange0 = function (event) {
        switch (parseInt(event.value)) {
          case 0:
          gradient.style.display = 'none'
          containerxin2.style.display = null
          containerxin4.style.display = null
          break
          case 1:
          gradient.style.display = null
          containerxin2.style.display = null
          containerxin4.style.display = 'none'
          break
          case 2:
            gradient.style.display = 'none'
            containerxin2.style.display = 'none'
            containerxin4.style.display = 'none'
            break
        }
        }
        glob.onChange0(document.getElementById('tipocor'))

 
      glob.onComparisonChanged(document.getElementById("circleinfo"));
    glob.refreshVariableList(document.getElementById('storage'))
	
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

  action (cache) {
    const Canvas = require('canvas')
    const data = cache.actions[cache.index]
    const storage = parseInt(data.storage)
    const varName = this.evalMessage(data.varName, cache)
    const borda = this.evalMessage(data.borda, cache);
    const cor = this.evalMessage(data.cor, cache);
    const imagedata = this.getVariable(storage, varName, cache)
    if (!imagedata) {
      this.callNextAction(cache)
      return
    }
    const image = new Canvas.Image()
    image.src = imagedata
    var radius = this.evalMessage(data.radius, cache)
    if(radius == undefined){radius = 0}
    const lados = parseInt(this.evalMessage(data.lados, cache))
    const imagew = image.width
    const imageh = image.height
    var tipocor = this.evalMessage(data.tipocor, cache);
    if (tipocor == undefined || tipocor == ""){tipocor = 0}
    const canvas = Canvas.createCanvas(imagew, imageh)
    const ctx = canvas.getContext('2d')
    const circleinfo = parseInt(data.circleinfo, 10);

     const shadowcor = this.evalMessage(data.shadowcor, cache);
    let blur = parseInt(this.evalMessage(data.blur, cache));
    if (isNaN(blur)) {
      blur = 0;
    }
    let shadowh = parseInt(this.evalMessage(data.shadowh, cache));
    if (isNaN(shadowh)) {
      shadowh = 0;
    }
    let shadowv = parseInt(this.evalMessage(data.shadowv, cache));
    if (isNaN(shadowv)) {
      shadowv = 0;
    }
      ctx.shadowColor = shadowcor
      ctx.shadowOffsetX = shadowh;
      ctx.shadowOffsetY = shadowv;
      ctx.shadowBlur = blur;
      ctx.fillstyle = shadowcor
      ctx.fill()
    switch (circleinfo) {
      case 0:
        corner(radius)
        break;
      case 1:
        circle()
        break;
      case 2:
        pentagono()
        break;
      case 3:
        hexagono()
        break;
      case 4:
        nlados()
        break;
    }
    ctx.drawImage(image, 0, 0)
    if (borda > 0) {   

      if(tipocor == 2) {
        ctx.strokeStyle = "rgba(0,0,0,0)"
      } 
      if(tipocor == 1) {
        eval(String(this.evalMessage(data.gradiente, cache)))
        ctx.strokeStyle = gradient;
      } 
      if(tipocor == 0 || tipocor == undefined) {
        ctx.strokeStyle = cor
      }

    ctx.lineWidth = borda;
    ctx.lineHeight = borda;
    ctx.stroke();}
    const result = canvas.toDataURL('image/png').replace('image/png', 'image/octet-stream')
    this.storeValue(result, storage, varName, cache)
    this.callNextAction(cache)

    function circle () {
      ctx.beginPath()
      ctx.arc(imagew / 2, imageh / 2, (imagew + imageh) / 4, 0, Math.PI * 2)
      ctx.closePath()
      ctx.clip()
    }
    function corner (r) {
      ctx.beginPath()
      ctx.moveTo(r, 0)
      ctx.lineTo(imagew - r, 0)
      ctx.quadraticCurveTo(imagew, 0, imagew, r)
      ctx.lineTo(imagew, imageh - r)
      ctx.quadraticCurveTo(imagew, imageh, imagew - r, imageh)
      ctx.lineTo(r, imageh)
      ctx.quadraticCurveTo(0, imageh, 0, imageh - r)
      ctx.lineTo(0, r)
      ctx.quadraticCurveTo(0, 0, r, 0)
      ctx.closePath()
      ctx.clip()
    }

    function hexagono () {
      side = 0;
      size = imagew/2,
      x = imagew/2,
      y = imageh/2;
      ctx.beginPath();
      ctx.moveTo(x + size * Math.cos(0), y + size * Math.sin(0));
      for (side; side < 7; side++) {
       ctx.lineTo(x + size * Math.cos(side * 2 * Math.PI / 6), y + size * Math.sin(side * 2 * Math.PI / 6));
    }
      ctx.closePath()
      ctx.clip()
    }


    function pentagono () {
      var numberOfSides = 5,
      side = 0;
      size = imagew/2,
      x = imagew/2,
      y = imageh/2;

      ctx.beginPath();
      ctx.moveTo (x +  size * Math.cos(0), y +  size *  Math.sin());          
      for (var i = 1; i <= numberOfSides;i += 1) {
      ctx.lineTo (x + size * Math.cos(i * 2 * Math.PI / numberOfSides), y + size * Math.sin(i * 2 * Math.PI / numberOfSides));
      }
      ctx.closePath()
      ctx.clip()
    }

    function nlados () {
      var numberOfSides = lados,
      side = 0;
      size = imagew/2,
      x = imagew/2,
      y = imageh/2;

      ctx.beginPath();
      ctx.moveTo (x +  size * Math.cos(0), y +  size *  Math.sin(0));          
      for (var i = 1; i <= numberOfSides;i += 1) {
      ctx.lineTo (x + size * Math.cos(i * 2 * Math.PI / numberOfSides), y + size * Math.sin(i * 2 * Math.PI / numberOfSides));
      }
      ctx.closePath()
      ctx.clip()
    }
  },

  mod () {}
}
