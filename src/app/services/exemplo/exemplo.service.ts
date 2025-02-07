import { Injectable } from '@angular/core';
import { ProJsToAdvpl, ProJsToAdvplService } from '@totvs/protheus-lib-core';
import { firstValueFrom } from 'rxjs';
import { v4 as uuidv4 } from 'uuid';

@Injectable({
  providedIn: 'root',
})
export class ExemploService {
  constructor(private proJsToAdvplService: ProJsToAdvplService) {}

  getNomeUsuario(): Promise<string> {
    return this.jsAdvplObs('usuarioLogado', 'nome');
  }

  getEmailUsuario(): Promise<string> {
    return this.jsAdvplObs('usuarioLogado', 'email');
  }

  private jsAdvplObs(sendId: string, content: string): Promise<string> {
    // generate unique uuid
    const receiveId = uuidv4();

    const payload = {
      receiveId,
      sendId,
      content,
    };

    // Variável que enviará as informações para o Protheus
    let sendIfo: ProJsToAdvpl = {
      autoDestruct: true, // Informa se o Observable será destruído assim que tiver um retorno
      receiveId: receiveId, // ID que será recebido pela aplicação Angular no retorno do Protheus
      sendInfo: {
        // Objeto com os dados que serão enviados ao Protheus
        type: 'canalUnico', // ID que será enviado ao protheus (Recebido na static function JsToAdvpl)
        content: JSON.stringify(payload), // Conteúdo enviado ao Protheus
      },
    };

    // Callback que será executado após o retorno do AdplToJs
    const observableCallback = ({
      protheusResponse,
      subscriber,
    }: {
      protheusResponse: any;
      subscriber: any;
    }) => {
      subscriber.next(protheusResponse); // Dispara e evento do observable
      subscriber.complete();
    };

    // Realiza a inscrição no Observable, enviando o callback e as informações enviadas ao Protheus)
    return firstValueFrom(
      this.proJsToAdvplService.buildObservable(observableCallback, sendIfo)
    );
  }
}
