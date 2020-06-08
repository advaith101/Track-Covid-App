import React from 'react';
import { string } from 'prop-types';
import { Row } from 'simple-flexbox';
import { StyleSheet, css } from 'aphrodite';


const styles = StyleSheet.create({
    container: {
        height: 50, width: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "flex-start",
        backgroundColor: "#fff"
    },
    cursorPointer: {
        cursor: 'pointer'
    },
    name: {
        fontSize: "21px",
        fontWeight: 300,
        lineHeight: "70px",
        color: "#323332",
        textDecoration: "none",
        fontFamily: "Roboto",
        textAlign: 'right',
        letterSpacing: 0.2,
        '@media (max-width: 768px)': {
            display: 'none'
        }
    },
    separator: {
        borderLeft: '1px solid #DFE0EB',
        marginLeft: 32,
        marginRight: 32,
        height: 32,
        width: 2,
        '@media (max-width: 768px)': {
            marginLeft: 12,
            marginRight: 12
        }
    },
    title: {
        fontSize: "21px",
        fontWeight: 300,
        lineHeight: "70px",
        color: "#788195",
        textDecoration: "none",
        fontFamily: "Roboto",
        textAlign: 'right',
        letterSpacing: 0.4,
        marginLeft: 21,
        '@media (max-width: 768px)': {
            marginLeft: 73
        },
        '@media (max-width: 468px)': {
            fontSize: 20
        }
    },
    iconStyles: {
        cursor: 'pointer',
        marginLeft: 21,
        '@media (max-width: 768px)': {
            marginLeft: 12
        }
    }
});

function HeaderComponent(props) {
    const { icon, title, ...otherProps } = props;
    return (
        <Row className={css(styles.container)} vertical="center" horizontal="space-between" {...otherProps}>
            
            <span className={css(styles.title)}>{(Number(window.localStorage.getItem("isAdmin"))) ? "Admin Dashboard" : "Employee Dashboard"}</span>
            
        </Row>
    );
}

HeaderComponent.propTypes = {
    title: string
};

export default HeaderComponent;
