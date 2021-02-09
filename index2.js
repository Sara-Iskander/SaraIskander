!function(){metadata={systemName:"Regulatory.ATP.Integration.MuleSoft.FileAPI.Test2",displayName:"Regulatory ATP MuleSoft File API Test 2",description:"JS broker for ATP Files using MuleSoft API gateway.",configuration:{MuleSoftBaseURL:{displayName:"MuleSoft API Gateway Base URL, and excluding the API path.",type:"string",value:"https://api-dev.syngenta.com/ecom/file-management"}}};const e="/downloadfiles/v1.0/",t="/uploadfiles/v1.0/";ondescribe=async function({configuration:e}){postSchema({objects:{atpFile:{displayName:"ATP File",description:"ATP File Storage using MuleSoft and AWS S3.",properties:{fileName:{displayName:"File Name",type:"string"},content:{displayName:"File",type:"attachment"},contentType:{displayName:"Content Type",type:"string"},size:{displayName:"Size",type:"string"}},methods:{get:{displayName:"Get ATP File",type:"read",inputs:["fileName"],requiredInputs:["fileName"],outputs:["content","contentType","size"]},put:{displayName:"Put ATP File",type:"create",inputs:["fileName","content"],requiredInputs:["fileName","content"],outputs:["contentType","size"]},delete:{displayName:"Delete ATP File",type:"delete",inputs:["fileName"],requiredInputs:["fileName"]}}}}})},onexecute=async function({objectName:a,methodName:n,parameters:s,properties:o,configuration:i,schema:r}){switch(a){case"atpFile":await async function(a,n,s,o){switch(a){case"get":await function(t,a,n){return new Promise((t,s)=>{var o=new XMLHttpRequest;o.onreadystatechange=function(){try{if(console.log("xhr.readyState: "+o.readyState),4!==o.readyState)return;if(console.log("xhr.status: "+o.status),200!==o.status)throw new Error("Failed with status "+o.status);var e=o.response.toString("base64"),n='<files><file encoding="Base64"><name>'+a.fileName+"</name><content>"+e+"</content></file></files>";postResult({content:n,contentType:o.getResponseHeader("Content-Type"),size:o.getResponseHeader("Content-Length")}),t()}catch(e){s(e)}};var i=n.MuleSoftBaseURL+e+a.fileName;console.log("file download url: "+i),o.open("GET",i),o.withCredentials=!0,o.setRequestHeader("destination_s3","ATP"),o.send()})}(0,n,o);break;case"put":await function(e,a,n){return new Promise((e,s)=>{(l=new XMLHttpRequest).onreadystatechange=function(){try{if(console.log("xhr.readyState: "+l.readyState),4!==l.readyState)return;if(console.log("xhr.status: "+l.status),200!==l.status)throw new Error("Failed with status "+l.status);postResult({content:l.response,contentType:l.getResponseHeader("Content-Type"),size:l.getResponseHeader("Content-Length")}),e()}catch(e){s(e)}},console.log("config url: "+n.MuleSoftBaseURL);var o=n.MuleSoftBaseURL+t;console.log("file download url: "+o);var i=new FormData;i.append("attributes",JSON.stringify({name:a.fileName,parent:{id:"0"}}));let r=a.fileProperty.content;var l;i.append("file",r),(l=new XMLHttpRequest).onreadystatechange=function(){if(4===l.readyState){if(201!==l.status)throw new Error("Failed with status "+JSON.stringify(l.response));postResult({result:"File uploaded successfully"+JSON.stringify(l.response)})}},l.open("POST",o),l.withCredentials=!0,l.setRequestHeader("destination_s3","ATP"),l.send(i)})}(0,n,o);break;case"delete":await new Promise((e,t)=>{throw new Error("The method is not implemented yet.")});break;default:throw new Error("The method "+a+" is not supported.")}}(n,o,0,i);break;default:throw new Error("The object "+a+" is not supported.")}}}();
//# sourceMappingURL=index.js.map
