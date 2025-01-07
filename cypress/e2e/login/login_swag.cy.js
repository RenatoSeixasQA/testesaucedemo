
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
})