export default class Likes {
  constructor() {
    this.likes = [];
  }

  addLike(id, title, author, img) {
    const like = { id, title, author, img };
    this.likes.push(like);
    // persist data in localstorage
    this.persistData();
    return like;
  }

  deleteLike(id) {
    const index = this.likes.findIndex((el) => el.id === id);
    this.likes.splice(index, 1);

    // persist data in localstorage
    this.persistData();
  }

  isLiked(id) {
    return this.likes.findIndex((el) => el.id === id) !== -1;
  }

  getNumLikes() {
    return this.likes.length;
  }

  persistData() {
    localStorage.setItem("likes", JSON.stringify(this.likes));
    // turn into string
  }

  readStorage() {
    const storage = JSON.parse(localStorage.getItem("likes"));
    // return in array
    if (storage) this.likes = storage;
    // restoring likes from localstorage
  }
}
