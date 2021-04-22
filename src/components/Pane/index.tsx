import styled from 'styled-components'

const Pane = styled.div`
  border: 2px solid ${({ theme }) => theme.colors.borderColor};
  border-radius: ${({ theme }) => theme.radii.default};
  padding: 16px;
`

export default Pane
