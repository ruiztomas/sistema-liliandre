import { Router } from 'express';
import{
    getGiftCards,
    getGiftCardById,
    getGiftCardByCodigo,
    createdGiftCard,
    desactivarGiftCard,
    consumirGiftCard,
} from '../controllers/giftCard.controller';

const router = Router();

router.get('/', getGiftCards);
router.get('/codigo/:codigo', getGiftCardByCodigo);
router.post('/consumir', consumirGiftCard);
router.get('/:id', getGiftCardById);
router.post('/', createdGiftCard);
router.put('/:id/desactivar', desactivarGiftCard);

export default router;