!function () {
    metadata = {
        systemName: "Regulatory.ATP.Integration.MuleSoft.FileAPI",
        displayName: "Regulatory ATP MuleSoft File API",
        description: "JS broker for ATP Files using MuleSoft API gateway.",
        configuration: {
            MuleSoftBaseURL: {
                displayName: "MuleSoft API Gateway Base URL, and excluding the API path.",
                type: "string",
                value: "https://api-dev.syngenta.com/ecom/file-management"
            }
        }
    };
    const e = "/downloadfiles/v1.0/";
    ondescribe = async function ({
        configuration: e
    }) {
        postSchema({
            objects: {
                atpFile: {
                    displayName: "ATP File",
                    description: "ATP File Storage using MuleSoft and AWS S3.",
                    properties: {
                        fileName: {
                            displayName: "File Name",
                            type: "string"
                        },
                        content: {
                            displayName: "File",
                            type: "string"
                        },
                        contentType: {
                            displayName: "Content Type",
                            type: "string"
                        },
                        size: {
                            displayName: "Size",
                            type: "string"
                        }
                    },
                    methods: {
                        get: {
                            displayName: "Get ATP File",
                            type: "read",
                            inputs: ["fileName"],
                            requiredInputs: ["fileName"],
                            outputs: ["content", "contentType", "size"]
                        },
                        put: {
                            displayName: "Put ATP File",
                            type: "create",
                            inputs: ["fileName", "content"],
                            requiredInputs: ["fileName", "content"],
                            outputs: ["contentType", "size"]
                        },
                        delete : {
                            displayName: "Delete ATP File",
                            type: "delete",
                            inputs: ["fileName"],
                            requiredInputs: ["fileName"]
                        }
                    }
                }
            }
        })
    },
    onexecute = async function ({
        objectName: t,
        methodName: a,
        parameters: n,
        properties: o,
        configuration: s,
        schema: i
    }) {
        switch (t) {
        case "atpFile":
            await async function (t, a, n, o) {
                switch (t) {
                case "get":
                    await function (t, a, n) {
                        return new Promise((t, o) => {
                            var s = new XMLHttpRequest;
                            s.onreadystatechange = function () {
                                try {
                                    if (console.log("xhr.readyState: " + s.readyState), 4 !== s.readyState)
                                        return;
                                    if (console.log("xhr.status: " + s.status), 200 !== s.status)
                                        throw new Error("Failed with status " + s.status);
									
									var form = new FormData();
									form = s.response;
                                    postResult({
                                        content: form,
                                        contentType: s.getResponseHeader("Content-Type"),
                                        size: s.getResponseHeader("Content-Length")
                                    }),
                                    t()
                                } catch (e) {
                                    o(e)
                                }
                            },
                            console.log("config url: " + n.MuleSoftBaseURL);
                            var i = n.MuleSoftBaseURL + e + a.fileName;
                            console.log("file download url: " + i),
                            s.open("GET", i),
                            s.withCredentials = !0,
                            s.setRequestHeader("destination_s3", "ATP"),
							s.responseType = 'multipart/form-data'
                            s.send()
                        })
                    }
                    (0, a, o);
                    break;
                case "put":
                case "delete":
                    await new Promise((e, t) => {
                        throw new Error("The method is not implemented yet.")
                    });
                    break;
                default:
                    throw new Error("The method " + t + " is not supported.")
                }
            }
            (a, o, 0, s);
            break;
        default:
            throw new Error("The object " + t + " is not supported.")
        }
    }
}
();
