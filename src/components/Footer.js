import React from 'react'
import styled from 'styled-components'

const Wrapper = styled.footer`
  display: flex;
  flex-flow: row wrap;
  justify-content: space-between;
  align-items: flex-start;
  margin: 0 auto;
  max-width: ${props => props.theme.sizes.maxWidth};
`

const List = styled.ul`
  display: flex;
  flex-flow: row wrap;
  justify-content: space-between;
  align-items: flex-start;
  width: 100%;
  border-top: 1px solid ${props => props.theme.colors.secondary};
  padding: 1em 0 2em;
  margin: 0 1.5em;
`

const Item = styled.li`
  display: inline-block;
  padding: 0.25em 0;
  width: 100%;
  @media screen and (min-width: ${props => props.theme.responsive.small}) {
    width: auto;
  }
  a {
    font-weight: 600;
    transition: all 0.2s;
    color: ${props => props.theme.colors.base};
    &:hover {
      color: ${props => props.theme.colors.highlight};
    }
    &:visited {
      color: ${props => props.theme.colors.base};
    }
  }
`

const Footer = () => (
  <Wrapper>
    <List>
      <Item>
        <a
          href="https://www.datascienceacademy.com.mx/"
          rel="nofollow noopener noreferrer"
          target="_blank"
        >
          <img
            src="https://res.cloudinary.com/migmal/image/upload/v1546106992/DSAM_-_Logo_yzgppi.png"
            style={{ width: '100px' }}
            alt="Product by Data Science Academy Mexico"
          />
        </a>
      </Item>
      <Item>
        Follow us{' '}
        <a
          href="https://www.instagram.com/datasciencemx/"
          target="_blank"
          rel="noopener noreferrer"
        >
          @DataScienceMX
        </a>
      </Item>
    </List>
  </Wrapper>
)

export default Footer
