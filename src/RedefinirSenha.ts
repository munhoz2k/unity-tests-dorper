import { FuncaoErroHttp } from "./FuncaoErroHttp";

export interface IRedefinirSenha {
  senhaAntiga: string;
  senha: string;
  adminId: number;
}

export interface ICriptografia {
  criptografaSenha(senha: string): Promise<string>;
  comparaSenhaHash(senha: string, hash: string): Promise<boolean>;
  comparacaoSeguraStrings(a: string, b: string): boolean;
}

export interface IRedefinirSenha_repo {
  buscaHashSenhaAdmin(adminId: number): Promise<string | undefined>;
  atualizaSenha(adminId: number, senha: string): Promise<void>;
  criaSenhaAdmin(senha: string): Promise<number>
}
// Adicionei a função de criação de senhas para facilitar os testes

export class RedefinirSenha {
  constructor(
    private redefinirSenha_repo: IRedefinirSenha_repo,
    private Criptografia_servico: ICriptografia,
  ) { }


  public async redefinir({ senhaAntiga, senha, adminId }: IRedefinirSenha) {
    this.comparaSenhaAntigaNova(senhaAntiga, senha);
    const { senhaSalva } = await this.buscaSenhaAtual(adminId);
    await this.verificaSenhaAntiga(senhaAntiga, senhaSalva);
    await this.atualizaSenhaAdmin(adminId, senha);
  }

  private comparaSenhaAntigaNova(senhaAntiga: string, senha: string) {
    if (
      senhaAntiga.length === senha.length &&
      this.Criptografia_servico.comparacaoSeguraStrings(senhaAntiga, senha)
    ) {
      throw new FuncaoErroHttp({
        status: 400,
        detalhe: "Senha antiga e nova senha não podem ser iguais",
      });
    }
  }

  private async buscaSenhaAtual(adminId: number) {
    const senhaSalva = await this.redefinirSenha_repo.buscaHashSenhaAdmin(
      adminId
    );

    if (!senhaSalva) {
      throw new FuncaoErroHttp({
        status: 404,
        detalhe: "Senha antiga de admin não encontrada",
      });
    }

    return { senhaSalva };
  }

  private async verificaSenhaAntiga(senhaAntiga: string, hashSalvo: string) {

    const senhaValida = await this.Criptografia_servico.comparaSenhaHash(
      senhaAntiga,
      hashSalvo
    );

    if (!senhaValida) {
      throw new FuncaoErroHttp({
        status: 400,
        detalhe: "Senha antiga incorreta",
      });
    }
  }

  private async atualizaSenhaAdmin(adminId: number, senha: string) {
    const hash = await this.Criptografia_servico.criptografaSenha(senha);
    
    return this.redefinirSenha_repo.atualizaSenha(adminId, hash);
  }
}


// OBS: alterei todos os throw this.funcaoErroHttp para throw new FuncaoErroHttp