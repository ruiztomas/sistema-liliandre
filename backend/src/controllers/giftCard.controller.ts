import { Request, Response } from 'express';
import { prisma } from '../lib/prisma';

export const getGiftCards = async (
    req: Request, 
    res: Response
) => {
    try{
        const giftCards=
            await prisma.giftCard.findMany({
                orderBy: {
                    createdAt: 'desc'
                }
            });
        res.json(giftCards);
    }catch(error){
        console.error(error);
        res.status(500).json({
            message:
                "Error al obtener gift cards",
        });
    }
};

export const getGiftCardById = async (
    req: Request, 
    res: Response
) => {
    try{
        const { id } = req.params;
        const giftCard = 
            await prisma.giftCard.findUnique({
                where: {
                    id: Number(id),
                },
                include: {
                    movimientos:true,
                },
            });
        if (!giftCard) {
            return res.status(404).json({
                message: "Gift card no encontrada",
            });
        }
        res.json(giftCard);
    }catch(error){
        console.error(error);
        res.status(500).json({
            message:
                "Error al obtener gift card",
        });
    }
};

export const getGiftCardByCodigo=
    async(
        req: Request, 
        res: Response
    ) => {
        try{
            const { codigo } = req.params;
            const giftCard = 
                await prisma.giftCard.findUnique({
                    where: {
                        codigo: codigo as string,
                    },
                    include: {
                        movimientos:true,
                    },
                });
            if (!giftCard) {
                return res
                    .status(404)
                    .json({
                        message: "Gift card no encontrada",
                    });
            }
            res.json(giftCard);
        }catch(error){
            console.error(error);
            res.status(500).json({
                message:
                    "Error al obtener gift card",
            });
        }
    };

export const createdGiftCard = async (
    req: Request, 
    res: Response
) => {
    try{
        const{
            codigo,
            montoInicial,
        } = req.body;
        if(
            !codigo ||
            !montoInicial
        ) {
            return res.status(400).json({
                message: 
                "Codigo y monto son obligatorios",
            });
        }
    
        const existente=
            await prisma.giftCard.findUnique({
                where: {
                    codigo,
                },
            });
        if(existente){
            return res.status(400).json({
                message: 
                    "Ya existe una gift card con ese codigo",
            });
        }
        const giftCard =
            await prisma.giftCard.create({
                data: {
                    codigo,
                    montoInicial:
                        Number(montoInicial),
                    saldoDisponible:
                        Number(montoInicial),
                },
            });
        res.status(201).json(giftCard);
    }catch(error){
        console.error(error);
        res.status(500).json({
            message:
                "Error al crear gift card",
        });
    }
};

export const desactivarGiftCard = async (
    req: Request, 
    res: Response
) => {
    try{
        const {id}=
            req.params;
        const giftCard =
            await prisma.giftCard.findUnique({
                where: {
                    id: Number(id),
                },
            });
        if(!giftCard){
            return res
                .status(404)
                .json({
                    message: "Gift card no encontrada",
                });
        }
        const actualizada =
            await prisma.giftCard.update({
                where: {
                    id: Number(id),
                },
                data: {
                    activa: false,
                },
            });
        res.json(actualizada);
    }catch(error){
        console.error(error);
        res.status(500).json({
            message:
                "Error al desactivar gift card",
        });
    }
};

export const consumirGiftCard = async (
    req: Request, 
    res: Response
) => {
    try{
        const{
            codigo,
            monto,
            descripcion,
        } = req.body;
        if(!codigo || !monto){
            return res.status(400).json({
                message: "Codigo y monto son obligatorios",
            });
        }
        const giftCard =
            await prisma.giftCard.findUnique({
                where: {
                    codigo,
                },
            });
        if(!giftCard){
            return res.status(404).json({
                message: "Gift card no encontrada",
            });
        }
        if(!giftCard.activa){
            return res.status(400).json({
                message: "Gift card no activa",
            });
        }
        if(giftCard.saldoDisponible < Number(monto)){
            return res.status(400).json({
                message: "Saldo insuficiente",
            });
        }
        const resultado=
            await prisma.$transaction(
                async(tx)=>{
                    const giftCardActualizada =
                        await tx.giftCard.update({
                            where: {
                                id: giftCard.id,
                            },
                            data: {
                                saldoDisponible:
                                    giftCard.saldoDisponible - Number(monto),
                            },
                        });
                    const movimiento=
                        await tx.movimiento.create({
                            data: {
                                tipo:"INGRESO",
                                monto: Number(monto),
                                metodoPago: "GIFT_CARD",
                                descripcion:
                                    descripcion ||
                                    `Consumo Gift Card ${giftCard.codigo}`,
                                giftCardId: giftCard.id, 
                            },
                        });
                    return {
                        giftCard: giftCardActualizada,
                        movimiento,
                    };
                }
            );
        res.json(resultado);
    } catch(error) {
        console.error(error);
        res.status(500).json({
            message: "Error al consumir gift card",
        });
    }
};