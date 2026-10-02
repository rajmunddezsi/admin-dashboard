import {describe, it, expect} from "vitest";
import { calculateSkip, calculateTotalPages, parsePage } from "./pagination";

describe("parsePage", () => {
    it("returns page 3 when page is an integer 3", () => {
        const {currentPage} = parsePage("3");
        expect(currentPage).toBe(3);
    })

    it("returns page 1 when page is 0", () => {
        const {currentPage} = parsePage("0");
        expect(currentPage).toBe(1);
    })

    it("returns page 1 when page is negative", () => {
        const {currentPage} = parsePage("-2");
        expect(currentPage).toBe(1);
    })

    it("returns page 1 when page is not an integer", () => {
        const {currentPage} = parsePage("2.5");
        expect(currentPage).toBe(1);
    })

    it("returns page 1 when page is not a number", () => {
        const {currentPage} = parsePage("abc");
        expect(currentPage).toBe(1);
    })

    it("returns page 1 when page is undefined", () => {
        const {currentPage} = parsePage(undefined);
        expect(currentPage).toBe(1);
    })
})

describe("calculateSkip", () => {
    it("returns 0 if current page is 1 and page size is 5", () => expect(calculateSkip(1, 5)).toBe(0))
    it("returns 5 if current page is 2 and page size is 5", () => expect(calculateSkip(2, 5)).toBe(5))
    it("returns 10 if current page is 3 and page size is 5", () => expect(calculateSkip(3, 5)).toBe(10))
})

describe("calculateTotalPages", () => {
    it("returns 5 if total is 23 and page size is 5", () => expect(calculateTotalPages(23, 5)).toBe(5))
    it("returns 4 if total is 20 and page size is 5", () => expect(calculateTotalPages(20, 5)).toBe(4))
    it("returns 0 if total is 0 and page size is 5", () => expect(calculateTotalPages(0, 5)).toBe(0))
})