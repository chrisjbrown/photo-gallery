import React from "react";
import { fireEvent, act } from "@testing-library/react";
import { createMemoryHistory } from "history";

import { renderWithRouter } from "../setupTests";
import * as MockAPI from "../MockAPI/photos";
import Gallery from "./Gallery";

jest.mock("../MockAPI/photos", () => ({
  getPhotos: jest.fn(),
  patchPhoto: jest.fn(),
}));

describe("Gallery page", () => {
  beforeEach(() => {
    MockAPI.getPhotos.mockImplementation(({ perPage }) => {
      const photos = Array.apply(null, Array(perPage)).map((photo, index) => ({
        id: index,
        title: "tiki" + index,
      }));
      return Promise.resolve({
        photos,
        pages: Math.ceil(photos.length / perPage),
      });
    });
  });

  it("should have default view with no photos", async () => {
    let wrapper;
    MockAPI.getPhotos.mockImplementation((params) =>
      Promise.resolve({ photos: [] })
    );

    await act(async () => {
      wrapper = renderWithRouter(<Gallery />);
    });

    expect(wrapper.container.firstChild).toMatchSnapshot();
  });

  it("should have default view with 10 photos", async () => {
    let wrapper;

    await act(async () => {
      wrapper = renderWithRouter(<Gallery />);
    });

    const photos = wrapper.container.querySelectorAll("img");
    expect(photos.length).toEqual(10);
  });

  it("should call get photos with correct params from url and render response", async () => {
    let wrapper;
    const history = createMemoryHistory();
    history.push({ pathname: "/", search: "?page=2&perPage=20&query=tiki" });

    await act(async () => {
      wrapper = renderWithRouter(<Gallery />, { history });
    });

    expect(MockAPI.getPhotos).toHaveBeenCalledWith({
      page: 2,
      perPage: 20,
      query: "tiki",
    });

    const photos = wrapper.container.querySelectorAll("img");
    expect(photos.length).toEqual(20);
  });

  describe("User filtering", () => {
    it("should update based on query", async () => {
      let wrapper;

      await act(async () => {
        wrapper = renderWithRouter(<Gallery />);
      });

      const search = wrapper.getByRole("textbox");

      await act(async () => {
        fireEvent.input(search, { target: { value: "blabla" } });
      });

      expect(MockAPI.getPhotos).toHaveBeenCalledWith({
        page: 1,
        perPage: 10,
        query: "blabla",
      });
    });

    it("should update based on perPage", async () => {
      let wrapper;

      await act(async () => {
        wrapper = renderWithRouter(<Gallery />);
      });

      await act(async () => {
        fireEvent.change(wrapper.container.querySelector("select"), {
          target: { value: "20" },
        });
      });

      expect(MockAPI.getPhotos).toHaveBeenCalledWith({
        page: 1,
        perPage: 20,
        query: "",
      });
    });
  });

  describe("Pagination", () => {
    beforeEach(() => {
      MockAPI.getPhotos.mockImplementation(({ perPage }) => {
        const photos = Array.apply(null, Array(perPage * 3)).map(
          (photo, index) => ({
            id: index,
            title: "tiki" + index,
          })
        );
        return Promise.resolve({
          photos,
          pages: Math.ceil(photos.length / perPage),
        });
      });
    });

    it("should handle next/previous pagination", async () => {
      let wrapper;

      await act(async () => {
        wrapper = renderWithRouter(<Gallery />);
      });

      await act(async () => {
        fireEvent.click(wrapper.getByRole("button", { name: /next page/i }));
      });

      await act(async () => {
        fireEvent.click(wrapper.getByRole("button", { name: /next page/i }));
      });

      expect(MockAPI.getPhotos).toHaveBeenLastCalledWith({
        page: 3,
        perPage: 10,
        query: "",
      });

      await act(async () => {
        fireEvent.click(
          wrapper.getByRole("button", { name: /previous page/i })
        );
      });

      expect(MockAPI.getPhotos).toHaveBeenLastCalledWith({
        page: 2,
        perPage: 10,
        query: "",
      });
    });

    it("should handle end/start pagination", async () => {
      let wrapper;

      await act(async () => {
        wrapper = renderWithRouter(<Gallery />);
      });

      await act(async () => {
        fireEvent.click(wrapper.getByRole("button", { name: /last page/i }));
      });

      expect(MockAPI.getPhotos).toHaveBeenLastCalledWith({
        page: 3,
        perPage: 10,
        query: "",
      });

      await act(async () => {
        fireEvent.click(wrapper.getByRole("button", { name: /first page/i }));
      });

      expect(MockAPI.getPhotos).toHaveBeenLastCalledWith({
        page: 1,
        perPage: 10,
        query: "",
      });
    });
  });
});
