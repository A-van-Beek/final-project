class NotFoundError extends Error {
  constructor(resourceType, id) {
    super(`${resourceType} met id ${id} is niet gevonden !`);
    this.name = "NotFoundError";
  }
}

export default NotFoundError;
