import { describe, it, expect, vi } from "vitest"

vi.mock("../src/lib/prisma", () => ({
  prisma: {
    housingUnit: {
      create: vi.fn()
    }
  }
}))

import { createHousingUnit } from "../src/services/housingUnit.service"
import { prisma } from "../src/lib/prisma"

describe("createHousingUnit", () => {

  it("should create housing with provided status", async () => {

    await createHousingUnit({
      name: "Appartement A",
      status: "OCCUPIED"
    })

    expect(prisma.housingUnit.create).toHaveBeenCalledWith({
      data: {
        name: "Appartement A",
        status: "OCCUPIED"
      }
    })

  })

  it("should default status to AVAILABLE", async () => {

    await createHousingUnit({
      name: "Appartement B"
    })

    expect(prisma.housingUnit.create).toHaveBeenCalledWith({
      data: {
        name: "Appartement B",
        status: "AVAILABLE"
      }
    })

  })

})