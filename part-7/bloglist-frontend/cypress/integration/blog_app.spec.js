/* eslint-disable no-undef */
// blog_app.spec.js created with Cypress
//
// Start writing your Cypress tests below!
// If you're unfamiliar with how Cypress works,
// check out the link below and learn how to write your first test:
// https://on.cypress.io/writing-first-test

describe("Note app", function () {
  it("front page can be opened", function () {
    cy.request("POST", "http://localhost:3003/api/testing/reset");
    const user = {
      name: "aweda",
      username: "alaweda",
      password: "alaweda",
    };
    cy.request("POST", "http://localhost:3003/api/users/", user);
    cy.visit("http://localhost:3000");
  });

  it("Login form is shown", function () {
    cy.contains("Log in").click();
  });
});

// describe("Login", function () {
//   it("succeds with correct credentials", function () {
//     // cy.contains("Log in").click();
//     cy.get("#username").type("alaweda");
//     cy.get("#password").type("alaweda");
//     cy.get("#login-btn").click();

//     cy.contains("aweda logged - in");
//   });

//   it("fails with wrong credentials", function () {
//     cy.contains("logout").click();
//     cy.contains("Log in").click();

//     cy.get("#username").type("alaweda");
//     cy.get("#password").type("alawed");
//     cy.get("#login-btn").click();

//     cy.get(".error").contains("invalid username or password");
//     cy.get(".error").should("have.css", "color", "rgb(255, 0, 0)");
//   });
// });

// describe("When logged in", function () {
//   beforeEach(function () {
//     cy.contains("Log in").click();
//     cy.get("#username").type("alaweda");
//     cy.get("#password").type("alaweda");
//     cy.get("#login-btn").click();
//   });

//   it("A blog can be created", function () {
//     cy.contains("Create Blog").click();
//     cy.get("#title").type("My first Blog");
//     cy.get("#author").type("amterbashan");
//     cy.get("#url").type("kulikuli.moz");

//     cy.get("#create").click();
//   });
// });

Cypress.Commands.add("logIn", ({ username, password }) => {
  cy.request("POST", "http://localhost:3003/api/login", {
    username,
    password,
  }).then(({ body }) => {
    localStorage.setItem("loggedBlogAppUser", JSON.stringify(body));
    cy.visit("http://localhost:3000");
  });
});

Cypress.Commands.add("createBlog", ({ title, author, url, likes }) => {
  cy.request({
    url: "http://localhost:3003/api/blogs",
    method: "POST",
    body: { title, author, url, likes },
    headers: {
      Authorization: `bearer ${
        JSON.parse(localStorage.getItem("loggedBlogAppUser")).token
      }`,
    },
  });
  cy.visit("http://localhost:3000");
});

// describe("login without ui", function () {
//   beforeEach(function () {
//     cy.logIn({ username: "alaweda", password: "alaweda" });
//   });
// });

// describe("user can delete and like", function () {
//   it("login", function () {
//     cy.contains("Log in").click();
//     cy.get("#username").type("alaweda");
//     cy.get("#password").type("alaweda");
//     cy.get("#login-btn").click();

//     cy.contains("Create Blog").click();
//     cy.get("#title").type("My first Blog");
//     cy.get("#author").type("amterbashan");
//     cy.get("#url").type("kulikuli.moz");

//     cy.get("#create").click();
//   });

//   it("user can like blog", function () {
//     cy.contains("My first Blog amterbashan");
//     cy.get("#viewblog").click();
//     cy.get("#likebtn").click();
//     cy.get("#likebtn").click();
//     cy.get("#likebtn").click();
//   });

//   it("user can delete blog", function () {
//     cy.contains("My first Blog amterbashan");
//     cy.contains("remove").click();
//   });
// });

describe("sort likes", function () {
  it("login", function () {});
  it("sort", function () {
    cy.logIn({ username: "alaweda", password: "alaweda" });
    cy.createBlog({ title: "migos", author: "meta", url: "musk.po", likes: 3 });
    cy.contains("view").click();
    cy.createBlog({
      title: "migus",
      author: "meda",
      url: "mask.org",
      likes: 5,
    });
    cy.contains("view").click();
    cy.createBlog({
      title: "miros",
      author: "metal",
      url: "musk.co",
      likes: 9,
    });
    cy.contains("view").click();
  });
});
