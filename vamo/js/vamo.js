import{config as configRESS}from"../config.js";import*as THREE from"../three/three.module.js";import{GUI}from"../three/libs/lil-gui.module.min.js";import{ArcballControls}from"../three/controls/ArcballControls.js";import{groupeFichierModele,chargerModele,animMixer}from"./charger.js";import{webxrInit,intersecterControleurs}from"./webxr.js";import{groupePointsInteret,pointsInit,ajouterUnPointProchainClic,supprimerDernierPoint,effacerTousLesPoints,ajouterUnPoint,chargerTousLesPointsInteret}from"./points.js";let camera,renderer,lumiDirectionnelle,lumiAmbiante,scene,gui=null,controles2D,messageNode,moodleNode,groupeFichierEtAnnotations=new THREE.Group,guiAnimation=void 0,dtPrec=void 0,config={objets3D:"",style:"ligne",pointDecalage:.02,pointTaille:.03,moodleLargeur:500,moodleHauteur:500},paramsFichier={},paramsDefaut={fichier:"",mate:"",titre:"",attribution:"",mRotOrd:"XYZ",mRotX:0,mRotY:0,mRotZ:0,mTaille:1,animation:!1,camPtVise:[0,0,0],camPos:[0,0,1],camHaut:[0,1,0],camDist:3,illumAmb:.9,illumDir:.9,niveauMenu:1,application:0,pointsInteret:[]},paramsCourant={ajouterUnPointProchainClic:ajouterUnPointProchainClic,supprimerDernierPoint:supprimerDernierPoint,effacerTousLesPoints:effacerTousLesPoints,exporterParamsDBG:exporterParamsDBG,obtenirURL:obtenirURL,exporterMoodle:exporterMoodle,sauvegarderPage:sauvegarderPage,afficherGUIliste:afficherGUIliste,afficherGUIvisu:afficherGUIvisu,afficherGUIedit:afficherGUIedit,afficherGUIconc:afficherGUIconc,obtenirModele:obtenirModele};function argsInit(a,e){for(var t in configRESS)config[t]=configRESS[t];for(var r in e)config[r]=e[r];for(var n in paramsDefaut)"object"==typeof paramsDefaut[n]?paramsCourant[n]=paramsDefaut[n].slice():paramsCourant[n]=paramsDefaut[n];for(var o in paramsFichier=a)"object"==typeof a[o]?paramsCourant[o]=a[o].slice():paramsCourant[o]=a[o];var i=new URL(window.location);null!=i.searchParams.get("fichier")&&(paramsCourant.fichier=decodeURIComponent(i.searchParams.get("fichier"))),null!=i.searchParams.get("mate")&&(paramsCourant.mate=decodeURIComponent(i.searchParams.get("mate"))),null!=i.searchParams.get("titre")&&(paramsCourant.titre=decodeURIComponent(i.searchParams.get("titre"))),null!=i.searchParams.get("attribution")&&(paramsCourant.attribution=decodeURIComponent(i.searchParams.get("attribution"))),null!=i.searchParams.get("mRotOrd")&&(paramsCourant.mRotOrd=decodeURIComponent(i.searchParams.get("mRotOrd"))),null!=i.searchParams.get("mRotX")&&(paramsCourant.mRotX=decodeURIComponent(i.searchParams.get("mRotX"))),null!=i.searchParams.get("mRotY")&&(paramsCourant.mRotY=decodeURIComponent(i.searchParams.get("mRotY"))),null!=i.searchParams.get("mRotZ")&&(paramsCourant.mRotZ=decodeURIComponent(i.searchParams.get("mRotZ"))),null!=i.searchParams.get("mTaille")&&(paramsCourant.mTaille=decodeURIComponent(i.searchParams.get("mTaille"))),null!=i.searchParams.get("animation")&&(paramsCourant.animation=i.searchParams.get("animation")),null!=i.searchParams.get("camPtVise")&&(paramsCourant.camPtVise=JSON.parse(decodeURIComponent(i.searchParams.get("camPtVise")))),null!=i.searchParams.get("camPos")&&(paramsCourant.camPos=JSON.parse(decodeURIComponent(i.searchParams.get("camPos")))),null!=i.searchParams.get("camHaut")&&(paramsCourant.camHaut=JSON.parse(decodeURIComponent(i.searchParams.get("camHaut")))),null!=i.searchParams.get("camDist")&&(paramsCourant.camDist=decodeURIComponent(i.searchParams.get("camDist"))),null!=i.searchParams.get("illumAmb")&&(paramsCourant.illumAmb=JSON.parse(decodeURIComponent(i.searchParams.get("illumAmb")))),null!=i.searchParams.get("illumDir")&&(paramsCourant.illumDir=JSON.parse(decodeURIComponent(i.searchParams.get("illumDir")))),null!=i.searchParams.get("pointsInteret")&&(paramsCourant.pointsInteret=JSON.parse(decodeURIComponent(i.searchParams.get("pointsInteret")))),null!=i.searchParams.get("conc")?paramsCourant.niveauMenu=3:null!=i.searchParams.get("edit")?paramsCourant.niveauMenu=2:null!=i.searchParams.get("visu")?paramsCourant.niveauMenu=1:null!=i.searchParams.get("aucun")&&(paramsCourant.niveauMenu=0),null!=i.searchParams.get("3D")?paramsCourant.application=0:null!=i.searchParams.get("RV")&&(paramsCourant.application=1)}function setCamera(){camera.position.copy((new THREE.Vector3).fromArray(paramsCourant.camPos).normalize().multiplyScalar(paramsCourant.camDist)),camera.up.set(paramsCourant.camHaut[0],paramsCourant.camHaut[1],paramsCourant.camHaut[2])}function divInit(){var a=document.createElement("style");a.type="text/css",a.innerHTML="",a.innerHTML+="body { margin: 0; background-color: #eee; font-family: Helvetica; font-size: 16px; line-height: 24px; overscroll-behavior: none; }",a.innerHTML+="a { color: #ff0; text-decoration: none; }",a.innerHTML+="a:hover { text-decoration: underline; }",a.innerHTML+="button { cursor: pointer; text-transform: uppercase; }",a.innerHTML+="#titre { color: #333; position: absolute; top: 0px; width: 100%; padding: 10px; box-sizing: border-box; text-align: left; z-index: 2; }",a.innerHTML+="#message { color: #370; font-family: Helvetica; font-size: 10px; position: absolute; top: 20px; width: 80%; padding: 10px; box-sizing: border-box; text-align: left; -moz-user-select: none; -webkit-user-select: none; -ms-user-select: none; user-select: none; pointer-events: none; z-index: 2; }",a.innerHTML+="#moodle { color: #370; opacity: 0; border: 0; padding: 0; margin: 0; font-family: Helvetica; font-size: 10px; position: absolute; top: 50px; width: 80%; box-sizing: border-box; text-align: left; -moz-user-select: none; -webkit-user-select: none; -ms-user-select: none; user-select: none; pointer-events: none; z-index: 2; }",a.innerHTML+="#bouton { color: #370; font-family: Helvetica; font-size: 8px; position: absolute; top: 100px; box-sizing: border-box; text-align: center; z-index: 2; }",a.innerHTML+="#container { position: absolute; z-index: 1; }",a.innerHTML+="#attribution { color: #666; position: absolute; bottom: 0px; width: 100%; padding: 2px; box-sizing: border-box; text-align: left; font-size: 10px; line-height: 12px; z-index: 2; }",a.innerHTML+="a, button, input, select { pointer-events: auto; }",a.innerHTML+=".lil-gui { z-index: 2 !important; }",a.innerHTML+="@media all and ( max-width: 640px ) { .lil-gui.root { right: auto; top: auto; max-height: 50%; max-width: 80%; bottom: 0; left: 0; } }",document.getElementsByTagName("head")[0].appendChild(a);null==paramsCourant.titre&&(a=window.location.pathname.split("/"),paramsCourant.titre=a[a.length-1]);var a=document.createElement("div"),e=(a.id="titre",document.createTextNode(paramsCourant.titre)),e=(a.appendChild(e),document.body.appendChild(a),document.createElement("div")),a=(e.id="message",document.createTextNode("")),a=(e.appendChild(a),document.body.appendChild(e),messageNode=document.getElementById("message"),document.createElement("div")),e=(a.id="moodle",document.body.appendChild(a),moodleNode=document.getElementById("moodle"),document.createElement("div")),a=(e.id="container",document.body.appendChild(e),null==paramsCourant.attribution&&(paramsCourant.attribution=""),document.createElement("div")),e=(a.id="attribution",document.createTextNode(paramsCourant.attribution));a.appendChild(e),document.body.appendChild(a)}function vamoInit(a,e){argsInit(a,e),divInit(),(scene=new THREE.Scene).background=new THREE.Color(15658734),camera=new THREE.PerspectiveCamera(40,window.innerWidth/window.innerHeight,.1,20),null==paramsCourant.camPos&&(paramsCourant.camPos=[0,0,1]),null==paramsCourant.camPtVise&&(paramsCourant.camPtVise=[0,0,0]),null==paramsCourant.camHaut&&(paramsCourant.camHaut=[0,1,0]),null==paramsCourant.camDist&&(paramsCourant.camDist=3),setCamera(),scene.add(camera),pointsInit(groupeFichierModele,paramsCourant,afficher,camera,config.pointTaille,config.pointDecalage),groupeFichierEtAnnotations.add(groupePointsInteret),null==paramsCourant.pointsInteret&&(paramsCourant.pointsInteret=[]),chargerTousLesPointsInteret(),scene.add(new THREE.AxesHelper(1)),lumiAmbiante=new THREE.AmbientLight(16777215,paramsCourant.illumAmb),scene.add(lumiAmbiante),(lumiDirectionnelle=new THREE.DirectionalLight(16777215,paramsCourant.illumDir)).position.set(0,0,1).normalize(),camera.add(lumiDirectionnelle),(renderer=new THREE.WebGLRenderer({antialias:!0})).autoClear=!1,renderer.setPixelRatio(window.devicePixelRatio),renderer.setSize(window.innerWidth,window.innerHeight),document.getElementById("container").appendChild(renderer.domElement),(controles2D=new ArcballControls(camera,renderer.domElement,scene)).enableGrid=!0,controles2D.adjustNearFar=!0,controles2D.cursorZoom=!0,controles2D.addEventListener("change",afficher),document.addEventListener("pointerdown",function(){controles2D.setGizmosVisible(!0)}),document.addEventListener("pointerup",function(){controles2D.setGizmosVisible(!1)}),document.addEventListener("pointercancel",function(){controles2D.setGizmosVisible(!1)}),controles2D.setGizmosVisible(!1),afficherGUI(),obtenirModele(),1==paramsCourant.application&&webxrInit(scene,renderer,camera,groupeFichierModele,groupeFichierEtAnnotations,afficher,controles2D),groupeFichierEtAnnotations.name="groupeFichierEtAnnotations",scene.add(groupeFichierEtAnnotations),window.addEventListener("resize",onWindowResize),document.addEventListener("keyup",onKeyUp)}function afficherGUIliste(){var t;let a=!0;if(e=paramsCourant.pointsInteret,t=null==paramsFichier.pointsInteret?[]:paramsFichier.pointsInteret,a=e.length===t.length&&e.every((a,e)=>a===t[e])?a:confirm("Les points ont été modifiés. Oublier et retourner à la liste ?")){var e=new URL(window.location);let a="";null!=e.searchParams.get("conc")?a="?conc":null!=e.searchParams.get("edit")&&(a="?edit");var e=location.href.split("?"),r=e[0].lastIndexOf("/")+1;window.location.href=e[0].substr(0,r)+a}}function afficherGUIvisu(){paramsCourant.niveauMenu=1,afficherGUI()}function afficherGUIedit(){paramsCourant.niveauMenu=2,afficherGUI()}function afficherGUIconc(){paramsCourant.niveauMenu=3,afficherGUI()}function afficherGUI(){var a;null!=gui&&gui.destroy(),1<paramsCourant.niveauMenu?((gui=new GUI({title:"Menu"})).add(paramsCourant,"titre").name("Titre").onChange(function(){document.getElementById("titre").innerHTML=paramsCourant.titre}),guiAnimation=gui.add(paramsCourant,"animation").name("Animation active").onChange(setAnimationOuPas).disable(),(a=gui.addFolder("Points d'intérêt et étiquettes")).add(paramsCourant,"ajouterUnPointProchainClic").name("Ajout./suppr. un point au prochain clic"),a.add(paramsCourant,"supprimerDernierPoint").name("Supprimer le dernier point"),a.add(paramsCourant,"effacerTousLesPoints").name("Effacer tous les points"),(a=gui.addFolder("Point de vue initial")).add(controles2D,"reset").name("Revenir au point de vue initial"),a.add(controles2D,"saveState").name("Définir le point de vue initial"),(a=gui.addFolder("Sauvegarde et exportation")).add(paramsCourant,"exporterMoodle").name("Copier (et coller) vers Moodle"),a.add(paramsCourant,"obtenirURL").name("Obtenir un hyperlien"),3==paramsCourant.niveauMenu&&(a.add(paramsCourant,"exporterParamsDBG").name("Exporter les paramètres (DEBUG)"),a.add(paramsCourant,"sauvegarderPage").name("Sauvegarder dans un fichier html")),(a=gui.addFolder("Illumination")).add(paramsCourant,"illumAmb",0,1).name("Ambiante").onChange(function(a){lumiAmbiante.intensity=paramsCourant.illumAmb,afficher()}),a.add(paramsCourant,"illumDir",0,1).name("Directionnelle").onChange(function(a){lumiDirectionnelle.intensity=paramsCourant.illumDir,afficher()}),3==paramsCourant.niveauMenu&&((a=gui.addFolder("Fichier")).add(paramsCourant,"attribution").name("Attribution").onChange(function(){document.getElementById("attribution").innerHTML=paramsCourant.attribution}),null!=paramsCourant.fichier&&a.add(paramsCourant,"fichier").name("Chemin du fichier").onChange(afficher),null!=paramsCourant.mate&&a.add(paramsCourant,"mate").name("(Chemin matériau)").onChange(afficher),a.add(paramsCourant,"obtenirModele").name("Charger le nouveau fichier"),(a=gui.addFolder("Rotations du modèle")).add(paramsCourant,"mRotOrd",["XYZ","XZY","YXZ","YZX","ZXY","ZYX"]).name("Ordre").onChange(function(){setModeleRotation(),afficher()}),a.add(paramsCourant,"mRotX",-180,180).name("Rotation X").onChange(setModeleRotation),a.add(paramsCourant,"mRotY",-180,180).name("Rotation Y").onChange(setModeleRotation),a.add(paramsCourant,"mRotZ",-180,180).name("Rotation Z").onChange(setModeleRotation),a.add(paramsCourant,"mTaille",0,5).name("Taille").onChange(setModeleRotation)),2==paramsCourant.niveauMenu?(gui.add(paramsCourant,"afficherGUIconc").name("Ouvrir menu conception"),gui.add(paramsCourant,"afficherGUIvisu").name("Fermer menu édition")):gui.add(paramsCourant,"afficherGUIedit").name("Fermer menu conception"),gui.add(paramsCourant,"afficherGUIliste").name("Retour&nbsp;à&nbsp;liste")):1==paramsCourant.niveauMenu&&((gui=new GUI({title:"Menu",width:100})).add(controles2D,"reset").name("Réinit.&nbsp;vue"),guiAnimation=gui.add(paramsCourant,"animation").name("&nbsp;Animation ").onChange(setAnimationOuPas).disable(),window.location==window.parent.location&&(gui.add(paramsCourant,"afficherGUIedit").name("Menu&nbsp;édition"),gui.add(paramsCourant,"afficherGUIliste").name("Retour&nbsp;à&nbsp;liste"))),null!=gui&&gui.open()}function setAnimationOuPas(){paramsCourant.animation?(dtPrec=Date.now(),renderer.setAnimationLoop(afficher)):(dtPrec=void 0,renderer.setAnimationLoop(null))}function onWindowResize(){camera.aspect=window.innerWidth/window.innerHeight,camera.updateProjectionMatrix(),renderer.setSize(window.innerWidth,window.innerHeight),afficher()}function getParamsJSON(){var a={},e=(null!=paramsCourant.fichier&&""!=paramsCourant.fichier&&(a.fichier=paramsCourant.fichier),null!=paramsCourant.mate&&""!=paramsCourant.mate&&(a.mate=paramsCourant.mate),null!=paramsCourant.titre&&""!=paramsCourant.titre&&(a.titre=paramsCourant.titre),null!=paramsCourant.attribution&&""!=paramsCourant.attribution&&(a.attribution=paramsCourant.attribution),null!=paramsCourant.mRotOrd&&"XYZ"!=paramsCourant.mRotOrd&&(a.mRotOrd=paramsCourant.mRotOrd),null!=paramsCourant.mRotX&&0!=paramsCourant.mRotX&&(a.mRotX=paramsCourant.mRotX),null!=paramsCourant.mRotY&&0!=paramsCourant.mRotY&&(a.mRotY=paramsCourant.mRotY),null!=paramsCourant.mRotZ&&0!=paramsCourant.mRotZ&&(a.mRotZ=paramsCourant.mRotZ),null!=paramsCourant.mTaille&&1!=paramsCourant.mTaille&&(a.mTaille=paramsCourant.mTaille),null!=paramsCourant.animation&&""!=paramsCourant.animation&&(a.animation=paramsCourant.animation),null!=paramsCourant.illumAmb&&.9!=paramsCourant.illumAmb&&(a.illumAmb=paramsCourant.illumAmb),null!=paramsCourant.illumDir&&.9!=paramsCourant.illumDir&&(a.illumDir=paramsCourant.illumDir),new THREE.Vector3),t=new THREE.Vector3,r=new THREE.Vector3;return camera.matrixWorld.extractBasis(e,t,r),r.toArray(paramsCourant.camPos),paramsCourant.camPos=paramsCourant.camPos.map(a=>parseFloat(a.toFixed(4))),t.toArray(paramsCourant.camHaut),paramsCourant.camHaut=paramsCourant.camHaut.map(a=>parseFloat(a.toFixed(4))),null!=paramsCourant.camPtVise&&JSON.stringify(paramsCourant.camPtVise)!=JSON.stringify([0,0,0])&&(a.camPtVise=paramsCourant.camPtVise),null!=paramsCourant.camPos&&JSON.stringify(paramsCourant.camPos)!=JSON.stringify([0,0,1])&&(a.camPos=paramsCourant.camPos),null!=paramsCourant.camHaut&&JSON.stringify(paramsCourant.camHaut)!=JSON.stringify([0,1,0])&&(a.camHaut=paramsCourant.camHaut),null!=paramsCourant.camDist&&3!=paramsCourant.camDist&&(a.camDist=paramsCourant.camDist),null!=paramsCourant.pointsInteret&&0<paramsCourant.pointsInteret.length&&(a.pointsInteret=paramsCourant.pointsInteret),JSON.stringify(a)}function getParamsENCODED(){let a="";null!=paramsCourant.fichier&&paramsCourant.fichier!=paramsDefaut.fichier&&paramsCourant.fichier!=paramsFichier.fichier&&(a+="&fichier="+encodeURIComponent(paramsCourant.fichier)),null!=paramsCourant.mate&&""!=paramsCourant.mate&&paramsCourant.mate!=paramsDefaut.mate&&paramsCourant.mate!=paramsFichier.mate&&(a+="&mate="+encodeURIComponent(paramsCourant.mate)),null!=paramsCourant.titre&&paramsCourant.titre!=paramsDefaut.titre&&paramsCourant.titre!=paramsFichier.titre&&(a+="&titre="+encodeURIComponent(paramsCourant.titre)),null!=paramsCourant.attribution&&paramsCourant.attribution!=paramsDefaut.attribution&&paramsCourant.attribution!=paramsFichier.attribution&&(a+="&attribution="+encodeURIComponent(paramsCourant.attribution)),null!=paramsCourant.mRotOrd&&paramsCourant.mRotOrd!=paramsDefaut.mRotOrd&&paramsCourant.mRotOrd!=paramsFichier.mRotOrd&&(a+="&mRotOrd="+encodeURIComponent(paramsCourant.mRotOrd)),null!=paramsCourant.mRotX&&paramsCourant.mRotX!=paramsDefaut.mRotX&&paramsCourant.mRotX!=paramsFichier.mRotX&&(a+="&mRotX="+encodeURIComponent(paramsCourant.mRotX)),null!=paramsCourant.mRotY&&paramsCourant.mRotY!=paramsDefaut.mRotY&&paramsCourant.mRotY!=paramsFichier.mRotY&&(a+="&mRotY="+encodeURIComponent(paramsCourant.mRotY)),null!=paramsCourant.mRotZ&&paramsCourant.mRotZ!=paramsDefaut.mRotZ&&paramsCourant.mRotZ!=paramsFichier.mRotZ&&(a+="&mRotZ="+encodeURIComponent(paramsCourant.mRotZ)),null!=paramsCourant.mTaille&&paramsCourant.mTaille!=paramsDefaut.mTaille&&paramsCourant.mTaille!=paramsFichier.mTaille&&(a+="&mTaille="+encodeURIComponent(paramsCourant.mTaille)),null!=paramsCourant.animation&&paramsCourant.animation!=paramsDefaut.animation&&paramsCourant.animation!=paramsFichier.animation&&(a+="&animation="+encodeURIComponent(paramsCourant.animation)),null!=paramsCourant.illumAmb&&paramsCourant.illumAmb!=paramsDefaut.illumAmb&&paramsCourant.illumAmb!=paramsFichier.illumAmb&&(a+="&illumAmb="+encodeURIComponent(paramsCourant.illumAmb)),null!=paramsCourant.illumDir&&paramsCourant.illumDir!=paramsDefaut.illumDir&&paramsCourant.illumDir!=paramsFichier.illumDir&&(a+="&illumDir="+encodeURIComponent(paramsCourant.illumDir));var e=new THREE.Vector3,t=new THREE.Vector3,r=new THREE.Vector3;return camera.matrixWorld.extractBasis(e,t,r),r.toArray(paramsCourant.camPos),paramsCourant.camPos=paramsCourant.camPos.map(a=>parseFloat(a.toFixed(4))),t.toArray(paramsCourant.camHaut),paramsCourant.camHaut=paramsCourant.camHaut.map(a=>parseFloat(a.toFixed(4))),null!=paramsCourant.camPtVise&&JSON.stringify(paramsCourant.camPtVise)!=JSON.stringify(paramsDefaut.camPtVise)&&JSON.stringify(paramsCourant.camPtVise)!=JSON.stringify(paramsFichier.camPtVise)&&(a+="&camPtVise="+encodeURIComponent(JSON.stringify(paramsCourant.camPtVise))),null!=paramsCourant.camPos&&JSON.stringify(paramsCourant.camPos)!=JSON.stringify(paramsDefaut.camPos)&&JSON.stringify(paramsCourant.camPos)!=JSON.stringify(paramsFichier.camPos)&&(a+="&camPos="+encodeURIComponent(JSON.stringify(paramsCourant.camPos))),null!=paramsCourant.camHaut&&JSON.stringify(paramsCourant.camHaut)!=JSON.stringify(paramsDefaut.camHaut)&&JSON.stringify(paramsCourant.camHaut)!=JSON.stringify(paramsFichier.camHaut)&&(a+="&camHaut="+encodeURIComponent(JSON.stringify(paramsCourant.camHaut))),null!=paramsCourant.camDist&&paramsCourant.camDist!=paramsDefaut.camDist&&paramsCourant.camDist!=paramsFichier.camDist&&(a+="&camDist="+encodeURIComponent(paramsCourant.camDist)),null!=paramsCourant.pointsInteret&&0<paramsCourant.pointsInteret.length&&JSON.stringify(paramsCourant.pointsInteret)!=JSON.stringify(paramsDefaut.pointsInteret)&&JSON.stringify(paramsCourant.pointsInteret)!=JSON.stringify(paramsFichier.pointsInteret)&&(a+="&pointsInteret="+encodeURIComponent(JSON.stringify(paramsCourant.pointsInteret))),a=""!=a?"?"+a.slice(1):a}function obtenirURL(){var a=getParamsENCODED(),a=window.origin+window.location.pathname+a;prompt("Faire un copier (C-v) de cet hyperlien :",a)}function exporterMoodle(){var a=getParamsENCODED(),a='<iframe src="'+window.location.origin+window.location.pathname+a+'" width="'+config.moodleLargeur+'" height="'+config.moodleHauteur+"\">Votre navigateur n'affiche pas les iframe :-(</iframe>",e=(moodleNode.innerHTML=a,Array.prototype.slice.call(document.styleSheets).filter(function(a){return!a.disabled})),a=(window.getSelection().removeAllRanges(),document.createRange());if(a.selectNode(moodleNode),window.getSelection().addRange(a),!navigator.userAgent.match(/Safari|ipad|iphone/i)){document.execCommand("copy");for(var t=0;t<e.length;t++)e[t].disabled=!0;document.execCommand("copy");for(t=0;t<e.length;t++)e[t].disabled=!1}alert("Copié! Faire coller dans Moodle")}function exporterParamsDBG(){prompt("params :",getParamsJSON())}function sauvegarderPage(){var a=`<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">
<html lang="fr">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, user-scalable=no, minimum-scale=1.0, maximum-scale=1.0">
    <meta name="author" content="inVisu inc. https://www.invisu.ca/">
    <meta name="description" content="Visionneur de structures">
  </head>
  <body>
    <script type="module">
      import { init } from './config.js'; init(

`+getParamsJSON()+`

      );
    </script>
  </body>
</html>
`,a=new Blob([a],{type:"text/html"}),e=window.location.pathname.split("/"),e=e[e.length-1].split("."),t=new Date((new Date).getTime()-60*(new Date).getTimezoneOffset()*1e3).toISOString().substr(0,19).replace("T","_").replaceAll(":","-"),t=e[0]+"_"+t+"."+e[1],e=(new File([a],t,{type:a.type}),document.createElement("a"));e.download=t,e.href=URL.createObjectURL(a),e.click(),URL.revokeObjectURL(e.href)}function onKeyUp(a){if(1<paramsCourant.niveauMenu)switch(a.key){case"+":case"a":case" ":ajouterUnPoint()}}function setModeleRotation(){var a=Math.PI/180;Math.PI;groupeFichierModele.rotation.set(paramsCourant.mRotX*a,paramsCourant.mRotY*a,paramsCourant.mRotZ*a,paramsCourant.mRotOrd),groupeFichierModele.scale.set(paramsCourant.mTaille,paramsCourant.mTaille,paramsCourant.mTaille)}function obtenirModele(){groupeFichierModele.clear(),setModeleRotation(),chargerModele(config.objets3D,paramsCourant.fichier,paramsCourant.mate,afficher,messageNode),groupeFichierEtAnnotations.add(groupeFichierModele),setAnimationOuPas()}function afficher(a){var e;renderer.xr.isPresenting&&intersecterControleurs(),null!=animMixer&&(null!=guiAnimation&&guiAnimation.enable(),paramsCourant.animation&&(null!=dtPrec&&(e=(Date.now()-dtPrec)/1e3,animMixer.update(e)),dtPrec=Date.now())),renderer.render(scene,camera)}export{vamoInit};