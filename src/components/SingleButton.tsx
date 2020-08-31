import React from 'react';
import styled from 'styled-components';
import * as Constants from '../constants/SharedConstants';
import moment from 'moment';
import 'moment/locale/de';
moment.locale('de');

interface SingleButtonProps {
    primaryColor: string,
    buttonTextColor: string,
    lightShadePrimaryColor: string,
    darkShadePrimaryColor: string,
    fontSize: string,
    margin: string,
    padding: string,
    height: string | null,
    onClick: (() => void),
    children: any
}

const SingleButton = (props: SingleButtonProps) => {
    return (
        <Button
            className='expert-widget__single-button'
            onClick={props.onClick}
            primaryColor={props.primaryColor}
            buttonTextColor={props.buttonTextColor}
            lightShadePrimaryColor={props.lightShadePrimaryColor}
            darkShadePrimaryColor={props.darkShadePrimaryColor}
            fontSize={props.fontSize}
            margin={props.margin}
            padding={props.padding}
            height={props.height}>
            <Text>{props.children}</Text>
        </Button>
    );
}


type ButtonProps = {
    primaryColor: string;
    buttonTextColor: string;
    lightShadePrimaryColor: string;
    darkShadePrimaryColor: string;
    fontSize: string;
    margin: string;
    padding: string;
    height: string | null;
};


const Button = styled.div<ButtonProps>`
    height: ${props => props.height !== null ? props => props.height : 'unset'};
    background-color: ${props => props.primaryColor};
    background-image: -webkit-linear-gradient(top, ${props => props.primaryColor}, ${props => props.darkShadePrimaryColor});
    background-image: -moz-linear-gradient(top, ${props => props.primaryColor}, ${props => props.darkShadePrimaryColor});
    background-image: -ms-linear-gradient(top, ${props => props.primaryColor}, ${props => props.darkShadePrimaryColor});
    background-image: -o-linear-gradient(top, ${props => props.primaryColor}, ${props => props.darkShadePrimaryColor});
    background-image: linear-gradient(to bottom, ${props => props.primaryColor}, ${props => props.darkShadePrimaryColor});
    -webkit-border-radius: ${Constants.STANDARD_BORDER_RADIUS};
    -moz-border-radius: ${Constants.STANDARD_BORDER_RADIUS};
    border-radius: ${Constants.STANDARD_BORDER_RADIUS};
    color: ${props => props.buttonTextColor};
    font-size: ${props => props.fontSize};
    font-weight: 100;
    padding: ${props => props.padding};
    margin: ${props => props.margin};
    box-shadow: ${Constants.SINGLE_BUTTON_BOX_SHADOW} ${Constants.DARK_GREY_3};
    -webkit-box-shadow: ${Constants.SINGLE_BUTTON_BOX_SHADOW} ${Constants.DARK_GREY_3};
    -moz-box-shadow: ${Constants.SINGLE_BUTTON_BOX_SHADOW} ${Constants.DARK_GREY_3};
    text-shadow: ${Constants.SINGLE_BUTTON_TEXT_SHADOW} #000000;
    border: solid #000000 1px;
    text-decoration: none;
    cursor: pointer;
    flex: 1;
    text-align: center;
    align-items: center;
    justify-content: center;
    
    &:hover {
        border: solid #000000 1px;
        background: ${props => props.darkShadePrimaryColor};
        background-image: -webkit-linear-gradient(top, ${props => props.darkShadePrimaryColor}, ${props => props.primaryColor});
        background-image: -moz-linear-gradient(top, ${props => props.darkShadePrimaryColor}, ${props => props.primaryColor});
        background-image: -ms-linear-gradient(top, ${props => props.darkShadePrimaryColor}, ${props => props.primaryColor});
        background-image: -o-linear-gradient(top, ${props => props.darkShadePrimaryColor}, ${props => props.primaryColor});
        background-image: linear-gradient(to bottom, ${props => props.darkShadePrimaryColor}, ${props => props.primaryColor});
        text-decoration: none;
    }
`;

const Text = styled.span`
    display: inline-block;
    vertical-align: middle;
`
export default SingleButton;