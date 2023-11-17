import{BufferGeometry,FileLoader,Float32BufferAttribute,Loader,LoaderUtils,Color}from"../three.module.js";const _color=new Color;class PLYLoader extends Loader{constructor(e){super(e),this.propertyNameMapping={},this.customPropertyMapping={}}load(t,r,e,n){const s=this;var o=new FileLoader(this.manager);o.setPath(this.path),o.setResponseType("arraybuffer"),o.setRequestHeader(this.requestHeader),o.setWithCredentials(this.withCredentials),o.load(t,function(e){try{r(s.parse(e))}catch(e){n?n(e):console.error(e),s.manager.itemError(t)}},e,n)}setPropertyNameMapping(e){this.propertyNameMapping=e}setCustomPropertyNameMapping(e){this.customPropertyMapping=e}parse(e){function t(e){let t="",r=0;var n,s,o,e=/^ply([\s\S]*)end_header(\r\n|\r|\n)/.exec(e),a=(null!==e&&(t=e[1],r=new Blob([e[0]]).size),{comments:[],elements:[],headerLength:r,objInfo:""}),i=t.split(/\r\n|\r|\n/);let u;for(let t=0;t<i.length;t++){let e=i[t];if(""!==(e=e.trim())){var l=e.split(/\s+/),c=l.shift();switch(e=l.join(" "),c){case"format":a.format=l[0],a.version=l[1];break;case"comment":a.comments.push(e);break;case"element":void 0!==u&&a.elements.push(u),(u={}).name=l[0],u.count=parseInt(l[1]),u.properties=[];break;case"property":u.properties.push((n=l,s=y.propertyNameMapping,o=void 0,"list"===(o={type:n[0]}).type?(o.name=n[3],o.countType=n[1],o.itemType=n[2]):o.name=n[1],o.name in s&&(o.name=s[o.name]),o));break;case"obj_info":a.objInfo=e;break;default:console.log("unhandled",c,l)}}}return void 0!==u&&a.elements.push(u),a}function u(e,t){switch(t){case"char":case"uchar":case"short":case"ushort":case"int":case"uint":case"int8":case"uint8":case"int16":case"uint16":case"int32":case"uint32":return parseInt(e);case"float":case"double":case"float32":case"float64":return parseFloat(e)}}function l(){var e={indices:[],vertices:[],normals:[],uvs:[],faceVertexUvs:[],colors:[]};for(const t of Object.keys(y.customPropertyMapping))e[t]=[];return e}function r(e,r){var n=l();let t="";var s,o=(t=null!==(e=/end_header\s([\s\S]*)$/.exec(e))?e[1]:t).split(/\r\n|\r|\n/);let a=0,i=0;for(let t=0;t<o.length;t++){let e=o[t];""!==(e=e.trim())&&(i>=r.elements[a].count&&(a++,i=0),s=function(r,e){var n=e.split(/\s+/),s={};for(let t=0;t<r.length;t++)if("list"===r[t].type){var o=[],a=u(n.shift(),r[t].countType);for(let e=0;e<a;e++)o.push(u(n.shift(),r[t].itemType));s[r[t].name]=o}else s[r[t].name]=u(n.shift(),r[t].type);return s}(r.elements[a].properties,e),p(n,r.elements[a].name,s),i++)}return c(n)}function c(e){let t=new BufferGeometry;0<e.indices.length&&t.setIndex(e.indices),t.setAttribute("position",new Float32BufferAttribute(e.vertices,3)),0<e.normals.length&&t.setAttribute("normal",new Float32BufferAttribute(e.normals,3)),0<e.uvs.length&&t.setAttribute("uv",new Float32BufferAttribute(e.uvs,2)),0<e.colors.length&&t.setAttribute("color",new Float32BufferAttribute(e.colors,3)),0<e.faceVertexUvs.length&&(t=t.toNonIndexed()).setAttribute("uv",new Float32BufferAttribute(e.faceVertexUvs,2));for(const r of Object.keys(y.customPropertyMapping))0<e[r].length&&t.setAttribute(r,new Float32BufferAttribute(e[r],y.customPropertyMapping[r].length));return t.computeBoundingSphere(),t}function p(e,t,s){function r(r){for(let e=0,t=r.length;e<t;e++){var n=r[e];if(n in s)return n}return null}var n=r(["x","px","posx"])||"x",o=r(["y","py","posy"])||"y",a=r(["z","pz","posz"])||"z",i=r(["nx","normalx"]),u=r(["ny","normaly"]),l=r(["nz","normalz"]),c=r(["s","u","texture_u","tx"]),p=r(["t","v","texture_v","ty"]),f=r(["red","diffuse_red","r","diffuse_r"]),h=r(["green","diffuse_green","g","diffuse_g"]),m=r(["blue","diffuse_blue","b","diffuse_b"]);if("vertex"===t){e.vertices.push(s[n],s[o],s[a]),null!==i&&null!==u&&null!==l&&e.normals.push(s[i],s[u],s[l]),null!==c&&null!==p&&e.uvs.push(s[c],s[p]),null!==f&&null!==h&&null!==m&&(_color.setRGB(s[f]/255,s[h]/255,s[m]/255).convertSRGBToLinear(),e.colors.push(_color.r,_color.g,_color.b));for(const d of Object.keys(y.customPropertyMapping))for(const g of y.customPropertyMapping[d])e[d].push(s[g])}else"face"===t&&(n=s.vertex_indices||s.vertex_index,o=s.texcoord,3===n.length?(e.indices.push(n[0],n[1],n[2]),o&&6===o.length&&(e.faceVertexUvs.push(o[0],o[1]),e.faceVertexUvs.push(o[2],o[3]),e.faceVertexUvs.push(o[4],o[5]))):4===n.length&&(e.indices.push(n[0],n[1],n[3]),e.indices.push(n[1],n[2],n[3])))}function f(e,t,r,n){switch(r){case"int8":case"char":return[e.getInt8(t),1];case"uint8":case"uchar":return[e.getUint8(t),1];case"int16":case"short":return[e.getInt16(t,n),2];case"uint16":case"ushort":return[e.getUint16(t,n),2];case"int32":case"int":return[e.getInt32(t,n),4];case"uint32":case"uint":return[e.getUint32(t,n),4];case"float32":case"float":return[e.getFloat32(t,n),4];case"float64":case"double":return[e.getFloat64(t,n),8]}}function n(e,r){var n=l(),s="binary_little_endian"===r.format,o=new DataView(e,r.headerLength);let a,i=0;for(let t=0;t<r.elements.length;t++)for(let e=0;e<r.elements[t].count;e++){a=function(r,n,s,o){var e={};let a,i=0;for(let t=0;t<s.length;t++)if("list"===s[t].type){var u=[],l=(a=f(r,n+i,s[t].countType,o))[0];i+=a[1];for(let e=0;e<l;e++)a=f(r,n+i,s[t].itemType,o),u.push(a[0]),i+=a[1];e[s[t].name]=u}else a=f(r,n+i,s[t].type,o),e[s[t].name]=a[0],i+=a[1];return[e,i]}(o,i,r.elements[t].properties,s),i+=a[1];var u=a[0];p(n,r.elements[t].name,u)}return c(n)}let s;const y=this;var o,a;return s=e instanceof ArrayBuffer?"ascii"===(a=t(o=LoaderUtils.decodeText(new Uint8Array(e)))).format?r(o,a):n(e,a):r(e,t(e))}}export{PLYLoader};