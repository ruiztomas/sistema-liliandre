import { Request, Response } from "express";
import { prisma } from "../lib/prisma";

export const getTurnos = async (_req: Request, res: Response) => {
    try {
        const {
            estado,
            profesionalId,
            clienteId,
            fecha,
        } = _req.query;
        const turnos = await prisma.turno.findMany({
            where: {
                ...(estado &&{
                    estado: estado as any,
                }),
                ...(profesionalId &&{
                    profesionalId: Number(profesionalId),
                }),
                ...(clienteId &&{
                    clienteId: Number(clienteId),
                }),
                ...(fecha &&{
                    fecha:{
                        gte: new Date(
                            `${fecha}T00:00:00`
                        ),
                        lte: new Date(
                            `${fecha}T23:59:59`
                        ),
                    },
                }),
            },

            include: {
                cliente: true,
                servicio: true,
                profesional: true,
                movimiento: true,
            },

            orderBy:{
                fecha: "asc",
            },
        });

        res.json(turnos);
    } catch (error) {
        console.error(error);

        res.status(500).json({
            message: "Error al obtener los turnos",
        });
    }
};

export const createTurno = async (req: Request, res: Response) => {
    try {
        const {
            fecha,
            observaciones,
            cliente,
            servicioId,
            profesionalId,
        } = req.body;

        // Validaciones básicas
        if (
            !fecha ||
            !cliente ||
            !cliente.nombre ||
            !servicioId ||
            !profesionalId
        ) {
            return res.status(400).json({
                message: "Faltan datos requeridos para crear el turno",
            });
        }

        // Validar servicio
        const servicioExistente = await prisma.servicio.findUnique({
            where: {
                id: Number(servicioId),
            },
        });

        if (!servicioExistente) {
            return res.status(404).json({
                message: "Servicio no encontrado",
            });
        }

        // Validar profesional
        const profesionalExistente = await prisma.profesional.findUnique({
            where: {
                id: Number(profesionalId),
            },
        });

        if (!profesionalExistente) {
            return res.status(404).json({
                message: "Profesional no encontrado",
            });
        }

        // Buscar cliente existente
        let clienteExistente = null;

        if (cliente.telefono) {
            clienteExistente = await prisma.cliente.findFirst({
                where: {
                    telefono: cliente.telefono,
                },
            });
        }

        if (!clienteExistente && cliente.email) {
            clienteExistente = await prisma.cliente.findFirst({
                where: {
                    email: cliente.email,
                },
            });
        }

        // Crear turno
        const nuevoTurno = await prisma.turno.create({
            data: {
                fecha: new Date(fecha),
                observaciones: observaciones || null,

                cliente: clienteExistente
                    ? {
                          connect: {
                              id: clienteExistente.id,
                          },
                      }
                    : {
                          create: {
                              nombre: cliente.nombre,
                              telefono: cliente.telefono || null,
                              email: cliente.email || null,
                              notas: cliente.notas || null,
                          },
                      },

                servicio: {
                    connect: {
                        id: Number(servicioId),
                    },
                },

                profesional: {
                    connect: {
                        id: Number(profesionalId),
                    },
                },
            },

            include: {
                cliente: true,
                servicio: true,
                profesional: true,
            },
        });

        res.status(201).json(nuevoTurno);
    } catch (error) {
        console.error(error);

        res.status(500).json({
            message: "Error al crear el turno",
        });
    }
};

export const getTurnoById = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;

        const turno = await prisma.turno.findUnique({
            where: {
                id: Number(id),
            },

            include: {
                cliente: true,
                servicio: true,
                profesional: true,
                movimiento: true,
            },
        });

        if (!turno) {
            return res.status(404).json({
                message: "Turno no encontrado",
            });
        }

        res.json(turno);
    } catch (error) {
        console.error(error);

        res.status(500).json({
            message: "Error al obtener el turno",
        });
    }
};

export const updateTurno = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;

        const turnoExistente = await prisma.turno.findUnique({
            where: {
                id: Number(id),
            },
        });

        if (!turnoExistente) {
            return res.status(404).json({
                message: "Turno no encontrado",
            });
        }

        const turnoActualizado = await prisma.turno.update({
            where: {
                id: Number(id),
            },

            data: {
                ...req.body,

                fecha: req.body.fecha
                    ? new Date(req.body.fecha)
                    : undefined,
            },

            include: {
                cliente: true,
                servicio: true,
                profesional: true,
                movimiento: true,
            },
        });

        res.json(turnoActualizado);
    } catch (error) {
        console.error(error);

        res.status(500).json({
            message: "Error al actualizar el turno",
        });
    }
};

export const deleteTurno = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;

        const turnoExistente = await prisma.turno.findUnique({
            where: {
                id: Number(id),
            },
        });

        if (!turnoExistente) {
            return res.status(404).json({
                message: "Turno no encontrado",
            });
        }

        await prisma.turno.delete({
            where: {
                id: Number(id),
            },
        });

        res.json({
            message: "Turno eliminado correctamente",
        });
    } catch (error) {
        console.error(error);

        res.status(500).json({
            message: "Error al eliminar el turno",
        });
    }
};

export const finalizarTurno=async(
    req: Request,
    res: Response
) =>{
    try{
        const { id } = req.params;

        const {
            monto,
            metodoPago,
            descripcion,
        } =req.body;

        const turno=await prisma.turno.findUnique({
            where:{
                id: Number(id),
            },
            include:{
                servicio: true,
                movimiento: true,
            },
        });
        if(!turno){
            return res.status(404).json({
                message: "Turno no encontrado",
            });
        }
        if(turno.estado==="FINALIZADO"){
            return res.status(400).json({
                message: "El turno ya está finalizado",
            });
        }
        if(turno.movimiento){
            return res.status(400).json({
                message: "El movimiento ya existe",
            });
        }
        const resultado=await prisma.$transaction(
            async (tx) =>{
                const turnoActualizado=
                    await tx.turno.update({
                        where:{
                            id: turno.id,
                        },
                        data:{
                            estado: "FINALIZADO",
                        },
                    });
                const movimiento=
                    await tx.movimiento.create({
                        data:{
                            tipo: "INGRESO",
                            monto:
                                monto ??
                                turno.servicio.precio,
                            metodoPago,
                            descripcion:
                                descripcion ||
                                `Ingreso generado por turno #${turno.id}`,
                            turnoId: turno.id,
                        },
                    });
                return{
                    turnoActualizado,
                    movimiento,
                };
            }
        );
        res.json(resultado);
    }catch(error){
        console.error(error);
        res.status(500).json({
            message: "Error al finalizar el turno",
        });
    }
};