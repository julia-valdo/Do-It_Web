import Joi from "joi";

export const validar = (idea) => {
    const ideaSchema = Joi.object({
        titulo: Joi.string().required(),
        descripcion: Joi.string().required(),
        categoria: Joi.string().required(),
        precio: Joi.number().min(0).required(),
        idCreador: Joi.string().required(),
        vecesVisto: Joi.number().min(0).required(),
        cantidadInversiones: Joi.number().min(0).required(),
    });

    const { error } = ideaSchema.validate(idea);

    if (error) {
        return { result: false, error };
    }

    return { result: true };
};
