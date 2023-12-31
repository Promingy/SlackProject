import { Link, useParams } from "react-router-dom"
import OpenModalButton from '../OpenModalButton/OpenModalButton'
import { useDispatch, useSelector } from 'react-redux'
import { unboldChannel } from "../../redux/server"
import { useState, useEffect, useRef } from "react";
import ChannelCreationForm from '../ChannelCreationForm'
import ServerPopupModal from "../ServerPopupModal/ServerPopupModal"
import "./InnerNavbar.css"

export default function InnerNavbar({ socket }) {
    const { channelId } = useParams()
    const dispatch = useDispatch()
    const server = useSelector((state) => state.server)
    const [showMenu, setShowMenu] = useState(false);
    const ulRef = useRef();
    const ulClassName = "channel-dropdown" + (showMenu ? "" : " hidden");
    const [theme, setTheme] = useState(localStorage.getItem('theme') === 'dark')

    useEffect(() => {
        setTheme(localStorage.getItem('theme') === 'dark')
    }, [setTheme])

    const toggleMenu = (e) => {
        e.stopPropagation(); // Keep from bubbling up to document and triggering closeMenu
        setShowMenu(!showMenu);
    };

    useEffect(() => {
        if (!showMenu) return;

        const closeMenu = (e) => {
            if (!ulRef.current.contains(e.target)) {
                setShowMenu(false);
            }
        };

        document.addEventListener("click", closeMenu);

        return () => document.removeEventListener("click", closeMenu);
    }, [showMenu]);


    const closeMenu = () => setShowMenu(false);

    const handleChannelUnbold = (channelId) => {
        dispatch(unboldChannel(channelId))
        const storedBoldValues = localStorage.getItem("boldValues")
        let storedBoldValuesObj
        if (storedBoldValues) {
            storedBoldValuesObj = JSON.parse(storedBoldValues)
        } else {
            storedBoldValuesObj = {}
        }
        storedBoldValuesObj[channelId] = 0
        const storedBoldValuesJSON = JSON.stringify(storedBoldValuesObj)
        localStorage.setItem("boldValues", storedBoldValuesJSON)
    }

    document.documentElement.className = `theme-${localStorage.getItem('theme') || 'light'}`;

    if (!server.channels) return null
    return (
        <>
            <div className={`inner-navbar-wrapper`}>
                <div className={`inner-navbar-header`}>
                    <OpenModalButton
                        modalComponent={<ServerPopupModal socket={socket} />}
                        buttonText={
                            <p>
                                {server.name} <i className="fa-solid fa-chevron-down"></i>
                            </p>
                        }
                    />
                </div>

                <ul className="inner-navbar-content">
                    <div className={`create-channel-container`}>
                        <button onClick={toggleMenu}> <i className={`${showMenu ? `fa-solid fa-caret-down` : `fa-solid fa-caret-right`} ${theme ? showMenu ? 'fa-solid fa-cared-down' : 'fa-solid fa-caret-right' : ''}`} />&nbsp;&nbsp;&nbsp;&nbsp;Channels</button>
                    </div>
                    <div className={ulClassName} ref={ulRef}>
                        <OpenModalButton
                            buttonText="Create a Channel"
                            onItemClick={closeMenu}
                            modalComponent={<ChannelCreationForm socket={socket} />}
                        />
                    </div>
                    {Object.values(server.channels).map((channel) => (
                        <li id={`channel${channel.id}`} key={channel.id} onClick={() => handleChannelUnbold(channel.id)} className={`${channel.id == channelId ? ' selected-channel' : 'not-selected-channel'}${channel?.bold ? " bold-channel" : ""} ${theme ? 'not-selected-channel-dark' : ''}`}>
                            <Link to={`/main/servers/${server.id}/channels/${channel.id}`} className="inner-navbar-link">
                                <div className="navbar-content">
                                    <div className="navbar-content-left">
                                        <i className="fa-solid fa-hashtag"></i>{channel.name}
                                    </div>
                                    {channel?.bold ? <div className="unread-message-count">{channel?.bold}</div> : ""}
                                </div>
                            </Link>
                        </li>
                    ))}
                </ul>
                <div className="creator-container">
                    <ul style={{ listStyle: "none" }}>
                        <p className="creator-header">Creator Githubs</p>
                        <li className="repo-link-container">
                            <a className="repo-link" target='_blank' rel='noreferrer' href="https://github.com/Promingy/SlackProject">
                                Github Repo
                            </a>
                        </li>
                        <li className="creators">
                            <a className="creator-links" target="_blank" rel='noreferrer' href="https://github.com/regdes721">
                                <i className="fa-brands fa-github" />
                                Reginald
                            </a>

                            <a className="creator-links" target='_blank' rel='noreferrer' href="https://github.com/NickBrooks188">
                                <i className="fa-brands fa-github" />
                                Nick
                            </a>
                        </li>
                        <li className="creators">
                            <a className="creator-links" target='_blank' rel='noreferrer' href="https://github.com/Promingy">
                                <i className="fa-brands fa-github" />
                                Corbin
                            </a>

                            <a className="creator-links" target="_blank" rel='noreferrer' href="https://github.com/lovelyyun024">
                                <i className="fa-brands fa-github" />
                                Esther
                            </a>
                        </li>
                    </ul>
                </div>
            </div>
        </>
    );
}
