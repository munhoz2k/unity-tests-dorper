import { ICriptografia } from "@src/RedefinirSenha";
import { hash, compare } from "bcryptjs"

export class Criptografia implements ICriptografia {
  async criptografaSenha(senha: string): Promise<string> {
    const senhaHash = await hash(senha, 8)
    return senhaHash
  }

  async comparaSenhaHash(senha: string, hash: string): Promise<boolean> {
    const isPasswordEqual = await compare(senha, hash)
    return isPasswordEqual
  }

  comparacaoSeguraStrings(a: string, b: string): boolean {
    const isEqual = a === b ? true : false
    return isEqual
  }
}