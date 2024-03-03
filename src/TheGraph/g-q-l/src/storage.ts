import { Store as StoreEvent } from "../generated/Storage/Storage"
import { Store } from "../generated/schema"

export function handleStore(event: StoreEvent): void {
  let entity = new Store(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.name_ = event.params.name_
  entity._job = event.params._job
  entity.experience_ = event.params.experience_

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}
