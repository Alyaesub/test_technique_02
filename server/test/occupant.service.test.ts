import { describe, it, expect, vi } from "vitest"
import { createOccupant } from "../src/services/occupant.service"
import { prisma } from "../src/lib/prisma"

vi.mock("../src/lib/prisma", () => ({
  prisma: {
    occupant: {
      create: vi.fn(),
    },
  },
}))

describe("createOccupant", () => {

  it("should call prisma.occupant.create with correct data", async () => {

    await createOccupant({
      firstName: "John",
      lastName: "Doe",
      email: "john@test.com"
    })

    expect(prisma.occupant.create).toHaveBeenCalledWith({
      data: {
        firstName: "John",
        lastName: "Doe",
        email: "john@test.com"
      }
    })

  })

})