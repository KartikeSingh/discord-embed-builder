import  { FC } from "react";
import { Link } from "react-router-dom";
import { getIcon } from "../../utility";

interface props {
    id: string,
    name: string,
    icon: string,
}

export const GuildCard: FC<props> = ({ id, name, icon }) => {
    console.log(id);

    return (
            <div className="card__guild">
                <img alt={`${name}'s' icon`} src={getIcon(icon, id)} />
                <h3>{name}</h3>
                <Link className="button__guild" to={`/guild/${id}`}>Send embed</Link>
            </div>
    )
}