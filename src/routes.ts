import { Router  } from "express";
import type { Request, Response} from "express";
import ClienteController from "./controller/ClienteController.js";
import Medicamento from "./model/Medicamento.js";
import MedicamentoController from "./controller/MedicamentoController.js";

const router = Router(); 

router.get("/api", (req: Request, res: Response) => {
    res.status(200).json({ mensagem: "Olá, seja bem-vindo!" });
});


router.get("/api/clientes", ClienteController.todos);
router.post("/api/clientes", ClienteController.novo);


router.get("/api/medicamentos", MedicamentoController.todos);
router.post("/api/medicamentos", MedicamentoController.novo);

router.get("/api/clientes/:idCliente", ClienteController.cliente);
export { router }; 
