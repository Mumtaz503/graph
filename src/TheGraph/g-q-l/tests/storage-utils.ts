import { newMockEvent } from "matchstick-as"
import { ethereum, BigInt } from "@graphprotocol/graph-ts"
import { Store } from "../generated/Storage/Storage"

export function createStoreEvent(
  name_: string,
  _job: string,
  experience_: BigInt
): Store {
  let storeEvent = changetype<Store>(newMockEvent())

  storeEvent.parameters = new Array()

  storeEvent.parameters.push(
    new ethereum.EventParam("name_", ethereum.Value.fromString(name_))
  )
  storeEvent.parameters.push(
    new ethereum.EventParam("_job", ethereum.Value.fromString(_job))
  )
  storeEvent.parameters.push(
    new ethereum.EventParam(
      "experience_",
      ethereum.Value.fromUnsignedBigInt(experience_)
    )
  )

  return storeEvent
}
