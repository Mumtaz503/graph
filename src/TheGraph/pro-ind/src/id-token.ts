import {
  Approval as ApprovalEvent,
  ApprovalForAll as ApprovalForAllEvent,
  BatchMetadataUpdate as BatchMetadataUpdateEvent,
  EducationVerified as EducationVerifiedEvent,
  IdTokenMinted as IdTokenMintedEvent,
  MetadataUpdate as MetadataUpdateEvent,
  StatsUpdated as StatsUpdatedEvent,
  Transfer as TransferEvent
} from "../generated/IDToken/IDToken"
import {
  Approval,
  ApprovalForAll,
  BatchMetadataUpdate,
  EducationVerified,
  IdTokenMinted,
  MetadataUpdate,
  StatsUpdated,
  Transfer
} from "../generated/schema"

export function handleApproval(event: ApprovalEvent): void {
  let entity = new Approval(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.owner = event.params.owner
  entity.approved = event.params.approved
  entity.tokenId = event.params.tokenId

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleApprovalForAll(event: ApprovalForAllEvent): void {
  let entity = new ApprovalForAll(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.owner = event.params.owner
  entity.operator = event.params.operator
  entity.approved = event.params.approved

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleBatchMetadataUpdate(
  event: BatchMetadataUpdateEvent
): void {
  let entity = new BatchMetadataUpdate(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity._fromTokenId = event.params._fromTokenId
  entity._toTokenId = event.params._toTokenId

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleEducationVerified(event: EducationVerifiedEvent): void {
  let entity = new EducationVerified(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.professional_ = event.params.professional_
  entity.tokenId_ = event.params.tokenId_
  entity.educationVerification_ = event.params.educationVerification_

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleIdTokenMinted(event: IdTokenMintedEvent): void {
  let entity = new IdTokenMinted(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.professional_ = event.params.professional_
  entity.tokenId_ = event.params.tokenId_
  entity.fName_ = event.params.fName_
  entity.lName_ = event.params.lName_
  entity.field_ = event.params.field_

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleMetadataUpdate(event: MetadataUpdateEvent): void {
  let entity = new MetadataUpdate(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity._tokenId = event.params._tokenId

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleStatsUpdated(event: StatsUpdatedEvent): void {
  let entity = new StatsUpdated(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.professional_ = event.params.professional_
  entity.tokenId_ = event.params.tokenId_
  entity.experiencePoints_ = event.params.experiencePoints_

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleTransfer(event: TransferEvent): void {
  let entity = new Transfer(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.from = event.params.from
  entity.to = event.params.to
  entity.tokenId = event.params.tokenId

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}
