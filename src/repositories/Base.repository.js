class BaseRepository {
  constructor() {
    if (new.target === BaseRepository) {
      throw new Error();
    }
  }
}
