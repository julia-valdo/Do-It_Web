import ServicioInversiones from "../servicio/inversiones.js";
import { InvalidCredentialsError, ValidationError } from "../../errores.js";

class ControladorInversiones {
    constructor(persistencia) {
        this.ServicioInversiones = new ServicioInversiones(persistencia);
    }

    obtenerInversiones = async (req, res) => {
        try {
            const inversiones =
                await this.ServicioInversiones.obtenerInversiones();

            res.status(200).json(inversiones);
        } catch (error) {
            if (
                error instanceof InvalidCredentialsError ||
                error instanceof ValidationError
            ) {
                res.status(400).json(error.message);
            } else {
                res.status(500).json({
                    message:
                        "Hubo un problema interno. Intente nuevamente más tarde.",
                });
            }
        }
    };

    obtenerInversion = async (req, res) => {
        try {
            const { idIdea, idInversor } = req.params;
            const inversion = await this.ServicioInversiones.obtenerInversion(
                idIdea,
                idInversor
            );

            res.status(200).json(inversion);
        } catch (error) {
            if (
                error instanceof InvalidCredentialsError ||
                error instanceof ValidationError
            ) {
                // Como me tira error, lo saco y hago que devuelva false
                res.status(200).json(false);
                //res.status(400).json(error.message);
            } else {
                res.status(500).json({
                    message:
                        "Hubo un problema interno. Intente nuevamente más tarde.",
                });
            }
        }
    };

    obtenerInversionesPorCampo = async (req, res) => {
        try {
            const { campo, id } = req.params;

            if (campo !== "idIdea" && campo !== "idInversor") {
                res.status(400).json("El campo debe ser idIdea o idInversor.");
                return;
            }
            
            const inversiones =
                await this.ServicioInversiones.obtenerInversionesPorCampo(
                    campo,
                    id
                );

            res.status(200).json(inversiones);
        } catch (error) {
            if (
                error instanceof InvalidCredentialsError ||
                error instanceof ValidationError
            ) {
                res.status(400).json(error.message);
            } else {
                res.status(500).json({
                    message:
                        "Hubo un problema interno. Intente nuevamente más tarde.",
                });
            }
        }
    };

    agregarInversion = async (req, res) => {
        try {
            const inversion = req.body;
            const inversionAgregada =
                await this.ServicioInversiones.agregarInversion(inversion);

            res.status(201).json(inversionAgregada);
        } catch (error) {
            if (
                error instanceof InvalidCredentialsError ||
                error instanceof ValidationError
            ) {
                res.status(400).json(error.message);
            } else {
                res.status(500).json({
                    message:
                        "Hubo un problema interno. Intente nuevamente más tarde.",
                });
            }
        }
    };

    eliminarInversion = async (req, res) => {
        try {
            const { idIdea, idInversor } = req.params;
            await this.ServicioInversiones.eliminarInversion(
                idIdea,
                idInversor
            );

            res.status(200).json({
                message: "Inversión eliminada exitosamente.",
            });
        } catch (error) {
            if (
                error instanceof InvalidCredentialsError ||
                error instanceof ValidationError
            ) {
                res.status(400).json(error.message);
            } else {
                res.status(500).json({
                    message:
                        "Hubo un problema interno. Intente nuevamente más tarde.",
                });
            }
        }
    };

    actualizarInversion = async (req, res) => {
        try {
            const { idIdea, idInversor } = req.params;
            const inversion = req.body;

            const inversionActualizada =
                await this.ServicioInversiones.actualizarInversion(
                    idIdea,
                    idInversor,
                    inversion
                );

            res.status(200).json(inversionActualizada);
        } catch (error) {
            if (
                error instanceof InvalidCredentialsError ||
                error instanceof ValidationError
            ) {
                res.status(400).json(error.message);
            } else {
                res.status(500).json({
                    message:
                        "Hubo un problema interno. Intente nuevamente más tarde.",
                });
            }
        }
    };
}

export default ControladorInversiones;
