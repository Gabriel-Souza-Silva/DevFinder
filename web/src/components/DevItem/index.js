import React from 'react'
import './styles.css'

function DevItem({dev}){

    const loren = "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dignissimos, obcaecati ea voluptates ad laudantium, minima quia natus placeat autem repellendus at officia iste exercitationem repellat beatae eum mollitia harum tempora."

    return(
        <li className="dev-item">
            <header>
                <img src={dev.avatar_url} alt={dev.name}/>
                <div className="user-info">
                    <strong>{dev.name ? dev.name : dev.github_username}</strong>
                    <span>{dev.techs}</span>
                </div>
            </header>
            <p>
                {dev.bio ? dev.bio : loren}
            </p>
            <a href={`https://github.com/${dev.github_username}`}>Acessar Perfil</a>
        </li>
    )
}


export default DevItem