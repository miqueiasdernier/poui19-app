import { Component, OnInit } from '@angular/core';
import { ExemploService } from '../../services/exemplo/exemplo.service';
import { ProtheusLibCoreModule } from '@totvs/protheus-lib-core';

@Component({
  selector: 'app-exemplo',
  standalone: true,
  imports: [],
  templateUrl: './exemplo.component.html',
  styleUrl: './exemplo.component.scss',
  providers: [ExemploService],
})
export class ExemploComponent implements OnInit {
  nomeUsuario: string = '';
  emailUsuario: string = '';

  constructor(private exemploService: ExemploService) {}

  ngOnInit() {
    this.loadUserInfo();
  }

  temp: any[] = [];

  async loadUserInfo() {
    // this.nomeUsuario = await this.exemploService.getNomeUsuario();
    // this.emailUsuario = await this.exemploService.getEmailUsuario();
    const [nome, email] = await Promise.all([
      this.exemploService.getNomeUsuario(),
      this.exemploService.getEmailUsuario(),
    ]);
    this.nomeUsuario = nome;
    this.emailUsuario = email;
  }
}
