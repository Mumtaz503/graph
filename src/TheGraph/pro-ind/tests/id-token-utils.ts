import { newMockEvent } from "matchstick-as"
import { ethereum, Address, BigInt } from "@graphprotocol/graph-ts"
import {
  Approval,
  ApprovalForAll,
  BatchMetadataUpdate,
  EducationVerified,
  IdTokenMinted,
  MetadataUpdate,
  StatsUpdated,
  Transfer
} from "../generated/IDToken/IDToken"

export function createApprovalEvent(
  owner: Address,
  approved: Address,
  tokenId: BigInt
): Approval {
  let approvalEvent = changetype<Approval>(newMockEvent())

  approvalEvent.parameters = new Array()

  approvalEvent.parameters.push(
    new ethereum.EventParam("owner", ethereum.Value.fromAddress(owner))
  )
  approvalEvent.parameters.push(
    new ethereum.EventParam("approved", ethereum.Value.fromAddress(approved))
  )
  approvalEvent.parameters.push(
    new ethereum.EventParam(
      "tokenId",
      ethereum.Value.fromUnsignedBigInt(tokenId)
    )
  )

  return approvalEvent
}

export function createApprovalForAllEvent(
  owner: Address,
  operator: Address,
  approved: boolean
): ApprovalForAll {
  let approvalForAllEvent = changetype<ApprovalForAll>(newMockEvent())

  approvalForAllEvent.parameters = new Array()

  approvalForAllEvent.parameters.push(
    new ethereum.EventParam("owner", ethereum.Value.fromAddress(owner))
  )
  approvalForAllEvent.parameters.push(
    new ethereum.EventParam("operator", ethereum.Value.fromAddress(operator))
  )
  approvalForAllEvent.parameters.push(
    new ethereum.EventParam("approved", ethereum.Value.fromBoolean(approved))
  )

  return approvalForAllEvent
}

export function createBatchMetadataUpdateEvent(
  _fromTokenId: BigInt,
  _toTokenId: BigInt
): BatchMetadataUpdate {
  let batchMetadataUpdateEvent = changetype<BatchMetadataUpdate>(newMockEvent())

  batchMetadataUpdateEvent.parameters = new Array()

  batchMetadataUpdateEvent.parameters.push(
    new ethereum.EventParam(
      "_fromTokenId",
      ethereum.Value.fromUnsignedBigInt(_fromTokenId)
    )
  )
  batchMetadataUpdateEvent.parameters.push(
    new ethereum.EventParam(
      "_toTokenId",
      ethereum.Value.fromUnsignedBigInt(_toTokenId)
    )
  )

  return batchMetadataUpdateEvent
}

export function createEducationVerifiedEvent(
  professional_: Address,
  tokenId_: BigInt,
  educationVerification_: BigInt
): EducationVerified {
  let educationVerifiedEvent = changetype<EducationVerified>(newMockEvent())

  educationVerifiedEvent.parameters = new Array()

  educationVerifiedEvent.parameters.push(
    new ethereum.EventParam(
      "professional_",
      ethereum.Value.fromAddress(professional_)
    )
  )
  educationVerifiedEvent.parameters.push(
    new ethereum.EventParam(
      "tokenId_",
      ethereum.Value.fromUnsignedBigInt(tokenId_)
    )
  )
  educationVerifiedEvent.parameters.push(
    new ethereum.EventParam(
      "educationVerification_",
      ethereum.Value.fromUnsignedBigInt(educationVerification_)
    )
  )

  return educationVerifiedEvent
}

export function createIdTokenMintedEvent(
  professional_: Address,
  tokenId_: BigInt,
  fName_: string,
  lName_: string,
  field_: string
): IdTokenMinted {
  let idTokenMintedEvent = changetype<IdTokenMinted>(newMockEvent())

  idTokenMintedEvent.parameters = new Array()

  idTokenMintedEvent.parameters.push(
    new ethereum.EventParam(
      "professional_",
      ethereum.Value.fromAddress(professional_)
    )
  )
  idTokenMintedEvent.parameters.push(
    new ethereum.EventParam(
      "tokenId_",
      ethereum.Value.fromUnsignedBigInt(tokenId_)
    )
  )
  idTokenMintedEvent.parameters.push(
    new ethereum.EventParam("fName_", ethereum.Value.fromString(fName_))
  )
  idTokenMintedEvent.parameters.push(
    new ethereum.EventParam("lName_", ethereum.Value.fromString(lName_))
  )
  idTokenMintedEvent.parameters.push(
    new ethereum.EventParam("field_", ethereum.Value.fromString(field_))
  )

  return idTokenMintedEvent
}

export function createMetadataUpdateEvent(_tokenId: BigInt): MetadataUpdate {
  let metadataUpdateEvent = changetype<MetadataUpdate>(newMockEvent())

  metadataUpdateEvent.parameters = new Array()

  metadataUpdateEvent.parameters.push(
    new ethereum.EventParam(
      "_tokenId",
      ethereum.Value.fromUnsignedBigInt(_tokenId)
    )
  )

  return metadataUpdateEvent
}

export function createStatsUpdatedEvent(
  professional_: Address,
  tokenId_: BigInt,
  experiencePoints_: BigInt
): StatsUpdated {
  let statsUpdatedEvent = changetype<StatsUpdated>(newMockEvent())

  statsUpdatedEvent.parameters = new Array()

  statsUpdatedEvent.parameters.push(
    new ethereum.EventParam(
      "professional_",
      ethereum.Value.fromAddress(professional_)
    )
  )
  statsUpdatedEvent.parameters.push(
    new ethereum.EventParam(
      "tokenId_",
      ethereum.Value.fromUnsignedBigInt(tokenId_)
    )
  )
  statsUpdatedEvent.parameters.push(
    new ethereum.EventParam(
      "experiencePoints_",
      ethereum.Value.fromUnsignedBigInt(experiencePoints_)
    )
  )

  return statsUpdatedEvent
}

export function createTransferEvent(
  from: Address,
  to: Address,
  tokenId: BigInt
): Transfer {
  let transferEvent = changetype<Transfer>(newMockEvent())

  transferEvent.parameters = new Array()

  transferEvent.parameters.push(
    new ethereum.EventParam("from", ethereum.Value.fromAddress(from))
  )
  transferEvent.parameters.push(
    new ethereum.EventParam("to", ethereum.Value.fromAddress(to))
  )
  transferEvent.parameters.push(
    new ethereum.EventParam(
      "tokenId",
      ethereum.Value.fromUnsignedBigInt(tokenId)
    )
  )

  return transferEvent
}
