# DescontrAI

## Proposta do Projeto

**DescontrAI** é uma plataforma web criada para facilitar a contratação de DJs, cantores, músicos, bandas e outros profissionais do entretenimento para eventos. O objetivo do site é conectar organizadores de festas, casamentos, aniversários, eventos corporativos e sociais com artistas qualificados, tornando o processo de busca, comparação e contratação mais simples, rápido e transparente.

## Funcionalidades

- **Busca e filtro de profissionais:** Encontre DJs, cantores e artistas por estilo musical, localização, faixa de preço, avaliações, datas disponíveis e muito mais.
- **Perfil detalhado dos artistas:** Cada profissional possui uma página com informações completas, fotos, vídeos, portfólio e avaliações de clientes anteriores.
- **Sistema de contato e orçamento:** Solicite orçamento diretamente pelo site e converse com o artista antes de fechar a contratação.
- **Avaliações e recomendações:** Veja opiniões reais de outros contratantes e escolha com maior segurança.
- **Cadastro de artistas e organizadores:** Artistas podem criar e atualizar seus perfis; organizadores podem cadastrar pedidos e salvar favoritos.

## Estrutura do Projeto

```
Desktop/WebApplication1/WebApplication1/
├── Controllers/        # Lógica das rotas e das ações do backend
├── Models/             # Modelos de dados: Artista, Evento, Contratação, Avaliação, etc.
├── Views/              # (Opcional) Razor Views para páginas dinâmicas
├── wwwroot/            # Front-end estático: HTML, CSS, JS
├── Program.cs          # Inicialização da aplicação ASP.NET Core
├── appsettings.json    # Configurações do projeto
```

## Divisão das Tarefas

| Nome         | Parte Responsável                                              |
|--------------|---------------------------------------------------------------|
| **Andreey**  | Backend ASP.NET Core (Controllers, Models, integração com banco de dados, APIs) |
| **Adalberto**| Frontend: HTML, CSS, JavaScript (Layout, interatividade, responsividade) |
| **Emanuel**  | Scrum Master: organização do projeto, acompanhamento das tarefas, reuniões e documentação |

## Tecnologias Utilizadas

- **Backend:** ASP.NET Core MVC (.NET 8)
- **Frontend:** HTML, CSS, JavaScript puro (com possibilidade de integração por Razor Views e APIs)
- **Banco de Dados:** (Sugestão) SQL Server, SQLite ou outro compatível com .NET
- **Layout:** Bootstrap

## Contribuição

- Para sugestões, dúvidas ou melhorias, abra uma issue ou faça um pull request.
- Artistas podem entrar em contato para se cadastrar e divulgar seu trabalho.

---

**DescontrAI** conecta você ao artista ideal para o seu evento!
