import React from "react";

export default function NewsFeedView(props) {
    return (
        <div>
            {
                props.newsList.map((item) => {
                    return (
                        <div>
                            <h3>{item.title}</h3>
                            <br />
                            <p>{item.contents}</p>
                        </div>
                    )
                })
            }
        </div>
    );
}