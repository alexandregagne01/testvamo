import{DynamicDrawUsage,SphereGeometry,BoxGeometry,MeshStandardMaterial,InstancedMesh,Matrix4,Vector3}from"../three.module.js";const _matrix=new Matrix4,_vector=new Vector3;class XRHandPrimitiveModel{constructor(e,i,a,t,n){this.controller=i,this.handModel=e,this.envMap=null;let r;n&&n.primitive&&"sphere"!==n.primitive?"box"===n.primitive&&(r=new BoxGeometry(1,1,1)):r=new SphereGeometry(1,10,10);i=new MeshStandardMaterial;this.handMesh=new InstancedMesh(r,i,30),this.handMesh.instanceMatrix.setUsage(DynamicDrawUsage),this.handMesh.castShadow=!0,this.handMesh.receiveShadow=!0,this.handModel.add(this.handMesh),this.joints=["wrist","thumb-metacarpal","thumb-phalanx-proximal","thumb-phalanx-distal","thumb-tip","index-finger-metacarpal","index-finger-phalanx-proximal","index-finger-phalanx-intermediate","index-finger-phalanx-distal","index-finger-tip","middle-finger-metacarpal","middle-finger-phalanx-proximal","middle-finger-phalanx-intermediate","middle-finger-phalanx-distal","middle-finger-tip","ring-finger-metacarpal","ring-finger-phalanx-proximal","ring-finger-phalanx-intermediate","ring-finger-phalanx-distal","ring-finger-tip","pinky-finger-metacarpal","pinky-finger-phalanx-proximal","pinky-finger-phalanx-intermediate","pinky-finger-phalanx-distal","pinky-finger-tip"]}updateMesh(){var i=this.controller.joints;let a=0;for(let e=0;e<this.joints.length;e++){var t=i[this.joints[e]];t.visible&&(_vector.setScalar(t.jointRadius||.008),_matrix.compose(t.position,t.quaternion,_vector),this.handMesh.setMatrixAt(e,_matrix),a++)}this.handMesh.count=a,this.handMesh.instanceMatrix.needsUpdate=!0}}export{XRHandPrimitiveModel};