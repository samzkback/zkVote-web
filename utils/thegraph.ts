import { ApolloClient, InMemoryCache, gql } from '@apollo/client'

const VOTE_SUBGRAPH_URL = "https://api.thegraph.com/subgraphs/name/samzkback/zkvotev2"
const client = new ApolloClient({
    uri: VOTE_SUBGRAPH_URL,
    cache: new InMemoryCache(),
  })

export async function queryGroupMember(
    groupId : number
) {
    const query = `
        query($groupId: Int) {
            memberAddeds(where: {groupId : $groupId}) {
                groupId
                identityCommitment
            }
        }
    `

    let members : string[] = []
    const data = await client.query({
        query: gql(query),
        variables: {
            groupId: groupId,
        }
    })
    data.data.memberAddeds.forEach(m => members.push(m.identityCommitment))
    return members
}

export async function queryGroupPoll(
    groupId : number
) {
    const query = `
        query($groupId: Int) {
            pollAddeds(where: {groupId : $groupId}) {
                groupId
                pollId
                title
                voteMsgs
            }
        }
    `

    const data = await client.query({
        query: gql(query),
        variables: {
            groupId: groupId,
        }
    })
    return data.data.pollAddeds
}

export async function queryVoteInPoll(
    groupId : number
) {
    const query = `
        query($groupId: Int) {
            poolVoteAddeds(where: {groupId : $groupId}) {
                groupId
                poolId
                voteMsg
            }
        }
    `

    const data = await client.query({
        query: gql(query),
        variables: {
            groupId: groupId,
        }
    })
    return data.data.poolVoteAddeds
}