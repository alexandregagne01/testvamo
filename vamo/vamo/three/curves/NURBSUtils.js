import{Vector3,Vector4}from"../three.module.js";function findSpan(e,r,t){var l=t.length-e-1;if(r>=t[l])return l-1;if(r<=t[e])return e;let a=e,c=l,i=Math.floor((a+c)/2);for(;r<t[i]||r>=t[i+1];)r<t[i]?c=i:a=i,i=Math.floor((a+c)/2);return i}function calcBasisFunctions(e,l,r,a){var c=[],i=[],n=[];for(let t=c[0]=1;t<=r;++t){i[t]=l-a[e+1-t],n[t]=a[e+t]-l;let r=0;for(let e=0;e<t;++e){var o=n[e+1],v=i[t-e],f=c[e]/(o+v);c[e]=r+o*f,r=v*f}c[t]=r}return c}function calcBSplinePoint(r,e,t,l){var a=findSpan(r,l,e),c=calcBasisFunctions(a,l,r,e),i=new Vector4(0,0,0,0);for(let e=0;e<=r;++e){var n=t[a-r+e],o=c[e],v=n.w*o;i.x+=n.x*v,i.y+=n.y*v,i.z+=n.z*v,i.w+=n.w*o}return i}function calcBasisFunctionDerivatives(e,l,c,i,a){var r=[];for(let e=0;e<=c;++e)r[e]=0;var n=[];for(let e=0;e<=i;++e)n[e]=r.slice(0);var o=[];for(let e=0;e<=c;++e)o[e]=r.slice(0);o[0][0]=1;var v=r.slice(0),f=r.slice(0);for(let t=1;t<=c;++t){v[t]=l-a[e+1-t],f[t]=a[e+t]-l;let r=0;for(let e=0;e<t;++e){var s=f[e+1],u=v[t-e],S=(o[t][e]=s+u,o[e][t-1]/o[t][e]);o[e][t]=r+s*S,r=u*S}o[t][t]=r}for(let e=0;e<=c;++e)n[0][e]=o[e][c];for(let a=0;a<=c;++a){let t=0,l=1;var p=[];for(let e=0;e<=c;++e)p[e]=r.slice(0);for(let e=p[0][0]=1;e<=i;++e){let r=0;var d=a-e,B=c-e,w=(a>=e&&(p[l][0]=p[t][0]/o[1+B][d],r=p[l][0]*o[d][B]),-1<=d?1:-d),y=a-1<=B?e-1:c-a;for(let e=w;e<=y;++e)p[l][e]=(p[t][e]-p[t][e-1])/o[1+B][d+e],r+=p[l][e]*o[d+e][B];a<=B&&(p[l][e]=-p[t][e-1]/o[1+B][a],r+=p[l][e]*o[a][B]),n[e][a]=r;w=t;t=l,l=w}}let t=c;for(let r=1;r<=i;++r){for(let e=0;e<=c;++e)n[r][e]*=t;t*=c-r}return n}function calcBSplineDerivatives(t,e,r,l,a){var c=a<t?a:t,i=[],n=findSpan(t,l,e),o=calcBasisFunctionDerivatives(n,l,t,c,e),v=[];for(let e=0;e<r.length;++e){var f=r[e].clone(),s=f.w;f.x*=s,f.y*=s,f.z*=s,v[e]=f}for(let r=0;r<=c;++r){var u=v[n-t].clone().multiplyScalar(o[r][0]);for(let e=1;e<=t;++e)u.add(v[n-t+e].clone().multiplyScalar(o[r][e]));i[r]=u}for(let e=c+1;e<=a+1;++e)i[e]=new Vector4(0,0,0);return i}function calcKoverI(r,t){let l=1;for(let e=2;e<=r;++e)l*=e;let a=1;for(let e=2;e<=t;++e)a*=e;for(let e=2;e<=r-t;++e)a*=e;return l/a}function calcRationalCurveDerivatives(r){var t=r.length,l=[],a=[];for(let e=0;e<t;++e){var c=r[e];l[e]=new Vector3(c.x,c.y,c.z),a[e]=c.w}var i=[];for(let r=0;r<t;++r){var n=l[r].clone();for(let e=1;e<=r;++e)n.sub(i[r-e].clone().multiplyScalar(calcKoverI(r,e)*a[e]));i[r]=n.divideScalar(a[0])}return i}function calcNURBSDerivatives(e,r,t,l,a){return calcRationalCurveDerivatives(calcBSplineDerivatives(e,r,t,l,a))}function calcSurfacePoint(t,l,e,r,a,c,i,n){var o=findSpan(t,c,e),v=findSpan(l,i,r),f=calcBasisFunctions(o,c,t,e),s=calcBasisFunctions(v,i,l,r),u=[];for(let r=0;r<=l;++r){u[r]=new Vector4(0,0,0,0);for(let e=0;e<=t;++e){var S=a[o-t+e][v-l+r].clone(),p=S.w;S.x*=p,S.y*=p,S.z*=p,u[r].add(S.multiplyScalar(f[e]))}}var d=new Vector4(0,0,0,0);for(let e=0;e<=l;++e)d.add(u[e].multiplyScalar(s[e]));d.divideScalar(d.w),n.set(d.x,d.y,d.z)}export{findSpan,calcBasisFunctions,calcBSplinePoint,calcBasisFunctionDerivatives,calcBSplineDerivatives,calcKoverI,calcRationalCurveDerivatives,calcNURBSDerivatives,calcSurfacePoint};