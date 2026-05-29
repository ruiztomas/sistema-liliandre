import { Request, Response } from 'express';
import { prisma } from '../lib/prisma';

export const getServicios = async (req: Request, res: Response) => {
    try {
        const servicios = await prisma.servicio.findMany({
            orderBy:{
                nombre:"asc",
            },
        });
        res.json(servicios);
    }catch (error) {
        console.error(error);
        res.status(500).json({
            message: 'Error al obtener los servicios',
        });
    }
};

export const getServicioById = async (req: Request, res: Response) => {
    try{
        const { id } = req.params;
        const servicio = await prisma.servicio.findUnique({
            where: { 
                id: Number(id), 
            },
        });

        if (!servicio) {
            return res.status(404).json({
                message: 'Servicio no encontrado',
            });
        }
        
        res.json(servicio);
    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: 'Error al obtener el servicio',
        });
    }
};

export const createServicio = async (req: Request, res: Response) => {
    try {
        const { nombre, duracion, precio } = req.body;

        if(!nombre || !duracion || !precio) {
            return res.status(400).json({
                message: 'Faltan campos obligatorios',
            }); 
        }
        const servicio = await prisma.servicio.create({
            data:{
                nombre,
                duracion: Number(duracion),
                precio: Number(precio),
            },
        });
        res.status(201).json(servicio);
    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: 'Error al crear el servicio',
        });
    }
};

export const updateServicio = async (req: Request, res: Response) => {
    try{
        const { id } = req.params;
        const servicioExistente = await prisma.servicio.findUnique({
            where: { 
                id: Number(id), 
            },
        });

        if (!servicioExistente) {
            return res.status(404).json({
                message: 'Servicio no encontrado',
            });
        }

        const servicio=await prisma.servicio.update({
            where:{
                id: Number(id),
            },
            data:{
                ...req.body,
            },
        });
        res.json(servicio);
    } catch(error){
        console.error(error);
        res.status(500).json({
            message: 'Error al actualizar el servicio',
        });
    }
};

export const deleteServicio = async (req: Request, res: Response) => {
    try{
        const { id } = req.params;
        const servicioExistente = await prisma.servicio.findUnique({
            where: { 
                id: Number(id), 
            },
        });

        if (!servicioExistente) {
            return res.status(404).json({
                message: 'Servicio no encontrado',
            });
        }
        
        await prisma.servicio.delete({
            where:{
                id: Number(id),
            },
        });
        res.json({
            message: 'Servicio eliminado correctamente',
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: 'Error al eliminar el servicio',
        });
    }
};