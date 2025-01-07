
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
    // 4° Caso de teste, end to end

describe('Teste E2E no Sauce Demo', () => {
  
    // Antes de cada teste, irá visitar a página inicial
    beforeEach(() => {
      cy.visit('https://www.saucedemo.com/v1/')
    })
    
    it('Deve fazer login, verificar a página de produtos e fazer logout', () => {
      // Passo 1: Fazer login com usuário e senha válidos
      cy.get('#user-name').type('standard_user')  
      cy.get('#password').type('secret_sauce')    
      cy.get('#login-button').click()             
      
      // Passo 2: Verificar se a página de produtos foi carregada
      cy.url().should('include', '/inventory.html')  
      
      // Validação do funcionamento da Ordenação dos produtos 
      cy.get('.product_sort_container').select('Name (A to Z)')
      cy.get('.product_sort_container').select('Name (Z to A)')
      cy.get('.product_sort_container').select('Price (low to high)')
      cy.get('.product_sort_container').select('Price (high to low)')
      
      //Validação do botão adicionar ao carrinho e botão remover 
      cy.get(':nth-child(1) > .pricebar > .btn_primary').click ()
      cy.get('.btn_secondary').click()
    
      //Validação do botão Remove dentro do carrinho de compras
      cy.get(':nth-child(1) > .pricebar > .btn_primary').click ()
      cy.get('.btn_secondary').click ()
      cy.get(':nth-child(1) > .pricebar > .btn_primary').click ()
      cy.get('.btn_secondary').click()
  
      //Validação do valor das compras 
      cy.get('.product_sort_container').select('Price (high to low)')
      cy.get(':nth-child(1) > .pricebar > .btn_primary').click()
      cy.get(':nth-child(2) > .pricebar > .btn_primary').click()
      cy.get(':nth-child(3) > .pricebar > .btn_primary').click()
      cy.get('.fa-layers-counter').click()
      cy.get('.btn_action').click()
      cy.get('#first-name').type('Renato')   
      cy.get('#last-name').type('Seixas')  
      cy.get('#postal-code').type('12345') 
      cy.get('.btn_primary').click ()
      
      //Checagem no valor total:
      cy.get('.summary_subtotal_label').should('have.text','Item total: $95.97')
  
      // Passo 6: Finalizar o checkout
      cy.get('.btn_action').click()  
      
  
      // Passo 8: Verificar a página de confirmação do pedido
      cy.get('.complete-header').should('have.text', 'THANK YOU FOR YOUR ORDER') 
      
      // Passo 9: Fazer logout
      cy.get('.bm-burger-button > button').click() 
      cy.get('#logout_sidebar_link').click({ force: true })  
  
      // Passo 10: Verificar se voltou para a página de login
      cy.url().should('include', '/v1/')  
    })
  })  
  
})



