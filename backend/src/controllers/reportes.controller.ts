import { Request, Response } from "express";
import { prisma } from "../lib/prisma";

export const getResumenReportes=async(_req: Request, res: Response)=>{
    try{
        // INGRESOS
        const ingresos=await prisma.movimiento.aggregate({
            _sum: {
                monto: true,
            },
            where: {
                tipo: "INGRESO",
            },
        });
        // EGRESOS
        const egresos = await prisma.movimiento.aggregate({
            _sum: {
                monto: true,
            },
            where: {
                tipo: "EGRESO",
            },
        });
        const totalIngresos=ingresos._sum.monto || 0;
        const totalEgresos=egresos._sum.monto || 0;
        const balance=totalIngresos - totalEgresos;
        // SERVICIOS MÁS VENDIDOS
        const serviciosMasVendidos=await prisma.turno.groupBy({
            by: ["servicioId"],
            _count: {
                servicioId: true,
            },
            orderBy: {
                _count: {
                    servicioId: "desc",
                },
            },
        });
        const serviciosReporte=await Promise.all(serviciosMasVendidos.map(async(item)=>{
            const servicio=await prisma.servicio.findUnique({
                where: {
                    id: item.servicioId,
                },
            });
            return {
                nombre:servicio?.nombre,
                cantidad:item._count.servicioId,
            };
        }));
        // INGRESOS POR PROFESIONAL
        const movimientos=await prisma.movimiento.findMany({
            where: {
                tipo: "INGRESO",
                turnoId: {
                    not: null,
                },
            },
            include: {
                turno: {
                    include: {
                        profesional: true,
                    },
                },
            },
        });
        const resumenProfesionales: Record<string,number>={};
        movimientos.forEach((mov)=>{
            if (!mov.turno) return;
            const nombre=mov.turno.profesional.nombre;
            if (!resumenProfesionales[nombre]) {
                resumenProfesionales[nombre] = 0;
            }
            resumenProfesionales[nombre] += mov.monto;
        });
        const ingresosPorProfesional=Object.entries(resumenProfesionales).map(([nombre, total])=>({nombre,total,}));
        // CLIENTES FRECUENTES
        const clientesAgrupados=await prisma.turno.groupBy({
            by: ["clienteId"],
            _count: {
                clienteId: true,
            },
            orderBy: {
                _count: {
                    clienteId: "desc",
                },
            },
            take: 10,
        });
        const clientesFrecuentes=await Promise.all(clientesAgrupados.map(async(item)=>{
            const cliente=await prisma.cliente.findUnique({
                where: {
                    id: item.clienteId,
                },
            });
            return {
                nombre:cliente?.nombre,
                cantidad:item._count.clienteId,
            };
        }));
        res.json({
            ingresos: totalIngresos,
            egresos: totalEgresos,
            balance,
            serviciosMasVendidos:serviciosReporte,
            ingresosPorProfesional,
            clientesFrecuentes,
        });
    }catch(error){
        console.error(error);
        res.status(500).json({
            message:"Error al obtener reportes",
        });
    }
};
