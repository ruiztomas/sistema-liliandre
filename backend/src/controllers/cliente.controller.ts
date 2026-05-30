import { Request, Response } from 'express';
import { prisma } from '../lib/prisma';

export const getClientes = async (req: Request, res: Response) => {
    try{
        const search=req.query.search as string | undefined;

        const clientes= await prisma.cliente.findMany({
            where: search
                ? {
                    OR:[
                        {
                            nombre:{
                                contains:search,
                                mode:'insensitive'
                            },
                        },
                        {
                            telefono: {
                                contains:search,
                            }
                        },
                        {
                            email:{
                                contains:search,
                                mode:'insensitive'
                            },
                        },
                    ],
                }
            :undefined,
            orderBy:{
                nombre:'asc',
            },
        });
        res.json(clientes);
    }catch(error){
        console.error(error);
        res.status(500).json({ 
            error: 'Error al obtener los clientes' 
        });
    }
};

export const getClienteById = async (req: Request, res: Response) => {
    try{
        const { id } = req.params;

        const cliente = await prisma.cliente.findUnique({
            where: {
                id: Number(id),
            },
            include: {
                turnos:{
                    include:{
                        servicio:true,
                        profesional:true,
                    },
                    orderBy:{
                        fecha:'desc',
                    },
                },
            },
        });
        if (!cliente) {
            return res.status(404).json({ 
                error: 'Cliente no encontrado' 
            });
        }
        res.json(cliente);
    }catch(error){
        console.error(error);
        res.status(500).json({ 
            error: 'Error al obtener el cliente' 
        });
    }
};

export const updateCliente = async (req: Request, res: Response) => {
    try{
        const { id } = req.params;

        const clienteExistente = await prisma.cliente.findUnique({
            where: {
                id: Number(id),
            },
        });
        if (!clienteExistente) {
            return res.status(404).json({ 
                error: 'Cliente no encontrado' 
            });
        }
        const cliente= await prisma.cliente.update({
            where: {
                id: Number(id),
            },
            data:{
                nombre: req.body.nombre,
                telefono: req.body.telefono,
                email: req.body.email,
                notas: req.body.notas,
            },
        });
        res.json(cliente);
    }catch(error){
        console.error(error);
        res.status(500).json({ 
            error: 'Error al actualizar el cliente' 
        });
    }
};