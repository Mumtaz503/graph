import {
  assert,
  describe,
  test,
  clearStore,
  beforeAll,
  afterAll
} from "matchstick-as/assembly/index"
import { BigInt } from "@graphprotocol/graph-ts"
import { Store } from "../generated/schema"
import { Store as StoreEvent } from "../generated/Storage/Storage"
import { handleStore } from "../src/storage"
import { createStoreEvent } from "./storage-utils"

// Tests structure (matchstick-as >=0.5.0)
// https://thegraph.com/docs/en/developer/matchstick/#tests-structure-0-5-0

describe("Describe entity assertions", () => {
  beforeAll(() => {
    let name_ = "Example string value"
    let _job = "Example string value"
    let experience_ = BigInt.fromI32(234)
    let newStoreEvent = createStoreEvent(name_, _job, experience_)
    handleStore(newStoreEvent)
  })

  afterAll(() => {
    clearStore()
  })

  // For more test scenarios, see:
  // https://thegraph.com/docs/en/developer/matchstick/#write-a-unit-test

  test("Store created and stored", () => {
    assert.entityCount("Store", 1)

    // 0xa16081f360e3847006db660bae1c6d1b2e17ec2a is the default address used in newMockEvent() function
    assert.fieldEquals(
      "Store",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "name_",
      "Example string value"
    )
    assert.fieldEquals(
      "Store",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "_job",
      "Example string value"
    )
    assert.fieldEquals(
      "Store",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "experience_",
      "234"
    )

    // More assert options:
    // https://thegraph.com/docs/en/developer/matchstick/#asserts
  })
})
