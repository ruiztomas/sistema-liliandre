import { Request, Response } from 'express';
import { prisma } from '../lib/prisma';

export const getMovimientos=async(
    _req: Request,
    res: Response
) => {
    try {
        const movimientos = await prisma.movimiento.findMany({
            include: {
                turno: true,
                giftCard: true,
            },
            orderBy:{
                createdAt: 'desc',
            },
        });
        res.json(movimientos);
    } catch (error) {
        console.error(error);
        res.status(500).json({ 
            error: 'Error al obtener los movimientos' 
        });
    }
};

export const getMovimientoById=async(
    req: Request,
    res: Response
) => {
    try{
        const { id } = req.params;

        const movimiento = await prisma.movimiento.findUnique({
            where:{
                id: Number(id),
            },
            include: {
                turno: true,
                giftCard: true,
            },
        });
        if (!movimiento) {
            return res.status(404).json({ 
                error: 'Movimiento no encontrado' 
            });
        }
        res.json(movimiento);
    } catch (error) {
        console.error(error);
        res.status(500).json({ 
            error: 'Error al obtener el movimiento' 
        });
    }
};

export const createMovimiento=async(
    req: Request,
    res: Response
) => {
    try {
        const { 
            tipo, 
            monto, 
            metodoPago, 
            descripcion 
        } = req.body;

        if (!tipo || !monto || !metodoPago) {
            return res.status(400).json({ 
                error: 'Faltan datos obligatorios' 
            });
        }
        const movimiento = await prisma.movimiento.create({
            data: {
                tipo,
                monto: Number(monto),
                metodoPago,
                descripcion,
            },
        });
        res.status(201).json(movimiento);
    } catch (error) {
        console.error(error);
        res.status(500).json({ 
            error: 'Error al crear el movimiento' 
        });
    }
};

export const updateMovimiento=async(
    req: Request,
    res: Response
) => {
    try {
        const { id } = req.params;
        const movimientoExistente = 
            await prisma.movimiento.findUnique({
                where: {
                    id: Number(id),
                },
            });
        if (!movimientoExistente) {
            return res.status(404).json({ 
                error: 'Movimiento no encontrado' 
            });
        }
        const movimiento=await prisma.movimiento.update({
            where: {
                id: Number(id),
            },
            data:{
                ...req.body,
            },
        });
        res.json(movimiento);
    } catch (error) {
        console.error(error);
        res.status(500).json({ 
            error: 'Error al actualizar el movimiento' 
        });
    }
};

export const deleteMovimiento=async(
    req: Request,
    res: Response
) => {
    try {
        const { id } = req.params;
        const movimientoExistente = 
            await prisma.movimiento.findUnique({
                where: {
                    id: Number(id),
                },
            });
        if (!movimientoExistente) {
            return res.status(404).json({ 
                error: 'Movimiento no encontrado' 
            });
        }
        await prisma.movimiento.delete({
            where: {
                id: Number(id),
            },
        });
        res.json({ 
            message: 'Movimiento eliminado correctamente' 
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ 
            error: 'Error al eliminar el movimiento' 
        });
    }
};

export const getResumen=async(
    _req: Request,
    res: Response
) => {
    try {
        const ingresos = await prisma.movimiento.aggregate({
            _sum:{
                monto:true,
            },
            where: {
                tipo: 'INGRESO',
            },
        });
        const egresos = await prisma.movimiento.aggregate({
            _sum:{
                monto:true,
            },
            where: {
                tipo: 'EGRESO',
            },
        });

        const totalIngresos = ingresos._sum.monto || 0;
        const totalEgresos = egresos._sum.monto || 0;
        res.json({
            ingresos: totalIngresos,
            egresos: totalEgresos,
            balance: 
                totalIngresos - totalEgresos,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ 
            error: 'Error al obtener el resumen' 
        });
    }
};