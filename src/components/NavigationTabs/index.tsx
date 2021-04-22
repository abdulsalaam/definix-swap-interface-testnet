import QuestionHelper from 'components/QuestionHelper'
import { RowBetween } from 'components/Row'
import TranslatedText from 'components/TranslatedText'
import { darken } from 'polished'
import React from 'react'
import { ArrowLeft } from 'react-feather'
import { Link as HistoryLink, NavLink } from 'react-router-dom'
import styled from 'styled-components'
import { ButtonMenu, ButtonMenuItem, Heading } from 'uikit-dev'

const Tabs = styled.div`
  display: flex;
  flex-flow: row nowrap;
  align-items: center;
  border-radius: ${({ theme }) => theme.radii.default};
  justify-content: space-evenly;
`

const activeClassName = 'ACTIVE'

const StyledAbsoluteLink = styled.a`
  display: flex;
  flex-flow: row nowrap;
  align-items: center;
  justify-content: center;
  height: 3rem;
  border-radius: ${({ theme }) => theme.radii.default};
  outline: none;
  cursor: pointer;
  text-decoration: none;
  color: ${({ theme }) => theme.colors.textDisabled};
  font-size: 20px;

  &.${activeClassName} {
    border-radius: ${({ theme }) => theme.radii.default};
    font-weight: 500;
    color: ${({ theme }) => theme.colors.text};
  }

  :hover,
  :focus {
    color: ${({ theme }) => darken(0.1, theme.colors.text)};
  }
`

const StyledNavLink = styled(NavLink).attrs({
  activeClassName,
})`
  display: flex;
  flex-flow: row nowrap;
  align-items: center;
  justify-content: center;
  height: 3rem;
  border-radius: ${({ theme }) => theme.radii.default};
  outline: none;
  cursor: pointer;
  text-decoration: none;
  color: ${({ theme }) => theme.colors.textDisabled};
  font-size: 20px;

  &.${activeClassName} {
    border-radius: ${({ theme }) => theme.radii.default};
    font-weight: 500;
    color: ${({ theme }) => theme.colors.text};
  }

  :hover,
  :focus {
    color: ${({ theme }) => darken(0.1, theme.colors.text)};
  }
`

const ActiveText = styled.div`
  font-weight: 500;
  font-size: 20px;
`

const StyledArrowLeft = styled(ArrowLeft)`
  color: ${({ theme }) => theme.colors.text};
`

export function FindPoolTabs() {
  return (
    <Tabs className="flex flex-column pa-6 pb-0 align-start">
      <HistoryLink to="/liquidity">
        <StyledArrowLeft />
      </HistoryLink>
      <div className="flex align-center mt-4">
        <Heading>Import Pool</Heading>
        <QuestionHelper text={"Use this tool to find pairs that don't automatically appear in the interface."} />
      </div>
    </Tabs>
  )
}

export function AddRemoveTabs({ adding }: { adding: boolean }) {
  return (
    <Tabs className="flex flex-column pa-6 pb-0 align-start">
      <HistoryLink to="/liquidity">
        <StyledArrowLeft />
      </HistoryLink>
      <div className="flex align-center mt-4">
        <Heading>{adding ? 'Add' : 'Remove'} Liquidity</Heading>
        <QuestionHelper
          text={
            adding
              ? 'When you add liquidity, you are given pool tokens representing your position. These tokens automatically earn fees proportional to your share of the pool, and can be redeemed at any time.'
              : 'Removing pool tokens converts your position back into underlying tokens at the current rate, proportional to your share of the pool. Accrued fees are included in the amounts you receive.'
          }
        />
      </div>
    </Tabs>
  )
}
