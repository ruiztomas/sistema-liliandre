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
            agendaHoy,
            ingresosPorMetodo,
            ingresosPorProfesional,
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
            prisma.turno.findMany({
                where:{
                    fecha:{
                        gte: inicioDia,
                        lte: finDia,
                    },
                },
                include:{
                    cliente: true,
                    servicio: true,
                    profesional: true,
                },
                orderBy:{
                    fecha: "asc",
                },
            }),
            prisma.movimiento.groupBy({
                by:["metodoPago"],
                where:{
                    tipo:"INGRESO",
                    createdAt:{
                        gte: inicioMes,
                        lte: finMes,
                    },
                },
                _sum:{
                    monto: true,
                },
            }),
            prisma.turno.findMany({
                where:{
                    estado:"FINALIZADO",
                    fecha:{
                        gte: inicioMes,
                        lte: finMes,
                    },
                },
                include:{
                    profesional: true,
                    movimiento: true,
                },
            }),
        ]);

        const totalIngresos=
            ingresosMes._sum.monto || 0;
        const totalEgresos=
            egresosMes._sum.monto || 0;
        const profesionalesMap: Record<number, any>={};
        for(const turno of ingresosPorProfesional){
            const profesionalId=turno.profesional.id;
            if(!profesionalesMap[profesionalId]){
                profesionalesMap[profesionalId]={
                    nombre: turno.profesional.nombre,
                    color: turno.profesional.color,
                    total:0,
                    cantidad:0,
                };
            }
            profesionalesMap[profesionalId].total+=turno.movimiento?.monto || 0;
            profesionalesMap[profesionalId].cantidad+=1;
        }
        const resumenProfesionales=Object.values(profesionalesMap);
        res.json({
            turnosHoy,
            clientes,
            profesionales,
            ingresosMes: totalIngresos,
            egresosMes: totalEgresos,
            balanceMes: totalIngresos - totalEgresos,
            agendaHoy,
            ingresosPorMetodo,
            resumenProfesionales,
        });
    }catch(error){
        console.error(error);
        res.status(500).json({
            error: "Error al obtener dashboard"
        });
    }
};