const request = require("supertest")("http://localhost:8080");
const expect = require("chai").expect;
const faker = require("@faker-js/faker").faker;
let _iditems;
const generatePost = () => {
  return {
    product: faker.commerce.productName(),
    typeOfLiquor: faker.word.adjective(),
    price: faker.datatype.number(10, 100),
    image: faker.image.imageUrl(),
    description: faker.lorem.paragraph(),
    stockItems: faker.datatype.number(10, 100),
    codeItem: faker.datatype.number(10, 100),
  };
};
const generateUpdate = () => {
  return {
    product: faker.commerce.productName(),
    typeOfLiquor: faker.word.adjective(),
    price: faker.datatype.number(10, 100),
    image: faker.image.imageUrl(),
    description: faker.lorem.paragraph(),
    stockItems: faker.datatype.number(10, 100),
    codeItem: faker.datatype.number(10, 100),
  };
};
//console.log(generatePost());
describe("test posts endpoint", () => {
  describe("GET ALL", () => {
    it("deberia responder con status 201 y ser array", async () => {
      const res = await request.get("/api/productos");
      expect(res.status).to.eql(201);
      expect(res.body).to.be.a("array");
      //   expect(res.body).to.eql({ version: '0.0.1' });
    });
  });
  describe("POST ONE", () => {
    it("deberia incorporar un posteo nuevo", async () => {
      const post = generatePost();
      const res = await request.post("/api/productos").send(post);
      expect(res.status).to.eql(201);
      expect(res.body).to.be.a("object");
      expect(res.body).to.include.keys("_id");
      /* expect(post.product).to.eql(res.body.product);
      expect(post.typeOfLiquor).to.eql(res.body.typeOfLiquor);
      expect(post.price).to.eql(res.body.price);
      expect(post.image).to.eql(res.body.image);
      expect(post.description).to.eql(res.body.description);
      expect(post.stockItems).to.eql(res.body.stockItems);
      expect(post.codeItem).to.eql(res.body.codeItem); */
      _iditems = res.body._id;
    });
  });
  describe("PUT ONE", () => {
    it("deberia modificar un producto por el _id", async () => {
      const post = generateUpdate();
      const res = await request.put(`/api/productos/${_iditems}`).send(post);
      expect(res.status).to.eql(201);
      expect(res.body).to.be.a("object");
      expect(res.body).to.include.keys("product", "typeOfLiquor", "price", "image", "description", "stockItems", "codeItem", "_id", "data");
      expect(post.product).to.eql(res.body.product);
      expect(post.typeOfLiquor).to.eql(res.body.typeOfLiquor);
      expect(post.price).to.eql(res.body.price);
      expect(post.image).to.eql(res.body.image);
      expect(post.description).to.eql(res.body.description);
      expect(post.stockItems).to.eql(res.body.stockItems);
      expect(post.codeItem).to.eql(res.body.codeItem);
    });
  });
  describe("DELETE ONE", () => {
    it(`Elimina el producto generado`, async () => {
      const res = await request.delete(`/api/productos/${_iditems}`);
      expect(res.status).to.eql(202);
    });
  });
});
