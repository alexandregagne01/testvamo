import*as THREE from"../three.module.js";function createText(e,t){var n=document.createElement("canvas"),r=n.getContext("2d"),a=100,l=(r.font="normal 100px Arial",r.measureText(e).width),r=(n.width=l,n.height=a,r.font="normal 100px Arial",r.textAlign="center",r.textBaseline="middle",r.fillStyle="#ffffff",r.fillText(e,l/2,50),new THREE.Texture(n)),e=(r.needsUpdate=!0,new THREE.MeshBasicMaterial({color:16777215,side:THREE.DoubleSide,map:r,transparent:!0})),n=new THREE.PlaneGeometry(t*l/a,t);return new THREE.Mesh(n,e)}export{createText};