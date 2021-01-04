import React from 'react'
import Typed from 'react-typed'
import Button from 'react-bootstrap/Button'
import { Link } from 'react-router-dom'
import './Documentation.scss'

export const Documentation = () => {
    const c1 = 
`type Todo @model {
    name: String!
    done: Boolean!
}`
    return (
        <div className="no-bottom no-top" id="content">
            <section className="full-height documentation-section">
                <h1>Simple Model</h1>
                <p>Types are similar of types in graphql <a href="https://graphql.org/learn/schema/">https://graphql.org/learn/schema/</a></p>
                <pre><code>
                {c1}
                </code></pre>
                <p>
                    The language is pretty readable, but let's go over it so that we can have a shared vocabulary:
                </p>

<p>
    <b>Todo</b> is a GraphQL Object Type, meaning it's a type with some fields. For ProtectQL meaning is a model.
<b>name</b> and <b>done</b> are fields on the Character type. That means that name and done are the only fields that can appear in any part of a GraphQL query that operates on the Todo model/type.
</p>
<p>
    <b>String</b> is one of the built-in scalar types - these are types that resolve to a single scalar object, and can't have sub-selections in the query. We'll go over scalar types more later.
</p>
<p>
    String! means that the field is non-nullable, meaning that the GraphQL service promises to always give you a value when you query this field. In the type language, we'll represent those with an exclamation mark.
</p>

            </section>

            <section className="full-height vertical-center">
            </section>
        </div>
    );
}

export default Documentation