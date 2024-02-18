describe("Constructor", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000");
  });
  it("open && close ingredient description_close icon", () => {
    cy.get("#main")
      .find("div a:first")
      .click()
      .get('[data-testid="close-icon"]')
      .click();
  });
  it("make order", () => {
    cy.get("#bun")
      .find("div a:first")
      .trigger("dragstart")
      .get('[data-testid="burger-bun"]')
      .trigger("drop")
      .get("#main")
      .find("div a:first")
      .trigger("dragstart")
      .get('[data-testid="burger-filling"]')
      .trigger("drop")
      .get("[data-testid=checkout-button]")
      .click();
  });
});
