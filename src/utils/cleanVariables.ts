const removeTypename = (key: string, value: Record<string, unknown>) =>
  key === '__typename' ? undefined : value

export const cleanVariables = (variables: Record<string, unknown>) =>
  JSON.parse(JSON.stringify(variables), removeTypename)
