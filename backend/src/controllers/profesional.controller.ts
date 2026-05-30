import { Request, Response } from 'express';
import { prisma } from '../lib/prisma';

export const getProfesionales = async (req: Request, res: Response) => {
    try {
        const profesionales = await prisma.profesional.findMany({
            orderBy:{
                nombre: 'asc',
            },
        });
        res.json(profesionales);
    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: 'Error al obtener los profesionales',
        });
    }
};

export const getProfesionalById = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const profesional = await prisma.profesional.findUnique({
            where: {
                id: Number(id),
            },
        });
        if (!profesional) {
            return res.status(404).json({
                message: 'Profesional no encontrado',
            });
        }
        res.json(profesional);
    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: 'Error al obtener el profesional',
        });
    }
};

export const createProfesional = async (req: Request, res: Response) => {
    try {
        const { nombre, color } = req.body;
        
        if(!nombre){
            return res.status(400).json({
                message: 'El nombre es obligatorio',
            });
        }
        const profesional = await prisma.profesional.create({
            data: {
                nombre,
                color: color || null,
            },
        });
        res.status(201).json(profesional);
    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: 'Error al crear el profesional',
        });
    }
};

export const updateProfesional = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;

        const profesionalExistente = await prisma.profesional.findUnique({
            where: {
                id: Number(id),
            },
        });

        if (!profesionalExistente) {
            return res.status(404).json({
                message: 'Profesional no encontrado',
            });
        }

        const profesional=await prisma.profesional.update({
            where: {
                id: Number(id),
            },
            data: {
                ...req.body,
            },
        });
        res.json(profesional);
    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: 'Error al actualizar el profesional',
        });
    }
};

export const deleteProfesional = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;

        const profesionalExistente = await prisma.profesional.findUnique({
            where: {
                id: Number(id),
            },
        });

        if (!profesionalExistente) {
            return res.status(404).json({
                message: 'Profesional no encontrado',
            });
        }

        await prisma.profesional.delete({
            where: {
                id: Number(id),
            },
        });
        res.json({
            message: 'Profesional eliminado correctamente',
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: 'Error al eliminar el profesional',
        });
    }
};