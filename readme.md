### Para testar o sucesso, use:

## E-mail: admin@admin.com 

## Senha: 123456 


# 🚀 Como Subir seu E-commerce para o GitHub

Subir o seu e-commerce para o GitHub é o passo final para transformar seu código em um portfólio real.

O processo envolve o uso do **Git** (no seu computador) e do **GitHub** (plataforma online).

---

## 📌 1. Preparação no GitHub

1. Acesse o GitHub
2. Clique em **"New" (Novo Repositório)**
3. Defina um nome (ex: `meu-ecommerce-dom`)
4. Escolha a opção **Public**
5. Clique em **Create repository**
6. Deixe a página aberta após criar

---

## 💻 2. No seu Computador (Terminal ou VS Code)

Abra o terminal dentro da pasta do seu projeto (`Ctrl + `` no VS Code)

---

#🔹 A. Inicializar o Git

```bash
git init

### Cria a pasta .git e inicia o versionamento.

B. Adicionar os arquivos

```bash
git add .

### Adiciona todos os arquivos do projeto.

#🔹 C. Criar o primeiro commit

```bash
git commit -m "Primeiro commit: Estrutura do e-commerce com DOM"

### Salva uma versão do projeto.

#🔹 D. Conectar ao GitHub

##Copie a URL do repositório criado no GitHub.

```bash
git branch -M main
git remote add origin https://github.com/SEU_USUARIO/meu-ecommerce-dom.git

#🔹 E. Enviar o projeto (Push)

```bash
git push -u origin main

### Envia seu código para o GitHub 🚀

#######################################################

🌐 3. Publicar como Site (GitHub Pages)

Você pode deixar seu projeto online gratuitamente:

Vá em Settings do repositório
Clique em Pages
Em Branch, selecione main
Clique em Save

Após alguns minutos, seu site estará disponível:

https://seu-usuario.github.io/meu-ecommerce-dom/
################################################


💡 Dica: Sempre que fizer alterações no projeto, use:

```bash
git add .
git commit -m "descrição da alteração"
git push
