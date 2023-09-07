import fs from "fs/promises";
import config from "../config.js";
import mustache from "mustache";
import frontmatter from "front-matter";
import showdown from "showdown";

const DIST = config.build.dist;
const PAGES = config.build.pages;
const CONTENTS = config.build.contents;
const CONTENTS_SLUG = config.build.constentsSlug;

async function getRecentPost() {
  const files = await fs.readdir(CONTENTS);
  const paths = [];
  for (let file of files) {
    const { attributes } = frontmatter(
      (await fs.readFile(`${CONTENTS}/${file}/index.md`)).toString()
    );
    paths.push({ ...attributes, path: `/${CONTENTS_SLUG}/${attributes.slug}` });
  }
  return paths;
}

async function renderFile(source, dest) {
  const recentposts = await getRecentPost();
  const file = await fs.readFile(source);
  const result = mustache.render(file.toString(), {
    ...config,
    recentposts,
  });
  await fs.writeFile(dest, result);
}

async function buildHtml() {
  const files = await fs.readdir(PAGES);
  for (let file of files) {
    if (file === "index.html") {
      await renderFile(`${PAGES}/${file}`, `${DIST}/${file}`);
    } else {
      const folderName = file.split(".")[0];
      await fs.mkdir(`${DIST}/${folderName}`);
      await renderFile(`${PAGES}/${file}`, `${DIST}/${folderName}/index.html`);
    }
  }
}

async function buildContents() {
  const files = await fs.readdir(CONTENTS);
  await fs.mkdir(`${DIST}/${CONTENTS_SLUG}`);

  for (let file of files) {
    const { body, attributes } = frontmatter(
      (await fs.readFile(`${CONTENTS}/${file}/index.md`)).toString()
    );
    const bodyHtml = new showdown.Converter().makeHtml(body);
    const template = await fs.readFile(`templates/post.html`);
    const html = mustache.render(template.toString(), {
      ...config,
      post: config.updateDate({ ...attributes, body: bodyHtml }),
    });
    await fs.mkdir(`${DIST}/${CONTENTS_SLUG}/${file}`);
    await fs.writeFile(`${DIST}/${CONTENTS_SLUG}/${file}/index.html`, html);
  }
}

async function build() {
  await fs.mkdir(DIST);

  await buildHtml();
  await buildContents();
}
build();
