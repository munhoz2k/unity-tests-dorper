import { IRedefinirSenha_repo } from "@src/RedefinirSenha";
import { hash,  } from "bcryptjs"

interface IAdminSenha {
  adminId: number
  senha: string
}

export class InMemoryRedefinirSenha_repo implements IRedefinirSenha_repo {
  adminSenhas: IAdminSenha[] = []

  async criaSenhaAdmin(senha: string): Promise<number> {
    const newAdmin: IAdminSenha = {
      adminId: Number(String(Math.random()).split('.')[1]), // Gambiarra para gerar número aleatório
      senha: await hash(senha, 8)
    }

    this.adminSenhas.push(newAdmin)

    return newAdmin.adminId
  }

  async buscaHashSenhaAdmin(adminId: number): Promise<string | undefined> {
    const adminSenha = this.adminSenhas.find(a => a.adminId === adminId)

    return adminSenha?.senha
  }
  async atualizaSenha(adminId: number, senha: string): Promise<void> {
    const adminSenha = this.adminSenhas.find(a => a.adminId === adminId) as IAdminSenha
    
    adminSenha.senha = senha
  }

}