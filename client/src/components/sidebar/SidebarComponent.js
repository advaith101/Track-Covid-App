import React, { useCallback, useEffect, useState, useRef } from 'react';
import { Column, Row } from 'simple-flexbox';
import { StyleSheet, css } from 'aphrodite';
import IconBurger from './../../assets/icon-burger';
import { NavLink } from 'react-router-dom'
import "../dashboard.css";
var $ = require("jquery");
const styles = StyleSheet.create({
    burgerIcon: {
        cursor: 'pointer',
        position: 'absolute',
        left: 24,
        top: 34
    },
    container: {
        backgroundColor: 'rgb(45, 52, 70)',
        width: 240,
        height: '100vh'
    },
    containerMobile: {
        transition: 'left 0.5s, right 0.5s',
        position: 'absolute',
        width: 240,
        height: '100vh',
        zIndex: 901
    },
    mainContainer: {
        height: '100%',
        minHeight: '100vh'
    },
    mainContainerMobile: {
        position: 'absolute',
        top: 0,
        left: 0
    },
    mainContainerExpanded: {
        width: '100%',
        minWidth: '100vh'
    },
    outsideLayer: {
        position: 'absolute',
        width: '100vw',
        minWidth: '100%',
        height: '100%',
        backgroundColor: 'rgba(0,0,0,.50)',
        zIndex: 900
    },
    menuItemList: {
        paddingTop: '35px',
        background: "#2d3446"
    },
    separator: {
        borderTop: '1px solid #DFE0EB',
        marginTop: 16,
        marginBottom: 16,
        opacity: 0.06
    },
    hide: {
        left: -255
    },
    show: {
        left: 0
    }
});

function SidebarComponent({ onChange, userType }) {
    const [expanded, setExpanded] = useState(false);
    const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
    const input1 = useRef(null);

    const [, updateState] = React.useState();
    const forceUpdate = useCallback(() => updateState({}), []);

    useEffect(() => {
        setIsMobile(window.innerWidth <= 768);
        forceUpdate();
    }, [window.innerWidth]);
    useEffect(() => {
        var $li = $('#menu li').click(function () {
            $li.removeClass('selected');
            $(this).addClass('selected');
        });
        $(`#${window.location.href.substring(window.location.href.lastIndexOf('/') + 1)}`).addClass('selected');
    }, [])

    const toggleMenu = () => setExpanded(!expanded);

    const renderBurger = () => {
        return (
            <div onClick={toggleMenu} className={css(styles.burgerIcon)}>
                <IconBurger />
            </div>
        );
    };

    return (
        <div style={{ position: 'relative' }}>
            <Row
                componentRef={element => (input1.current = element)}
                className={css(styles.mainContainer)}
                breakpoints={{
                    768: css(
                        styles.mainContainerMobile,
                        expanded && styles.mainContainerExpanded
                    )
                }}
            >
                {isMobile && !expanded && renderBurger()}
                <Column
                    className={css(styles.container)}
                    breakpoints={{
                        768: css(
                            styles.containerMobile,
                            expanded ? styles.show : styles.hide
                        )
                    }}
                >
                    <div class="isoLogoWrapper">ABSENCE TRACKER</div>
                    <div id="menu">
                        <ul class="sidebarUl">
                            <NavLink to="/dashboard/leaveRecord" style={{ color: "inherit" }}>
                                <li class="ant-menu-item" id="leaveRecord" role="menuitem" style={{ paddingLeft: "24px" }} >

                                    <span class="isoMenuHolder" style={{ color: "inherit" }}>
                                        <ion-icon class="ion" name="document"></ion-icon>
                                        <span class="nav-text"><span>Leave records</span></span>
                                    </span>

                                </li>
                            </NavLink>
                            {Number(window.localStorage.getItem("isAdmin")) ? (
                                <NavLink to="/dashboard/registration" style={{ color: "inherit" }}>
                                    <li class="ant-menu-item" id="registration" role="menuitem" style={{ paddingLeft: "24px" }}>

                                        <span class="isoMenuHolder" style={{ color: "inherit" }}>
                                            <ion-icon class="ion" name="person-add"></ion-icon>
                                            <span class="nav-text"><span>{Number(window.localStorage.getItem("isAdmin")) ? "Employee registration" : "Registration"}</span></span>
                                        </span>

                                    </li>
                                </NavLink>) : ""}
                            <NavLink to="/dashboard/createAbsence" style={{ color: "inherit" }}>
                                <li class="ant-menu-item" id="createAbsence" role="menuitem" style={{ paddingLeft: "24px" }}>

                                    <span class="isoMenuHolder" style={{ color: "inherit" }}>
                                        <ion-icon class="ion" name="create"></ion-icon>
                                        <span class="nav-text"><span>{Number(window.localStorage.getItem("isAdmin")) ? "Create employee absence" : "Create absence"}</span></span>
                                    </span>

                                </li>
                            </NavLink>
                            <NavLink to="/dashboard/changePassword" style={{ color: "inherit" }}>
                                <li class="ant-menu-item" id="changePassword" role="menuitem" style={{ paddingLeft: "24px" }}>

                                    <span class="isoMenuHolder" style={{ color: "inherit" }}>
                                        <ion-icon class="ion" name="lock-closed"></ion-icon>
                                        <span class="nav-text"><span>Change password</span></span>
                                    </span>

                                </li>
                            </NavLink>
                            <div onClick={() => { window.location.href = "/login"; window.localStorage.clear() }} style={{ color: "inherit" }}>
                                <li class="ant-menu-item" role="menuitem" style={{ paddingLeft: "24px" }}>

                                    <span class="isoMenuHolder" style={{ color: "inherit" }}>
                                        <ion-icon class="ion" name="log-out"></ion-icon>
                                        <span class="nav-text"><span>Logout</span></span>
                                    </span>

                                </li>
                            </div>
                        </ul>
                    </div>
                </Column>
                {isMobile && expanded && (
                    <div
                        className={css(styles.outsideLayer)}
                        onClick={toggleMenu}
                    ></div>
                )}
            </Row>
        </div>
    );
}

export default SidebarComponent;
