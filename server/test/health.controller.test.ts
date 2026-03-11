import { describe, it, expect, vi } from "vitest"
import { getHealth } from "../src/controllers/health.controller"

describe("getHealth", () => {

  it("should return API running message", () => {

    const res = {
      status: vi.fn().mockReturnThis(),
      json: vi.fn()
    }

    getHealth({} as any, res as any)

    expect(res.status).toHaveBeenCalledWith(200)

    expect(res.json).toHaveBeenCalledWith({
      success: true,
      message: "API is running"
    })

  })

})