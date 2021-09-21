import React, { FC, useEffect } from "react";
import { createEmbed } from "../../utility";

interface props {
    channels: [{
        id: string
        name: string,
    }],
    guild: string
}

export const EmbedForm: FC<props> = ({ channels, guild }) => {

    function changeColor(e: any) {
        let d = document.getElementById("lable__color");

        if (d) {
            d.style.backgroundColor = e.target.value;
        }

        handleChange(e);
    }

    useEffect(() => {
        document.querySelector('form')?.addEventListener('submit', (e) => {
            e.preventDefault();

            createEmbed(guild, values.channel || "", values).then(() => {
                alert("Embed sent successfully");
            }).catch(e => {
                alert(JSON.parse(e.request.response).message)
            })
        });
    })

    let values: InitialValues = {
        author_link: undefined,
        author_name: undefined,
        author_image: undefined,
        channel: channels[0].id,
        color: "RANDOM",
        description: undefined,
        footer: undefined,
        image: undefined,
        thumbnail: undefined,
        timestamps: false,
        url: undefined,
        title: undefined
    }

    // @ts-ignore
    const handleChange = (e: any) => values[e.target.name] = e.target.value;

    return (
        <form className="form">
            <h1>Create A Embed</h1>

            <label htmlFor="title">Title : </label>
            <input onChange={handleChange} className="input__embed" type="text" name="title" defaultValue={values.description} />

            <label htmlFor="description">Description : </label>
            <input onChange={handleChange} className="input__embed" type="text" name="description" defaultValue={values.description} />

            <label htmlFor="footer">Footer : </label>
            <input onChange={handleChange} className="input__embed" type="text" name="footer" defaultValue={values.description} />

            <label htmlFor="image">Image : </label>
            <input onChange={handleChange} className="input__embed" type="text" name="image" defaultValue={values.description} />

            <label htmlFor="thumbnail">Thumbnail : </label>
            <input onChange={handleChange} className="input__embed" type="text" name="thumbnail" defaultValue={values.description} />

            <label htmlFor="color">Color : </label>
            <input id="lable__color" onChange={changeColor} className="input__embed__color" type="color" name="color" defaultValue={values.description} />

            <label htmlFor="author_name">Author Name : </label>
            <input onChange={handleChange} className="input__embed" type="text" name="author_name" defaultValue={values.author_name} />

            <label htmlFor="author_image">Author Image : </label>
            <input onChange={handleChange} className="input__embed" type="text" name="author_image" defaultValue={values.author_image} />

            <label htmlFor="author_link">Author Link : </label>
            <input onChange={handleChange} className="input__embed" type="text" name="author_link" defaultValue={values.author_link} />

            <label htmlFor="url">Title URL : </label>
            <input onChange={handleChange} className="input__embed" type="text" name="url" defaultValue={values.description} />

            <label htmlFor="timestamps">Timestamps : </label>
            <select onChange={handleChange} className="input__embed" defaultValue={channels[0].id} name="timestamps" >
                <option value={undefined} key={1}>Do not show timestamps</option>
                <option value={Date.now()} key={2}>Yes show timestamps</option>
            </select>

            <label htmlFor="channel">Channel : </label>
            <select onChange={handleChange} className="input__embed" defaultValue={channels[0].id} name="channel" >
                {
                    channels.map((v, k) => (
                        <option value={v.id} key={k}>{v.name}</option>
                    ))
                }
            </select>

            <button className="input__embed_button" type="submit" color="white" children="Send Embed" />
        </form>
    )
}

interface InitialValues {
    channel: string | undefined
    title: string | undefined
    description: string | undefined
    footer: string | undefined
    timestamps: boolean,
    color: string | undefined
    image: string | undefined
    thumbnail: string | undefined
    url: string | undefined
    author_name: string | undefined
    author_image: string | undefined
    author_link: string | undefined

}