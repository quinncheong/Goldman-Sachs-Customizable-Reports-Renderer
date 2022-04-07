class MetadataBase { 
    constructor(){
        this.metadata = {
            "project": 0,
            "files": []
        };
        this.data = {};
        this.template = {};
    }

    addData(fileName, data){ 
        this.data[fileName] = data;
        this.metadata['files'].push(fileName);
    }

    addTemplate(templateName, template){ 
        this.template[templateName] = template;
    }

    setProject(projectName){ 
        this.metadata["project"] = projectName;
    }

    toJSON(){
        return {
            metadata: this.metadata, 
            data: this.data,
            template: this.template
        }
    }
}

export function objectToMap(obj) {
    const keys = Object.keys(obj);
    const map = new Map();
    for(let i = 0; i < keys.length; i++){
       //inserting new key value pair inside map
       map.set(keys[i], obj[keys[i]]);
    };
    return map;
 };