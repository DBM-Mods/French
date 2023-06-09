module.exports = {
  //---------------------------------------------------------------------
  // Action Name
  //
  // This is the name of the action displayed in the editor.
  //---------------------------------------------------------------------

  name: "Send Message",
  displayName: "Send Message MOD",

  //---------------------------------------------------------------------
  // Action Section
  //
  // This is the section the action will fall into.
  //---------------------------------------------------------------------

  section: "Messaging",

  //---------------------------------------------------------------------
  // Action Subtitle
  //
  // This function generates the subtitle displayed next to the name.
  //---------------------------------------------------------------------

  subtitle(data, presets) {
    let text = "";
    if (data.message) {
      text = `"${data.message.replace(/[\n\r]+/, " ↲ ")}"`;
    } else if (data.embeds?.length > 0) {
      text = `${data.embeds.length} Embeds`;
    } else if (data.attachments?.length > 0) {
      text = `${data.attachments.length} Pièces jointe`;
    } else if (data.buttons?.length > 0 || data.selectMenus?.length > 0) {
      text = `${data.buttons.length} Boutons et ${data.selectMenus.length} Menu de selections`;
    } else if (data.editMessage && data.editMessage !== "0") {
      if (data.editMessage === "intUpdate") {
        text = "Options du message - Modifier l'interaction"
      } else {
        text = `Options du message - ${presets.getVariableText(data.editMessage, data.editMessageVarName)}`;
      }
    } else {
      text = `Rien (Peut occasionner des erreurs)`;
    }
    if (data.dontSend) {
      text = `Action mise en pause: ${text}`;
    } else {
      text = `${presets.getSendReplyTargetText(data.channel, data.varName)}: ${text}`;
    }
    if (data.descriptioncolor == undefined) {
      data.descriptioncolor = "#ffffff";
    }
    if (data.storagewebhook > "0") {
      return `Envoyer via Webhook: ${data.varwebhook}`;
    }

    if (data.descriptionx == true) {
      desccor = data.descriptioncolor;
    } else {
      desccor = "none";
    }

    return data.description
      ? `<font style="color:${desccor}">${data.description}</font>`
      : `<font style="color:${desccor}">${text}</font>`
  },

  //---------------------------------------------------------------------
  // Action Storage Function
  //
  // Stores the relevant variable info for the editor.
  //---------------------------------------------------------------------

  variableStorage(data, varType) {
    let vars = [];

    const type = parseInt(data.storage, 10);
    const typeError = parseInt(data.storageError, 10);

    if (type == varType) {
      vars.push(data.varName2);
      vars.push(data.dontSend ? "Options du message" : "Message");
    }

    if (typeError == varType) {
      vars.push(data.varNameError);
      vars.push("Texte ~ Erreur");
    }

    if (vars.length > 0) return vars;
  },

  //---------------------------------------------------------------------
  // Action Meta Data
  //
  // Helps check for updates and provides info if a custom mod.
  // If this is a third-party mod, please set "author" and "authorUrl".
  //
  // It's highly recommended "preciseCheck" is set to false for third-party mods.
  // This will make it so the patch version (0.0.X) is not checked.
  //---------------------------------------------------------------------

  meta: {
    version: "2.1.7",
    preciseCheck: true,
    author: '[XinXyla - 172782058396057602]',
    authorUrl: 'https://github.com/DBM-Mods/Portugues',
    downloadURL: 'https://github.com/DBM-Mods/Portugues/archive/refs/heads/main.zip',
  },

  //--------------------------------------------------------------------
  // Action Fields
  //
  // These are the fields for the action. These fields are customized
  // by creating elements with corresponding IDs in the HTML. These
  // are also the names of the fields stored in the action's JSON data.
  //---------------------------------------------------------------------

  fields: [
    "channel",
    "varName",
    "message",
    "buttons",
    "selectMenus",
    "attachments",
    "embeds",
    "reply",
    "ephemeral",
    "tts",
    "overwrite",
    "dontSend",
    "editMessage",
    "editMessageVarName",
    "storage",
    "varName2",
    "iffalse",
    "iffalseVal",
    "descriptioncolor",
    "description",
    "descriptionx",
    "storagewebhook",
    "varwebhook",
    "webhookname",
    "webhookavatar",
    "messageoff",
    "mentions",
    "actionsError",
    "storageError",
    "varNameError",
    "errcmd"
  ],

  //---------------------------------------------------------------------
  // Command HTML
  //
  // This function returns a string containing the HTML used for
  // editing actions.
  //
  // The "isEvent" parameter will be true if this action is being used
  // for an event. Due to their nature, events lack certain information,
  // so edit the HTML to reflect this.
  //---------------------------------------------------------------------

  html(isEvent, data) {
    return `
  <div class="dbmmodsbr1 xinelaslink" data-url="https://github.com/DBM-Mods/French/archive/refs/heads/main.zip">Mettre à jour</div>
  <div class="dbmmodsbr2 xinelaslink" data-url="https://github.com/DBM-Mods/French">Github: Version 0.1</div>

    <div style="width:100%" id="xin2"><send-reply-target-input dropdownLabel="Envoyer vers" selectId="channel" variableInputId="varName"></send-reply-target-input>
    <br><br><br>
  </div><div id="xin3"><div style="float: left; width: 35%">
  <span class="dbminputlabel">Envoyer vers</span><br>
  <select class="round">
  <option value="0" selected>Webhook</option>
  </select>
  </div>
  <br><br><br>
  </div>
  <div style="width:100%">
  <tab-system style="margin-top: 20px;">


  <tab label="Texte" icon="align left">
  <div style="width: 100%; padding:8px;height: calc(100vh - 290px);overflow:auto">

      <textarea id="message" class="dbm_monospace" rows="6" placeholder="Tapez le texte ici..." style="height: calc(100vh - 349px); white-space: nowrap;"></textarea>
      <br><div id="contador" style="text-align:right;position:relative;width:100%">0 caractères</div>
    </div>
  </tab>


  <tab label="Embeds" icon="book image">
    <div style="padding: 8px;">

      <dialog-list id="embeds" fields='["title", "url", "color", "colorrandom", "timestamp", "timestampper", "imageUrl", "thumbUrl", "description", "fields", "author", "authorUrl", "authorIcon", "footerText", "footerIconUrl", "formula", "val1", "comparar", "val2"]' dialogTitle="Embed Info" dialogResizable dialogWidth="540" dialogHeight="460" listLabel="Embeds" listStyle="height: calc(100vh - 350px);" itemName="Embed" itemCols="1" itemHeight="30px;" itemTextFunction="data.title + ' - ' + data.description" itemStyle="text-align: left; line-height: 30px;">
        <div style="padding: 16px 16px 0px 16px;">

          <tab-system>

            <tab label="Info" icon="certificate">
              <div style="padding: 8px;height: calc(100vh - 130px);overflow:auto">
                <div style="float: left; width: calc(50% - 12px);">
                  <span class="dbminputlabel">Titre</span><br>
                  <input id="title" class="round" type="text">

                  <br>

                  <span class="dbminputlabel">Couleur</span><div style="float:right;margin-top:-5px"><dbm-checkbox id="colorrandom" label="Aléatoire"></dbm-checkbox></div><br>
                  <table style="width:100%"><tr><td><input id="color" name="actionxinxyla" class="round" type="text" placeholder="vide = défaut"><td>
                  <td style="width:40px;text-align:center;padding:4px"><a id="btr1" style="cursor:pointer" onclick="(function(){
                     document.getElementById('color').type = 'color'
                    document.getElementById('btr1').style.display = 'none';
                    document.getElementById('btr2').style.display = 'block';
                  })()"><button class="tiny compact ui icon button">HEX</button></a><a id="btr2" style="cursor:pointer;display:none" onclick="(function(){
                      document.getElementById('color').type = 'text';
                      document.getElementById('btr1').style.display = 'block';
                      document.getElementById('btr2').style.display = 'none';
                    })()"><button class="tiny compact ui icon button">Texte</button></a><td></tr></table>
                </div>



                <div style="float: right; width: calc(50% - 12px);">
                  <span class="dbminputlabel">URL</span><br>
                  <input id="url" class="round" type="text" placeholder="Laisser vide désactiver...">

                  <br>

                  <span class="dbminputlabel">Horodatage</span><div style="float:right;margin-top:-5px"><dbm-checkbox id="timestamp" label="Oui"></dbm-checkbox></div><br>
                  <input id="timestampper" class="round" type="text" placeholder="Laisser vide pour date du jour">
                </div>

                <br><br><br><br><br><br><br>

                <hr class="subtlebar">

                <br>

                <span class="dbminputlabel">Image principale: URL / Nom de la pièce jointe</span><br>
                <input id="imageUrl" class="round" type="text" placeholder="Laisser vide pour désactiver, lien http ou pièce jointe .png/.gif">

                <br>

                <span class="dbminputlabel">Vignette: URL / Nom de la pièce jointe</span><br>
                <input id="thumbUrl" class="round" type="text" placeholder="Laisser vide pour désactiver, lien http ou pièce jointe .png/.gif">
              </div>
            </tab>

            <tab label="Description" icon="file image">
              <div style="padding: 8px;height: calc(100vh - 130px);overflow:auto">
                <textarea id="description" class="dbm_monospace" rows="10" placeholder="Insérer la description ici..." style="height: calc(100vh - 149px); white-space: nowrap; resize: none;"></textarea>
                </div>
            </tab>

            <tab label="Champ" icon="list">
              <div style="padding: 8px;height: calc(100vh - 130px);overflow:auto">
                <dialog-list id="fields" fields='["name", "value", "inline", "val1", "val2", "comparar", "formula"]' dialogTitle="Field Info" dialogResizable dialogWidth="540" dialogHeight="500" listLabel="Champ" listStyle="height: calc(100vh - 190px);" itemName="Field" itemCols="1" itemHeight="50px;" itemTextFunction="'Nom: ' + data.name + '<br/>' + 'Texte: '+ data.value" itemStyle="text-align: left; line-height: 25px;">
                                  <div style="height: calc(100vh - 60px);overflow:auto">

                  <div style="padding: 16px;background:rgba(0,0,0,0.3)">

                  <span class="dbminputlabel">Paramètre d'affichage du champ</span><br>
                  <select id="formula" class="round">
                  <option value="0" selected>Toujours afficher</option>
                  <option value="1">Afficher seulement si la condition est fausse</option>
                  <option value="2">Afficher seulement si la condition est vraie</option>
                </select>

                <br>

                <table style="width: 100%;">
                  <tr>
                    <td>
                      <span class="dbminputlabel">Valeur A</span>
                      <input id="val1" class="round" type="text">
                    </td>
                    <td>
                      <span class="dbminputlabel">Condition</span><br>
                      <select id="comparar" class="round">
                        <optgroup label="Numéro ou Texte">
                          <option value="0">Valeur A - Existe</option>
                          <option value="1" selected><-Est égale à-></option>
                          <option value="2"><-Est éxactement égale à-></option>
                        </optgroup>
                        <optgroup label="Numéro">
                          <option value="3"><-Inférieur à-></option>
                          <option value="13"><-Inférieur ou égale à-></option>
                          <option value="4"><-Supérieur à-></option>
                          <option value="12"><-Supérieur ou égale à-></option>
                          <option value="19">valeur A - est un nombre paire ?</option>
                          <option value="20">valeur A - est un nombre impaire ?</option>
                          <option value="21">valeur A - est un nombre ?</option>
                        </optgroup>
                        <optgroup label="Texte">
                          <option value="6">Matches Regex</option>
                          <option value="14">Matches Full Regex</option>
                          <option value="7"><-Taille supérieur à-></option>
                          <option value="8"><-Taille inférieur à-></option>
                          <option value="9"><-Taille égale à-></option>
                          <option value="10"><-Commence par-></option>
                          <option value="11"><-Termine par-></option>
                          <option value="16">valeur A - possède des accents ?</option>
                          <option value="18">Est égale aux mots  ["a" , "b" , "c"]</option>
                          <option value="24">valeur A - Est un texte</option>
                          <option value="23">valeur A - Est un URL d'image ?</option>
                          <option value="25">valeur A - Est un URL ?</option>
                          <option value="26">valeur A - Le mail existe-t-il ?</option>
                        </optgroup>
                        <optgroup label="Texte ~ Contient">
                          <option value="5"><-Contient exactement-></option>
                          <option value="29"><-Contient ~ Ignorer les minuscules/majuscules-></option>
                          <option value="30"><-Contient ~ Ignorer les accents-></option>
                          <option value="31"><-Contient ~ Ignorer les accents, les minuscules et les majuscules-></option>
                          <option value="17"><-Contient exactement ["a" , "b" , "c"]</option>
                          <option value="27"><-Contient des URL?</option>
                          <option value="28"><-Contient des invitations Discord ?</option>
                          <option value="32"><-Contient exactement le mot-></option>
                          <option value="33"><-Contient le mot ~ Ignorer les minuscules/majuscules-></option>
                          <option value="34"><-Contient le mot ~ Ignorer les accents-></option>
                          <option value="35"><-Contient le mot ~ Ignorer les accents, les minuscules et les majuscules-></option>
                          <option value="36"><-Contient les mots ~ utiliser des virgules ~ Ignorer les accents, les minuscules et les majuscules-></option>
                        </optgroup>
                        <optgroup label="Autres">
                          <option value="22">valeur A - Est une liste ?</option>
                        </optgroup>
                      </select>
                    </td>
                    <td>
                      <span class="dbminputlabel">Valeur B</span><br>
                      <input id="val2" class="round" type="text">
                    </td>
                  </tr>
                </table>


                    </div>
                    <div style="padding: 16px;">


                    <div style="float: left; width: calc(50% - 12px);">
                      <span class="dbminputlabel">Nom du champ</span><br>
                      <input id="name" class="round" type="text">
                    </div>

                    <div style="float: right; width: calc(50% - 12px);">
                      <span class="dbminputlabel">En ligne ?</span><br>
                      <select id="inline" class="round">
                        <option value="true">Oui</option>
                        <option value="false" selected>Non</option>
                      </select>
                    </div>

                    <br><br><br>

                    <span class="dbminputlabel">Texte du champ</span><br>
                    <textarea id="value" class="dbm_monospace" rows="7" placeholder="Insérer le texte du champ..." style="height: calc(100vh - 320px); white-space: nowrap;"></textarea>

                  </div></div>
                </dialog-list>
              </div>
            </tab>

            <tab label="Auteur" icon="user circle">
              <div style="padding: 8px;height: calc(100vh - 130px);overflow:auto">
                <span class="dbminputlabel">Nom de l'auteur</span>
                <input id="author" class="round" type="text" placeholder="Laisser vide pour désactiver....">

                <br>

                <span class="dbminputlabel">Image de l'auteur / URL</span><br>
                <input id="authorUrl" class="round" type="text" placeholder="Laisser vide pour désactiver...">

                <br>

                <span class="dbminputlabel">Icone de l'auteur URL / pièce jointe</span><br>
                <input id="authorIcon" class="round" type="text" placeholder="Laisser vide pour désactiver, URL ou pièce jointe .png/.gif">
              </div>
            </tab>

            <tab label="Pied" icon="map outline">
              <div style="padding: 8px;height: calc(100vh - 130px);overflow:auto">
                <span class="dbminputlabel">Icone de pied de page: URL / Pièce jointe</span>
                <input id="footerIconUrl" class="round" type="text" placeholder="Laisser vide pour désactiver, URL ou .png/.gif...">

                <br>

                <span class="dbminputlabel">Texte de pied de page</span>
                <textarea id="footerText" class="dbm_monospace" rows="10" placeholder="Laisser vide pour désactiver..." style="height: calc(100vh - 234px); white-space: nowrap; resize: none;"></textarea>
              </div>
            </tab>

            <tab label="Config" icon="cogs">
              <div style="padding: 16px; background: rgba(0, 0, 0, 0.3);">
                <span class="dbminputlabel">Paramètre d'affichage de l'embed</span>
                <select id="formula" class="round">
                  <option value="0" selected>Toujours afficher</option>
                  <option value="1">Afficher seulement si la condition est fausse</option>
                  <option value="2">Afficher seulement si la condition est vraie</option>
                </select>

                <br>

                <table style="width: 100%;">
                  <tr>
                    <td>
                      <span class="dbminputlabel">Valeur A</span>
                      <input id="val1" class="round" type="text">
                    </td>
                    <td>
                      <span class="dbminputlabel">Condition</span><br>
                      <select id="comparar" class="round">
                      <optgroup label="Numéro ou Texte">
                        <option value="0">Valeur A - Existe</option>
                        <option value="1" selected><-Est égale à-></option>
                        <option value="2"><-Est éxactement égale à-></option>
                      </optgroup>
                      <optgroup label="Numéro">
                        <option value="3"><-Inférieur à-></option>
                        <option value="13"><-Inférieur ou égale à-></option>
                        <option value="4"><-Supérieur à-></option>
                        <option value="12"><-Supérieur ou égale à-></option>
                        <option value="19">valeur A - est un nombre paire ?</option>
                        <option value="20">valeur A - est un nombre impaire ?</option>
                        <option value="21">valeur A - est un nombre ?</option>
                      </optgroup>
                      <optgroup label="Texte">
                        <option value="6">Matches Regex</option>
                        <option value="14">Matches Full Regex</option>
                        <option value="7"><-Taille supérieur à-></option>
                        <option value="8"><-Taille inférieur à-></option>
                        <option value="9"><-Taille égale à-></option>
                        <option value="10"><-Commence par-></option>
                        <option value="11"><-Termine par-></option>
                        <option value="16">valeur A - possède des accents ?</option>
                        <option value="18">Est égale aux mots  ["a" , "b" , "c"]</option>
                        <option value="24">valeur A - Est un texte</option>
                        <option value="23">valeur A - Est un URL d'image ?</option>
                        <option value="25">valeur A - Est un URL ?</option>
                        <option value="26">valeur A - Le mail existe-t-il ?</option>
                      </optgroup>
                      <optgroup label="Texte ~ Contient">
                        <option value="5"><-Contient exactement-></option>
                        <option value="29"><-Contient ~ Ignorer les minuscules/majuscules-></option>
                        <option value="30"><-Contient ~ Ignorer les accents-></option>
                        <option value="31"><-Contient ~ Ignorer les accents, les minuscules et les majuscules-></option>
                        <option value="17"><-Contient exactement ["a" , "b" , "c"]</option>
                        <option value="27"><-Contient des URL?</option>
                        <option value="28"><-Contient des invitations Discord ?</option>
                        <option value="32"><-Contient exactement le mot-></option>
                        <option value="33"><-Contient le mot ~ Ignorer les minuscules/majuscules-></option>
                        <option value="34"><-Contient le mot ~ Ignorer les accents-></option>
                        <option value="35"><-Contient le mot ~ Ignorer les accents, les minuscules et les majuscules-></option>
                        <option value="36"><-Contient les mots ~ utiliser des virgules ~ Ignorer les accents, les minuscules et les majuscules-></option>
                      </optgroup>
                      <optgroup label="Autres">
                        <option value="22">valeur A - Est une liste ?</option>
                        </optgroup>
                      </select>
                    </td>
                    <td>
                      <span class="dbminputlabel">Valeur B</span><br>
                      <input id="val2" class="round" type="text">
                    </td>
                  </tr>
                </table>
              </div>
            </tab>

          </tab-system>

        </div>
      </dialog-list>

    </div>
  </tab>

  <tab label="Boutons" icon="clone">
  <div style="padding: 16px;text-align:center"id="xin4n">Webhook não suporta Botões</div>
    <div style="padding: 8px;" id="xin4">

      <dialog-list id="buttons" fields='["name", "typeper", "type", "id", "row", "url", "emoji", "mode", "time", "actions", "val1", "val2", "comparar", "formula"]' dialogResizable dialogTitle="Button Info" dialogWidth="600" dialogHeight="600" listLabel="Boutons" listStyle="height: calc(100vh - 350px);" itemName="Button" itemHeight="40px;" itemTextFunction="glob.formatItem2(data)" itemStyle="text-align: left; line-height: 40px;">
        <div style="padding: 16px;">

        <tab-system>

        <tab label="Actions" icon="list">

        <action-list-input mode="BUTTON" id="actions" height="calc(100vh - 180px)"></action-list-input>
        </tab>

        <tab label="Configuration du bouton" icon="cogs">
        <div style="height: calc(100vh - 138px);overflow-y: scroll;overflow-x: hidden;width:100%">

        <div style="padding: 16px;background:rgba(0,0,0,0.3)">
        <span class="dbminputlabel">Paramètre d'affichage du bouton</span><br>
        <select id="formula" class="round">

        <option value="0" selected>Toujours afficher</option>
        <option value="1">Afficher seulement si la condition est fausse</option>
        <option value="2">Afficher seulement si la condition est vraie</option>
        <option value="3">Désactiver le bouton si la condition est fausse</option>
        <option value="4">Désactiver le bouton si la condition est vraie</option>
        <option value="5">Désactiver le bouton</option>
      </select>

      <br>

                <table style="width: 100%;">
                  <tr>
                    <td>
                      <span class="dbminputlabel">Valeur A</span>
                      <input id="val1" class="round" type="text">
                    </td>
                    <td>
                      <span class="dbminputlabel">Condition</span><br>
                      <select id="comparar" class="round">
                      <optgroup label="Numéro ou Texte">
                        <option value="0">Valeur A - Existe</option>
                        <option value="1" selected><-Est égale à-></option>
                        <option value="2"><-Est éxactement égale à-></option>
                      </optgroup>
                      <optgroup label="Numéro">
                        <option value="3"><-Inférieur à-></option>
                        <option value="13"><-Inférieur ou égale à-></option>
                        <option value="4"><-Supérieur à-></option>
                        <option value="12"><-Supérieur ou égale à-></option>
                        <option value="19">valeur A - est un nombre paire ?</option>
                        <option value="20">valeur A - est un nombre impaire ?</option>
                        <option value="21">valeur A - est un nombre ?</option>
                      </optgroup>
                      <optgroup label="Texte">
                        <option value="6">Matches Regex</option>
                        <option value="14">Matches Full Regex</option>
                        <option value="7"><-Taille supérieur à-></option>
                        <option value="8"><-Taille inférieur à-></option>
                        <option value="9"><-Taille égale à-></option>
                        <option value="10"><-Commence par-></option>
                        <option value="11"><-Termine par-></option>
                        <option value="16">valeur A - possède des accents ?</option>
                        <option value="18">Est égale aux mots  ["a" , "b" , "c"]</option>
                        <option value="24">valeur A - Est un texte</option>
                        <option value="23">valeur A - Est un URL d'image ?</option>
                        <option value="25">valeur A - Est un URL ?</option>
                        <option value="26">valeur A - Le mail existe-t-il ?</option>
                      </optgroup>
                      <optgroup label="Texte ~ Contient">
                        <option value="5"><-Contient exactement-></option>
                        <option value="29"><-Contient ~ Ignorer les minuscules/majuscules-></option>
                        <option value="30"><-Contient ~ Ignorer les accents-></option>
                        <option value="31"><-Contient ~ Ignorer les accents, les minuscules et les majuscules-></option>
                        <option value="17"><-Contient exactement ["a" , "b" , "c"]</option>
                        <option value="27"><-Contient des URL?</option>
                        <option value="28"><-Contient des invitations Discord ?</option>
                        <option value="32"><-Contient exactement le mot-></option>
                        <option value="33"><-Contient le mot ~ Ignorer les minuscules/majuscules-></option>
                        <option value="34"><-Contient le mot ~ Ignorer les accents-></option>
                        <option value="35"><-Contient le mot ~ Ignorer les accents, les minuscules et les majuscules-></option>
                        <option value="36"><-Contient les mots ~ utiliser des virgules ~ Ignorer les accents, les minuscules et les majuscules-></option>
                      </optgroup>
                      <optgroup label="Autres">
                        <option value="22">valeur A - Est une liste ?</option>
                        </optgroup>
                      </select>
                    </td>
                    <td>
                      <span class="dbminputlabel">Valeur B</span><br>
                      <input id="val2" class="round" type="text">
                    </td>
                  </tr>
                </table>


          </div>
  <br>

          <div style="width: calc(50%); float: left;">
            <span class="dbminputlabel">Nom</span>
            <input id="name" class="round" type="text">

            <br>

          <table style="width:100%"><tr><td id="bxin1">
            <span class="dbminputlabel">Type / Menu</span><div style="float:right;margin-top:-5px"><a style="cursor:pointer" onclick="(function(){
              document.getElementById('bxin1').style.display = 'none';
              document.getElementById('bxin2').style.display = 'block';
            })()"><button class="tiny compact ui icon button">Texte</button></a></div><br>
            <select id="type" class="round">
            <option value="PRIMARY" selected>PRIMAIRE (Violet)</option>
            <option value="SECONDARY">SECONDAIRE (Gris)</option>
            <option value="SUCCESS">SUCCÈS (Vert)</option>
            <option value="DANGER">DANGER (Rouge)</option>
            <option value="LINK">LIEN (Gris)</option>
            </select></td><td id="bxin2" style="display:none"><span class="dbminputlabel">Type / Variable</span><div style="float:right;margin-top:-5px"><a style="cursor:pointer" onclick="(function(){
              document.getElementById('bxin2').style.display = 'none';
              document.getElementById('bxin1').style.display = 'block';
               })()"><button class="tiny compact ui icon button">Menu</button></a></div><br><input placeholder="Laisser vide pour utiliser le menu" id="typeper" class="round" type="text"></td></tr></table>


            <br>

            <span class="dbminputlabel">URL</span>
            <input id="url" placeholder="Laisser vide pour désactiver..." class="round" type="text">

            <br>

            <span class="dbminputlabel">
            Action response mode
              <help-icon type="ACTION_RESPONSE_MODE"></help-icon>
            </span><br>
            <select id="mode" class="round">
              <option value="PERSONAL">Once, Command User Only</option>
              <option value="PUBLIC">Once, Anyone Can Use</option>
              <option value="MULTIPERSONAL">Multi, Command User Only</option>
              <option value="MULTI" selected>Multi, Anyone Can Use</option>
              <option value="PERSISTENT">Persistent</option>
            </select>
          </div>
          <div style="width: calc(50% - 12px); float: right;">
            <span class="dbminputlabel">Unique ID</span>
            <input id="id" placeholder="Laisser vide pour le générer" class="round" type="text">

            <br>

            <span class="dbminputlabel">Position de l'action (1 - 5)</span>
            <input id="row" placeholder="Laisser vide pour désactiver..." class="round" type="text">

            <br>

            <span class="dbminputlabel">Emoji</span>
            <input id="emoji" placeholder="Laisser vide pour désactiver..." class="round" type="text">

            <br>

            <span class="dbminputlabel">Limite de temps (millisecondes)</span>
            <input id="time" placeholder="60000" class="round" type="text">

            </div>
            </div>
          </tab>
          </tab-system>

        </div>
      </dialog-list>

    </div>
  </tab>


  <tab label="Menus" icon="list alternate">
  <div style="padding: 16px;text-align:center"id="xin5n">Webhook não suporta Menus</div>
    <div style="padding: 8px;" id="xin5">

      <dialog-list id="selectMenus" fields='["placeholder", "id", "tempVarName", "row", "min", "max", "mode", "time", "options", "actions", "disabled"]' dialogTitle="Select Menu Info" dialogWidth="800" dialogHeight="700" listLabel="Menus" listStyle="height: calc(100vh - 350px);" itemName="Select Menu" itemCols="1" itemHeight="40px;" itemTextFunction="glob.formatItem3(data)" itemStyle="text-align: left; line-height: 40px;">
        <div style="padding: 16px;">
          <div style="width: calc(33% - 16px); float: left; margin-right: 16px;">
            <span class="dbminputlabel">Nom du menu</span>
            <input id="placeholder" class="round" type="text">

            <br>

            <span class="dbminputlabel">Nom de la variable temporaire</span>
            <input id="tempVarName" placeholder="Contiens le choix de l'utilisateur..." class="round" type="text">

            <br>

            <span class="dbminputlabel">Nombre minimum de choix</span>
            <input id="min" class="round" type="text" value="1">

            <br>

            <span class="dbminputlabel">
            Action Response Mode
              <help-icon type="ACTION_RESPONSE_MODE"></help-icon>
            </span><br>
            <select id="mode" class="round">
            <option value="PERSONAL">Once, Command User Only</option>
            <option value="PUBLIC">Once, Anyone Can Use</option>
            <option value="MULTIPERSONAL">Multi, Command User Only</option>
            <option value="MULTI" selected>Multi, Anyone Can Use</option>
            <option value="PERSISTENT">Persistent</option>
            </select>

            <dbm-checkbox id="disabled" style="margin-top: 15px;" label="Créer un menu désactivé"></dbm-checkbox>
          </div>
          <div style="width: calc(33% - 16px); float: left; margin-right: 16px;">
            <span class="dbminputlabel">ID Unique</span>
            <input id="id" placeholder="Laisser vide pour le générer..." class="round" type="text">

            <br>

            <span class="dbminputlabel">Position de l'action (1 - 5)</span>
            <input id="row" placeholder="laisser vide = par défaut..." class="round" type="text">

            <br>

            <span class="dbminputlabel">Nombre maximum de choix</span>
            <input id="max" class="round" type="text" value="1">

            <br>

            <span class="dbminputlabel">Limite de temps (millisecondes)</span>
            <input id="time" placeholder="60000" class="round" type="text">
          </div>
          <div style="width: calc(34% - 8px); height: 300px; float: left; margin-left: 8px;">

            <dialog-list id="options" fields='["label", "description", "value", "emoji", "default", "val1", "val2", "comparar", "formula"]' dialogTitle="Select Menu Option Info" dialogWidth="460" dialogHeight="570" listLabel="Options" listStyle="height: 210px;" itemName="Option" itemCols="1" itemHeight="20px;" itemTextFunction="'[ ' + (data.formula || 'Afficher') + ' ] ' + data.label" itemStyle="text-align: left; line-height: 20px;">
            <div style="padding: 16px;background:rgba(0,0,0,0.3)">
                 <span class="dbminputlabel">Paramètre d'affichage du choix</span><br>
                 <select id="formula" class="round">
                 <option value="Afficher" selected>Toujours afficher</option>
                 <option value="Faux">Afficher seulement si la condition est fausse</option>
                 <option value="Vrai">Afficher seulement si la condition est vraie</option>
               </select>
               <br>

              <table style="width: 100%;">
                  <tr>
                    <td>
                      <span class="dbminputlabel">Valeur A</span>
                      <input id="val1" class="round" type="text">
                    </td>
                    <td>
                      <span class="dbminputlabel">Condition</span><br>
                      <select id="comparar" class="round">
                      <optgroup label="Numéro ou Texte">
                        <option value="0">Valeur A - Existe</option>
                        <option value="1" selected><-Est égale à-></option>
                        <option value="2"><-Est éxactement égale à-></option>
                      </optgroup>
                      <optgroup label="Numéro">
                        <option value="3"><-Inférieur à-></option>
                        <option value="13"><-Inférieur ou égale à-></option>
                        <option value="4"><-Supérieur à-></option>
                        <option value="12"><-Supérieur ou égale à-></option>
                        <option value="19">valeur A - est un nombre paire ?</option>
                        <option value="20">valeur A - est un nombre impaire ?</option>
                        <option value="21">valeur A - est un nombre ?</option>
                      </optgroup>
                      <optgroup label="Texte">
                        <option value="6">Matches Regex</option>
                        <option value="14">Matches Full Regex</option>
                        <option value="7"><-Taille supérieur à-></option>
                        <option value="8"><-Taille inférieur à-></option>
                        <option value="9"><-Taille égale à-></option>
                        <option value="10"><-Commence par-></option>
                        <option value="11"><-Termine par-></option>
                        <option value="16">valeur A - possède des accents ?</option>
                        <option value="18">Est égale aux mots  ["a" , "b" , "c"]</option>
                        <option value="24">valeur A - Est un texte</option>
                        <option value="23">valeur A - Est un URL d'image ?</option>
                        <option value="25">valeur A - Est un URL ?</option>
                        <option value="26">valeur A - Le mail existe-t-il ?</option>
                      </optgroup>
                      <optgroup label="Texte ~ Contient">
                        <option value="5"><-Contient exactement-></option>
                        <option value="29"><-Contient ~ Ignorer les minuscules/majuscules-></option>
                        <option value="30"><-Contient ~ Ignorer les accents-></option>
                        <option value="31"><-Contient ~ Ignorer les accents, les minuscules et les majuscules-></option>
                        <option value="17"><-Contient exactement ["a" , "b" , "c"]</option>
                        <option value="27"><-Contient des URL?</option>
                        <option value="28"><-Contient des invitations Discord ?</option>
                        <option value="32"><-Contient exactement le mot-></option>
                        <option value="33"><-Contient le mot ~ Ignorer les minuscules/majuscules-></option>
                        <option value="34"><-Contient le mot ~ Ignorer les accents-></option>
                        <option value="35"><-Contient le mot ~ Ignorer les accents, les minuscules et les majuscules-></option>
                        <option value="36"><-Contient les mots ~ utiliser des virgules ~ Ignorer les accents, les minuscules et les majuscules-></option>
                      </optgroup>
                      <optgroup label="Autres">
                        <option value="22">valeur A - Est une liste ?</option>
                        </optgroup>
                      </select>
                    </td>
                    <td>
                      <span class="dbminputlabel">Valeur B</span><br>
                      <input id="val2" class="round" type="text">
                    </td>
                  </tr>
                </table>

        </div>
        <div style="padding: 16px">
                <span class="dbminputlabel">Nom du choix</span>
                <input id="label" placeholder="Nom d'affichage du choix" class="round" type="text">
                <br>

                <span class="dbminputlabel">Description</span>
                <input id="description" placeholder="Décris ton choix" class="round" type="text">
                <br>

                <span class="dbminputlabel">Valeur du choix</span>
                <input id="value" placeholder="La valeur du choix sera envoyé à la variable qui contient réponse" class="round" type="text">

                <br>

                <span class="dbminputlabel">Emoji > Clique droit pour insérer</span>
                <input id="emoji" placeholder="Laisser vide pour désactiver..." class="round" type="text">

                <br>

                <span class="dbminputlabel">Selectionné par defaut</span><br>
                <select id="default" class="round">
                  <option value="true">Oui</option>
                  <option value="false" selected>Non</option>
                </select>
              </div>
            </dialog-list>
          </div>

          <br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br>

          <action-list-input mode="SELECT" id="actions" height="calc(100vh - 460px)">
            <script class="setupTempVars">
              const elem = document.getElementById("tempVarName");
              if(elem?.value) {
                tempVars.push([elem.value, "Text"]);
              }
            </script>
          </action-list-input>

        </div>
      </dialog-list>

    </div>
  </tab>


  <tab label="Fichiers" icon="file image">
    <div style="padding: 8px;">

      <dialog-list id="attachments" fields='["tipo", "url", "canvasvar", "canvasnom", "compress", "name", "spoiler"]' dialogTitle="Information de la pièce jointe" dialogWidth="500" dialogHeight="480" listLabel="Pièce jointe" listStyle="height: calc(100vh - 350px);" itemName="File" itemCols="1" itemHeight="30px;" itemTextFunction="glob.formatItem(data)" itemStyle="text-align: left; line-height: 30px;">
        <div style="padding: 16px;" onmouseover="(function(){

          var aselect = document.getElementById('tipo');
            var avalue = aselect.options[aselect.selectedIndex].value

          if (avalue == 0) {
              document.getElementById('xinxyla1').style.display = 'none';
              document.getElementById('xinxyla2').style.display = 'block';
              document.getElementById('xinxyla3').style.display = 'block';
        }
        if (avalue == 1) {
          document.getElementById('xinxyla2').style.display = 'none';
          document.getElementById('xinxyla1').style.display = 'block';
          document.getElementById('xinxyla3').style.display = 'block';
    }

    if (avalue == 2 || avalue == 3) {
      document.getElementById('xinxyla2').style.display = 'none';
      document.getElementById('xinxyla1').style.display = 'block';
      document.getElementById('xinxyla3').style.display = 'none';
    }


        })()">

        <span class="dbminputlabel">Type de la pièce jointe</span>
        <select id="tipo" class="round" onchange="(function(){

          var aselect = document.getElementById('tipo');
            var avalue = aselect.options[aselect.selectedIndex].value

            if (avalue == 0) {
              document.getElementById('xinxyla1').style.display = 'none';
              document.getElementById('xinxyla2').style.display = 'block';
              document.getElementById('xinxyla3').style.display = 'block';
        }
        if (avalue == 1) {
          document.getElementById('xinxyla2').style.display = 'none';
          document.getElementById('xinxyla1').style.display = 'block';
          document.getElementById('xinxyla3').style.display = 'block';
    }

    if (avalue == 2 || avalue == 3) {
      document.getElementById('xinxyla2').style.display = 'none';
      document.getElementById('xinxyla1').style.display = 'block';
      document.getElementById('xinxyla3').style.display = 'none';
    }

        })()">>
          <option value="0">Chemin du fichier Local/URL</option>
          <option value="1">Canvas</option>
          <option value="2">DBM Imagens</option>
          <option value="3">Envoyer le contenu d'une variable en .txt</option>
        </select>
        <br><div id="xinxyla2">
          <span class="dbminputlabel">Chemin du fichier Local/URL</span>
          <input id="url" class="round" type="text" value="resources/">

          <br></div>
          <div id="xinxyla1">
          <span class="dbminputlabel">Type de la variable</span><br>
    <select id="canvasvar" class="round">
      ${data.variables[1]}
    </select>
  <br>
          <span class="dbminputlabel">Nom de la variable</span>
          <input id="canvasnom" class="round" type="text" list="variableList">
  <br>
  <div id="xinxyla3">
          <span class="dbminputlabel">Niveau de compression</span><br>
          <select id="compress" class="round">
            <option value="0">1</option>
            <option value="1">2</option>
            <option value="2">3</option>
            <option value="3">4</option>
            <option value="4">5</option>
            <option value="5">6</option>
            <option value="6">7</option>
            <option value="7">8</option>
            <option value="8">9</option>
            <option value="9" selected>10</option>
          </select>
          <br></div></div>

          <span class="dbminputlabel">Nom du fichier</span>
          <input id="name" class="round" type="text" placeholder="Laisser vide = par défaut...">

          <br>

          <div style="text-align: center; padding-top: 4px;">
            <dbm-checkbox id="spoiler" label="Indiquer comme spoiler"></dbm-checkbox>
          </div>
        </div>
      </dialog-list>
    </div>
  </tab>


  <tab label="Config" icon="cogs">
    <div style="padding: 8px;height: calc(100vh - 292px);overflow-y: scroll;overflow-x: hidden;width:100%">
    <div style="padding-bottom: 12px;padding-top: 12px">
    <table style="width:100%;"><tr>
    <td><span class="dbminputlabel">Description de l'action</span><br><input type="text" class="round" id="description" placeholder="Laisser vide pour supprimer"></td>
    <td style="padding:0px 0px 0px 10px;width:55px"><div style="float:left;padding:0px 0px 0px 7px;margin-top:-5px"><dbm-checkbox id="descriptionx" label="Activé"></dbm-checkbox></div><br><input type="color" value="#ffffff" class="round" id="descriptioncolor"></td>
    </tr></table>
    </div>

    <div id="xincheck">
    <span class="dbminputlabel">Options</span><br><div style="padding:10px;background:rgba(0,0,0,0.2)">
      <dbm-checkbox id="reply" label="Lier la réponse à l'interaction si possible" checked></dbm-checkbox>
      <xinspace>
      <dbm-checkbox id="ephemeral" label="Réponse éphémère"></dbm-checkbox>
      <xinspace>
      <dbm-checkbox id="mentions" label="@ Notifier les membres/rôles" checked></dbm-checkbox>
      <xinspace>
      <dbm-checkbox id="messageoff" label="Ajouter/Remplacer le texte" checked></dbm-checkbox>
      <xinspace>
      <dbm-checkbox id="tts" label="Texte-Pour-Narrateur"></dbm-checkbox>
      <xinspace>
      <dbm-checkbox id="overwrite" label="Remplacer les modifications"></dbm-checkbox>
      <xinspace>
      <dbm-checkbox id="dontSend" label="Ne pas envoyer le message"></dbm-checkbox>

      </div><br></div>

      <div style="width:96%;display:block">
      <div style="padding-bottom: 12px;" id="xin1">
        <retrieve-from-variable allowNone dropdownLabel="Editer le message" selectId="editMessage" variableInputId="editMessageVarName" variableContainerId="editMessageVarNameContainer">
          <option value="intUpdate">Interaction Update</option>
        </retrieve-from-variable>


      <br><br><br></div>


    <div>
      <div style="float: left; width: 35%">
      <span class="dbminputlabel">Envoyer en Webhook</span><br>
      <select id="storagewebhook" class="round" onchange="glob.onComparisonChanged2(this)">
      <option value="0" selecionado>Non</option>
      <option value="1">Temp variable</option>
      <option value="2">Server variable</option>
      <option value="3">Global variable</option>
    </select>
    </div>
    <div id="webhookdiv" style="display: none; float: right; width: 60%;"><span id="ifName" class="dbminputlabel">nom da Variavel</span><br><input list="variableList" id="varwebhook" class="round" name="actionxinxyla" type="text"></div>
    <div id="webhookdiv2" style="display: none;padding-top: 12px;">
    <br><br><br>
    <span class="dbminputlabel">nom do Webhook</span><br>
    <input id="webhookname" class="round" type="text" style="width:100%" placeholder="Opcional">
    <br>
    <span class="dbminputlabel">URL de imagem do avatar Webhook</span><br>
    <input id="webhookavatar" class="round" type="text" style="width:100%" placeholder="Opcional"><br>
    <hr class="subtlebar" style="margin-top: 4px; margin-bottom: -54px">
    </div>
      <br><br><br>
      <div style="padding-top: 12px">
        <store-in-variable allowNone dropdownLabel="Stocker dans" selectId="storage" variableInputId="varName2" variableContainerId="varNameContainer2"></store-in-variable>
      </div>

      <br><br><br>
      <hr class="subtlebar" style="margin-top: 4px; margin-bottom: 4px">
      <br>
      <div>

      <span class="dbminputlabel">Gestion des erreurs</span>
      <br>
    <div style="padding: 10px; background: rgba(0,0,0,0.2);">
      <dbm-checkbox id="errcmd" label="Afficher l'erreur dans la console" checked></dbm-checkbox>
    </div>

    <br>

    <div id="divValueError2" style="float: left; width: 35%">
      <span class="dbminputlabel">Si une erreur survient</span><br>
      <select id="iffalse" class="round" onchange="glob.onComparisonChanged(this)">
        <option value="0">Continuer l'action</option>
        <option value="1" selecionado>Stoper l'action</option>
        <option value="2">Ignorer une action</option>
        <option value="3">Ignorer plusieurs actions</option>
        <option value="4">Aller à l'action ancré</option>
        <option value="5">Actions Spécial et continuer</option>
        <option value="99">Actions Spécial et arrêter</option>
      </select>
    </div>

    <div id="iffalseContainer" style="display: none; float: right; width: 55%;">
      <span id="xinelasT" class="dbminputlabel">Para</span>
      <input id="iffalseVal" class="round" type="text">
    </div>

    <action-list-input id="actionsError" style="margin-top: 50px;" height="calc(100vh - 430px)"></action-list-input>


    <br><br><br>

    <div id="divValueError" style="margin-top: 10px;">
      <div style="float: left; width: 35%;">
        <span class="dbminputlabel">Stocker l'erreur dans</span>
        <select id="storageError" class="round" onchange="glob.variableChangeError(this, 'varNameContainer')">
          ${data.variables[0]}
        </select>
      </div>

      <div id="varNameContainerError" style="float: right; display: none; width: 60%;">
        <span class="dbminputlabel">Nom de variable</span>
        <input id="varNameError" class="round" type="text">
      </div>
    </div>

      </div>

    </div>
  </tab>
  </tab-system></div>

  <style>
  xinspace{padding:5px 0px 0px 0px;display:block}
  .dbmmodsbr1{position:absolute;bottom:0px;border: 0px solid rgba(50,50,50,0.7);background:rgba(0,0,0,0.7);color:#999;padding:5px;left:0px;z-index:999999;cursor:pointer}
  .dbmmodsbr2{position:absolute;bottom:0px;border: 0px solid rgba(50,50,50,0.7);background:rgba(0,0,0,0.7);color:#999;padding:5px;right:0px;z-index:999999;cursor:pointer}
  </style>`;
  },

  //---------------------------------------------------------------------
  // Action Editor Init Code
  //
  // When the HTML is first applied to the action editor, this code
  // is also run. This helps add modifications or setup reactionary
  // functions for the DOM elements.
  //---------------------------------------------------------------------

  init: function () {
    const { glob, document } = this;

    const textarea = document.getElementById('message');
    const contador = document.getElementById('contador');
    const comprimentoTexto = textarea.value.length;
    contador.textContent = `${comprimentoTexto} caracteres`;
    textarea.addEventListener('input', () => {
      const comprimentoTexto = textarea.value.length;
      contador.textContent = `${comprimentoTexto} caracteres`;
    });


    glob.onComparisonChanged = function (event) {
      if (event.value == "0" || event.value == "1" || event.value == "7") {
        document.getElementById("iffalseContainer").style.display = "none";
        document.getElementById("actionsError").style.display = "none";
      } else if (event.value == "5" || event.value == "99") {
        document.getElementById("iffalseContainer").style.display = "none";
        document.getElementById("actionsError").style.display = null;
      } else {
        document.getElementById("iffalseContainer").style.display = null;
        document.getElementById("actionsError").style.display = "none";
      }

      if (event.value > "4") {
        document.getElementById("divValueError").style.marginTop = "-50px";
      } else {
        document.getElementById("divValueError").style.marginTop = "10px";
      }

      if (event.value == "2") {
        document.querySelector("[id='xinelasT']").innerText = "Numéro de l'action";
      }

      if (event.value == "3") {
        document.querySelector("[id='xinelasT']").innerText = "Nombres d'actions";
      }

      if (event.value == "4") {
        document.querySelector("[id='xinelasT']").innerText = "Nom de l'ancre";
      }
    }

    glob.variableChangeError = function (event) {
      if (event.value == "0") {
        document.getElementById("varNameContainerError").style.display = "none";
      } else {
        document.getElementById("varNameContainerError").style.display = null;
      }
    }

    glob.onComparisonChanged2 = function (event) {
      if (event.value > "0") {
        document.getElementById("webhookdiv").style.display = null;
        document.getElementById("webhookdiv2").style.display = null;
        document.getElementById("xincheck").style.display = "none";
        document.getElementById("xin1").style.display = "none";
        document.getElementById("xin2").style.display = "none";
        document.getElementById("xin3").style.display = "block";
        document.getElementById("xin4").style.display = "none";
        document.getElementById("xin5").style.display = "none";
        document.getElementById("xin4n").style.display = null;
        document.getElementById("xin5n").style.display = null;
        const myInput = document.querySelector("#reply")
        myInput.value = false
        const myInput2 = document.querySelector("#dontSend")
        myInput2.value = false
        const myInput3 = document.querySelector("#ephemeral")
        myInput3.value = false
        const myInput4 = document.querySelector("#tts")
        myInput4.value = false
        const myInput5 = document.querySelector("#overwrite")
        myInput5.value = false
        const myInput6 = document.querySelector("#editMessage")
        myInput6.value = 0
        const myInput7 = document.querySelector("#channel")
        myInput7.value = 0
      } else {
        document.getElementById("webhookdiv").style.display = "none";
        document.getElementById("webhookdiv2").style.display = "none";
        document.getElementById("xincheck").style.display = null;
        document.getElementById("xin1").style.display = null;
        document.getElementById("xin2").style.display = "block";
        document.getElementById("xin3").style.display = "none";
        document.getElementById("xin4").style.display = null;
        document.getElementById("xin5").style.display = null;
        document.getElementById("xin4n").style.display = "none";
        document.getElementById("xin5n").style.display = "none";
      }
    }

    glob.onComparisonChanged2(document.getElementById("storagewebhook"));
    glob.onComparisonChanged(document.getElementById("iffalse"));

    glob.variableChangeError(document.getElementById("storageError"));

    glob.formatItem = function (data) {
      let result = '<div style="display: inline-block; width: 200px; padding-left: 8px;">';
      const comp = data.tipo;
      switch (comp) {
        case "0":
          result += "Anexo: " + data.url;
          break;
        case "1":
          result += "Canvas: " + data.canvasnome;
          break;
        case "2":
          result += "DBM Imagens: " + data.canvasnome;
          break;
        case "3":
          result += "Enviar variavel: " + data.canvasnome;
          break;
      }
      result += "</div>";
      return result;
    }

    glob.formatItem2 = function (data) {
      let result = '<div style="display: inline-block; width: 100%; padding-left: 8px;"><table><tr><td style="width:100%">';
      const comp = "0";
      switch (comp) {
        case "0":
          result += data.emoji + ' ' + data.name;
          break;
      }
      result += "</td><td style='width:120px;text-align:right;padding:0px 10px 0px 0px'>" + data.id + "</td></tr></table></div>";
      return result;
    }

    glob.formatItem3 = function (data) {
      let result = '<div style="display: inline-block; width: 100%; padding-left: 8px;"><table><tr><td style="width:100%">';
      const comp = "0";
      switch (comp) {
        case "0":
          result += data.placeholder;
          break;
      }
      result += "</td><td style='width:120px;text-align:right;padding:0px 10px 0px 0px'>" + data.id + "</td></tr></table></div>";
      return result;
    }

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
  //---------------------------------------------------------------------
  // Action Editor On Save
  //
  // When the data for the action is saved, this function is called.
  // It provides the ability to modify the final data associated with
  // the action by retrieving it as an argument and returning a modified
  // version through the return value. This can be used to verify the
  // data and fill required entries the user did not.
  //
  // Its inclusion within action mods is optional.
  //---------------------------------------------------------------------

  onSave(data, helpers) {
    // generate unique ids if not provided by user since they are important
    if (Array.isArray(data?.buttons)) {
      for (let i = 0; i < data.buttons.length; i++) {
        if (!data.buttons[i].id) {
          data.buttons[i].id = "msg-button-" + helpers.generateUUID().substring(0, 7);
        }
      }
    }
    if (Array.isArray(data?.selectMenus)) {
      for (let i = 0; i < data.selectMenus.length; i++) {
        if (!data.selectMenus[i].id) {
          data.selectMenus[i].id = "msg-select-" + helpers.generateUUID().substring(0, 7);
        }
      }
    }
    return data;
  },

  //---------------------------------------------------------------------
  // Action Editor On Paste
  //
  // When the data for the action is pasted, this function is called.
  // It provides the ability to modify the final data associated with
  // the action by retrieving it as an argument and returning a modified
  // version through the return value.
  //
  // Its inclusion within action mods is optional.
  //---------------------------------------------------------------------

  onPaste(data, helpers) {
    if (Array.isArray(data?.buttons)) {
      for (let i = 0; i < data.buttons.length; i++) {
        const id = data.buttons[i].id;
        if (!id || id.startsWith("msg-button-")) {
          data.buttons[i].id = "msg-button-" + helpers.generateUUID().substring(0, 7);
        }
      }
    }
    if (Array.isArray(data?.selectMenus)) {
      for (let i = 0; i < data.selectMenus.length; i++) {
        const id = data.selectMenus[i].id;
        if (!id || id.startsWith("msg-select-")) {
          data.selectMenus[i].id = "msg-select-" + helpers.generateUUID().substring(0, 7);
        }
      }
    }
    return data;
  },

  //---------------------------------------------------------------------
  // Action Bot Function
  //
  // This is the function for the action within the Bot's Action class.
  // Keep in mind event calls won't have access to the "msg" parameter,
  // so be sure to provide checks for variable existence.
  //---------------------------------------------------------------------

  async action(cache) {
    const _this = this;
    const data = cache.actions[cache.index];
    var messageoff = data.messageoff;
    if (messageoff == undefined) messageoff = true;
    const channel = parseInt(data.channel, 10);
    const message = this.evalMessage(data.message, cache);
    const storagewebhook = parseInt(data.storagewebhook)
    const webhookname = this.evalMessage(data.webhookname, cache)
    const webhookavatar = this.evalMessage(data.webhookavatar, cache)
    if (storagewebhook > 0) {
      varwebhook = this.evalMessage(data.varwebhook, cache)
      Mods = this.getMods()
      webhook = Mods.getWebhook(storagewebhook, varwebhook, cache)
    }
    if (data.channel === undefined || message === undefined) {
      return;
    }

    let target = await this.getSendReplyTarget(channel, this.evalMessage(data.varName, cache), cache);

    let messageOptions = {};

    const overwrite = data.overwrite;

    let isEdit = 0;
    if (data.editMessage === "intUpdate") {
      isEdit = 2;
    } else {
      const editMessage = parseInt(data.editMessage, 10);
      if (typeof editMessage === "number" && editMessage >= 0) {
        const editVarName = this.evalMessage(data.editMessageVarName, cache);
        const editObject = this.getVariable(editMessage, editVarName, cache);
        const { Message } = this.getDBM().DiscordJS;
        if (editObject) {
          if (editObject instanceof Message) {
            target = editObject;
            isEdit = 1;
          } else {
            messageOptions = editObject;
          }
        }
      }
    }

    let content;
    if (messageoff == true) content = message.length > 0 ? message : "";

    if (content) {
      if (messageOptions.content && !overwrite) {
        messageOptions.content += content;
      } else {
        messageOptions.content = content;
      }
    }

    if (data.embeds?.length > 0) {
      const { MessageEmbed } = this.getDBM().DiscordJS;

      if (!Array.isArray(messageOptions.embeds) || overwrite) {
        messageOptions.embeds = [];
      }

      const embedDatas = data.embeds;
      for (let i = 0; i < embedDatas.length; i++) {
        const embedData = embedDatas[i];

        if (embedData.formula == "1" || embedData.formula == "2") {
          const comparar = parseInt(embedData.comparar, 10);
          val1 = this.evalMessage(embedData.val1, cache);
          val2 = this.evalMessage(embedData.val2, cache);

          switch (comparar) {
            case 0:
              result = val1 !== undefined;
              break;
            case 1:
              result = val1 == val2;
              break;
            case 2:
              result = val1 === val2;
              break;
            case 3:
              result = val1 < val2;
              break;
            case 4:
              result = val1 > val2;
              break;
            case 5:
              if (typeof val1?.toString().includes === "function") {
                result = val1.toString().includes(val2);
              }
              break;
            case 6:
              result = Boolean(val1.toString().match(new RegExp('^' + val2 + '$', 'i')));
              break;
            case 7:
              result = Boolean(val1.toString().length > val2);
              break;
            case 8:
              result = Boolean(val1.toString().length < val2);
              break;
            case 9:
              result = Boolean(val1.toString().length == val2);
              break;
            case 10:
              result = val1.toString().startsWith(val2);
              break;
            case 11:
              result = val1.toString().endsWith(val2);
              break;
            case 12:
              result = Boolean(val1 >= val2);
              break;
            case 13:
              result = Boolean(val1 <= val2);
              break;
            case 14:
              result = Boolean(val1.toString().match(new RegExp(val2)));
              break;
            case 16:
              const conditions = ["Ä", "Å", "Á", "Â", "À", "Ã", "Ā", "Ă", "Ą", "ā", "ă", "ą", "ä", "á", "â", "à", "ã", "É", "Ê", "Ë", "È", "Ė", "Ę", "Ě", "Ĕ", "Ē", "ė", "ę", "ě", "ĕ", "ē", "é", "ê", "ë", "è", "Í", "Î", "Ï", "Ì", "İ", "Į", "Ī", "ı", "į", "ī", "í", "î", "ï", "ì", "Ö", "Ó", "Ô", "Ò", "Õ", "Ő", "Ō", "ő", "ō", "ö", "ó", "ô", "ò", "õ", "Ü", "Ú", "Û", "Ų", "Ű", "Ů", "Ū", "ų", "ű", "ů", "ū", "ü", "ú", "û", "ù", "Ç", "Ć", "Č", "ç", "ć", "č", "Ñ", "Ň", "Ņ", "Ń", "ñ", "ň", "ņ", "ń", "Ÿ", "Ý", "ý", "Ź", "Ż", "Ž", "ź", "ż", "ž", "Ł", "Ľ", "Ļ", "Ĺ", "ł", "ľ", "ĺ", "Ķ", "ķ", "Ģ", "Ğ", "ģ", "ğ", "Ď", "ď", "Ś", "Š", "Ş", "ś", "š", "ş", "Ť", "Ț", "Ţ", "ť", "ț", "ţ", "Ŕ", "Ř", "ŕ", "ř"]
              result = conditions.some(el => val1.includes(el));
              break;
            case 17:
              const conditionsX = val2
              result = conditionsX.some(els => val1.includes(els));
              break;
            case 18:
              const conditionsZ = val2
              result = conditionsZ.some(elz => val1 == (elz));
              break;
            case 19:
              result = val1 % 2 == 0
              break;
            case 20:
              result = val1 % 2 == 1
              break;
            case 21:
              result = Boolean(!isNaN(parseFloat(val1.toString().replace(",", "."))));
              break;
            case 22:
              result = Boolean(Array.isArray(val1));
              break;
            case 23:
              const isImageUrl = require("is-image-url");
              result = isImageUrl(val1);
              break;
            case 24:
              result = typeof val1 === "string";
              break;
            case 25:
              const isUrl = require("is-url");
              result = isUrl(val1);
              break;
            case 26:
              const mail = require("email-existence");
              mail.check(val1, (error, response) => {
                result = response;
              });
              break;
            case 27:
              let pattern = /(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})/gi;
              result = val1.match(pattern);
              break;
            case 28:
              invite = new RegExp(/(https?:\/\/)?(www\.)?(discord\.(gg|io|me|li)|discordapp\.com\/invite)\/.+[a-z]/g);
              result = invite.test(val1);
              break;
            case 29:
              result = val1.toLowerCase().includes(val2.toLowerCase());
              break;
            case 30:
              tratarval1 = val1.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
              tratar = val2.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
              result = tratarval1.includes(tratar);
              break;
            case 31:
              tratarval1 = val1.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
              tratar = val2.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
              result = tratarval1.toLowerCase().includes(tratar);
              break;
            case 32:
              var words = val1.split(" ");
              result = words.includes(val2);
              break;
            case 33:
              var words = val1.toLowerCase().split(" ");
              result = words.includes(val2.toLowerCase());
              break;
            case 34:
              var words = val1.normalize("NFD").replace(/[\u0300-\u036f]/g, "").split(" ");
              result = words.includes(val2.normalize("NFD").replace(/[\u0300-\u036f]/g, ""));
              break;
            case 35:
              var words = val1.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").split(" ");
              result = words.includes(val2.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, ""));
              break;
            case 36:
              var separador = val1.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").split(" ");
              var valor2 = val2.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").split(",");
              result = separador.some(els => valor2.includes(els));
              break;
          }

          if (embedData.formula == "1" && Boolean(result) != false) continue;
          if (embedData.formula == "2" && Boolean(result) != true) continue;
        }

        const embed = new MessageEmbed();
        if (embedData.title) embed.setTitle(this.evalMessage(embedData.title, cache));
        if (this.evalMessage(embedData.url, cache)) embed.setURL(this.evalMessage(embedData.url, cache));
        if (embedData.colorrandom == true) {
          embed.setColor("RANDOM");
        }
        if (embedData.color) {
          if (embedData.colorrandom == true) {
            embed.setColor("RANDOM");
          } else {
            embed.setColor(this.evalMessage(embedData.color, cache));
          }
        }

        if (embedData.timestamp == "true" || embedData.timestamp == true) {
          if (embedData.timestampper == "" || embedData.timestampper == undefined) {
            embed.setTimestamp()
          } else {
            embed.setTimestamp(parseFloat(this.evalMessage(embedData.timestampper, cache)))
          }
        }

        var imgURL = this.evalMessage(embedData.imageUrl, cache);

        if (imgURL) {
          if (imgURL.toString().startsWith("http")) {
            embed.setImage(imgURL);
          } else {
            embed.setImage("attachment://" + imgURL);
          }
        }

        var thumb = this.evalMessage(embedData.thumbUrl, cache);

        if (thumb) {
          if (thumb.toString().startsWith("http")) {
            embed.setThumbnail(thumb);
          } else {
            embed.setThumbnail("attachment://" + thumb);
          }
        }

        if (embedData.description) embed.setDescription(this.evalMessage(embedData.description || "\u200B", cache));

        if (embedData.fields?.length > 0) {
          const fields = embedData.fields;
          for (let i = 0; i < fields.length; i++) {
            const f = fields[i];

            val1 = this.evalMessage(f.val1, cache);
            val2 = this.evalMessage(f.val2, cache);
            result = true;

            if (f.formula == "1" || f.formula == "2") {
              const compare = parseInt(f.comparar, 10);
              if (compare !== 6) {
                val1 = this.evalIfPossible(val1, cache)
                val2 = this.evalIfPossible(val2, cache)
              }
              switch (compare) {
                case 0:
                  result = val1 !== undefined;
                  break;
                case 1:
                  result = val1 == val2;
                  break;
                case 2:
                  result = val1 === val2;
                  break;
                case 3:
                  result = val1 < val2;
                  break;
                case 4:
                  result = val1 > val2;
                  break;
                case 5:
                  if (typeof val1?.toString().includes === "function") {
                    result = val1.toString().includes(val2);
                  }
                  break;
                case 6:
                  result = Boolean(val1.toString().match(new RegExp('^' + val2 + '$', 'i')));
                  break;
                case 7:
                  result = Boolean(val1.toString().length > val2);
                  break;
                case 8:
                  result = Boolean(val1.toString().length < val2);
                  break;
                case 9:
                  result = Boolean(val1.toString().length == val2);
                  break;
                case 10:
                  result = val1.toString().startsWith(val2);
                  break;
                case 11:
                  result = val1.toString().endsWith(val2);
                  break;
                case 12:
                  result = Boolean(val1 >= val2);
                  break;
                case 13:
                  result = Boolean(val1 <= val2);
                  break;
                case 14:
                  result = Boolean(val1.toString().match(new RegExp(val2)));
                  break;
                case 16:
                  const conditions = ["Ä", "Å", "Á", "Â", "À", "Ã", "Ā", "Ă", "Ą", "ā", "ă", "ą", "ä", "á", "â", "à", "ã", "É", "Ê", "Ë", "È", "Ė", "Ę", "Ě", "Ĕ", "Ē", "ė", "ę", "ě", "ĕ", "ē", "é", "ê", "ë", "è", "Í", "Î", "Ï", "Ì", "İ", "Į", "Ī", "ı", "į", "ī", "í", "î", "ï", "ì", "Ö", "Ó", "Ô", "Ò", "Õ", "Ő", "Ō", "ő", "ō", "ö", "ó", "ô", "ò", "õ", "Ü", "Ú", "Û", "Ų", "Ű", "Ů", "Ū", "ų", "ű", "ů", "ū", "ü", "ú", "û", "ù", "Ç", "Ć", "Č", "ç", "ć", "č", "Ñ", "Ň", "Ņ", "Ń", "ñ", "ň", "ņ", "ń", "Ÿ", "Ý", "ý", "Ź", "Ż", "Ž", "ź", "ż", "ž", "Ł", "Ľ", "Ļ", "Ĺ", "ł", "ľ", "ĺ", "Ķ", "ķ", "Ģ", "Ğ", "ģ", "ğ", "Ď", "ď", "Ś", "Š", "Ş", "ś", "š", "ş", "Ť", "Ț", "Ţ", "ť", "ț", "ţ", "Ŕ", "Ř", "ŕ", "ř"]
                  result = conditions.some(el => val1.includes(el));
                  break;
                case 17:
                  const conditionsX = val2
                  result = conditionsX.some(els => val1.includes(els));
                  break;
                case 18:
                  const conditionsZ = val2
                  result = conditionsZ.some(elz => val1 == (elz));
                  break;
                case 19:
                  result = val1 % 2 == 0
                  break;
                case 20:
                  result = val1 % 2 == 1
                  break;
                case 21:
                  result = Boolean(!isNaN(parseFloat(val1.toString().replace(",", "."))));
                  break;
                case 22:
                  result = Boolean(Array.isArray(val1));
                  break;
                case 23:
                  const isImageUrl = require("is-image-url");
                  result = isImageUrl(val1);
                  break;
                case 24:
                  result = typeof val1 === "string";
                  break;
                case 25:
                  const isUrl = require("is-url");
                  result = isUrl(val1);
                  break;
                case 26:
                  const mail = require("email-existence");
                  mail.check(val1, (error, response) => {
                    result = response;
                  });
                  break;
                case 27:
                  let pattern = /(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})/gi;
                  result = val1.match(pattern);
                  break;
                case 28:
                  invite = new RegExp(/(https?:\/\/)?(www\.)?(discord\.(gg|io|me|li)|discordapp\.com\/invite)\/.+[a-z]/g);
                  result = invite.test(val1);
                  break;
                case 29:
                  result = val1.toLowerCase().includes(val2.toLowerCase());
                  break;
                case 30:
                  tratarval1 = val1.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
                  tratar = val2.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
                  result = tratarval1.includes(tratar);
                  break;
                case 31:
                  tratarval1 = val1.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
                  tratar = val2.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
                  result = tratarval1.toLowerCase().includes(tratar);
                  break;
                case 32:
                  var words = val1.split(" ");
                  result = words.includes(val2);
                  break;
                case 33:
                  var words = val1.toLowerCase().split(" ");
                  result = words.includes(val2.toLowerCase());
                  break;
                case 34:
                  var words = val1.normalize("NFD").replace(/[\u0300-\u036f]/g, "").split(" ");
                  result = words.includes(val2.normalize("NFD").replace(/[\u0300-\u036f]/g, ""));
                  break;
                case 35:
                  var words = val1.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").split(" ");
                  result = words.includes(val2.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, ""));
                  break;
                case 36:
                  var separador = val1.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").split(" ");
                  var valor2 = val2.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").split(",");
                  result = separador.some(els => valor2.includes(els));
                  break;
              }
            }

            if (f.formula == "1") {
              if (result == false) {
                result = true
              } else { result = false }
            }

            if (result == true) {
              embed.addFields({ name: this.evalMessage(f.name || '\u200B', cache), value: this.evalMessage(f.value || '\u200B', cache), inline: f.inline === "true"})
            };
          }
        }

        var authorIcon = this.evalMessage(embedData.authorIcon, cache) || null;
        var authorURL = this.evalMessage(embedData.authorUrl, cache) || null;

        if (!authorIcon?.toString().startsWith("http")) {
          authorIcon = "attachment://" + authorIcon;
        }

        if (embedData.author) {
          embed.setAuthor({
            name: this.evalMessage(embedData.author, cache),
            iconURL: authorIcon,
            url: authorURL,
          });
        }

        var iconURL = this.evalMessage(embedData.footerIconUrl, cache) || null;

        if (!iconURL?.toString().startsWith("http")) {
          iconURL = "attachment://" + iconURL;
        }

        if (embedData.footerText) {
          embed.setFooter({
            text: this.evalMessage(embedData.footerText, cache),
            iconURL: iconURL,
          });
        }

        messageOptions.embeds.push(embed);
      }
    }

    if (data.mentions == false) {
      messageOptions.allowedMentions = {};
      messageOptions.allowedMentions.repliedUser = [];
      messageOptions.allowedMentions.repliedUser = data.mentions;
    }

    let componentsArr = [];
    let awaitResponses = [];

    if (!overwrite && messageOptions.components?.length > 0) {
      componentsArr = messageOptions.components.map(function (comps) {
        return comps.components;
      });
    }

    const defaultTime = 60000;

    if (Array.isArray(data.buttons)) {
      for (let i = 0; i < data.buttons.length; i++) {

        const botoesconfig = data.buttons;
        const fbot = botoesconfig[i];

        val1 = this.evalMessage(fbot.val1, cache);
        val2 = this.evalMessage(fbot.val2, cache);
        result = true;

        if (fbot.formula == "1" || fbot.formula == "2" || fbot.formula == "3" || fbot.formula == "4") {
          const compare = parseInt(fbot.comparar, 10);
          if (compare !== 6) {
            val1 = this.evalIfPossible(val1, cache)
            val2 = this.evalIfPossible(val2, cache)
          }
          switch (compare) {
            case 0:
              result = val1 !== undefined;
              break;
            case 1:
              result = val1 == val2;
              break;
            case 2:
              result = val1 === val2;
              break;
            case 3:
              result = val1 < val2;
              break;
            case 4:
              result = val1 > val2;
              break;
            case 5:
              if (typeof val1?.toString().includes === "function") {
                result = val1.toString().includes(val2);
              }
              break;
            case 6:
              result = Boolean(val1.toString().match(new RegExp('^' + val2 + '$', 'i')));
              break;
            case 7:
              result = Boolean(val1.toString().length > val2);
              break;
            case 8:
              result = Boolean(val1.toString().length < val2);
              break;
            case 9:
              result = Boolean(val1.toString().length == val2);
              break;
            case 10:
              result = val1.toString().startsWith(val2);
              break;
            case 11:
              result = val1.toString().endsWith(val2);
              break;
            case 12:
              result = Boolean(val1 >= val2);
              break;
            case 13:
              result = Boolean(val1 <= val2);
              break;
            case 14:
              result = Boolean(val1.toString().match(new RegExp(val2)));
              break;
            case 16:
              const conditions = ["Ä", "Å", "Á", "Â", "À", "Ã", "Ā", "Ă", "Ą", "ā", "ă", "ą", "ä", "á", "â", "à", "ã", "É", "Ê", "Ë", "È", "Ė", "Ę", "Ě", "Ĕ", "Ē", "ė", "ę", "ě", "ĕ", "ē", "é", "ê", "ë", "è", "Í", "Î", "Ï", "Ì", "İ", "Į", "Ī", "ı", "į", "ī", "í", "î", "ï", "ì", "Ö", "Ó", "Ô", "Ò", "Õ", "Ő", "Ō", "ő", "ō", "ö", "ó", "ô", "ò", "õ", "Ü", "Ú", "Û", "Ų", "Ű", "Ů", "Ū", "ų", "ű", "ů", "ū", "ü", "ú", "û", "ù", "Ç", "Ć", "Č", "ç", "ć", "č", "Ñ", "Ň", "Ņ", "Ń", "ñ", "ň", "ņ", "ń", "Ÿ", "Ý", "ý", "Ź", "Ż", "Ž", "ź", "ż", "ž", "Ł", "Ľ", "Ļ", "Ĺ", "ł", "ľ", "ĺ", "Ķ", "ķ", "Ģ", "Ğ", "ģ", "ğ", "Ď", "ď", "Ś", "Š", "Ş", "ś", "š", "ş", "Ť", "Ț", "Ţ", "ť", "ț", "ţ", "Ŕ", "Ř", "ŕ", "ř"]
              result = conditions.some(el => val1.includes(el));
              break;
            case 17:
              const conditionsX = val2
              result = conditionsX.some(els => val1.includes(els));
              break;
            case 18:
              const conditionsZ = val2
              result = conditionsZ.some(elz => val1 == (elz));
              break;
            case 19:
              result = val1 % 2 == 0
              break;
            case 20:
              result = val1 % 2 == 1
              break;
            case 21:
              result = Boolean(!isNaN(parseFloat(val1.toString().replace(",", "."))));
              break;
            case 22:
              result = Boolean(Array.isArray(val1));
              break;
            case 23:
              const isImageUrl = require("is-image-url");
              result = isImageUrl(val1);
              break;
            case 24:
              result = typeof val1 === "string";
              break;
            case 25:
              const isUrl = require("is-url");
              result = isUrl(val1);
              break;
            case 26:
              const mail = require("email-existence");
              mail.check(val1, (error, response) => {
                result = response;
              });
              break;
            case 27:
              let pattern = /(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})/gi;
              result = val1.match(pattern);
              break;
            case 28:
              invite = new RegExp(/(https?:\/\/)?(www\.)?(discord\.(gg|io|me|li)|discordapp\.com\/invite)\/.+[a-z]/g);
              result = invite.test(val1);
              break;
            case 29:
              result = val1.toLowerCase().includes(val2.toLowerCase());
              break;
            case 30:
              tratarval1 = val1.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
              tratar = val2.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
              result = tratarval1.includes(tratar);
              break;
            case 31:
              tratarval1 = val1.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
              tratar = val2.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
              result = tratarval1.toLowerCase().includes(tratar);
              break;
            case 32:
              var words = val1.split(" ");
              result = words.includes(val2);
              break;
            case 33:
              var words = val1.toLowerCase().split(" ");
              result = words.includes(val2.toLowerCase());
              break;
            case 34:
              var words = val1.normalize("NFD").replace(/[\u0300-\u036f]/g, "").split(" ");
              result = words.includes(val2.normalize("NFD").replace(/[\u0300-\u036f]/g, ""));
              break;
            case 35:
              var words = val1.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").split(" ");
              result = words.includes(val2.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, ""));
              break;
            case 36:
              var separador = val1.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").split(" ");
              var valor2 = val2.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").split(",");
              result = separador.some(els => valor2.includes(els));
              break;
          }
        }


        if (fbot.formula == "1") {
          if (result == false) {
            result = true;
          } else {
            result = false;
          }
        }


        if (result == true || fbot.formula == "3" || fbot.formula == "4" || fbot.formula == "5") {

          if (!data.buttons[i].name) data.buttons[i].name = "\u200b";


          data.buttons[i].disabled = false;

          if (fbot.formula == "3") {

            if (result == false) {
              result = true;
            } else {
              result = false;
            }

            if (result == true) {
              data.buttons[i].disabled = true;
            } else {
              data.buttons[i].disabled = false;
            }

          }
          if (fbot.formula == "4") {


            if (result == true) {
              data.buttons[i].disabled = true;
            } else {
              data.buttons[i].disabled = false;
            }

          }

          if (fbot.formula == "5") {

            data.buttons[i].disabled = true;

          }

          const button = data.buttons[i];
          if (button.typeper == "" || button.typeper == undefined) {
            button.type = this.evalMessage(button.type, cache);
          } else {
            check = this.evalMessage(button.typeper, cache);
            if (check == "PRIMARY" || check == "SECONDARY" || check == "SUCCESS" || check == "DANGER" || check == "LINK") {
              button.type = this.evalMessage(button.typeper, cache);
            }
          }
          const buttonData = this.generateButton(button, cache);
          buttonData.disabled = button.disabled;

          this.addButtonToActionRowArray(componentsArr, this.evalMessage(button.row, cache), buttonData, cache);

          if (button.mode !== "PERSISTENT") {
            awaitResponses.push({
              type: "BUTTON",
              time: button.time ? parseInt(this.evalMessage(button.time, cache)) || defaultTime : defaultTime,
              id: this.evalMessage(button.id, cache),
              user: button.mode.endsWith("PERSONAL") ? cache.getUser()?.id : null,
              multi: button.mode.startsWith("MULTI"),
              data: button,
            });
          }

        }

      }


    }

    if (Array.isArray(data.selectMenus)) {
      for (let i = 0; i < data.selectMenus.length; i++) {
        const select = data.selectMenus[i];

        totales = data.selectMenus[i].options.length;

        if (select?.disabled) {
          select.disabled = true;
        } else {
          select.disabled = false;
        }

        for (let ix = 0; ix < totales; ix++) {
          val1 = this.evalMessage(data.selectMenus[i].options[ix].val1, cache);
          val2 = this.evalMessage(data.selectMenus[i].options[ix].val2, cache);


          result = true;

          if (data.selectMenus[i].options[ix].formula == "Falso" || data.selectMenus[i].options[ix].formula == "Verdadeiro") {
            const compare = parseInt(data.selectMenus[i].options[ix].comparar, 10);
            if (compare !== 6) {
              val1 = this.evalIfPossible(val1, cache)
              val2 = this.evalIfPossible(val2, cache)
            }

            switch (compare) {
              case 0:
                result = val1 !== undefined;
                break;
              case 1:
                result = val1 == val2;
                break;
              case 2:
                result = val1 === val2;
                break;
              case 3:
                result = val1 < val2;
                break;
              case 4:
                result = val1 > val2;
                break;
              case 5:
                if (typeof val1?.toString().includes === "function") {
                  result = val1.toString().includes(val2);
                }
                break;
              case 6:
                result = Boolean(val1.toString().match(new RegExp('^' + val2 + '$', 'i')));
                break;
              case 7:
                result = Boolean(val1.toString().length > val2);
                break;
              case 8:
                result = Boolean(val1.toString().length < val2);
                break;
              case 9:
                result = Boolean(val1.toString().length == val2);
                break;
              case 10:
                result = val1.toString().startsWith(val2);
                break;
              case 11:
                result = val1.toString().endsWith(val2);
                break;
              case 12:
                result = Boolean(val1 >= val2);
                break;
              case 13:
                result = Boolean(val1 <= val2);
                break;
              case 14:
                result = Boolean(val1.toString().match(new RegExp(val2)));
                break;
              case 15:
                var numberj = val1.toString();
                if (numberj >= val2 && val1 <= val3) {
                  result = numberj;
                }
                break;
              case 16:
                const conditions = ["Ä", "Å", "Á", "Â", "À", "Ã", "Ā", "Ă", "Ą", "ā", "ă", "ą", "ä", "á", "â", "à", "ã", "É", "Ê", "Ë", "È", "Ė", "Ę", "Ě", "Ĕ", "Ē", "ė", "ę", "ě", "ĕ", "ē", "é", "ê", "ë", "è", "Í", "Î", "Ï", "Ì", "İ", "Į", "Ī", "ı", "į", "ī", "í", "î", "ï", "ì", "Ö", "Ó", "Ô", "Ò", "Õ", "Ő", "Ō", "ő", "ō", "ö", "ó", "ô", "ò", "õ", "Ü", "Ú", "Û", "Ų", "Ű", "Ů", "Ū", "ų", "ű", "ů", "ū", "ü", "ú", "û", "ù", "Ç", "Ć", "Č", "ç", "ć", "č", "Ñ", "Ň", "Ņ", "Ń", "ñ", "ň", "ņ", "ń", "Ÿ", "Ý", "ý", "Ź", "Ż", "Ž", "ź", "ż", "ž", "Ł", "Ľ", "Ļ", "Ĺ", "ł", "ľ", "ĺ", "Ķ", "ķ", "Ģ", "Ğ", "ģ", "ğ", "Ď", "ď", "Ś", "Š", "Ş", "ś", "š", "ş", "Ť", "Ț", "Ţ", "ť", "ț", "ţ", "Ŕ", "Ř", "ŕ", "ř"]
                result = conditions.some(el => val1.includes(el));
                break;
              case 17:
                const conditionsX = val2
                result = conditionsX.some(els => val1.includes(els));
                break;
              case 18:
                const conditionsZ = val2
                result = conditionsZ.some(elz => val1 == (elz));
                break;
              case 19:
                result = val1 % 2 == 0
                break;
              case 20:
                result = val1 % 2 == 1
                break;
              case 21:
                result = Boolean(!isNaN(parseFloat(val1.toString().replace(",", "."))));
                break;
              case 22:
                result = Boolean(Array.isArray(val1));
                break;
              case 23:
                const isImageUrl = require("is-image-url");
                result = isImageUrl(val1);
                break;
              case 24:
                result = typeof val1 === "string";
                break;
              case 25:
                const isUrl = require("is-url");
                result = isUrl(val1);
                break;
              case 26:
                const mail = require("email-existence");
                mail.check(val1, (error, response) => {
                  result = response;
                });
                break;
              case 27:
                let pattern = /(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})/gi;
                result = val1.match(pattern);
                break;
              case 28:
                invite = new RegExp(/(https?:\/\/)?(www\.)?(discord\.(gg|io|me|li)|discordapp\.com\/invite)\/.+[a-z]/g);
                result = invite.test(val1);
                break;
              case 29:
                result = val1.toLowerCase().includes(val2.toLowerCase());
                break;
              case 30:
                tratarval1 = val1.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
                tratar = val2.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
                result = tratarval1.includes(tratar);
                break;
              case 31:
                tratarval1 = val1.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
                tratar = val2.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
                result = tratarval1.toLowerCase().includes(tratar);
                break;
              case 32:
                var words = val1.split(" ");
                result = words.includes(val2);
                break;
              case 33:
                var words = val1.toLowerCase().split(" ");
                result = words.includes(val2.toLowerCase());
                break;
              case 34:
                var words = val1.normalize("NFD").replace(/[\u0300-\u036f]/g, "").split(" ");
                result = words.includes(val2.normalize("NFD").replace(/[\u0300-\u036f]/g, ""));
                break;
              case 35:
                var words = val1.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").split(" ");
                result = words.includes(val2.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, ""));
                break;
              case 36:
                var separador = val1.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").split(" ");
                var valor2 = val2.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").split(",");
                result = separador.some(els => valor2.includes(els));
                break;
            }
          }

          if (data.selectMenus[i].options[ix].formula == "Falso") {
            if (result == false) {
              result = true
            } else { result = false }
          }

          if (result == false) {
            data.selectMenus[i].options.splice([ix], 1);
            ix = parseFloat([ix]) - 1
            totales = totales - 1
          }

        }

        const selectData = this.generateSelectMenu(select, cache);
        selectData.disabled = select.disabled;

        this.addSelectToActionRowArray(componentsArr, this.evalMessage(select.row, cache), selectData, cache);

        if (select.mode !== "PERSISTENT") {
          awaitResponses.push({
            type: "SELECT",
            time: select.time ? parseInt(this.evalMessage(select.time, cache)) || defaultTime : defaultTime,
            id: this.evalMessage(select.id, cache),
            user: select.mode.endsWith("PERSONAL") ? cache.getUser()?.id : null,
            multi: select.mode.startsWith("MULTI"),
            data: select,
          });
        }
      }
    }

    if (messageOptions._awaitResponses?.length > 0) {
      if (overwrite && awaitResponses.length > 0) {
        messageOptions._awaitResponses = [];
      } else {
        awaitResponses = messageOptions._awaitResponses.concat(awaitResponses);
      }
    }

    if (componentsArr.length > 0) {
      const newComponents = componentsArr
        .filter((comps) => comps.length > 0)
        .map(function (comps) {
          return {
            type: "ACTION_ROW",
            components: comps,
          };
        });

      messageOptions.components = newComponents;
    }

    if (storagewebhook > 0) {
      if (webhookname !== "") {
        messageOptions.username = webhookname
      }
      if (webhookavatar !== "") {
        messageOptions.avatarURL = await webhookavatar
      }
    }

    if (data.tts) {
      messageOptions.tts = true;
    }



    if (data.attachments?.length > 0) {
      const { Util, MessageAttachment } = this.getDBM().DiscordJS;
      if (!Array.isArray(messageOptions.files) || overwrite) {
        messageOptions.files = [];
      }
      for (let i = 0; i < data.attachments.length; i++) {

        if (data.attachments[i].tipo == "1") {
          const { DiscordJS } = this.getDBM();
          const Canvas = require('canvas')
          const attachment = data.attachments[i];
          const varnamer = this.evalMessage(attachment?.canvasnome, cache);
          const varid = this.evalMessage(attachment?.canvasvar, cache);
          const imagedata = this.getVariable(varid, varnamer, cache)
          if (imagedata) {
            const image = new Canvas.Image()
            image.src = imagedata
            const canvas = Canvas.createCanvas(image.width, image.height)
            const ctx = canvas.getContext('2d')
            ctx.drawImage(image, 0, 0, image.width, image.height)
            const buffer = canvas.toBuffer('image/png', { compressionLevel: data.attachments[i].compress })
            const spoiler = !!attachment?.spoiler;
            const name = attachment?.name || (spoiler ? Util.basename("image.png") : undefined);
            const msgAttachment = new MessageAttachment(buffer, name);
            if (spoiler) {
              msgAttachment.setSpoiler(true);
            }
            messageOptions.files.push(msgAttachment);
          }

        }
        if (data.attachments[i].tipo == "2") {
          const { Images } = this.getDBM();
          const attachment = data.attachments[i];
          const varnamer = this.evalMessage(attachment?.canvasnome, cache);
          const varid = this.evalMessage(attachment?.canvasvar, cache);
          const imagedata = this.getVariable(varid, varnamer, cache)
          const spoiler = !!attachment?.spoiler;
          const name = attachment?.name || (spoiler ? Util.basename("image.png") : undefined);
          const buffer = await Images.createBuffer(imagedata)
          const msgAttachment = new MessageAttachment(buffer, name);
          if (spoiler) {
            msgAttachment.setSpoiler(true);
          }
          messageOptions.files.push(msgAttachment);

        }
        if (data.attachments[i].tipo == "0" || data.attachments[i].tipo == undefined) {
          const attachment = data.attachments[i];
          const url = this.evalMessage(attachment?.url, cache);
          if (url) {
            const spoiler = !!attachment?.spoiler;
            const name = attachment?.name || (spoiler ? Util.basename(url) : undefined);
            const msgAttachment = new MessageAttachment(url, name);
            if (spoiler) {
              msgAttachment.setSpoiler(true);
            }
            messageOptions.files.push(msgAttachment);
          }
        }
        if (data.attachments[i].tipo == "3") {
          const attachment = data.attachments[i];
          const varnamer = this.evalMessage(attachment?.canvasnome, cache);
          const varid = this.evalMessage(attachment?.canvasvar, cache);
          const conteudodata = this.getVariable(varid, varnamer, cache)
          const spoiler = !!attachment?.spoiler;
          var name = this.evalMessage(attachment?.name, cache)
          if (name == "") { name = "texto.txt" }
          const buffer = Buffer.from(conteudodata)
          const msgAttachment = new MessageAttachment(buffer, name);
          if (spoiler) {
            msgAttachment.setSpoiler(true);
          }
          messageOptions.files.push(msgAttachment);

        }
      }
    }

    let defaultResultMsg = null;
    const onComplete = (resultMsg) => {
      if (defaultResultMsg) {
        resultMsg ??= defaultResultMsg;
      }

      if (resultMsg) {
        const varName2 = this.evalMessage(data.varName2, cache);
        const storage = parseInt(data.storage, 10);
        this.storeValue(resultMsg, storage, varName2, cache);
        this.callNextAction(cache);

        for (let i = 0; i < awaitResponses.length; i++) {
          const response = awaitResponses[i];
          const originalInteraction = cache.interaction?.__originalInteraction ?? cache.interaction;
          const tempVariables = cache.temp || {};
          this.registerTemporaryInteraction(resultMsg.id, response.time, response.id, response.user, response.multi, (interaction) => {
            if (response.data) {
              interaction.__originalInteraction = originalInteraction;
              if (response.type === "BUTTON") {
                this.preformActionsFromInteraction(interaction, response.data, cache.meta, tempVariables);
              } else {
                this.preformActionsFromSelectInteraction(interaction, response.data, cache.meta, tempVariables);
              }
            }
          });
        }
      } else {
        this.callNextAction(cache);
      }
    };

    const isMessageTarget = target instanceof this.getDBM().DiscordJS.Message;

    const sameId = target?.id?.length > 0 && (target?.id ?? "") === cache?.interaction?.channel?.id;
    const sameChannel = channel === 0 || sameId;
    const canReply = !isMessageTarget && cache?.interaction?.replied === false && sameChannel;

    if (data.dontSend) {
      const varName2 = this.evalMessage(data.varName2, cache);
      const storage = parseInt(data.storage, 10);
      messageOptions._awaitResponses = awaitResponses;
      this.storeValue(messageOptions, storage, varName2, cache);
      this.callNextAction(cache);
    }

    else if (Array.isArray(target)) {
      this.callListFunc(target, "send", [messageOptions]).then(onComplete);
    }

    else if (isEdit === 2) {
      let promise = null;

      defaultResultMsg = cache.interaction?.message;

      if (cache.interaction?.replied && cache.interaction?.editReply) {
        promise = cache.interaction.editReply(messageOptions);
      } else if (cache?.interaction?.update) {
        promise = cache.interaction.update(messageOptions);
      } else {
        this.displayError(data, cache, "Send Message -> Message/Options to Edit -> Interaction Update / Could not find interaction to edit");
      }

      if (promise) {
        promise
          .then(onComplete)
          .catch((err) => erro(err));
      }
    }

    else if (isEdit === 1 && target?.edit) {
      target
        .edit(messageOptions)
        .then(onComplete)
        .catch((err) => erro(err));
    }

    else if (isMessageTarget && target?.reply) {
      target
        .reply(messageOptions)
        .then(onComplete)
        .catch((err) => erro(err));
    }

    else if (data.reply === true && canReply) {
      messageOptions.fetchReply = true;
      if (data.ephemeral === true) {
        messageOptions.ephemeral = true;
      }
      let promise = null;
      if (cache.interaction.deferred) {
        promise = cache.interaction.editReply(messageOptions);
      } else {
        promise = cache.interaction.reply(messageOptions);
      }
      promise.then(onComplete).catch((err) => this.displayError(data, cache, err));
    }


    else if (target?.send) {

      if (storagewebhook > 0) {
        webhook
          .send(messageOptions)
          .then(onComplete)
          .catch((err) => erro(err));
      } else {
        target
          .send(messageOptions)
          .then(onComplete)
          .catch((err) => erro(err));
      }

    }

    else {
      this.callNextAction(cache);
    }

    function erro(err) {
      if (data.errcmd) _this.displayError(data, cache, err);

      _this.storeValue(err, parseInt(data.storageError), _this.evalMessage(data.varNameError, cache), cache);

      if (data.iffalse == "5") return _this.executeSubActions(data.actionsError, cache);
      if (data.iffalse == "99") return _this.executeSubActionsThenNextAction(data.actionsError, cache);

      return _this.executeResults(false, data, cache);
    }

  },

  //---------------------------------------------------------------------
  // Action Bot Mod Init
  //
  // An optional function for action mods. Upon the bot's initialization,
  // each command/event's actions are iterated through. This is to
  // initialize responses to interactions created within actions
  // (e.g. buttons and select menus for Send Message).
  //
  // If an action provides inputs for more actions within, be sure
  // to call the `this.prepareActions` function to ensure all actions are
  // recursively iterated through.
  //---------------------------------------------------------------------

  modInit(data) {
    if (Array.isArray(data?.buttons)) {
      for (let i = 0; i < data.buttons.length; i++) {
        const button = data.buttons[i];
        if (button.mode === "PERSISTENT") {
          this.registerButtonInteraction(button.id, button);
        }
        this.prepareActions(button.actions);
      }
    }
    if (Array.isArray(data?.selectMenus)) {
      for (let i = 0; i < data.selectMenus.length; i++) {
        const select = data.selectMenus[i];
        if (select.mode === "PERSISTENT") {
          this.registerSelectMenuInteraction(select.id, select);
        }
        this.prepareActions(select.actions);
      }
    }
  },

  //---------------------------------------------------------------------
  // Action Bot Mod
  //
  // Upon initialization of the bot, this code is run. Using the bot's
  // DBM namespace, one can add/modify existing functions if necessary.
  // In order to reduce conflicts between mods, be sure to alias
  // functions you wish to overwrite.
  //---------------------------------------------------------------------

  mod() { },
};
