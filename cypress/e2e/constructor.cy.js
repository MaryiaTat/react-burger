describe("Constructor", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000");
    window.localStorage.setItem(
      "accessToken",
      JSON.stringify("test-accessToken")
    );
  });
  it("open && close ingredient description", () => {
    cy.get("#main")
      .find("div a:first")
      .click()
      .get('[data-testid="close-icon"]')
      .click();
  });
  it("make order", () => {
    // window.localStorage.setItem(
    //   "refreshToken",
    //   JSON.stringify("test-refreshToken")
    // );
    window.localStorage.setItem(
      "accessToken",
      JSON.stringify("test-accessToken")
    );
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
