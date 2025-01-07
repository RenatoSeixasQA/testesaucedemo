
describe('Teste de login no Sauce Demo', () => {
  
  
    // 1º Caso de teste Valida login 
    beforeEach(() => {
      cy.visit('https://www.saucedemo.com/v1/')
    })
  
    it('Deve fazer login com sucesso', () => {
      // Insere o nome de usuário e a senha
      cy.get('input[id="user-name"]').type('standard_user') 
      cy.get('input[id="password"]').type('secret_sauce') 
  
      // Clicar no botão de login
      cy.get('input[id="login-button"]').click()
  
      // Verificar se o login foi bem-sucedido (pode ser um redirecionamento ou um elemento que aparece após o login)
      cy.url().should('include', '/inventory.html') 
      
    })
    // 2º Caso de teste Login incorreto e validação da mensagem de erro
  it('Deve mostrar erro com credenciais inválidas', () => {
    // Tentar fazer login com credenciais inválidas
    cy.get('input[id="user-name"]').type('invalid_user')
    cy.get('input[id="password"]').type('invalid_password')

    // Clica no botão de login
    cy.get('input[id="login-button"]').click()

    // Verificar se a mensagem de erro aparece
    cy.get('h3[data-test="error"]')
      .should('be.visible')
      .and('have.text', 'Epic sadface: Username and password do not match any user in this service')
  
  })
  // 3º Caso de teste Validação da frase de erro ao usuário inserir usuário correto e senha incorreta
describe('Teste de login com senha incorreta', () => {
    // Antes de cada teste, vai acessar o site
    beforeEach(() => {
      cy.visit('https://www.saucedemo.com/v1/')
    })
  
    it('Deve mostrar erro ao tentar logar com senha incorreta', () => {
      // Verifique se a página carregou corretamente
      cy.get('body').should('be.visible')
  
      // Inserir nome de usuário válido
      cy.get('#user-name', { timeout: 10000 }).should('be.visible').type('standard_user')
  
      // Inserir senha incorreta
      cy.get('#password').should('be.visible').type('senha_errada')
  
      // Clicar no botão de login
      cy.get('#login-button').click()
  
      // Verificar se a mensagem de erro aparece
      cy.get('h3[data-test="error"]')
        .should('be.visible')
        .and('have.text', 'Epic sadface: Username and password do not match any user in this service')
    })
    
    })  
})



