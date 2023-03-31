test("Start Test", () => {
  let number = null;
    expect(number).toBeNull();
});

test("Object Test", () => {
    const data = 
    { name: "John", email: "jhon@gmail.com" };
    expect(data).toEqual({ name: "John", email: "jhon@gmail.com" });
    expect(data).toHaveProperty("name");
    expect(data.name).toBe("John");
});
