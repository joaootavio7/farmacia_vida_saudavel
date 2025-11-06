export interface MedicamentoDTO {
    idMedicamento? : number,    
    medicamento: string,       
    fabricante: string,        
    principio_ativo: string,   
    data_de_validade: number,   
    preco: number,   
    situacao?: boolean 
}