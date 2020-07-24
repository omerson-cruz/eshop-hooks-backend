
// we can also use another object from 'styled-components' called
// "css" ==> this allows us to write a bloc of CSS that we can pass in
// and render as CSS inside of anyo of our styled components
// import styled, { css } from 'styled-components'  // ==> refactored
import styled from 'styled-components'

// here we are going to directly style the "Link" component from
// the react router dom library
import { Link } from 'react-router-dom'


// using the "css" object from 'styled-components'
// the below style is from the ".option" in the original header.styles.css
// In a way we are making this CSS styling as reusable
// const OptionContainerStyles = css`
//     padding: 10px 15px;
//     cursor: pointer;
// `



export const HeaderContainer = styled.div`
    height: 70px;
    width: 100%;
    display: flex;
    justify-content: space-between;
    margin-bottom: 25px;
`

// so instead of calling "styled.div" we are going to call
// styled( ) as a function wherein we pass the target Component that
// we wanted to style
export const LogoContainer = styled(Link)`
    height: 100%;
    width: 70px;
    padding: 25px;
`

export const OptionsContainer = styled.div`
    width: 50%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: flex-end;
`
export const OptionLink = styled(Link)`
     padding: 10px 15px;
     cursor: pointer;
`
// export const OptionDiv = styled.div`
//     ${OptionContainerStyles}
// `

