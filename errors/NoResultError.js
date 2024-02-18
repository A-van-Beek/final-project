class NoResultError extends Error {
  constructor(resourceType) {
    super(`${resourceType} er is niets gevonden !`);
    this.name = "NoResultError";
  }
}

export default NoResultError;
