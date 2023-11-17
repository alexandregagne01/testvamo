import{Object3D,Sphere,Box3}from"../three.module.js";import{XRHandMeshModel}from"./XRHandMeshModel.js";const TOUCH_RADIUS=.01,POINTING_JOINT="index-finger-tip";class OculusHandModel extends Object3D{constructor(t,e=null){super(),this.controller=t,this.motionController=null,this.envMap=null,this.loader=e,this.mesh=null,t.addEventListener("connected",e=>{e=e.data;e.hand&&!this.motionController&&(this.xrInputSource=e,this.motionController=new XRHandMeshModel(this,t,this.path,e.handedness,this.loader))}),t.addEventListener("disconnected",()=>{this.clear(),this.motionController=null})}updateMatrixWorld(e){super.updateMatrixWorld(e),this.motionController&&this.motionController.updateMesh()}getPointerPosition(){var e=this.controller.joints[POINTING_JOINT];return e?e.position:null}intersectBoxObject(e){var t=this.getPointerPosition();return!!t&&(t=new Sphere(t,TOUCH_RADIUS),e=(new Box3).setFromObject(e),t.intersectsBox(e))}checkButton(e){this.intersectBoxObject(e)?e.onPress():e.onClear(),e.isPressed()&&e.whilePressed()}}export{OculusHandModel};