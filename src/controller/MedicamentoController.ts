import type { Request, Response } from "express";
import Medicamento from "../model/Medicamento.js";
import type { MedicamentoDTO } from "../interface/MedicamentoDTO.js";

class MedicamentoController extends Medicamento {


    static async todos(req: Request, res: Response): Promise<Response> {
        try {
        
            const listaMedicamento: Array<Medicamento> | null = await Medicamento.listaMedicamento();

            return res.status(200).json(listaMedicamento);
        } catch (error) {
           
            console.error(`Erro ao consultar medicamento. ${error}`);

            return res.status(500).json({ mensagem: "Não foi possivel acessar a lista de medicamento." });
        }
    }


    static async novo(req: Request, res: Response): Promise<Response> {
        try {
        
            const dadosRecebidosMedicamento: MedicamentoDTO = req.body;

            const respostaMedicamento = await Medicamento.cadastroMedicamento(dadosRecebidosMedicamento);

            if (respostaMedicamento) {
               
                return res.status(201).json({ mensagem: "Medicamento cadastrado com sucesso." });
            } else {
               
                return res.status(400).json({ mensagem: "Erro ao cadastrar medicamento." });
            }
        } catch (error) {
           
            console.error(`Erro no medicamento. ${error}`);

            return res.status(500).json({ mensagem: "Não foi possível inserir o medicamento" });
        }
    }
}

export default MedicamentoController;