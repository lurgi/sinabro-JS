import { describe, it, expect } from "vitest";

describe("altogether", () => {
  it("extracts items", () => {
    const users = [
      {
        id: 1,
        username: "a",
      },
      {
        id: 2,
        username: "b",
      },
      {
        id: 3,
        username: "c",
      },
      {
        id: 4,
        username: "d",
      },
    ];
    const idsToExtract = [1, 2, 5];
    const idsToExtractSet = new Set(idsToExtract);

    // TODO: do something here
    const extractedUsers = users.filter((user) => idsToExtractSet.has(user.id));
    expect(extractedUsers).toEqual([
      {
        id: 1,
        username: "a",
      },
      {
        id: 2,
        username: "b",
      },
    ]);
  });

  it("filters out duplicates", () => {
    const users = [
      {
        id: 1,
        username: "a",
      },
      {
        id: 2,
        username: "b",
      },
      {
        id: 3,
        username: "c",
      },
      {
        id: 1,
        username: "a",
      },
      {
        id: 3,
        username: "c",
      },
    ];

    // TODO: do something here
    const uniqueUsers = users.reduce((acc, cur) => {
      if (!acc.find((user) => user.id === cur.id)) {
        acc.push(cur);
      }
      return acc;
    }, []);
    expect(uniqueUsers).toEqual([
      {
        id: 1,
        username: "a",
      },
      {
        id: 2,
        username: "b",
      },
      {
        id: 3,
        username: "c",
      },
    ]);
  });

  it('gets movie titles before 2020 that starts with "A"', () => {
    const movies = [
      {
        title: "Frozen",
        actors: ["Kristen Bell", "Idina Menzel", "Josh Gad"],
        year: 2013,
      },
      {
        title: "A Quiet Place",
        actors: [
          "Emily Blunt",
          "John Krasinski",
          "Millicent Simmonds",
          "Noah Jupe",
        ],
        year: 2018,
      },
      {
        title: "Enola Holmes",
        actors: ["Millie Bobby Brown", "Henry Cavill"],
        year: 2020,
      },
    ];
    // TODO: do something here
    // const movieTitles = movies
    //   .filter((movie) => movie.title.startsWith("A") && movie.year < 2020)
    //   .map((movie) => movie.title);
    const movieTitles = movies.reduce((acc_movie, cur_movie) => {
      if (cur_movie.title.startsWith("A") && cur_movie.year < 2020)
        acc_movie.push(cur_movie.title);
      return acc_movie;
    }, []);
    expect(movieTitles).toEqual(["A Quiet Place"]);
  });
});
