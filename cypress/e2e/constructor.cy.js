describe("Constructor", () => {
  beforeEach(() => {
    cy.visit("/");
  });
  it("open && close ingredient description_close icon", () => {
    cy.get("#main").find("div a:first").as("firstMainIngredient");
    cy.get("@firstMainIngredient")
      .click()
      .get('[data-testid="close-icon"]')
      .click();
  });
  it("make order", () => {
    cy.get("#main").find("div a:first").as("firstMainIngredient");
    cy.get("#bun").find("div a:first").as("bunIngredient");

    cy.get("@firstMainIngredient")
      .trigger("dragstart")
      .get('[data-testid="burger-filling"]')
      .trigger("drop")
      .get("@bunIngredient")
      .trigger("dragstart")
      .get('[data-testid="burger-bun"]')
      .trigger("drop")
      .get("[data-testid=checkout-button]")
      .click();
  });
});
