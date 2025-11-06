export interface ClienteDTO {
         idCliente? : number,
         nome: string,
         cpf: string,
         telefone: number,
         data_de_nascimento: number,
         email: string;
         situacao?: boolean

}