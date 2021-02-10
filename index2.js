!function(){
    metadata={systemName:"Regulatory.ATP.Integration.MuleSoft.FileAPI.Test2",displayName:"Regulatory ATP MuleSoft File API Test 2",description:"JS broker for ATP Files using MuleSoft API gateway.",configuration:{MuleSoftBaseURL:{displayName:"MuleSoft API Gateway Base URL, and excluding the API path.",type:"string",value:"https://api-dev.syngenta.com/ecom/file-management"}}};const e="/downloadfiles/v1.0/",t="/uploadfiles/v1.0/";ondescribe=async function({configuration:e}){postSchema({objects:{atpFile:{displayName:"ATP File",description:"ATP File Storage using MuleSoft and AWS S3.",properties:{fileName:{displayName:"File Name",type:"string"},content:{displayName:"File",type:"string"},contentType:{displayName:"Content Type",type:"string"},size:{displayName:"Size",type:"string"}},methods:{get:{displayName:"Get ATP File",type:"read",inputs:["fileName"],requiredInputs:["fileName"],outputs:["content","contentType","size"]},put:{displayName:"Put ATP File",type:"create",inputs:["fileName","content"],requiredInputs:["fileName","content"],outputs:["contentType","size"]},delete:{displayName:"Delete ATP File",type:"delete",inputs:["fileName"],requiredInputs:["fileName"]}}}}})},onexecute=async function({objectName:a,methodName:n,parameters:s,properties:o,configuration:i,schema:r}){switch(a){case"atpFile":await async function(a,n,s,o){switch(a){case"get":await function(t,a,n){return new Promise((t,s)=>{var o=new XMLHttpRequest;o.onreadystatechange=function(){try{if(console.log("xhr.readyState: "+o.readyState),4!==o.readyState)return;if(console.log("xhr.status: "+o.status),200!==o.status)throw new Error("Failed with status "+o.status);var e=base64.encode(o.response),n='<files><file encoding="Base64"><name>'+a.fileName+"</name><content>"+e+"</content></file></files>";postResult({content:n,contentType:o.getResponseHeader("Content-Type"),size:o.getResponseHeader("Content-Length")}),t()}catch(e){s(e)}};var i=n.MuleSoftBaseURL+e+a.fileName;console.log("file download url: "+i),o.open("GET",i),o.withCredentials=!0,o.setRequestHeader("destination_s3","ATP"),o.send()})}(0,n,o);break;case"put":await function(e,a,n){return new Promise((e,s)=>{(l=new XMLHttpRequest).onreadystatechange=function(){try{if(console.log("xhr.readyState: "+l.readyState),4!==l.readyState)return;if(console.log("xhr.status: "+l.status),200!==l.status)throw new Error("Failed with status "+l.status);postResult({content:l.response,contentType:l.getResponseHeader("Content-Type"),size:l.getResponseHeader("Content-Length")}),e()}catch(e){s(e)}},console.log("config url: "+n.MuleSoftBaseURL);var o=n.MuleSoftBaseURL+t;console.log("file download url: "+o);var i=new FormData;i.append("attributes",JSON.stringify({name:a.fileName,parent:{id:"0"}}));let r=a.fileProperty.content;var l;i.append("file",r),(l=new XMLHttpRequest).onreadystatechange=function(){if(4===l.readyState){if(201!==l.status)throw new Error("Failed with status "+JSON.stringify(l.response));postResult({result:"File uploaded successfully"+JSON.stringify(l.response)})}},l.open("POST",o),l.withCredentials=!0,l.setRequestHeader("destination_s3","ATP"),l.send(i)})}(0,n,o);break;case"delete":await new Promise((e,t)=>{throw new Error("The method is not implemented yet.")});break;default:throw new Error("The method "+a+" is not supported.")}}(n,o,0,i);break;default:throw new Error("The object "+a+" is not supported.")}}
    var base64 = {};
    base64.PADCHAR = '=';
    base64.ALPHA = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/';
    
    base64.makeDOMException = function() {
        // sadly in FF,Safari,Chrome you can't make a DOMException
        var e, tmp;
    
        try {
            return new DOMException(DOMException.INVALID_CHARACTER_ERR);
        } catch (tmp) {
            // not available, just passback a duck-typed equiv
            // https://developer.mozilla.org/en/Core_JavaScript_1.5_Reference/Global_Objects/Error
            // https://developer.mozilla.org/en/Core_JavaScript_1.5_Reference/Global_Objects/Error/prototype
            var ex = new Error("DOM Exception 5");
    
            // ex.number and ex.description is IE-specific.
            ex.code = ex.number = 5;
            ex.name = ex.description = "INVALID_CHARACTER_ERR";
    
            // Safari/Chrome output format
            ex.toString = function() { return 'Error: ' + ex.name + ': ' + ex.message; };
            return ex;
        }
    }
    
    base64.getbyte64 = function(s,i) {
        // This is oddly fast, except on Chrome/V8.
        //  Minimal or no improvement in performance by using a
        //   object with properties mapping chars to value (eg. 'A': 0)
        var idx = base64.ALPHA.indexOf(s.charAt(i));
        if (idx === -1) {
            throw base64.makeDOMException();
        }
        return idx;
    }
    
    base64.decode = function(s) {
        // convert to string
        s = '' + s;
        var getbyte64 = base64.getbyte64;
        var pads, i, b10;
        var imax = s.length
        if (imax === 0) {
            return s;
        }
    
        if (imax % 4 !== 0) {
            throw base64.makeDOMException();
        }
    
        pads = 0
        if (s.charAt(imax - 1) === base64.PADCHAR) {
            pads = 1;
            if (s.charAt(imax - 2) === base64.PADCHAR) {
                pads = 2;
            }
            // either way, we want to ignore this last block
            imax -= 4;
        }
    
        var x = [];
        for (i = 0; i < imax; i += 4) {
            b10 = (getbyte64(s,i) << 18) | (getbyte64(s,i+1) << 12) |
                (getbyte64(s,i+2) << 6) | getbyte64(s,i+3);
            x.push(String.fromCharCode(b10 >> 16, (b10 >> 8) & 0xff, b10 & 0xff));
        }
    
        switch (pads) {
        case 1:
            b10 = (getbyte64(s,i) << 18) | (getbyte64(s,i+1) << 12) | (getbyte64(s,i+2) << 6);
            x.push(String.fromCharCode(b10 >> 16, (b10 >> 8) & 0xff));
            break;
        case 2:
            b10 = (getbyte64(s,i) << 18) | (getbyte64(s,i+1) << 12);
            x.push(String.fromCharCode(b10 >> 16));
            break;
        }
        return x.join('');
    }
    
    base64.getbyte = function(s,i) {
        var x = s.charCodeAt(i);
        if (x > 255) {
            throw base64.makeDOMException();
        }
        return x;
    }
    
    base64.encode = function(s) {
        if (arguments.length !== 1) {
            throw new SyntaxError("Not enough arguments");
        }
        var padchar = base64.PADCHAR;
        var alpha   = base64.ALPHA;
        var getbyte = base64.getbyte;
    
        var i, b10;
        var x = [];
    
        // convert to string
        s = '' + s;
    
        var imax = s.length - s.length % 3;
    
        if (s.length === 0) {
            return s;
        }
        for (i = 0; i < imax; i += 3) {
            b10 = (getbyte(s,i) << 16) | (getbyte(s,i+1) << 8) | getbyte(s,i+2);
            x.push(alpha.charAt(b10 >> 18));
            x.push(alpha.charAt((b10 >> 12) & 0x3F));
            x.push(alpha.charAt((b10 >> 6) & 0x3f));
            x.push(alpha.charAt(b10 & 0x3f));
        }
        switch (s.length - imax) {
        case 1:
            b10 = getbyte(s,i) << 16;
            x.push(alpha.charAt(b10 >> 18) + alpha.charAt((b10 >> 12) & 0x3F) +
                   padchar + padchar);
            break;
        case 2:
            b10 = (getbyte(s,i) << 16) | (getbyte(s,i+1) << 8);
            x.push(alpha.charAt(b10 >> 18) + alpha.charAt((b10 >> 12) & 0x3F) +
                   alpha.charAt((b10 >> 6) & 0x3f) + padchar);
            break;
        }
        return x.join('');
    }}();
//# sourceMappingURL=index.js.map
