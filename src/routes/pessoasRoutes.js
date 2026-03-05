const {Router} = require ('express');
const PessoaController = require ('../controllers/PessoaController.js');

const pessoaController = new PessoaController();
const router = Router();

router.get('/pessoas', (req,res) => pessoaController.pegaTodos(req,res));
router.put('/pessoas/:id', (req,res) => pessoaController.atualiza(req,res));
router.post('/pessoas', (req,res) => pessoaController.criar(req,res));
router.delete('/pessoas/:id', (req,res) => pessoaController.deletar(req,res));
module.exports = router;