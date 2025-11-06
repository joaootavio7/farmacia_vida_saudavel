import type { MedicamentoDTO } from "../interface/MedicamentoDTO.js";
import { DatabaseModel } from "./DatabaseModel.js";

const database = new DatabaseModel().pool;

class Medicamento {

    private idMedicamento: number = 0;
    private nome: string;
    private fabricante: string;
    private principio_ativo: string;
    private data_de_validade: number;
    private preco: number;

    constructor(
        _nome: string,
        _fabricante: string,
        _principio_ativo: string,
        _data_de_validade: number,
        _preco: number,
    ){
        this.nome = _nome;
        this.fabricante = _fabricante;
        this.principio_ativo = _principio_ativo;
        this.data_de_validade= _data_de_validade
        this.preco = _preco
    }


    public getIdmedicamento(): number {
        return this.idMedicamento;
    }


    public setIdmedicamento(idMedicamento: number): void {
        this.idMedicamento = idMedicamento;
    }


    public getNome(): string {
        return this.nome;
    }


    public setNome(nome: string): void {
        this.nome = nome;
    }


    public getFabricante(): string {
        return this.fabricante;
    }


    public setFabricante(fabricante: string): void {
        this.fabricante = fabricante;
    }


    public getPrincipio_ativo(): string {
        return this.principio_ativo;
    }


    public setPrincipio_ativo(principio_ativo: string): void {
        this.principio_ativo = principio_ativo;
    }

    public getData_de_validade(): number {
        return this.data_de_validade;
    }


    public setData_de_validade(data_de_validade: number): void {
        this.data_de_validade = data_de_validade;
    }

        public getPreco(): number {
        return this.preco;
    }


    public setPreco(preco: number): void {
        this.preco = preco;
    }

    static async listaMedicamento(): Promise<Array<Medicamento> | null> {
        try {

              let listaDeMedicamento: Array<Medicamento> = [];

     
            const querySelectClientes = `SELECT * FROM medicamentos;`;

       
            const respostaBD = await database.query(querySelectClientes);

      
            respostaBD.rows.forEach((medicamentoBD: any) => {
         
                const novoMedicamento: Medicamento = new Medicamento(
                    medicamentoBD.nome,
                    medicamentoBD.fabricante,
                    medicamentoBD.principio_ativo,
                    medicamentoBD.data_de_validade,
                    medicamentoBD.preco,
                );

          
                novoMedicamento.setIdmedicamento(medicamentoBD.id_medicamento);

             
                listaDeMedicamento.push(novoMedicamento);
            });

         
            return listaDeMedicamento;
            
        } catch (error) {
            console.error(`Erro ao acessar o banco de dados. ${error}`);
            return null;
        }
    }
    static async cadastroMedicamento(medicamento: MedicamentoDTO): Promise<boolean> {
            try {
                
                const queryInsertMedicamento = `INSERT INTO medicamentos (nome, fabricante, principio_ativo, data_de_validade, preco)
                                    VALUES
                                    ($1, $2, $3, $4, $5)
                                    RETURNING id_medicamento;`;

                const respostaBD = await database.query(queryInsertMedicamento, [
                    'medicamento.nome.toUpperCase()', 
                    medicamento.fabricante.toUpperCase(),               
                    medicamento.principio_ativo,
                    'medicamento.data_de_validade.toUpperCase()',   
                    'medicamento.preco.toUpperCase()'       
                ]);
    
                if (respostaBD.rows.length > 0) {
                   
                    console.info(`Medicamento cadastrado com sucesso. ID: ${respostaBD.rows[0].id_medicamento}`);
    
                    return true;
                }
    
             
                return false;
            } catch (error) {
          
                console.error(`Erro na consulta ao banco de dados. ${error}`);
    
                return false;
            }
        }
}

export default Medicamento;