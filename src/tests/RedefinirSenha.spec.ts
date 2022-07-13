import { ICriptografia } from "../RedefinirSenha"
import { Criptografia } from "../inMemoryService/InMemoryCriptogafia"
import { IRedefinirSenha_repo } from "../RedefinirSenha"
import { InMemoryRedefinirSenha_repo } from "../inMemoryRepository/InMemoryRedefinirSenha_repo"
import { RedefinirSenha } from "../RedefinirSenha"
import { compare } from 'bcryptjs'
import { FuncaoErroHttp } from "../FuncaoErroHttp"

let inMemoryRedefinirSenha_repo: IRedefinirSenha_repo 
let criptografia: ICriptografia
let redefinirSenha: RedefinirSenha

let adminId1: number
// let adminId2: number

describe("Redefinir Senha Test", () => {
  beforeEach(async () => {
    inMemoryRedefinirSenha_repo = new InMemoryRedefinirSenha_repo()
    criptografia = new Criptografia

    redefinirSenha = new RedefinirSenha(
      inMemoryRedefinirSenha_repo,
      criptografia
    )

    adminId1 = await inMemoryRedefinirSenha_repo.criaSenhaAdmin("teste123")
    // adminId2 = await inMemoryRedefinirSenha_repo.criaSenhaAdmin("123teste")
  })

  it("deve ser possivel redefinir a senha", async () => {
    const novaSenha = {
      adminId: adminId1,
      senha: "teste-senha-nova",
      senhaAntiga: "teste123"
    }

    await redefinirSenha.redefinir(novaSenha)

    const senhaNova = await inMemoryRedefinirSenha_repo.buscaHashSenhaAdmin(adminId1) as string
    const isEqual = await compare(novaSenha.senha, senhaNova)

    expect(isEqual).toBe(true)
  })

  it("não deve ser possivel redefinir senha com a mesma senha que a antiga", async () => {
    const novaSenha = {
      adminId: adminId1,
      senha: "teste123",
      senhaAntiga: "teste123"
    }

    await expect(
      redefinirSenha.redefinir(novaSenha)
    ).rejects.toEqual(new FuncaoErroHttp({
      status: 400,
      detalhe: "Senha antiga e nova senha não podem ser iguais"
    }))
  })

  it("não deve ser possivel redefinir senha se o adminId não existir", async () => {
    const novaSenha = {
      adminId: 12345678,
      senha: "teste-senha-nova",
      senhaAntiga: "teste123"
    }

    await expect(
      redefinirSenha.redefinir(novaSenha)
    ).rejects.toEqual(new FuncaoErroHttp({
      status: 404,
      detalhe: "Senha antiga de admin não encontrada"
    }))
  })

  it("não deve ser possivel redefinir senha se o usuário passar uma senha antiga incorreta", async () => {
    const novaSenha = {
      adminId: adminId1,
      senha: "teste-senha-nova",
      senhaAntiga: "senha-incorreta"
    }

    await expect(
      redefinirSenha.redefinir(novaSenha)
    ).rejects.toEqual(new FuncaoErroHttp({
      status: 400,
      detalhe: "Senha antiga incorreta",
    }))
  })
})