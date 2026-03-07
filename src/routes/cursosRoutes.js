const {Router} = require ('express');
const CursoController = require ('../controllers/CursoController');

const cursoController = new CursoController();
const router = Router();

router.get('/cursos', (req,res) => cursoController.pegaCursos(req,res));
router.get('/cursos/:id', (req,res) => cursoController.pegaUmPorId(req,res));
router.put('/cursos/:id', (req,res) => cursoController.atualiza(req,res));
router.post('/cursos', (req,res) => cursoController.criar(req,res));
router.delete('/cursos/:id', (req,res) => cursoController.deletar(req,res));
module.exports = router;