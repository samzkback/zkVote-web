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
    client.query({
        query: gql(query),
        variables: {
            groupId: groupId,
        }
    }).then((data) => {
        data.data.memberAddeds.forEach(m => members.push(m.identityCommitment))
    })
    return members
}
