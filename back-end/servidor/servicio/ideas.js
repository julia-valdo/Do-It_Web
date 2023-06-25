import ModelFactory from "../model/DAO/ideasFactory.js";
import config from "../config.js";
import { validar } from "../validaciones/ideas.js";

class ServicioIdeas {
    constructor() {
        this.model = ModelFactory.get(config.MODO_PERSISTENCIA);
    }

    obtenerIdeas = async (idCreador) => {
        try {
            const ideas = await this.model.obtenerIdeas(idCreador);
            return ideas;
        } catch (error) {
            throw error;
        }
    };

    obtenerTop = async () => {
        try {
            const topIdeas = await this.model.obtenerTop();

            return topIdeas;
        } catch (error) {
            throw error;
        }
    };

    obtenerIdeasPorCampo = async (campo, valor) => {
        try {
            const ideas = await this.model.obtenerIdeasPorCampo(campo, valor);
            return ideas;
        } catch (error) {
            throw error;
        }
    };

    agregarIdea = async (idea) => {
        try {
            const res = validar(idea);
            if (!res.result) {
                throw new ValidationError(
                    `Campo inválido: ${res.error.message}`
                );
            }

            const ideaAgregada = await this.model.agregarIdea(idea);
            return ideaAgregada;
        } catch (error) {
            throw error;
        }
    };

    eliminarIdea = async (id) => {
        try {
            await this.model.eliminarIdea(id);
        } catch (error) {
            throw error;
        }
    };

    actualizarIdea = async (id, idea) => {
        try {
            const ideaActualizada = await this.model.actualizarIdea(id, idea);
            return ideaActualizada;
        } catch (error) {
            throw error;
        }
    };
}

export default ServicioIdeas;
