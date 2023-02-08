describe("Adding Books", () => {
  it("Adding a book", () => {
    cy.visit("/");
    cy.login("test@test.com", "test");
    cy.typeForm(
      "Война и мир",
      "Война и мир- это роман русского писателя Льва Толстого, впервые опубликованная поочередно, затем издается в полном объеме в 1869 году.",
      "Л.Н.Толстой"
    );
    cy.contains("Submit").click();
    cy.contains("Война и мир");
  });

  it("The book is not added", () => {
    cy.visit("/");
    cy.login("test@test.com", "test");
    cy.typeForm(" ", " ", " ");
    cy.contains("Submit").click();
    cy.get("#title")
      .then(($el) => $el[0].checkValidity())
      .should("be.false");
    cy.get("#title")
      .then(($el) => $el[0].validationMessage)
      .should("contain", "Заполните это поле.");
  });

  it("Adding a book to favorites", () => {
    cy.visit("/");
    cy.login("test@test.com", "test");
    cy.typeForm(
      "Война и мир",
      "Война и мир- это роман русского писателя Льва Толстого, впервые опубликованная поочередно, затем издается в полном объеме в 1869 году.",
      "Л.Н.Толстой"
    );
    cy.contains("Submit").click();
    cy.contains("Война и мир");
    cy.get(".card-body")
      .contains("Война и мир")
      .parent()
      .siblings()
      .children("button")
      .click();
    cy.contains("Favorites").click();
    cy.contains("Война и мир");
  });
});
