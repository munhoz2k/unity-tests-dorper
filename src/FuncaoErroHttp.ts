interface IErrorData {
  status: number,
  detalhe: string
}

export class FuncaoErroHttp extends Error {
  status: number

  constructor({status , detalhe}: IErrorData) {
    super()
    this.status = status
    this.message = detalhe
  }
}