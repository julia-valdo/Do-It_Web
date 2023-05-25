import ModelFile from "./ideasFile.js"

class ModelFactory {
    static get(tipo) {
        switch (tipo) {
            case "FILE":
                console.log("**** Persistiendo en File System ****");
                return new ModelFile();
            default:
                console.log("**** Persistiendo en Memoria (default) ****");
                return new ModelFile();
        }
    }
}

export default ModelFactory;