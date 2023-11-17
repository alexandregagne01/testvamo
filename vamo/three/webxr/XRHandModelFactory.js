import{Object3D}from"../three.module.js";import{XRHandPrimitiveModel}from"./XRHandPrimitiveModel.js";import{XRHandMeshModel}from"./XRHandMeshModel.js";class XRHandModel extends Object3D{constructor(e){super(),this.controller=e,this.motionController=null,this.envMap=null,this.mesh=null}updateMatrixWorld(e){super.updateMatrixWorld(e),this.motionController&&this.motionController.updateMesh()}}class XRHandModelFactory{constructor(){this.path=null}setPath(e){return this.path=e,this}createHandModel(t,o){const n=new XRHandModel(t);return t.addEventListener("connected",e=>{e=e.data;e.hand&&!n.motionController&&(n.xrInputSource=e,void 0===o||"spheres"===o?n.motionController=new XRHandPrimitiveModel(n,t,this.path,e.handedness,{primitive:"sphere"}):"boxes"===o?n.motionController=new XRHandPrimitiveModel(n,t,this.path,e.handedness,{primitive:"box"}):"mesh"===o&&(n.motionController=new XRHandMeshModel(n,t,this.path,e.handedness))),t.visible=!0}),t.addEventListener("disconnected",()=>{t.visible=!1}),n}}export{XRHandModelFactory};