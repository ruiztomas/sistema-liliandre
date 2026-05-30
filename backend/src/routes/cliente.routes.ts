import {Router} from 'express';
import {
    getClientes,
    getClienteById,
    updateCliente,
} from '../controllers/cliente.controller';

const router = Router();

router.get('/', getClientes);
router.get('/:id', getClienteById);
router.put('/:id', updateCliente);

export default router;