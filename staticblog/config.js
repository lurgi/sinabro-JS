export default {
  build: {
    contents: "contents",
    pages: "pages",
    dist: "dist",
    constentsSlug: "post",
    assets: "assets",
  },
  site: { title: "My Blog", author: "Jeong Woo" },
  updateDate(post) {
    const date = new Date(post.createdAt);
    post.createdAt = date.toLocaleString();
    return post;
  },
};
