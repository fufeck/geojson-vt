!function(t,e){"object"==typeof exports&&"undefined"!=typeof module?e(exports):"function"==typeof define&&define.amd?define(["exports"],e):e((t="undefined"!=typeof globalThis?globalThis:t||self).geojsonvt={})}(this,(function(t){"use strict";function e(t,i,o,r){for(var l,a=r,s=o-i>>1,u=o-i,f=t[i],g=t[i+1],h=t[o],m=t[o+1],p=i+3;p<o;p+=3){var d=n(t[p],t[p+1],f,g,h,m);if(d>a)l=p,a=d;else if(d===a){var c=Math.abs(p-s);c<u&&(l=p,u=c)}}a>r&&(l-i>3&&e(t,i,l,r),t[l+2]=a,o-l>3&&e(t,l,o,r))}function n(t,e,n,i,o,r){var l=o-n,a=r-i;if(0!==l||0!==a){var s=((t-n)*l+(e-i)*a)/(l*l+a*a);s>1?(n=o,i=r):s>0&&(n+=l*s,i+=a*s)}return(l=t-n)*l+(a=e-i)*a}function i(t,e,n,i){var r={id:null==t?null:t,type:e,geometry:n,tags:i,minX:1/0,minY:1/0,maxX:-1/0,maxY:-1/0};if("Point"===e||"MultiPoint"===e||"LineString"===e)o(r,n);else if("Polygon"===e)o(r,n[0]);else if("MultiLineString"===e)for(var l=0,a=n;l<a.length;l+=1){o(r,a[l])}else if("MultiPolygon"===e)for(var s=0,u=n;s<u.length;s+=1){o(r,u[s][0])}return r}function o(t,e){for(var n=0;n<e.length;n+=3)t.minX=Math.min(t.minX,e[n]),t.minY=Math.min(t.minY,e[n+1]),t.maxX=Math.max(t.maxX,e[n]),t.maxY=Math.max(t.maxY,e[n+1])}function r(t,e,n,o){if(e.geometry){var u=e.geometry.coordinates,f=e.geometry.type,g=Math.pow(n.tolerance/((1<<n.maxZoom)*n.extent),2),h=[],m=e.id;if(n.promoteId?m=e.properties[n.promoteId]:n.generateId&&(m=o||0),"Point"===f)l(u,h);else if("MultiPoint"===f)for(var p=0,d=u;p<d.length;p+=1){l(d[p],h)}else if("LineString"===f)a(u,h,g,!1);else if("MultiLineString"===f){if(n.lineMetrics){for(var c=0,v=u;c<v.length;c+=1){a(v[c],h=[],g,!1),t.push(i(m,"LineString",h,e.properties))}return}s(u,h,g,!1)}else if("Polygon"===f)s(u,h,g,!0);else{if("MultiPolygon"!==f){if("GeometryCollection"===f){for(var x=0,M=e.geometry.geometries;x<M.length;x+=1){r(t,{id:m,geometry:M[x],properties:e.properties},n,o)}return}throw new Error("Input data is not a valid GeoJSON object.")}for(var y=0,P=u;y<P.length;y+=1){var S=[];s(P[y],S,g,!0),h.push(S)}}t.push(i(m,f,h,e.properties))}}function l(t,e){e.push(u(t[0]),f(t[1]),0)}function a(t,n,i,o){for(var r,l,a=0,s=0;s<t.length;s++){var g=u(t[s][0]),h=f(t[s][1]);n.push(g,h,0),s>0&&(a+=o?(r*h-g*l)/2:Math.sqrt(Math.pow(g-r,2)+Math.pow(h-l,2))),r=g,l=h}var m=n.length-3;n[2]=1,e(n,0,m,i),n[m+2]=1,n.size=Math.abs(a),n.start=0,n.end=n.size}function s(t,e,n,i){for(var o=0;o<t.length;o++){var r=[];a(t[o],r,n,i),e.push(r)}}function u(t){return t/360+.5}function f(t){var e=Math.sin(t*Math.PI/180),n=.5-.25*Math.log((1+e)/(1-e))/Math.PI;return n<0?0:n>1?1:n}function g(t,e,n,o,r,l,a,s){if(o/=e,l>=(n/=e)&&a<o)return t;if(a<n||l>=o)return null;for(var u=[],f=0,g=t;f<g.length;f+=1){var p=g[f],c=p.geometry,v=p.type,x=0===r?p.minX:p.minY,M=0===r?p.maxX:p.maxY;if(x>=n&&M<o)u.push(p);else if(!(M<n||x>=o)){var y=[];if("Point"===v||"MultiPoint"===v)h(c,y,n,o,r);else if("LineString"===v)m(c,y,n,o,r,!1,s.lineMetrics);else if("MultiLineString"===v)d(c,y,n,o,r,!1);else if("Polygon"===v)d(c,y,n,o,r,!0);else if("MultiPolygon"===v)for(var P=0,S=c;P<S.length;P+=1){var Y=[];d(S[P],Y,n,o,r,!0),Y.length&&y.push(Y)}if(y.length){if(s.lineMetrics&&"LineString"===v){for(var X=0,L=y;X<L.length;X+=1){var b=L[X];u.push(i(p.id,v,b,p.tags))}continue}"LineString"!==v&&"MultiLineString"!==v||(1===y.length?(v="LineString",y=y[0]):v="MultiLineString"),"Point"!==v&&"MultiPoint"!==v||(v=3===y.length?"Point":"MultiPoint"),u.push(i(p.id,v,y,p.tags))}}}return u.length?u:null}function h(t,e,n,i,o){for(var r=0;r<t.length;r+=3){var l=t[r+o];l>=n&&l<=i&&c(e,t[r],t[r+1],t[r+2])}}function m(t,e,n,i,o,r,l){for(var a,s,u=p(t),f=0===o?v:x,g=t.start,h=0;h<t.length-3;h+=3){var m=t[h],d=t[h+1],M=t[h+2],y=t[h+3],P=t[h+4],S=0===o?m:d,Y=0===o?y:P,X=!1;l&&(a=Math.sqrt(Math.pow(m-y,2)+Math.pow(d-P,2))),S<n?Y>n&&(s=f(u,m,d,y,P,n),l&&(u.start=g+a*s)):S>i?Y<i&&(s=f(u,m,d,y,P,i),l&&(u.start=g+a*s)):c(u,m,d,M),Y<n&&S>=n&&(s=f(u,m,d,y,P,n),X=!0),Y>i&&S<=i&&(s=f(u,m,d,y,P,i),X=!0),!r&&X&&(l&&(u.end=g+a*s),e.push(u),u=p(t)),l&&(g+=a)}var L=t.length-3,b=t[L],z=t[L+1],w=t[L+2],I=0===o?b:z;I>=n&&I<=i&&c(u,b,z,w),L=u.length-3,r&&L>=3&&(u[L]!==u[0]||u[L+1]!==u[1])&&c(u,u[0],u[1],u[2]),u.length&&e.push(u)}function p(t){var e=[];return e.size=t.size,e.start=t.start,e.end=t.end,e}function d(t,e,n,i,o,r){for(var l=0,a=t;l<a.length;l+=1){m(a[l],e,n,i,o,r,!1)}}function c(t,e,n,i){t.push(e,n,i)}function v(t,e,n,i,o,r){var l=(r-e)/(i-e);return c(t,r,n+(o-n)*l,1),l}function x(t,e,n,i,o,r){var l=(r-n)/(o-n);return c(t,e+(i-e)*l,r,1),l}function M(t,e){for(var n=[],o=0;o<t.length;o++){var r=t[o],l=r.type,a=void 0;if("Point"===l||"MultiPoint"===l||"LineString"===l)a=y(r.geometry,e);else if("MultiLineString"===l||"Polygon"===l){a=[];for(var s=0,u=r.geometry;s<u.length;s+=1){var f=u[s];a.push(y(f,e))}}else if("MultiPolygon"===l){a=[];for(var g=0,h=r.geometry;g<h.length;g+=1){for(var m=[],p=0,d=h[g];p<d.length;p+=1){var c=d[p];m.push(y(c,e))}a.push(m)}}n.push(i(r.id,l,a,r.tags))}return n}function y(t,e){var n=[];n.size=t.size,void 0!==t.start&&(n.start=t.start,n.end=t.end);for(var i=0;i<t.length;i+=3)n.push(t[i]+e,t[i+1],t[i+2]);return n}function P(t,e){if(t.transformed)return t;for(var n=1<<t.z,i=t.x,o=t.y,r=0,l=t.features;r<l.length;r+=1){var a=l[r],s=a.geometry,u=a.type;if(a.geometry=[],1===u)for(var f=0;f<s.length;f+=2)a.geometry.push(S(s[f],s[f+1],e,n,i,o));else for(var g=0;g<s.length;g++){for(var h=[],m=0;m<s[g].length;m+=2)h.push(S(s[g][m],s[g][m+1],e,n,i,o));a.geometry.push(h)}}return t.transformed=!0,t}function S(t,e,n,i,o,r){return[Math.round(n*(t*i-o)),Math.round(n*(e*i-r))]}function Y(t,e,n,i,o){for(var r=e===o.maxZoom?0:o.tolerance/((1<<e)*o.extent),l={features:[],numPoints:0,numSimplified:0,numFeatures:t.length,source:null,x:n,y:i,z:e,transformed:!1,minX:2,minY:1,maxX:-1,maxY:0},a=0,s=t;a<s.length;a+=1){X(l,s[a],r,o)}return l}function X(t,e,n,i){var o=e.geometry,r=e.type,l=[];if(t.minX=Math.min(t.minX,e.minX),t.minY=Math.min(t.minY,e.minY),t.maxX=Math.max(t.maxX,e.maxX),t.maxY=Math.max(t.maxY,e.maxY),"Point"===r||"MultiPoint"===r)for(var a=0;a<o.length;a+=3)l.push(o[a],o[a+1]),t.numPoints++,t.numSimplified++;else if("LineString"===r)L(l,o,t,n,!1,!1);else if("MultiLineString"===r||"Polygon"===r)for(var s=0;s<o.length;s++)L(l,o[s],t,n,"Polygon"===r,0===s);else if("MultiPolygon"===r)for(var u=0;u<o.length;u++)for(var f=o[u],g=0;g<f.length;g++)L(l,f[g],t,n,!0,0===g);if(l.length){var h=e.tags||null;if("LineString"===r&&i.lineMetrics){for(var m in h={},e.tags)h[m]=e.tags[m];h.mapbox_clip_start=o.start/o.size,h.mapbox_clip_end=o.end/o.size}var p={geometry:l,type:"Polygon"===r||"MultiPolygon"===r?3:"LineString"===r||"MultiLineString"===r?2:1,tags:h};null!==e.id&&(p.id=e.id),t.features.push(p)}}function L(t,e,n,i,o,r){var l=i*i;if(i>0&&e.size<(o?l:i))n.numPoints+=e.length/3;else{for(var a=[],s=0;s<e.length;s+=3)(0===i||e[s+2]>l)&&(n.numSimplified++,a.push(e[s],e[s+1])),n.numPoints++;o&&function(t,e){for(var n=0,i=0,o=t.length,r=o-2;i<o;r=i,i+=2)n+=(t[i]-t[r])*(t[i+1]+t[r+1]);if(n>0===e)for(var l=0,a=t.length;l<a/2;l+=2){var s=t[l],u=t[l+1];t[l]=t[a-2-l],t[l+1]=t[a-1-l],t[a-2-l]=s,t[a-1-l]=u}}(a,r),t.push(a)}}var b={maxZoom:14,indexMaxZoom:5,indexMaxPoints:1e5,tolerance:3,extent:4096,buffer:64,lineMetrics:!1,promoteId:null,generateId:!1,debug:0},z=function(t,e){var n=(e=this.options=function(t,e){for(var n in e)t[n]=e[n];return t}(Object.create(b),e)).debug;if(n&&console.time("preprocess data"),e.maxZoom<0||e.maxZoom>24)throw new Error("maxZoom should be in the 0-24 range");if(e.promoteId&&e.generateId)throw new Error("promoteId and generateId cannot be used together.");var i=function(t,e){var n=[];if("FeatureCollection"===t.type)for(var i=0;i<t.features.length;i++)r(n,t.features[i],e,i);else"Feature"===t.type?r(n,t,e):r(n,{geometry:t},e);return n}(t,e);this.tiles={},this.tileCoords=[],n&&(console.timeEnd("preprocess data"),console.log("index: maxZoom: %d, maxPoints: %d",e.indexMaxZoom,e.indexMaxPoints),console.time("generate tiles"),this.stats={},this.total=0),i=function(t,e){var n=e.buffer/e.extent,i=t,o=g(t,1,-1-n,n,0,-1,2,e),r=g(t,1,1-n,2+n,0,-1,2,e);return(o||r)&&(i=g(t,1,-n,1+n,0,-1,2,e)||[],o&&(i=M(o,1).concat(i)),r&&(i=i.concat(M(r,-1)))),i}(i,e),i.length&&this.splitTile(i,0,0,0),n&&(i.length&&console.log("features: %d, points: %d",this.tiles[0].numFeatures,this.tiles[0].numPoints),console.timeEnd("generate tiles"),console.log("tiles generated:",this.total,JSON.stringify(this.stats)))};function w(t,e,n){return 32*((1<<t)*n+e)+t}z.prototype.splitTile=function(t,e,n,i,o,r,l){for(var a=[t,e,n,i],s=this.options,u=s.debug;a.length;){i=a.pop(),n=a.pop(),e=a.pop(),t=a.pop();var f=1<<e,h=w(e,n,i),m=this.tiles[h];if(!m&&(u>1&&console.time("creation"),m=this.tiles[h]=Y(t,e,n,i,s),this.tileCoords.push({z:e,x:n,y:i}),u)){u>1&&(console.log("tile z%d-%d-%d (features: %d, points: %d, simplified: %d)",e,n,i,m.numFeatures,m.numPoints,m.numSimplified),console.timeEnd("creation"));var p="z"+e;this.stats[p]=(this.stats[p]||0)+1,this.total++}if(m.source=t,null==o){if(e===s.indexMaxZoom||m.numPoints<=s.indexMaxPoints)continue}else{if(e===s.maxZoom||e===o)continue;if(null!=o){var d=o-e;if(n!==r>>d||i!==l>>d)continue}}if(m.source=null,0!==t.length){u>1&&console.time("clipping");var c=.5*s.buffer/s.extent,v=.5-c,x=.5+c,M=1+c,y=null,P=null,S=null,X=null,L=g(t,f,n-c,n+x,0,m.minX,m.maxX,s),b=g(t,f,n+v,n+M,0,m.minX,m.maxX,s);t=null,L&&(y=g(L,f,i-c,i+x,1,m.minY,m.maxY,s),P=g(L,f,i+v,i+M,1,m.minY,m.maxY,s),L=null),b&&(S=g(b,f,i-c,i+x,1,m.minY,m.maxY,s),X=g(b,f,i+v,i+M,1,m.minY,m.maxY,s),b=null),u>1&&console.timeEnd("clipping"),a.push(y||[],e+1,2*n,2*i),a.push(P||[],e+1,2*n,2*i+1),a.push(S||[],e+1,2*n+1,2*i),a.push(X||[],e+1,2*n+1,2*i+1)}}},z.prototype.getTile=function(t,e,n){t=+t,e=+e,n=+n;var i=this.options,o=i.extent,r=i.debug;if(t<0||t>24)return null;var l=1<<t,a=w(t,e=e+l&l-1,n);if(this.tiles[a])return P(this.tiles[a],o);r>1&&console.log("drilling down to z%d-%d-%d",t,e,n);for(var s,u=t,f=e,g=n;!s&&u>0;)u--,f>>=1,g>>=1,s=this.tiles[w(u,f,g)];return s&&s.source?(r>1&&(console.log("found parent tile z%d-%d-%d",u,f,g),console.time("drilling down")),this.splitTile(s.source,u,f,g,t,e,n),r>1&&console.timeEnd("drilling down"),this.tiles[a]?P(this.tiles[a],o):null):null},t.GeoJSONVT=z,t.geojsonvt=function(t,e){return new z(t,e)}}));
