import { Request, Response } from 'express';
import { prisma } from '../lib/prisma';

export const getDashboard=async(
    _req: Request, 
    res: Response
) => {
    try{
        const hoy=new Date();

        const inicioDia=new Date(
            hoy.getFullYear(),
            hoy.getMonth(),
            hoy.getDate()
        );

        const finDia=new Date(
            hoy.getFullYear(),
            hoy.getMonth(),
            hoy.getDate(),
            23,
            59,
            59
        );

        const inicioMes=new Date(
            hoy.getFullYear(),
            hoy.getMonth(),
            1
        );

        const finMes=new Date(
            hoy.getFullYear(),
            hoy.getMonth() + 1,
            0,
            23,
            59,
            59
        );

        const [
            turnosHoy,
            clientes,
            profesionales,
            ingresosMes,
            egresosMes,
        ]=await Promise.all([
            prisma.turno.count({
                where: {
                    fecha: {
                        gte: inicioDia,
                        lte: finDia
                    }
                }
            }),
            prisma.cliente.count(),
            prisma.profesional.count(),
            prisma.movimiento.aggregate({
                _sum: {
                    monto: true
                },
                where: {
                    tipo: 'INGRESO',
                    createdAt: {
                        gte: inicioMes,
                        lte: finMes
                    },
                },
            }),
            prisma.movimiento.aggregate({
                _sum: {
                    monto: true
                },
                where: {
                    tipo: 'EGRESO',
                    createdAt: {
                        gte: inicioMes,
                        lte: finMes
                    },
                },
            }),
        ]);

        const totalIngresos=
            ingresosMes._sum.monto || 0;
        const totalEgresos=
            egresosMes._sum.monto || 0;
        res.json({
            turnosHoy,
            clientes,
            profesionales,
            ingresosMes: totalIngresos,
            egresosMes: totalEgresos,
            balanceMes: totalIngresos - totalEgresos,
        });
    }catch(error){
        console.error(error);
        res.status(500).json({
            error: "Error al obtener dashboard"
        });
    }
};