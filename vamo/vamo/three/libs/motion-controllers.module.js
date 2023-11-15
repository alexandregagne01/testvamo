const Constants={Handedness:Object.freeze({NONE:"none",LEFT:"left",RIGHT:"right"}),ComponentState:Object.freeze({DEFAULT:"default",TOUCHED:"touched",PRESSED:"pressed"}),ComponentProperty:Object.freeze({BUTTON:"button",X_AXIS:"xAxis",Y_AXIS:"yAxis",STATE:"state"}),ComponentType:Object.freeze({TRIGGER:"trigger",SQUEEZE:"squeeze",TOUCHPAD:"touchpad",THUMBSTICK:"thumbstick",BUTTON:"button"}),ButtonTouchThreshold:.05,AxisTouchThreshold:.1,VisualResponseProperty:Object.freeze({TRANSFORM:"transform",VISIBILITY:"visibility"})};async function fetchJsonFile(t){t=await fetch(t);if(t.ok)return t.json();throw new Error(t.statusText)}async function fetchProfilesList(t){if(t)return await fetchJsonFile(t+"/profilesList.json");throw new Error("No basePath supplied")}async function fetchProfile(e,s,o=null,t=!0){if(!e)throw new Error("No xrInputSource supplied");if(!s)throw new Error("No basePath supplied");const a=await fetchProfilesList(s);let i;if(e.profiles.some(t=>{var e=a[t];return!!(i=e?{profileId:t,profilePath:s+"/"+e.path,deprecated:!!e.deprecated}:i)}),!i){if(!o)throw new Error("No matching profile name found");var n=a[o];if(!n)throw new Error(`No matching profile name found and default profile "${o}" missing.`);i={profileId:o,profilePath:s+"/"+n.path,deprecated:!!n.deprecated}}o=await fetchJsonFile(i.profilePath);let r;if(t){let t;if(!(t="any"===e.handedness?o.layouts[Object.keys(o.layouts)[0]]:o.layouts[e.handedness]))throw new Error(`No matching handedness, ${e.handedness}, in profile `+i.profileId);t.assetPath&&(r=i.profilePath.replace("profile.json",t.assetPath))}return{profile:o,assetPath:r}}const defaultComponentValues={xAxis:0,yAxis:0,button:0,state:Constants.ComponentState.DEFAULT};function normalizeAxes(t=0,e=0){let s=t,o=e;1<Math.sqrt(t*t+e*e)&&(e=Math.atan2(e,t),s=Math.cos(e),o=Math.sin(e));t={normalizedXAxis:.5*s+.5,normalizedYAxis:.5*o+.5};return t}class VisualResponse{constructor(t){this.componentProperty=t.componentProperty,this.states=t.states,this.valueNodeName=t.valueNodeName,this.valueNodeProperty=t.valueNodeProperty,this.valueNodeProperty===Constants.VisualResponseProperty.TRANSFORM&&(this.minNodeName=t.minNodeName,this.maxNodeName=t.maxNodeName),this.value=0,this.updateFromComponent(defaultComponentValues)}updateFromComponent({xAxis:t,yAxis:e,button:s,state:o}){var{normalizedXAxis:a,normalizedYAxis:i}=normalizeAxes(t,e);switch(this.componentProperty){case Constants.ComponentProperty.X_AXIS:this.value=this.states.includes(o)?a:.5;break;case Constants.ComponentProperty.Y_AXIS:this.value=this.states.includes(o)?i:.5;break;case Constants.ComponentProperty.BUTTON:this.value=this.states.includes(o)?s:0;break;case Constants.ComponentProperty.STATE:this.valueNodeProperty===Constants.VisualResponseProperty.VISIBILITY?this.value=this.states.includes(o):this.value=this.states.includes(o)?1:0;break;default:throw new Error("Unexpected visualResponse componentProperty "+this.componentProperty)}}}class Component{constructor(t,s){if(!(t&&s&&s.visualResponses&&s.gamepadIndices&&0!==Object.keys(s.gamepadIndices).length))throw new Error("Invalid arguments supplied");this.id=t,this.type=s.type,this.rootNodeName=s.rootNodeName,this.touchPointNodeName=s.touchPointNodeName,this.visualResponses={},Object.keys(s.visualResponses).forEach(t=>{var e=new VisualResponse(s.visualResponses[t]);this.visualResponses[t]=e}),this.gamepadIndices=Object.assign({},s.gamepadIndices),this.values={state:Constants.ComponentState.DEFAULT,button:void 0!==this.gamepadIndices.button?0:void 0,xAxis:void 0!==this.gamepadIndices.xAxis?0:void 0,yAxis:void 0!==this.gamepadIndices.yAxis?0:void 0}}get data(){return{id:this.id,...this.values}}updateFromGamepad(t){var e;this.values.state=Constants.ComponentState.DEFAULT,void 0!==this.gamepadIndices.button&&t.buttons.length>this.gamepadIndices.button&&(e=t.buttons[this.gamepadIndices.button],this.values.button=e.value,this.values.button=this.values.button<0?0:this.values.button,this.values.button=1<this.values.button?1:this.values.button,e.pressed||1===this.values.button?this.values.state=Constants.ComponentState.PRESSED:(e.touched||this.values.button>Constants.ButtonTouchThreshold)&&(this.values.state=Constants.ComponentState.TOUCHED)),void 0!==this.gamepadIndices.xAxis&&t.axes.length>this.gamepadIndices.xAxis&&(this.values.xAxis=t.axes[this.gamepadIndices.xAxis],this.values.xAxis=this.values.xAxis<-1?-1:this.values.xAxis,this.values.xAxis=1<this.values.xAxis?1:this.values.xAxis,this.values.state===Constants.ComponentState.DEFAULT&&Math.abs(this.values.xAxis)>Constants.AxisTouchThreshold&&(this.values.state=Constants.ComponentState.TOUCHED)),void 0!==this.gamepadIndices.yAxis&&t.axes.length>this.gamepadIndices.yAxis&&(this.values.yAxis=t.axes[this.gamepadIndices.yAxis],this.values.yAxis=this.values.yAxis<-1?-1:this.values.yAxis,this.values.yAxis=1<this.values.yAxis?1:this.values.yAxis,this.values.state===Constants.ComponentState.DEFAULT&&Math.abs(this.values.yAxis)>Constants.AxisTouchThreshold&&(this.values.state=Constants.ComponentState.TOUCHED)),Object.values(this.visualResponses).forEach(t=>{t.updateFromComponent(this.values)})}}class MotionController{constructor(t,e,s){if(!t)throw new Error("No xrInputSource supplied");if(!e)throw new Error("No profile supplied");this.xrInputSource=t,this.assetUrl=s,this.id=e.profileId,this.layoutDescription=e.layouts[t.handedness],this.components={},Object.keys(this.layoutDescription.components).forEach(t=>{var e=this.layoutDescription.components[t];this.components[t]=new Component(t,e)}),this.updateFromGamepad()}get gripSpace(){return this.xrInputSource.gripSpace}get targetRaySpace(){return this.xrInputSource.targetRaySpace}get data(){const e=[];return Object.values(this.components).forEach(t=>{e.push(t.data)}),e}updateFromGamepad(){Object.values(this.components).forEach(t=>{t.updateFromGamepad(this.xrInputSource.gamepad)})}}export{Constants,MotionController,fetchProfile,fetchProfilesList};